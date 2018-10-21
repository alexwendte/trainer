import axios from 'axios';

let api;
let isLoggedIn;
const envBaseURL = process.env.REACT_APP_API_URL;

const getData = res => res.data;

const requests = {
  delete: url => api.delete(url).then(getData),
  get: url => api.get(url).then(getData),
  put: (url, body) => api.put(url, body).then(getData),
  post: (url, body) => api.post(url, body).then(getData),
  patch: (url, body) => api.patch(url, body).then(getData),
};

const auth = {
  me() {
    if (!isLoggedIn) return Promise.resolve({ user: null });
    return requests.get('/users/current_user').catch(err => {
      if (err.response.status === 401) {
        logout();
        return { user: null };
      }
      return Promise.reject(err);
    });
  },
  logout: () => {
    logout();
    requests.get('users/logout');
    return Promise.resolve({ user: null });
  },
  login: form => requests.post('/users/login', form).then(() => {
      login({ token: 'logged in!' });
    }),
  register: form => requests.post('/users/signup', form),
  verify: form => requests.post('/users/login', form),
};

const users = {
  delete: id => requests.delete(`/users/${id}`),
  get: id => requests.get(id ? `/users/profile/${id}` : '/users'),
  update: (id, updates) => requests.patch(`/users/update/${id}`, updates),
  create: user => requests.post('/users', user),
};

const mentors = {
  delete: id => requests.delete(`/mentors/${id}`),
  get: id => requests.get(id ? `/mentors/${id}` : '/mentors'),
  update: (id, updates) => requests.put(`/mentors/${id}`, updates),
  create: mentor => requests.post('/mentors', mentor),
};

// In the server api can use req.user.id to get the categories associated with a user
const categories = {
  delete: id => requests.delete(`/categories/${id}`),
  get: id => requests.get(id ? `/categories/${id}` : '/categories'),
  update: (id, updates) => requests.put(`/categories/${id}`, updates),
  create: post => requests.post('/categories', post),
};

const meetings = {
  delete: id => requests.delete(`/meetings/meeting/${id}`),
  get: () => requests.get(`/meetings/list`),
  getMentorList: () => requests.get(`/meetings/mentorlist`),
  update: (id, updates) => requests.patch(`/meetings/meeting/${id}`, updates),
  create: meeting => requests.post('/meetings/create', meeting),
};

function logout() {
  window.localStorage.removeItem('token');
  init({ token: null });
}
function login({ token }) {
  window.localStorage.setItem('token', token);
  init({ token });
}

function init({
  token = window.localStorage.getItem('token'),
  baseURL = (api && api.defaults.baseURL) || envBaseURL,
  axiosOptions = { headers: {} },
} = {}) {
  isLoggedIn = Boolean(token);
  api = axios.create({
    baseURL,
    ...axiosOptions,
    headers: {
      authorization: token ? `Bearer ${token}` : undefined,
      ...axiosOptions.headers,
    },
  });
}

export { init, users, mentors, categories, auth, meetings };
