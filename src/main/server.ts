import 'module-alias/register'

import { env } from '@/main/config'
import { MySQLHelper } from '@/infra/db/mysql/helpers'

const mySQLHelper = MySQLHelper.getInstance()

const config = {
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'test_db'
}

mySQLHelper.connect(config)
  .then(async() => {
    const { App } = await import('./config/app')
    const app = await App.setup()
    app.listen(env.port, () => { console.log(`Server running at http://localhost:${env.port}`) })
  })
  .catch(console.error)
