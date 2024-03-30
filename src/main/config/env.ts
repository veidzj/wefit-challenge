export const env = {
  port: process.env.PORT ?? 5050,
  mySQLDbHost: process.env.MYSQLDB_HOST ?? 'localhost',
  mySQLDbPassword: process.env.MYSQLDB_PASSWORD ?? 'root',
  mySQLDbName: process.env.MYSQLDB_DATABASE ?? 'test_db'
}
