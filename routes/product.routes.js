const { Router } = require("express");
const { check } = require('express-validator');
const { existeProductoPorId, existeComercioPorId } = require("../helpers/db-validators");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
const Product = require("../controllers/products.controllers");

const router=Router();

const pr = new Product()

//Obtener todas los productos
router.get('/todos',pr.obtenerProductos)

//Obtener un producto por id

router.get('/:id',[
    check('id','No es un id de mongo').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
],pr.obtenerProducto)

//Crear producto- solo admins-privado con token valido

router.post('/new-product',[
    validarJWT,
    check('nombre_producto','El nombre es obligatorio').not().isEmpty(),
    check('comercio','No es un id de mongo').isMongoId(),
    check('comercio').custom(existeComercioPorId),
    validarCampos
],pr.crearProducto)

//Actualizar producto-solo admins-privado con token valido

router.put('/update-product/:id',[
    validarJWT,
    //check('categoria','No es un id de mongo').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
],pr.actualizarProducto)

//borrar una categoria-admin
router.delete('/eliminar-producto/:id',[
    //esAdminRole
    validarJWT,
    check('id','No es un id de mongo').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
    
],pr.borrarProducto)




module.exports=router;