const requireModule = require.context('.', true, /\/[\w\W]+\/index.js$/)
const modules = {}
requireModule.keys().forEach(fileName => {
  const moduleName = fileName.replace(/(\.\/|\/index.js)/g, '')
  modules[moduleName] = requireModule(fileName).default
})

export default modules
