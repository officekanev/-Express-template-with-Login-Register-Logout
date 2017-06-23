// settings === envarienments
const path = require('path')

let rootPath = path.normalize(path.join(__dirname, '/../../'))

module.exports = {
  development: {
    rootPath: rootPath,
    db: 'mongodb://localhost:27017/generictemplate',
    port: 1334
  },
  staging: {
  },
  qi: {
  },
  production: {
    // port: process.env.PORT
  }
}
