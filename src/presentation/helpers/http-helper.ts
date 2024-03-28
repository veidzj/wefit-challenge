import { type HttpResponse } from '@/presentation/protocols'
import { InternalServerError } from '@/presentation/errors'

export class HttpHelper {
  public static badRequest(data: object): HttpResponse {
    return {
      statusCode: 400,
      body: data
    }
  }

  public static conflict(data: object): HttpResponse {
    return {
      statusCode: 409,
      body: data
    }
  }

  public static serverError(error: Error): HttpResponse {
    return {
      statusCode: 500,
      body: new InternalServerError(error.stack!)
    }
  }
}
