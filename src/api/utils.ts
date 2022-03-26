export function request<TResponse>(
  url: string,
  config: RequestInit = {}
): Promise<TResponse> {
  return fetch(url, config)
    .then(response => {
      if (response.ok) {
        return response.json();
      } 

      throw Promise.reject(response.status);
    })
    .then(data => data as TResponse)
}