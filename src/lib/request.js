import regeneratorRuntime from 'regenerator-runtime';

export const fetchJSON = async (url, method = 'GET', body = '') => {
  try {
    let response;
    const header = new Headers();

    if (body.length > 0) {
      header.append('Accept', 'application/json');
      header.append('Content-Type', 'application/json');
      header.append('Content-length', body.length.toString());

      response = await fetch(url, {
        method: method,
        headers: header,
        body: body,
      });
    } else {
      response = await fetch(url, { method: method, headers: header });
    }

    if (!response.ok) {
      const respBody = await response.json();
      throw new Error(
        respBody.error + ' (status code: ' + response.status + ')'
      );
    }

    return await response.json();
  } catch (err) {
    throw err;
  }
};
