const { response } = require("express")


const esAdminRole=(req,res=response,next)=>{

    if (!req.usuario) {
        return res.status(500).json({
            msg:'Se quiere verificar el rol sib validar el token primero'
        })
        
    }

    const {rol,nombre}=req.usuario;

    if (rol!=='ADMIN_ROLE'){
        return res.status(401).json({
            msg:`${nombre} debe ser administrador `
        }) 
    }
    next();
}

const tieneRole=(...roles)=>{

    return (req,res=response)=>{

        if (!req.usuario) {
            return res.status(500).json({
                msg:'Se quiere verificar el rol sin validar el token primero'
            })
            
        }

        if (!roles.includes(req.usuario.rol)) {
            return res.status(401).json({
                msg:`El servicio requiere uno de los siguientes roles: ${roles} `
            })
            
        }

        next();
    }
    
}

module.exports={
    esAdminRole,
    tieneRole
}