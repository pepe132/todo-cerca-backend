const {Schema,model}=require('mongoose');

const ProductoSchema=Schema({
    nombre_producto:{
        type:String,
        required:[true,'El nombre del producto es obligatorio']
    },
    estado:{
        type:Boolean,
        default:true,
        
    },
    precio:{
        type:Number,
        default:0
    },
    comercio:{
        type:Schema.Types.ObjectId,
        ref:'Comercio',
        required:true
    },
    nombre_comercio:{
        type:Schema.Types.String,
        ref:'Comercio'
    },
    descripcion:{type:String},
    disponible:{type:Boolean,default:true},
    img:{type:String,default:null},
})

ProductoSchema.methods.toJSON=function () {
    const {__v,estado,...producto}=this.toObject()

    return producto
    
}

module.exports=model('Producto',ProductoSchema)