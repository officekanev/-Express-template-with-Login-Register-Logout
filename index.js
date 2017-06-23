let env = process.env.NODE_ENV || 'development'

let settings = require('./server/config/settings')[env]

// invoke file express.js
const app = require('express')()

// here set (database, express & routes)
require('./server/config/database')(settings)
require('./server/config/express')(app)// invoke file express.js
require('./server/config/routes')(app)
require('./server/config/passport')()

app.listen(settings.port)
console.log(`Server listening on port ${settings.port}... `)