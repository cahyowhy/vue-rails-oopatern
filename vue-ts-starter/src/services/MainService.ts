import MethodHttp from './MethodHttp';

export default class MainService {
  api: string = '';

  // method: string, api: string, body: any, auth: string, param: any
  constructor(api: string) {
    this.api = api;
  }

  service(method: string, param: any = null, body: any = null, auth: string = ''): any {
    const contentType: any = {
      'Content-Type': 'application/json'
    };
    const headers: any = auth.length !== 0 ? Object.assign(contentType, {
      Authorization: auth
    }) : contentType;
    const data: any = JSON.stringify(body);
    const context: any = this;
    let url: string = this.api;


    if (param !== null) {
      if (typeof param === 'object') {
        let index: number = 0;
        let objLength: number = Object.keys(param).length;
        let queryParam: string = '?';
        for (let key in param) {
          index = index + 1;
          queryParam = index === objLength ? queryParam + `${key}=${param[key]}` :
            queryParam + `${key}=${param[key]}&`;
        }

        url = `${url}${queryParam}`;
        console.log(queryParam);
      } else {
        url = `${url}/${param}`;
      }
    }

    return require('axios')({
      method,
      url,
      headers,
      data
    }).then((response) => {
      return response;
    }).catch((err) => {
      if (method === MethodHttp.POST || method === MethodHttp.PUT) {
        alert('gagal menyimpan / mengupdate data');
      }

      console.log(err);
    });
  }
}
