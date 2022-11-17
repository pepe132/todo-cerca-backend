const bcryptjs = require("bcryptjs");
const { response } = require("express");
const { generarJWT } = require("../helpers/generarJWT");
const Usuario=require('../models/user')

const login=async(req,res=response)=>{

    const {correo,contrasena}=req.body;

    try {

        //verifica si el correo existe 
        const usuario=await Usuario.findOne({correo})
        if (!usuario){
            return res.status(400).json({
                msg:'Correo inexistente'
            })
            
        }

        //si el usuadio esta activo
        if (!usuario.estado) {
            return res.status(400).json({
                msg:'Estado inactivo'
            })
            
        }

        //verificar la contraseña

        const validPassword=bcryptjs.compareSync(contrasena,usuario.contrasena)
        if (!validPassword) {
            return res.status(400).json({
                msg:'Contraseña incorrecta'
            })
            
        }

        //generar jwt

        const token=await generarJWT(usuario.id)

        res.json({
            usuario,
            token
            
        })

        
    } catch (error) {
        console.log(error);
        return res.status.json({
            msg:'Fallo interno del sistema '
        })
        
    }    
}

const revalidarToken = async (req, res = response ) => {

    const { _id, nombre,correo,rol,google } = req.usuario;

    // Generar JWT
    const token = await generarJWT( _id, nombre );

    res.json({
        ok: true,
        _id,
        nombre,
        correo,
        token,
        rol,
        google
    })
}

module.exports={
    login,
    revalidarToken
}