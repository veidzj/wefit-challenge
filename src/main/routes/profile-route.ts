import { type Router } from 'express'

import { ExpressRouteAdapter } from '@/main/adapters'
import { AddNaturalPersonControllerFactory, AddLegalPersonControllerFactory } from '@/main/factories/controllers'

export default (router: Router): void => {
  router.post('/v1/profile/natural-person', ExpressRouteAdapter.adapt(AddNaturalPersonControllerFactory.makeAddNaturalPersonController()))
  router.post('/v1/profile/legal-person', ExpressRouteAdapter.adapt(AddLegalPersonControllerFactory.makeAddLegalPersonController()))
}
