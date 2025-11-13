import Constants from 'expo-constants'

const FALLBACK_API_BASE_URL = 'http://localhost:3000'
const FALLBACK_TIMEOUT = 10000

const getExpoExtra = () => {
  const extraFromExpoConfig = Constants?.expoConfig?.extra ?? {}
  const extraFromManifest = Constants?.manifest?.extra ?? {}
  const extraFromManifest2 = Constants?.manifest2?.extra ?? {}

  return {
    ...extraFromExpoConfig,
    ...extraFromManifest,
    ...extraFromManifest2,
  }
}

const stripTrailingSlashes = (url) => {
  if (!url) return undefined
  return url.replace(/\/+$/, '')
}

const mergeEnv = () => {
  const extra = getExpoExtra()
  const rawApiUrl = process.env.EXPO_PUBLIC_API_URL ?? extra.apiUrl ?? FALLBACK_API_BASE_URL
  const rawTimeout = process.env.EXPO_PUBLIC_API_TIMEOUT ?? extra.apiTimeout ?? FALLBACK_TIMEOUT

  return {
    apiBaseUrl: stripTrailingSlashes(rawApiUrl) ?? FALLBACK_API_BASE_URL,
    apiTimeout: Number(rawTimeout) || FALLBACK_TIMEOUT,
  }
}

export const env = mergeEnv()
export const getApiUrl = () => env.apiBaseUrl
