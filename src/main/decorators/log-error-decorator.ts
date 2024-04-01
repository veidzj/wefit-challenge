import { type Decorator, type Controller, type HttpResponse } from '@/presentation/protocols'
import { type LogErrorRepository } from '@/application/protocols'

export class LogErrorDecorator implements Decorator {
  constructor(
    private readonly controller: Controller,
    private readonly logErrorRepository: LogErrorRepository
  ) {}

  public async handle(request: object): Promise<HttpResponse> {
    const httpResponse = await this.controller.handle(request)
    if (httpResponse.statusCode === 500) {
      await this.logErrorRepository.log(String(httpResponse.body.stack))
    }
    return httpResponse
  }
}
