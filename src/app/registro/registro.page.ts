import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AlertController, IonModal, ModalController } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import Swiper from 'swiper';
import { MainService } from '../main.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})

export class RegistroPage implements OnInit {
  @ViewChild(IonModal) modal!: IonModal;
  @ViewChild('swiper')
  theSwiper: ElementRef | undefined;
  
  step_registro = 0;
  step_name = 'Siguiente'
  swiperCtrl: any;

  passType = 'password';
  passTypeRepeat = 'password'

  opcion_codigo = 'c';

  registroDatos = {
    correo: '',
    correo_seudo: '',
    correo_select: '',
    pass: '',
    passConfirma: '',
    tipo_gobierno: 0,
    numEmpleado: '',
    rfc: '',
    curp: '',
    celular: '',
    idUser: 0,
    codigoValidacion: '',
  };

  elCodigo = {
    a: '',
    b: '',
    c: '',
    d: '',
    e: '',
    f: '',
  }

  elCodigoNew = '';
  
  constructor(public modalCtrl: ModalController,
    public mainService: MainService,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController) {}

  ngOnInit() {}

  ionViewDidEnter() {
    // console.log('yeah');
    this.swiperCtrl = this.theSwiper?.nativeElement.swiper;
    // console.log(this.swiperCtrl);
  }

  moveFocus(event: any, nextElement: any, previousElement: any) {
    // console.log(event.keyCode);
    if (event.keyCode === 8 && previousElement) {
      previousElement.setFocus();
    } else if (event.keyCode >= 48 && event.keyCode <= 57) {
      if (nextElement) {
        nextElement.setFocus();
      }
    } else if (event.keyCode >= 96 && event.keyCode <= 105) {
      if (nextElement) {
        nextElement.setFocus();
      }
    } else {
      event.path[0].value = '';
    }
  }

  func_goBack() {
    this.modalCtrl.dismiss();
  }

  func_doRegistro() {
    // console.log(this.step_registro);
    switch (this.step_registro) {
      case 0:
        // console.log('CORREO | CONTRASEÑA | CHECAR CONTRASEÑA');
        this.checkPasoUno();
        break;
        
      case 1:
        // console.log('CONFIRMAR QUE VAMOS A SOLICITAR MAS COSAS');
        // this.step_registro+=1;
        // this.checkTitle();
        // this.swiperCtrl.slideNext();
                this.checkPasoDosWasa();
        break;

      case 2:
        // console.log('NUM EMPLEADO | RFC | CURP');
        // this.checkPasoDos();
                this.checkPasoTres();
        // this.checkPasoDosWasa();
        break;

      case 3:
        // console.log('YA TE LO ENVIAMOS, PONLO');
        // this.checkPasoTres();
        break;

      default:
        break;
      // case 3:
      //   console.log('TE VAMOS A ENVIAR EL MENSAJITO DEL WASA');
      //   this.step_registro += 1;
      //   this.step_name = "Finalizar";
      //   this.swiperCtrl.slideNext();
      //   break;
    }
  }

  checkPasoUno() {
    let _telefonoValido = false;
    let _correoValido = false;
    let _contraseñasIguales = false;

    if (this.registroDatos['celular'].length == 10 && this.registroDatos['celular'].match(/^[0-9]+$/) != null ) {
      _telefonoValido = true;
    } else {
      _telefonoValido = false;
    }

    if (this.registroDatos.pass == this.registroDatos.passConfirma && this.registroDatos.pass.length > 0) {
      _contraseñasIguales = true;
    } else {
      _contraseñasIguales = false;
    }
    
    var re = /^\S+@\S+\.\S+$/;
    if (re.test(this.registroDatos.correo) == true) {
      _correoValido = true;
    } else {
      _correoValido = false;
    }

    if (_telefonoValido == true && _contraseñasIguales == true) {
        this.step_registro += 1;
        this.checkTitle();
        // this.swiperCtrl.slideNext();
    } else {
      this.mainService.alertThis('Aviso Importante', 'Por favor, verifica los datos que ingresaste.');
    }
  }

  async checkPasoDos() {
    this.opcion_codigo = 'c';
    let _validNumEmpleado = false;
    let _validRFC= false;
    let _validCURP = false;

    if (this.registroDatos.numEmpleado.length == 5) {
      _validNumEmpleado = true;
    }

    if (this.registroDatos.rfc.length == 13) {
      _validRFC = true;
    }

    if (this.registroDatos.curp.length == 18) {
      _validCURP = true;
    }

    // console.log(this.registroDatos.numEmpleado.length, this.registroDatos.rfc.length, this.registroDatos.curp.length);

    if (_validRFC == true && _validCURP == true) {
    // if (_validNumEmpleado == true && _validRFC == true && _validCURP == true) {
      let _response = await this.mainService.func_doRegistro(this.registroDatos);
      // console.log(_response);

      switch (_response) {
        case 'EMAILEXISTENTE':
          this.step_registro = 0;
          this.checkTitle();
          // this.swiperCtrl.slideTo(0);
          this.mainService.alertThis('Aviso Importante', 'El correo electrónico ya está registrado.');
          break;
          
        case 'DATOSREPETIDOS':
          this.mainService.alertThis('Aviso Importante', 'Los datos ingresados ya se encuentran registrados.');
          break;

        case 'MALOSDATOS':
          this.mainService.alertThis('Aviso Importante', 'Los datos ingresados no coinciden con tu registro en Recursos Humanos.');
          break;

        case 'ISCOP':
          // this.mainService.alertThis('Error', 'MALDITO.');
          this.mainService.alertThis('Aviso Importante', 'Por motivos de seguridad, tu registro no puede ser completado.');
          break;

        case 'DONALUDI':
          // this.mainService.alertThis('Error', 'MALDITO.');
          this.mainService.alertThis('Aviso Importante', 'Tu dependencia todavia no está en el calendario de registro.');
          break;
          
        case 'error':
          this.mainService.alertThis('Error', 'Ha ocurrido un error, por favor intente más tarde.');
          break;
      
        default:
          break;
      }

      if (typeof _response == 'number' ) {
        this.registroDatos.idUser = _response
        this.step_registro += 1;
        this.checkTitle();
        // this.swiperCtrl.slideNext();
      }
    } else {
      this.mainService.alertThis('Aviso Importante', 'Por favor, verifica los datos que ingresaste.');
    }
  }

  async checkPasoDosWasa() {
    this.opcion_codigo = 'w';
    let _validNumEmpleado = false;
    let _validRFC= false;
    let _validCURP = false;

    const alert = await this.alertCtrl.create({
      header: 'Enviar Código',
      message: 'Indica el número de teléfono al que se enviará el código de verificación.',
      inputs: [
        {
          type: 'tel',
          placeholder: '834 0000000',
          min: 10,
          attributes: {
            maxlength: 10,
            minlength: 10
          }
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
          },
        },
        {
          text: 'Aceptar',
          role: 'confirm',
          handler: async (tel) => {
            this.registroDatos.celular = tel[0];
            if (this.registroDatos.numEmpleado.length == 5) {
              _validNumEmpleado = true;
            }
          
            if (this.registroDatos.rfc.length == 13) {
              _validRFC = true;
            }
          
            if (this.registroDatos.curp.length == 18) {
              _validCURP = true;
            }
          
            if (_validRFC == true && _validCURP == true) {
              let _response = await this.mainService.func_doRegistroWasa(this.registroDatos, tel);
              // console.log(_response);
            
              switch (_response) {
                case 'EMAILEXISTENTE':
                  this.step_registro = 0;
                  this.checkTitle();
                  // this.swiperCtrl.slideTo(0);
                  this.mainService.alertThis('Aviso Importante', 'El correo electrónico ya está registrado.');
                  
                  break;

                case 'DATOSREPETIDOS':
                  this.mainService.alertThis('Aviso Importante', 'Los datos ingresados ya se encuentran registrados.');
                  break;
              
                case 'MALOSDATOS':
                  this.mainService.alertThis('Aviso Importante', 'Los datos ingresados no coinciden con tu registro en Recursos Humanos.');
                  break;

                case 'ISCOP':
                  this.mainService.alertThis('Aviso Importante', 'Por motivos de seguridad, tu registro no puede ser completado.');
                  break;

                case 'DONALUDI':
                  this.mainService.alertThis('Aviso Importante', 'Tu dependencia todavía no está en el calendario de registro.');
                  break;
              
                case 'error':
                  // console.log('CAE AQUI')
                  this.mainService.alertThis('Error', 'Ha ocurrido un error, por favor intente más tarde.');
                  break;
              
                default:
                  break;
              }
            
              if (typeof _response == 'number' ) {
                this.registroDatos.idUser = _response
                this.step_registro += 1;
                this.checkTitle();
                // this.swiperCtrl.slideNext();
              }
            } else {
              this.mainService.alertThis('Aviso Importante', 'Por favor, verifica los datos que ingresaste.');
            }
          },
        }
      ]
    });

    // await alert.present();

    // this.registroDatos.celular = tel[0];

    // console.log('BEFORE CHECK', this.registroDatos)
    if (this.registroDatos.numEmpleado.length == 5) {
      _validNumEmpleado = true;
    }
  
    if (this.registroDatos.rfc.length == 13) {
      _validRFC = true;
    }
  
    if (this.registroDatos.curp.length == 18) {
      _validCURP = true;
    }
  
    if (_validRFC == true && _validCURP == true) {
      let _response = await this.mainService.func_doRegistroWasa(this.registroDatos, this.registroDatos['celular']);
      // console.log(_response);
    
      switch (_response) {
        case 'EMAILEXISTENTE':
          this.step_registro = 0;
          this.checkTitle();
          // this.swiperCtrl.slideTo(0);
          this.mainService.alertThis('Aviso Importante', 'El correo electrónico ya está registrado.');
          
          break;

        case 'DATOSREPETIDOS':
          this.mainService.alertThis('Aviso Importante', 'Los datos ingresados ya se encuentran registrados.');
          break;
      
        case 'MALOSDATOS':
          this.mainService.alertThis('Aviso Importante', 'Los datos ingresados no coinciden con tu registro en Recursos Humanos.');
          break;

        case 'ISCOP':
          this.mainService.alertThis('Aviso Importante', 'Por motivos de seguridad, tu registro no puede ser completado.');
          break;

        case 'DONALUDI':
          this.mainService.alertThis('Aviso Importante', 'Tu dependencia todavía no está en el calendario de registro.');
          break;
      
        case 'error':
          // console.log('CAE AQUI')
          this.mainService.alertThis('Error', 'Ha ocurrido un error, por favor intente más tarde.');
          break;
      
        default:
          break;
      }
    
      if (typeof _response == 'number' ) {
        this.registroDatos.idUser = _response
        this.step_registro += 1;
        this.checkTitle();
        // this.swiperCtrl.slideNext();
      }
    } else {
      this.mainService.alertThis('Aviso Importante', 'Por favor, verifica los datos que ingresaste.');
    }
  }

  async checkPasoTres() {
    // let _elCodigo = this.elCodigo.a + this.elCodigo.b + this.elCodigo.c + this.elCodigo.d + this.elCodigo.e + this.elCodigo.f;
    let _elCodigo = this.elCodigoNew;
    let _response = await this.mainService.func_validaCodigo(this.registroDatos.idUser, _elCodigo);

    if (_response == 1 || _response == '1') {
      this.modalCtrl.dismiss();
        const toast = await this.toastCtrl.create({
          message: '¡Se ha validado el código correctamente, ya puedes iniciar sesión!',
          duration: 5000,
          position: 'top'
        });
    
        await toast.present();
    } else {
      if (_response == 0 || _response == "0") {
        // NO VALIDADO
        this.mainService.alertThis('Error', 'El código proporcionado no es válido');
      } else {
        //ERROR GENERICO
        // alert('AL SERVIDOR LE DIO LA AMNSIEDA');
        this.mainService.alertThis('Error', 'Ha ocurrido un error, por favor intente más tarde.');
      }
    }
  }

  func_reenviarCodigo() {
    this.mainService.func_reenviarCodigo(this.registroDatos.idUser);
  }

  func_reenviarCodigoW() {
    this.mainService.func_reenviarCodigoW(this.registroDatos.idUser);
  }

  checkTitle() {
    switch (this.step_registro) {
      case 0:
        this.step_name = 'Siguiente';
        break;

      case 1:
        // this.step_name = 'Siguiente';
                this.step_name = "Enviar código";
        break;

      case 2:
        // this.step_name = "Enviar código";
                this.step_name = "Verificar";
        break;

      case 3:
        // this.step_name = "Finalizar";
        break;
    
      default:
        break;
    }
  }

  async usuarioChanged(event: any) {
    if (this.registroDatos.correo_seudo.indexOf("@") > -1) {
      // console.log('hola?', this.registroDatos.correo_seudo)

      this.registroDatos.correo_seudo = this.registroDatos.correo_seudo.substring(0, this.registroDatos.correo_seudo.indexOf("@"));
      const alert = await this.alertCtrl.create({
        header: 'Aviso',
        message: 'No debes introducir el dominio ("@tamaulipas.gob.mx", por ejemplo) en este campo, utiliza el siguiente campo de selección.',
        buttons: ['Aceptar'],
      });
      await alert.present();
    }
  }

  func_prevSlide() {
    // console.log(this.step_registro);
    if (this.step_registro == 0) {
      this.func_goBack();
    } else {
      // this.swiperCtrl.slidePrev();
      this.step_registro = this.step_registro-1;
      this.checkTitle();
    }
  }

  async select_correo_otro() {
    if (this.registroDatos.correo_select == 'otro') {
      // this.registroDatos.correo_select = '@yahoo.com'
      const alert = await this.alertCtrl.create({
        header: 'Aviso',
        message: 'Escribe el dominio de correo que deseas agregar.<br><br>Asegurate de no agregar un seudónimo o múltiples "@" en el campo.',
        inputs: [
          {
            placeholder: '@ejemplo.com',
            type: 'email',
            attributes: {
              required: 'true'
            },
            value: "@"
          }
        ],
        buttons: [
          {
            text: 'Aceptar',
            handler: async (input) => {
              let _elInput = input[0];
              _elInput = _elInput.slice(_elInput.indexOf("@"));
              this.registroDatos.correo_select = _elInput;

              const toast = await this.toastCtrl.create({
                message: 'El correo electrónico cambió a: ' + this.registroDatos.correo_seudo + this.registroDatos.correo_select,
                duration: 5000,
                position: 'top'
              });
      
              await toast.present();
            }
          }
        ],
        
      });
      await alert.present();
    }
  }

  // MODAL STUFF INI
  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
    }
  }
  // MODAL STUFF END

  keyPress(event:Event, input: any) {
    // this.elKeyUp = event.key;
    // event.preventDefault();
    if (input['key'] == 'Enter') {
      event.stopPropagation();
      this.func_doRegistro();
    }
  }

  passwordType(type: any) {
    if (type == 'normal') {
      if (this.passType == "password") {
        this.passType = "text";
        this.passTypeRepeat = "text";
      } else {
        this.passType = "password";
        this.passTypeRepeat = "password";
      }
    } else {
      if (this.passTypeRepeat == "password") {
        this.passTypeRepeat = "text";
      } else {
        this.passTypeRepeat = "password";
      }
    }
  }

  func_maskTelefono(number:any) {
    return '(834) 175 0259'
  }

  // CODEXPERIMENTAL INI //
  experimento_forceSlide() {
    this.step_registro += 1;
    // this.swiperCtrl.slideNext();
  }
  // CODEXPERIMENTAL END //
}