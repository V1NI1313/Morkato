const { Router } = require('express')
const path = require('path')
const fs = require('fs')

const settings = JSON.parse(fs.readFileSync(path.join(__dirname, '../../settings.json'), {encoding: 'utf-8'}).toString())
const url = ""
+  `${settings.oauth2.url}/oauth2/authorize`
+  `?response_type=${settings.oauth2.response_type}`
+  `&scope=${settings.oauth2.scope.join('+')}`
+  `&redirect=${settings.oauth2.redirect}`
+  `&client_id=${settings.oauth2.client_id}`

const route = Router()

route.get('/desktop/token', async (req, res) => {
  if(!req.session.bearer_token) {
    res.status(403)
    .json({message: "403: NotSessionToken"})
  } else {
    res.status(200)
    .send(req.session.bearer_token)
  }
})
route.get('/api/auth', async (req, res, next) => {
  const code = req.query.code
  if(req.session.bearer_token !== undefined) return res.redirect('/dashboard')
  if(!code) {return res.redirect(url)}
  
  const form = new FormData()
  form.append("client_id", settings.oauth2.client_id)
  form.append("client_secret", settings.oauth2.client_secret)
  form.append("grant_type", "authorization_code")
  form.append("redirect_url", settings.oauth2.redirect)
  form.append("scope", settings.oauth2.scope.join('+'))
  form.append("code", code)

  const json = await (await fetch(
    `${settings.oauth2.url}/oauth2/token`, {
      method: "POST",
      body: form
    })).json()
  const user = await (await fetch(`${settings.oauth2.url}/users/@me`, {
    method: "GET",
    headers: {
      authorization: `${json.token_type} ${json.access_token}`
    }
  })).json()

  req.session.bearer_token = json.access_token
  req.session.userData = user
  res.redirect('/dashboard')
})
route.get('/desktop/@me', async (req, res) => {
  if(!req.session.bearer_token) return res.status(403).json({message: '403: NotSession'})
  else {
    const guilds = await (await fetch(`${settings.oauth2.url}/users/@me/guilds`), {
      method: "GET",
      headers: `Bearer ${req.session.bearer_token}`
    }).json()
    req.session.userData['guilds'] = guilds
    return res.status(200)
    .json(req.session.userData)
  }
})

module.exports = route