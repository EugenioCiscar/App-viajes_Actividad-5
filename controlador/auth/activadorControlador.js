const controladorbase = require('../controlador');
const usuariomodelo = require('../../Models/userModel');

class controladorActivacion extends controladorbase {
    constructor(res,req,next) {
        super(res,req,next)
    }
    async activarUsuario() {
        var hash = this.req.params.hash;
        var modelo = new usuariomodelo();
        /*Buscamos el usuario con ese hash*/
        try {
            let resultado = await modelo.obtenerByHash(hash);
            //Resultado nos proporciona el id del cliente.
            //Ahora intentamos activar el usuario.
            try {
                console.log(resultado[0].id)
                let respuesta = await modelo.activarUsuario(resultado[0].id);
                if (respuesta.changedRows >0){
                    this.res.render('activate');
                }else{
                    this.res.render('activate',{error:"El hash no existe"})
                }
                /*Borramos el hash del usuario y redirijimos al login*/
                let answer = await modelo.borrarHash(resultado[0].id);
                this.res.send('USUARIO ACTIVADO');
            } catch (e) {
                console.log('Error al activar el usuario porque: -> ' + respuesta);
                this.res.render('activate',{error: error});
            }
            //Funciona...
        } catch (e) {
            console.log('Error en la consulta por ->' + e);
        }
    }
}

module.exports = controladorActivacion;