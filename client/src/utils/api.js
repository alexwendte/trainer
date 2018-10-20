import axios from 'axios'

let api
let isLoggedIn
const envBaseURL = process.env.REACT_APP_API_URL

const getData = res => res.data

const requests = {
  delete: url => api.delete(url).then(getData),
  get: url => api.get(url).then(getData),
  put: (url, body) => api.put(url, body).then(getData),
  post: (url, body) => api.post(url, body).then(getData),
}

const auth = {
  me() {
    if (!isLoggedIn) return Promise.resolve({ user: null })
    return requests.get('/auth/me').catch(err => {
      if (err.response.status === 401) {
        logout()
        return { user: null }
      }
      return Promise.reject(err)
    })
  },
  logout: () => {
    logout()
    return Promise.resolve({ user: null })
  },
  login: form => requests.post('/auth/login, form').then(data => {
      login({ token: data.user.token })
      return data
    }),
  register: form => requests.post('/auth/register', form).then(data => {
      login({ token: data.user.token })
      return data
    }),
}

const users = {
  delete: id => requests.delete(`/users/${id}`),
  get: id => requests.get(id ? `/users/${id}` : '/users'),
  update: (id, updates) => requests.put(`/users/${id}`, updates),
  create: user => requests.post('/users', user),
}

const transactions = {
  delete: id => requests.delete(`/transactions/${id}`),
  get: id => requests.get(id ? `/transactions/${id}` : '/transactions'),
  update: (id, updates) => requests.put(`/transactions/${id}`, updates),
  create: post => requests.post('/transactions', post),
}

// In the server api can use req.user.id to get the categories associated with a user
const categories = {
  delete: id => requests.delete(`/categories/${id}`),
  get: id => requests.get(id ? `/categories/${id}` : '/categories'),
  update: (id, updates) => requests.put(`/categories/${id}`, updates),
  create: post => requests.post('/categories', post),
}

function logout() {
  window.localStorage.removeItem('token')
  init({ token: null })
}
function login({ token }) {
  window.localStorage.setItem('token')
  init({ token })
}

function init({
  token = window.localStorage.getItem('token'),
  baseURL = (api && api.defaults.baseURL) || envBaseURL,
  axiosOptions = { headers: {} },
} = {}) {
  isLoggedIn = Boolean(token)
  api = axios.create({
    baseURL,
    ...axiosOptions,
    headers: {
      authorization: token ? `Bearer ${token}` : undefined,
      ...axiosOptions.headers,
    },
  })
}

export { init, users, transactions, categories, auth }
