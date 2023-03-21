import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor() { }

  url_GET_recursos_humanos = "https://sitam.tamaulipas.gob.mx/api/obtenEmpleadoCURP/SASG910725HTSRRN02";

  async func_get(url: string) {
    let _res: any;
    await fetch(url).then(function(response) {
      return response.json();
    }).then(function(data) {
      // console.log(data.foto);
      _res = data;
    }).catch(function(err) {
      console.log('Fetch Error :-S', err);
    });
    console.log(_res);
    return _res;
  }
}
