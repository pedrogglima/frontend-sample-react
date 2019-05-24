import regeneratorRuntime from 'regenerator-runtime';
import { fetchJSON } from './request';

class User {
  constructor() {
    this.urlApi = 'https://reqres.in/api';
    this.delayApi = 'delay=3';
  }
  findByPage = async (page = 1) => {
    try {
      const url = this.urlApi + `/users?page=${page}&` + this.delayApi;
      const resp = await fetchJSON(url);

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
      const resp = await fetchJSON(url);

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
      await fetchJSON(
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
      await fetchJSON(url);
    } catch (err) {
      throw err;
    }
  }
}

export const UserApi = new User();
