// Import
import { API_ROOT } from '../constants/urls'

// Request method
async function req(method, path, data) {
  // Set endpoint
  const endpoint = `${API_ROOT}${path}`

  // Default request object
  const requestBody = {
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    mode: 'cors'
  }

  // Set method
  requestBody.method = method

  // Set bearer
  const bearer = window.sessionStorage.authToken || null
  if (bearer) requestBody.headers.Authorization = `Bearer ${bearer}`

  // Set data
  if (data) requestBody.body = JSON.stringify(data)

  // Do request
  const response = await fetch(endpoint, requestBody)
  const responseBody = await response.json()

  return {
    error: response.ok ? null : response.status,
    body: responseBody
  }
}

// Wrappers
function post(path, data = null) {
  return req('POST', path, data)
}

function put(path, data = null) {
  return req('PUT', path, data)
}

function patch(path, data = null) {
  return req('PATCH', path, data)
}

function get(path, data = null) {
  return req('GET', path, data)
}

function del(path, data = null) {
  return req('DELETE', path, data)
}

// Export
export default {
  post,
  put,
  patch,
  get,
  del
}
