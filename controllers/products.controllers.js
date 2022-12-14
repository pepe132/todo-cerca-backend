const { response } = require("express");

const Producto = require("../models/product");

const obtenerProductos=async(req,res=response)=>{
    
    const {limite=5,pagina=1}=req.query


    const [total,productos]=await Promise.all([//promise.all es para ejecutar acciones de manera simultanea
        Producto.countDocuments({estado:true}),
        Producto.find({estado:true})
            .populate('comercio')
            .limit(Number(limite*1))
            .skip((Number(pagina-1))*limite)
    ]);
    
    res.json({ok:true,total,productos})

}

const obtenerProducto=async(req,res=response)=>{

    const {id}=req.params
    const producto=await Producto.findById(id).populate('comercio')

    res.json({ok:true,producto})

}

const crearProducto=async(req,res=response)=>{

    const {estado, ...body}=req.body;

    const nombre = body.nombre_producto.toUpperCase();


    const productoDB=await Producto.findOne({nombre});

    if (productoDB) {//si categoria db no es nula
        res.status(400).json({
            msg:`El producto ${productoDB.nombre} ya existe`
        }) 
    }

    //generar la data a guardar

    const data={
        ...body,
        nombre:body.nombre_producto,
        comercio:req.body.comercio
    }

    const producto= new Producto(data);

    //guardar db

    await producto.save();

    res.status(201).json({ok:true,producto})

}

const actualizarProducto=async(req,res=response)=>{
    const {id}=req.params;

    const {estado,...data}=req.body;


    if (data.nombre_producto) {
        data.nombre_producto=data.nombre_producto.toUpperCase();
    }


    data.comercio=req.comercio//id del usuario dueño del token

    const productoActualizado=await Producto.findByIdAndUpdate(id,data,{new:true})

    res.json(productoActualizado)

}

const borrarProducto=async(req,res=response)=>{
    const {id}=req.params;

    const productoBorrado=await Producto.findByIdAndDelete(id)

    res.json(productoBorrado)

}

module.exports={
    obtenerProductos,
    obtenerProducto,
    crearProducto,
    actualizarProducto,
    borrarProducto
}