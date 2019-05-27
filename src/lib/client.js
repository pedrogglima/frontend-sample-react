import regeneratorRuntime from 'regenerator-runtime';
import { fetchJSON } from './request';

const LOCAL_STORAGE_KEY = 'frontend-fake-auth';

class Client {
  constructor() {
    this.useLocalStorage = typeof localStorage !== 'undefined';
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
  };

  setToken = token => {
    this.token = token;

    if (this.useLocalStorage) {
      localStorage.setItem(LOCAL_STORAGE_KEY, token);
    }
  };

  removeToken = () => {
    this.token = null;

    if (this.useLocalStorage) {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    }
  };

  logout = () => {
    this.removeToken();
    try {
      const url = this.urlApi + '/logout?' + this.delayApi;
      fetchJSON(url, 'POST');
    } catch (err) {
      throw err;
    }
  };

  login = async (email, password) => {
    try {
      const url = this.urlApi + '/login?' + this.delayApi;

      const resp = await fetchJSON(
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
  };
}

export const ClientApi = new Client();
