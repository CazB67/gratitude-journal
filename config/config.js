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
    "POSTGRES_URL":"postgres://default:bZPrMkvVx87Q@ep-nameless-flower-a71fi9vc-pooler.ap-southeast-2.aws.neon.tech:5432/verceldb?sslmode=require",
    "POSTGRES_PRISMA_URL":"postgres://default:bZPrMkvVx87Q@ep-nameless-flower-a71fi9vc-pooler.ap-southeast-2.aws.neon.tech:5432/verceldb?sslmode=require&pgbouncer=true&connect_timeout=15",
    "POSTGRES_URL_NO_SSL":"postgres://default:bZPrMkvVx87Q@ep-nameless-flower-a71fi9vc-pooler.ap-southeast-2.aws.neon.tech:5432/verceldb",
    "POSTGRES_URL_NON_POOLING":"postgres://default:bZPrMkvVx87Q@ep-nameless-flower-a71fi9vc.ap-southeast-2.aws.neon.tech:5432/verceldb?sslmode=require",
    "POSTGRES_USER":"default",
    "POSTGRES_HOST":"ep-nameless-flower-a71fi9vc-pooler.ap-southeast-2.aws.neon.tech",
    "POSTGRES_PASSWORD":"bZPrMkvVx87Q",
    "POSTGRES_DATABASE":"verceldb"
  }
}
