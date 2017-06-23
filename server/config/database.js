const mongoose = require('mongoose')
const User = require('../data/User')

mongoose.Promise = global.Promise

//                setting.js - here conect with diff ENV
module.exports = (settings) => {
  mongoose.connect(settings.db)//db is recive of setting.js

  let db = mongoose.connection

  db.once('open', (err) => { 
    if (err) {
      throw err
    }

    console.log('MongoDB Ready!')

    User.seedAdminUser()
  })

  db.on('error', err => console.log(`Database error: ${err}`))
}
