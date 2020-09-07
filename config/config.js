/* eslint-disable no-undef */

module.exports = 
{
  "development": { 
    "username": "root",
    "password": process.env.PASSWORD,
    "database": "gratitude_journal_db",
    "host": "localhost",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": "OscarChloeLeo1!",
    "database": "database_test", 
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "use_env_variable":"JAWSDB_URL",
    "dialect": "mysql"
  }
}
