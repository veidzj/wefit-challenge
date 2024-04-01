import { type Decorator, type Controller, type HttpResponse } from '@/presentation/protocols'

export class LogErrorDecorator implements Decorator {
  constructor(private readonly controller: Controller) {}

  public async handle(request: object): Promise<HttpResponse> {
    const httpResponse = await this.controller.handle(request)
    return httpResponse
  }
}
