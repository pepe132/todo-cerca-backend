const { Router } = require("express");
const { check } = require('express-validator');
const { existeComercioPorId } = require("../helpers/db-validators");
const {CommerceGet, CommerceGetById, createCommerce, updateCommerce}= require('../controllers/commerce.controllers')
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-JWT");

const router=Router();

//Obtener todas los comercios
router.get('/',CommerceGet)

//Obtener un comercio por id

router.get('/:id',[
    check('id','No es un id de mongo').isMongoId(),
    check('id').custom(existeComercioPorId),
    validarCampos
],CommerceGetById)

//crear un comercio
router.post('/commerce-upload',[
    validarJWT,
    check('nombre_comercio').not().isEmpty(),
    validarCampos
],createCommerce)

//actualizar un comercio

router.put('/commerce-updated/:id',[
    validarJWT,
    check('id').custom(existeComercioPorId),
    validarCampos
],updateCommerce)

module.exports=router;

