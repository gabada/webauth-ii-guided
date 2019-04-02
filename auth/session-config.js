const session = require('express-session');
const KnexSessionStore = require('connect-session-knex')(session);
const db = require('../database/dbConfig.js');

module.exports = {
  name: 'sloth',
  secret: 'keep it secret, keep it safe!',
  cookie: {
    maxAge: 1000 * 60 * 15,
    secure: false, // use cookie over https
    httpOnly: true //can JS access the cookie on the client
  },
  resave: false,
  saveUninitialized: false,
  store: new KnexSessionStore({
    knex: db,
    tablename: 'sessions',
    sidfieldname: 'sid',
    createtable: true,
    clearInterval: 1000 * 60 * 60 // delete expired sessions
  })
};
