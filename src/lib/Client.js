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

  findByPage = async (page = 1) => {
    try {
      const url = this.urlApi + `/users?page=${page}&` + this.delayApi;
      const resp = await this.fetchJSON(url);

      return {
        page: resp.page,
        per_page: resp.per_page,
        total: resp.total,
        total_pages: resp.total_pages,
        data: resp.data,
      }
    } catch (err) {
      throw err;
    }
  }

  findById = async (id) => {
    try {
      const url = this.urlApi + `/users/${id}?` + this.delayApi;
      const resp = await this.fetchJSON(url);

      return {
        id: resp.data.id,
        first_name: resp.data.first_name,
        last_name: resp.data.last_name,
        avatar: resp.data.avatar,
      }
    } catch (err) {
      throw err;
    }
  }

  update = async (user) => {
    try {
      const url = this.urlApi + `/users/${user.id}?` + this.delayApi;
      await this.fetchJSON(
        url,
        'PUT',
        JSON.stringify({
          first_name: user.first_name,
          last_name: user.last_name,
        })
      );
    } catch (err) {
      throw err;
    }
  }

  deleteById = async (id) => {
    try {
      const url = this.urlApi + `/users/${id}?` + this.delayApi;
      await this.fetchJSON(url);
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
        throw new Error(respBody.error + ' (status code: ' + response.status + ')');
      }

      return await response.json();
    } catch (err) {
      throw err;
    }
  }
}

export const client = new Client();
