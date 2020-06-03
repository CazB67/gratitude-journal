/* eslint-disable no-undef */

module.exports = 
{
  "development": {
    "username": "root",
    "password": process.env.PASSWORD,
    "database": "gratitude_journal_db",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test", 
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "use_env_variable":"JAWSDB_URL",
    "dialect": "mysql"
  }
}
