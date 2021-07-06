const mongoose = require('mongoose');

const SpotSchema = new mongoose.Schema({
    nome: String,
    cpf: String,
    renda: String,
    emprestimo: String,
    // gender: String,
    // rg: String,
    // organ_rg: String,
    // cpf: String,
    // pis_nis: String,
    // email: String,
    // phone: String,
    // admission: String,
    // unit_code: String,
    // role: String,
    // thumbnailBase64: String,
    // techs: [String],
    // user: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User'
    // }
    // }, {
    //     toJSON: {
    //         virtuals: true,
    //     },
});

SpotSchema.virtual('thumbnail_url').get(function() {
    return `https://cadastro-montreal.herokuapp.com/files/${this.thumbnail}`
})

module.exports = mongoose.model('Spot', SpotSchema);