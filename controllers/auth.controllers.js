const bcryptjs = require("bcryptjs");
const { response } = require("express");
const { generarJWT } = require("../helpers/generarJWT");
const Usuario = require('../models/user');

class AuthService {
    async login(req, res = response) {
        const { correo, contrasena } = req.body;

        try {
            const usuario = await Usuario.findOne({ correo });
            if (!usuario) {
                return res.status(400).json({ msg: 'Correo inexistente' });
            }

            if (!usuario.estado) {
                return res.status(400).json({ msg: 'Estado inactivo' });
            }

            const validPassword = bcryptjs.compareSync(contrasena, usuario.contrasena);
            if (!validPassword) {
                return res.status(400).json({ msg: 'Contraseña incorrecta' });
            }

            const token = await generarJWT(usuario.id);

            res.json({ usuario, token });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ msg: 'Fallo interno del sistema' });
        }
    }

    async revalidarToken(req, res = response) {
        const { _id, nombre, correo, rol, google } = req.usuario;

        const token = await generarJWT(_id, nombre);

        res.json({ ok: true, _id, nombre, correo, token, rol, google });
    }
}

module.exports = AuthService;