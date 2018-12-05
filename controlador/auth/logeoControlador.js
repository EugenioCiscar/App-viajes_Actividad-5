const controlador = require('../controlador');
const modelousuario = require('../../Models/userModel');
const encriptador = require('../../servicios/encriptamiento');


class loginControlador extends controlador {
    constructor(res, req, next) {
        super(res, req, next)
    }

    index() {
        if (this.req.flash.passfail) {
            this.res.render('login', {error: this.req.flash.passfail});
            this.req.flash.error = null;
        }
        if (this.req.flash.error) {
            return this.res.render('login', {error: this.req.flash.error});
        }
        if (this.req.flash.noactivo) {
            this.res.render('login', {noactivo: this.req.flash.noactivo});
            this.req.flash.noactivo = null;
        }
        this.res.render('login');
    }

    async comprobacionLogeo() {
        let Iemail = this.req.body.emaillogin;
        let Ipass = this.req.body.passwordlogin;
        /*Encriptamos la contrase�a introducida*/
        var encriptada = encriptador.encriptarPass(Ipass);
        /*Hacemos peticion a la base de datos para recibir el usuario con ese email y comparar las contrase�as*/
        try {
            let modelo = new modelousuario();
            let respuesta = await modelo.obtenerByEmail(this.req.body.emaillogin);
            console.log(respuesta[0].admin);
            if (respuesta.length == 0) {
                this.req.flash.error = "El usuario no existe";
                this.res.redirect('iniciarsesion');
            }
            let passwordres = respuesta[0].password;
            /*Comprobamos que el usuario este activado*/
            var isActive = false;


            if (respuesta[0].active === 1) {
                console.log('Estado del usuario -> ' + respuesta[0].active);
                if (respuesta[0].admin == 1) {
                    this.req.session.username = 'ADMINISTRADOR';
                }
                if (respuesta[0].admin == 0) {
                    this.req.session.username = respuesta[0].usuario;
                }

                //MODIFICAR ESTA PARTE DEL CODIGO!


                if (encriptador.comparePass(Ipass, passwordres)) {
                    console.log('usuario activo');
                    console.log(respuesta[0]);
                    this.res.redirect('/');

                } else {
                    console.log('pass incorrecto');
                    this.req.flash.passfail = 'El password es incorrecto';
                    console.log(this.req.flash.passfail);
                    this.res.redirect('/iniciarsesion');
                }
            } else {
                this.req.flash.noactivo = 'El usuario no se encuentra activado';
                this.res.redirect('/iniciarsesion');
            }

        } catch (e) {
            this.res.send('Fallo de verificacion' + e);
        }
    }


}

module.exports = loginControlador;