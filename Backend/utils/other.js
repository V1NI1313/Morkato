module.exports.fixData = (fix, data) => {
  let get = (data, attr, __default=null) => {
    if(data[attr] == undefined) return __default
    else return data[attr]
  }
  for(let attr of Object.keys(data)) {
    fix[attr] = get(fix, attr, data[attr])
  }; return fix
}
/**
 * @param {Array[T]} array 
 * @param {function} callback
 * @returns {Array} map
 */
module.exports.map = (array, callback) => {
  const newArray = []; array.forEach(elem => {
    newArray.push(callback(elem))
  }); return newArray
}