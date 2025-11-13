import { api, resolveApiResponse } from './api'

const normalizePath = (path) => path.replace(/^\/+/, '').replace(/\/+$/, '')

export const createResourceApi = (resourcePath) => {
  if (!resourcePath) {
    throw new Error('resourcePath é obrigatório para criar um cliente de API')
  }

  const basePath = normalizePath(resourcePath)

  return {
    list: (params) => resolveApiResponse(api.get(basePath, { params })),
    getById: (id, params) => resolveApiResponse(api.get(`${basePath}/${id}`, { params })),
    create: (payload) => resolveApiResponse(api.post(basePath, payload)),
    update: (id, payload) => resolveApiResponse(api.patch(`${basePath}/${id}`, payload)),
    remove: (id) => resolveApiResponse(api.delete(`${basePath}/${id}`)),
  }
}
