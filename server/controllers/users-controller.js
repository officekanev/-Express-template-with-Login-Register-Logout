const encryption = require('../utilities/encryption')
const User = require('mongoose').model('User')

module.exports = {
  registerGet: (req, res) => {
    res.render('users/register')
  },
  registerPost: (req, res) => {
    let reqUser = req.body
    console.log(reqUser)

    // Add validation

    // if (reqUser.length < 4) {
    //   console.log('lenght must be...')
    // }

    let salt = encryption.generateSalt()
    let hashedPassword = encryption.generateHashedPassword(salt, reqUser.password)

    // !!! REALY IMPORTANT create new objec who defence him of incorect
    // hackers atact in to DB Roles
    User.create({
      username: reqUser.username,
      firstName: reqUser.firstName,
      lastName: reqUser.lastName,
      salt: salt,
      hashedPassword: hashedPassword
    }).then(user => {
      req.logIn(user, (err, user) => {
        if (err) {
          res.locals.globalError = err
          res.render('users/register', user)
        }

        res.redirect('/')
      })
    })
  },
  loginGet: (req, res) => {
    res.render('users/login')
  },
  LoginPost: (req, res) => {
    let reqUser = req.body
    User
      .findOne({ username: reqUser.username }).then(user => {
        if (!user) {
          res.locals.globalError = 'Invalid email or password'
          res.render('users/login')
          return
        }

        if (!user.authenticate(reqUser.password)) {
          res.locals.globalError = 'Invalid email or password'
          res.render('users/login')
          return
        }

        req.logIn(user, (err, user) => {
          if (err) {
            res.locals.globalError = err
            res.render('users/login')
          }

          res.redirect('/')
        })
      })
  },
  logout: (req, res) => {
    req.logout()
    res.redirect('/')
  }
}
