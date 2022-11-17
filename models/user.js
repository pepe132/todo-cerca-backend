const {Schema,model}=require('mongoose')

const UsuarioSchema=Schema({
    nombre:{
        type:String,
        required:true
    },
    correo:{
        type:String,
        required:[true,'El correo es obligatorio'],
        unique:true
    },
    contrasena:{
        type:String,
        required:[true,'La contraseña es obligatoria']
    },
    estado:{
        type:Boolean,
        default:true
    },
    img:{
        type:String,
    },
    rol:{
        type:String,
        required:true,
        enum:['ADMIN_ROLE','USER_ROLE','OWNER_ROLE']
    },
})

UsuarioSchema.methods.toJSON=function () {
    const {__v,contraseña,...usuario}=this.toObject()//estoy sacando la version y el password de la respuesta y tofos lod demas se almacenan

    return usuario
    
}

module.exports=model('Usuario',UsuarioSchema)