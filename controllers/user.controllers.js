const response=require('express')
const bcryptjs=require('bcryptjs')

const Usuario=require('../models/user')

const usuariosGet=async(req, res=response)=> {

    const {limite=5,desde=0}=req.query


    const [total,usuarios]=await Promise.all([//promise.all es para ejecutar acciones de manera simultanea
        Usuario.countDocuments({estado:true}),
        Usuario.find({estado:true})
            .skip(Number(desde))
            .limit(Number(limite))

    ]);
    
    res.json({total,usuarios})
   
}

const usuariosPost=async(req,res=response)=>{


    const {nombre,correo,contrasena,rol}=req.body
    const usuario=new Usuario({nombre,correo,contrasena,rol});//es una nueva instancia de mi usuario 

    //en criptar la contraseña

    const salt=bcryptjs.genSaltSync();
    usuario.contrasena=bcryptjs.hashSync(contrasena,salt)

    //guardar en base de datos

    await usuario.save();

    res.json({
        usuario
    })
}

const usuariosPut=async(req,res=response)=>{

    const {id}=req.params
    const {_id,contrasena,google, correo,...resto}=req.body//son los datos que no quiero actualizar

    //validra contra base de datos

    if (contrasena){
        const salt=bcryptjs.genSaltSync();
        resto.contrasena=bcryptjs.hashSync(contrasena,salt)    
    }
    
    const userDB=await Usuario.findByIdAndUpdate(id,resto)

    res.json(userDB)
    
}

const usuariosDelete=async(req,res=response)=>{

    const {id}=req.params;
    const usuario=await Usuario.findByIdAndUpdate(id,{estado:false})
    res.json(usuario)
}

module.exports={
    usuariosPost,
    usuariosGet,
    usuariosPut,
    usuariosDelete
}