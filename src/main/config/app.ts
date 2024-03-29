import express, { type Express } from 'express'

import { Middlewares } from '@/main/config'

export class App {
  public static readonly setup = async(): Promise<Express> => {
    const app = express()
    Middlewares.setup(app)
    return app
  }
}
