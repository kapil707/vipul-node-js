const tbl_medicine = require("../tbl_medicine.json");
const userSearchActivity = require("../models/userSearchActivity");

async function handleGetAllMedicines(req,res){
    //const dbusers = await tbl_medicine.find({});
    return res.json(tbl_medicine);
}

async function handleGetFindByNameMedicines(req,res){
    //const id = Number(req.params.id);
    const searchKeyword = decodeURIComponent(req.query.id);
    if (!searchKeyword || searchKeyword.length < 3) {
        return res.json([]);
    }

    const search_result = tbl_medicine.filter(item => 
        ((item.title && item.title.toLowerCase().includes(searchKeyword.toLowerCase().replace(/ /g, '')) && item.title.charAt(0) !== '.') ||
        (item.item_name && item.item_name.toLowerCase().includes(searchKeyword.toLowerCase())))
    );
    

    const ret = await userSearchActivity.create({
        search_type:searchKeyword
    });

    return res.json(search_result);
}

module.exports = {
    handleGetAllMedicines,
    handleGetFindByNameMedicines
};