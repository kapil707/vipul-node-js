const medicine = require("../models/medicine");

async function handleGetAllMedicines(req,res){
    const dbusers = await medicine.find({});
    return res.json(dbusers);
}

async function handleGetFindByNameMedicines(req,res){

    const searchKeyword = decodeURIComponent(req.query.id);

    const items = await medicine.find({
      $or: [
          { title: { $regex: new RegExp(searchKeyword), $options: 'i' } },
          { item_name: { $regex: new RegExp(searchKeyword), $options: 'i' } }
        ]
      });

      const items2 = await medicine.find({
        $or: [
            { title: { $regex: new RegExp(`^${searchKeyword}`, 'i') } },
            { item_name: { $regex: new RegExp(`^${searchKeyword}`, 'i') } }
          ]
        });

        const items3 = await medicine.find({
            $or: [
                { company_full_name: { $regex: new RegExp(searchKeyword), $options: 'i' } }
              ]
            });

    //const id = Number(req.params.id);
    //const searchKeyword = decodeURIComponent(req.query.id);
    /*const searchKeyword = req.query.id.toLowerCase().replace(/ /g, '');
    if (!searchKeyword || searchKeyword.length < 3) {
        return res.json([]);
    }
    const items = await medicine.find({});

    // Filter items based on search criteria
    const search_result = items.filter(item => 
      ((item.title && item.title.toLowerCase().includes(searchKeyword) && item.title.charAt(0) !== '.') ||
      (item.item_name && item.item_name.toLowerCase().includes(searchKeyword)))
    );*/
    

    /*const ret = await userSearchActivity.create({
        search_type:searchKeyword
    });*/
    // Dono results ko concatenate karke return karna
    const combinedItems = items2.concat(items);
    const combinedItems1 = combinedItems.concat(items3);
    // Unique items filter karne ke liye Set ka use karte hain
    const uniqueItems = Array.from(new Set(combinedItems1.map(item => JSON.stringify(item)))).map(item => JSON.parse(item));
    return res.json(uniqueItems);
}

module.exports = {
    handleGetAllMedicines,
    handleGetFindByNameMedicines
};