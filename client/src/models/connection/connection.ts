export const API_ROOT = (import.meta.env.VITE_API_ROUTE as string) ?? '/api/v1'

export function rest<T>(method: string, url: string): Promise<T> {
  return fetch(url, { method: method }).then((x) => x.json())
}

export function api<T>(method: string, url: string): Promise<T> {
  console.log(`Calling ${method} ${API_ROOT}${url}...`)
  return rest<T>(method, `${API_ROOT}${url}`)
}
