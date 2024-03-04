const { Router } = require("express");
const { check } = require('express-validator');
const { existeComercioPorId } = require("../helpers/db-validators");
const {CommerceGet, CommerceGetById, createCommerce, updateCommerce}= require('../controllers/commerce.controllers')
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
const CommerceService = require("../controllers/commerce.controllers");

const router=Router();

const commerceService = new CommerceService();

//Obtener todas los comercios
router.get('/',commerceService.getCommerces)

//Obtener un comercio por id

router.get('/:id',[
    check('id','No es un id de mongo').isMongoId(),
    check('id').custom(existeComercioPorId),
    validarCampos
],commerceService.getCommerceById)

//crear un comercio
router.post('/commerce-upload',[
    validarJWT,
    check('nombre_comercio').not().isEmpty(),
    validarCampos
],commerceService.createCommerce)

//actualizar un comercio

router.put('/commerce-updated/:id',[
    validarJWT,
    check('id').custom(existeComercioPorId),
    validarCampos
],commerceService.updateCommerce)

module.exports=router;

