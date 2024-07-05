const mongoose = require("mongoose");

const medicineSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true},
    i_code: { type: String, required: true},
    item_code: { type: String},
    item_name: { type: String},
    title: { type: String},
    packing: { type: String},
    expiry: { type: Date},
    batch_no: { type: String},
    batchqty: { type: Number},
    salescm1: { type: Number},
    salescm2: { type: Number},
    sale_rate: { type: Number},
    mrp: { type: Number},
    final_price: { type: Number},
    costrate: { type: Number},
    compcode: { type: String, required: true},
    comp_altercode: { type: String},
    company_name: { type: String},
    company_full_name: { type: String},
    division: { type: String},
    qscm: { type: String},
    hscm: { type: String},
    misc_settings: { type: String},
    item_date: { type: Date},
    itemcat: { type: Number},
    gstper: { type: Number},
    itemjoinid: { type: String},
    present: { type: Number},
    time: { type: String},
    margin: { type: Number},
    hotdeals: { type: String},
    hotdeals_short: { type: String},
    status: { type: String},
    featured: { type: String},
    discount: { type: Number},
    image1: { type: String},
    image2: { type: String},
    image3: { type: String},
    image4: { type: String},
    title2: { type: String},
    description: { type: String},
    json_check: { type: Number},
    note: { type: String},
    category: { type: String}
});


const medicine = mongoose.model('medicine',medicineSchema);

module.exports = medicine;