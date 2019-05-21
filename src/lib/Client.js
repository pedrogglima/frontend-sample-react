import regeneratorRuntime from 'regenerator-runtime';

const LOCAL_STORAGE_KEY = 'frontend-fake-auth';

class Client {
  constructor() {
    this.useLocalStorage = (typeof localStorage !== 'undefined');
    this.urlApi = 'https://reqres.in/api';
    this.delayApi = 'delay=3';

    if (this.useLocalStorage) {
      this.token = localStorage.getItem(LOCAL_STORAGE_KEY);
    } else {
      console.log('error Local Storage');
    }
  }

  isLoggedIn = () => {
    return !!this.token;
  }

  setToken = (token) => {
    this.token = token;

    if (this.useLocalStorage) {
      localStorage.setItem(LOCAL_STORAGE_KEY, token);
    }
  }

  removeToken = () => {
    this.token = null;

    if (this.useLocalStorage) {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    }
  }

  logout = () => {
    this.removeToken();
  }

  login = async (email, password) => {
    try {
      const url = this.urlApi + '/login?' + this.delayApi;

      const resp = await this.fetchJSON(
        url,
        'POST',
        JSON.stringify({
          email: email,
          password: password,
        })
      );
      this.setToken(resp.token);
    } catch (err) {
      throw err;
    }
  }

  findByPage = async (pageNumber = '1') => {
    try {
      const url = this.urlApi + `/users?page=${pageNumber}&` + this.delayApi;
      const resp = await this.fetchJSON(url);

      return {
        userPage: resp.page,
        userPerPage: resp.per_page,
        userTotal: resp.total,
        userTotalPages: resp.total_pages,
        userList: resp.data,
      }
    } catch (err) {
      throw err;
    }
  }

  fetchJSON = async (url, method = 'GET', body = '') => {
    try {
      let response;
      const header = new Headers();

      if (body.length > 0) {
        header.append('Accept', 'application/json');
        header.append('Content-Type', 'application/json');
        header.append('Content-length', body.length.toString());

        response = await fetch(url, { method: method, headers: header, body: body });
      } else {
        response = await fetch(url, { method: method, headers: header });
      }

      if (!response.ok) {
        const respBody = await response.json();
        throw new Error('status: ' + response.status + ', message: ' + respBody.error);
      }

      return await response.json();
    } catch (err) {
      throw err;
    }
  }
}

export const client = new Client();
