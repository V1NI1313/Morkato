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



module.exports = route