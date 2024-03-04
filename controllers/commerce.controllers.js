const Comercio = require('../models/commerce');

class CommerceService {
    async getCommerces(req, res) {
        const { limite = 5, desde = 0 } = req.query;

        const [total, commerce] = await Promise.all([
            Comercio.countDocuments({ estado: true }),
            Comercio.find({ estado: true })
                .populate('productos')
                .skip(Number(desde))
                .limit(Number(limite))
        ]);
        
        res.json({ total, commerce });
    }

    async getCommerceById(req, res) {
        const { id } = req.params;
        const comercio = await Comercio.findById(id);
        res.json({ ok: true, comercio });
    }

    async createCommerce(req, res) {
        const { estado, encargado, ...body } = req.body;
        const nombre = body.nombre_comercio.toUpperCase();
        const productoDB = await Comercio.findOne({ nombre });

        if (productoDB) {
            return res.status(400).json({
                msg: `El negocio ${productoDB.nombre} ya existe`
            });
        }

        const data = {
            ...body,
            nombre: body.nombre_comercio,
            encargado: req.usuario._id,
        }

        const comercio = new Comercio(data);
        await comercio.save();
        res.status(201).json({ ok: true, comercio });
    }

    async updateCommerce(req, res) {
        const { id } = req.params;
        const { estado, usuario, ...data } = req.body;
        data.encargado = req.usuario._id;

        const commerceUpdated = await Comercio.findByIdAndUpdate(id, data, { new: true });
        res.json(commerceUpdated);
    }
}

module.exports = CommerceService;
