const Spot = require ('../models/Spot');
const User = require ('../models/User');

module.exports = {

    async index(req, res) {
        const { cpf } = req.query;

        const spots = await Spot.find({ cpf: cpf });

        return res.json(spots)
    },

    async store(req, res) {
        // const { filename } = req.file;
        // const { name,birthday,gender,rg,organ_rg,cpf,pis_nis,email,phone,admission,unit_code,role, thumbnailBase64, techs } = req.body;
        const { nome,cpf,renda, emprestimo } = req.body;
        const { user_id } =  req.headers;

        const user = await User.findById(user_id);

        if(!user){
            return res.status(400).json({ error: 'User does not exists' })
        }

        const spot = await Spot.create({
            user: user_id,
            // thumbnail: filename,
            nome,
            cpf,
            renda,
            emprestimo
            // gender,
            // rg,
            // organ_rg,
            // cpf,
            // pis_nis,
            // email,
            // phone,
            // admission,
            // unit_code,
            // role,
            // thumbnailBase64,
            // techs
        })
        
        return res.json(spot);
    }
};