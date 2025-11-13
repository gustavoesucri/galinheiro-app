import { api, resolveApiResponse } from './api'
import { createResourceApi } from './resourceFactory'

export const galinhasApi = createResourceApi('galinhas')
export const galpoesApi = createResourceApi('galpoes')
export const ninhosApi = createResourceApi('ninhos')
export const ovosApi = createResourceApi('ovos')
export const medicoesAmbienteApi = createResourceApi('medicoes-ambiente')

export const dashboardApi = {
  getOverview: () => resolveApiResponse(api.get('dashboard')),
}

export const apiResources = {
  galinhas: galinhasApi,
  galpoes: galpoesApi,
  ninhos: ninhosApi,
  ovos: ovosApi,
  medicoesAmbiente: medicoesAmbienteApi,
  dashboard: dashboardApi,
}
