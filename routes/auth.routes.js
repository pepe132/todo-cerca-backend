const {Router}=require('express');
const { check } = require('express-validator');
const { login, revalidarToken } = require('../controllers/auth.controllers');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-JWT');

const router=Router();

router.post('/login',[
    check('correo','El correo es obligatorio').isEmail(),
    check('contrasena','La contraseña es obligatoria').not().isEmpty(),
    validarCampos
],login)

router.get('/renew', validarJWT ,revalidarToken );

module.exports=router;