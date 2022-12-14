const { Router } = require("express");
const { check } = require('express-validator');
const { obtenerProductos, obtenerProducto, crearProducto, actualizarProducto, borrarProducto } = require("../controllers/products.controllers");
const { existeProductoPorId, existeComercioPorId } = require("../helpers/db-validators");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-JWT");

const router=Router();

//Obtener todas los productos
router.get('/todos',obtenerProductos)

//Obtener un producto por id

router.get('/:id',[
    check('id','No es un id de mongo').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
],obtenerProducto)

//Crear producto- solo admins-privado con token valido

router.post('/new-product',[
    validarJWT,
    check('nombre_producto','El nombre es obligatorio').not().isEmpty(),
    check('comercio','No es un id de mongo').isMongoId(),
    check('comercio').custom(existeComercioPorId),
    validarCampos
],crearProducto)

//Actualizar producto-solo admins-privado con token valido

router.put('/update-product/:id',[
    validarJWT,
    //check('categoria','No es un id de mongo').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
],actualizarProducto)

//borrar una categoria-admin
router.delete('/eliminar-producto/:id',[
    //esAdminRole
    validarJWT,
    check('id','No es un id de mongo').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
    
],borrarProducto)




module.exports=router;