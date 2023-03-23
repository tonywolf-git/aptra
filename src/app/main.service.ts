import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor() { }

  credencialInfo = {
    laFoto: "",
    elNumEmpleado: 69,
    laDependencia: "",
    elPuesto: "",
    elNombre: "",
    elCURP: ""
  };

  url_GET_recursos_humanos = "https://sitam.tamaulipas.gob.mx/api/obtenEmpleadoCURP/SASG910725HTSRRN02";

  async func_get(url: string) {
    let _res: any;
    await fetch(url).then(function(response) {
      return response.json();
    }).then(data => {
      // console.log(data.foto);
      _res = data;

      this.credencialInfo.laFoto = _res.foto;
      this.credencialInfo.elNumEmpleado = _res.res.datDatosGenerales.DatosGenerales[0].NumeroEmpleado;
      this.credencialInfo.laDependencia = _res.res.datDatosGenerales.DatosGenerales[0].Dependencia;
      this.credencialInfo.elPuesto = _res.res.datDatosGenerales.DatosGenerales[0].puesto;
      this.credencialInfo.elNombre = _res.res.datDatosGenerales.DatosGenerales[0].Nombres + ' ' + _res.res.datDatosGenerales.DatosGenerales[0].ApellidoPaterno + ' ' + _res.res.datDatosGenerales.DatosGenerales[0].ApellidoMaterno;
      this.credencialInfo.elCURP = _res.res.datDatosGenerales.DatosGenerales[0].curp;
    }).catch(function(err) {
      console.log('Fetch Error :-S', err);
    });
    console.log(_res);
    return _res;
  }
}
