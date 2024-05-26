

const GetId = () => {
  global.currentId++
  return global.currentId
}


module.exports = {
  GetId,
}
