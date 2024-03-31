import { type Express } from 'express'
import { type JsonObject, serve, setup } from 'swagger-ui-express'
import swaggerFileV1 from '@/main/docs/swagger-v1.json'

export class Swagger {
  public static readonly setup = (app: Express): void => {
    app.use('/api/v1/docs', serve, setup(swaggerFileV1 as JsonObject))
  }
}
