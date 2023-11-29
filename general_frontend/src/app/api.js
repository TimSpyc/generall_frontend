export const fetcher = async url => {
  const res = await fetch(url)
 
  if (!res.ok) {
    const error = new Error('An error occurred while fetching the data.')
    error.info = await res.json()
    error.status = res.status
    throw error
  }
 
  return res.json()
}

export const swrConfig = {
  onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
    if (error.status === 403) return
    
    if (key === '/api/user') return
    
    if (retryCount >= 10) return
 
    setTimeout(() => revalidate({ retryCount }), 5000)
  }
}