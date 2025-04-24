export const API_ROOT = (import.meta.env.VITE_API_ROUTE as string) ?? '/api/v1'

export function rest<T>(url: string, options: RequestInit): Promise<T> {
  return fetch(url, options).then((res) => res.json())
}

export function api<T>(method: string, url: string, body: object): Promise<T> {
  const options: RequestInit = {
    method,
    headers: { 'Content-Type': 'application/json' },
    ...(method !== 'get' && body ? { body: JSON.stringify(body) } : {}),
  }

  console.log(`Calling ${method} ${API_ROOT}${url}...`)
  if (body) {
    console.log('with body:', body)
  }
  
  return rest<T>(`${API_ROOT}${url}`, options)
}
