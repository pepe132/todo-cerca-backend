const {Router}=require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const AuthService = require('../controllers/auth.controllers');

const router=Router();
const authService = new AuthService();

router.post('/login',[
    check('correo','El correo es obligatorio').isEmail(),
    check('contrasena','La contraseña es obligatoria').not().isEmpty(),
    validarCampos
],authService.login)

router.get('/renew', validarJWT ,authService.revalidarToken );

module.exports=router;