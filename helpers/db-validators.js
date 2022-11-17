const Role =require('../models/role');

const Usuario=require('../models/user');

const Comercio=require('../models/commerce');

const esRoleValido=async(rol='')=>{
    const existeRol=await Role.findOne({rol});
    if (!existeRol){
        throw new Error(`El rol ${rol} no está registrado en la base de datos`)
        
    }

}

const existeEmail=async(correo='')=>{
    const miEmail=await Usuario.findOne({correo})
    if (miEmail) {
        throw new Error(`El correo: ${correo} ya esta registrado`);
    }   
}

const existeUsuarioPorId=async(id)=>{
    const existeUsuario=await Usuario.findById(id)
    if (!existeUsuario) {
        throw new Error(`El id no existe: ${id}`);
    }   
}

const existeComercioPorId=async(id)=>{
    const existeComercio=await Comercio.findById(id)
    if (!existeComercio) {
        throw new Error(`El id no existe: ${id}`);
    }   
}

module.exports={
    esRoleValido,
    existeEmail,
    existeUsuarioPorId,
    existeComercioPorId
    
}