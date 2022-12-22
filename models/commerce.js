const {Schema,model}=require('mongoose')

const CommerceSchema=Schema({
    nombre_comercio:{
        type:String,
        required:true
    },
    encargado:{
        type:Schema.Types.ObjectId,
        ref:'Usuario',
        required:true
    },
    giro_negocio:{
        type:String,
       
    },
    productos:{
        type:Schema.Types.ObjectId,
        ref:'Producto',
        required:true
    },
    
    imagen_negocio:{
        type:String,
        default:null
    },
    estado:{
        type:Boolean,
        default:true,
        required:true
    },

})

CommerceSchema.methods.toJSON=function () {
    const {__v,...commerce}=this.toObject()//estoy sacando la version y el password de la respuesta y tofos lod demas se almacenan

    return commerce
    
}

module.exports=model('Comercio',CommerceSchema)