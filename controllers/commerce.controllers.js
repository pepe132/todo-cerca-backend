
const Comercio=require('../models/commerce')
const CommerceGet=async(req, res=response)=> {

    const {limite=5,desde=0}=req.query


    const [total,commerce]=await Promise.all([//promise.all es para ejecutar acciones de manera simultanea
        Comercio.countDocuments({estado:true}),
        Comercio.find({estado:true})
            .skip(Number(desde))
            .limit(Number(limite))

    ]);
    
    res.json({total,commerce})
   
}

const CommerceGetById=async(req, res=response)=> {

    const {id}=req.params

    const comercio=await Comercio.findById(id)

    res.json({ok:true,comercio})

   
}


const createCommerce=async(req,res=response)=>{

    const {estado,encargado, ...body}=req.body;

    const nombre = body.nombre_comercio.toUpperCase();


    const productoDB=await Comercio.findOne({nombre});

    if (productoDB) {
        res.status(400).json({
            msg:`El negocio ${productoDB.nombre} ya existe`
        }) 
    }

    //generar la data a guardar

    const data={
        ...body,
        nombre:body.nombre_comercio,
        encargado:req.usuario._id,//asi es como mongo graba el id
    }

    const comercio= new Comercio(data);

    //guardar db

    await comercio.save();

    res.status(201).json({ok:true,comercio})

}

const updateCommerce=async(req,res=response)=>{
    const {id}=req.params;

    const {estado,usuario,...data}=req.body;

    data.encargado=req.usuario._id//id del usuario dueño del token

    const commerceUpdated=await Comercio.findByIdAndUpdate(id,data,{new:true})

    res.json(commerceUpdated)

}


module.exports={
    CommerceGet,
    createCommerce,
    CommerceGetById,
    updateCommerce
}