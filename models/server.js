const express=require('express')
const cors=require('cors');
const { dbConnection } = require('../database/config');

class Server{
    constructor(){
        this.app=express();
        this.port=process.env.PORT
        this.paths={
            usuarios:'/api/usuarios',
            auth:'/api/auth',
            commerce:'/api/commerce',
            products:'/api/products'
        }

        //conectar a base de datos
        this.conectarDB();
        

        //Middlewares

        this.middlewares();

        //routes

        this.routes();

    }

    async conectarDB(){
        await dbConnection()
    }

    middlewares(){

        this.app.use(cors())
        //directorio publico
        this.app.use(express.static('public'))
        this.app.use(express.json());
    }

    routes(){
        this.app.use(this.paths.auth,require('../routes/auth.routes'))
       this.app.use(this.paths.usuarios,require('../routes/user.routes'))
       this.app.use(this.paths.commerce,require('../routes/commerce.routes'))
       this.app.use(this.paths.products,require('../routes/product.routes'))

    }

    listen(){
        this.app.listen(process.env.PORT,()=>{
            console.log('servidor corriendo en el puerto',process.env.PORT);
        })
    }


}

module.exports=Server;