const medicine = require("../models/medicine");

async function handleGetAllMedicines(req,res){
    const dbusers = await medicine.find({});
    return res.json(dbusers);
}

async function handleGetFindByNameMedicines(req,res){

    
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
    const searchKeyword = decodeURIComponent(req.query.id);

try {
  // Perform the first search
  let items = await medicine.find({
    $or: [
      { title: { $regex: new RegExp(searchKeyword), $options: 'i' } },
      { item_name: { $regex: new RegExp(searchKeyword), $options: 'i' } }
    ]
  }).limit(25);

  // If less than 25 items, perform the second search
  if (items.length < 25) {
    const items2 = await medicine.find({
      $or: [
        { title: { $regex: new RegExp(`^${searchKeyword}`, 'i') } },
        { item_name: { $regex: new RegExp(`^${searchKeyword}`, 'i') } }
      ]
    }).limit(25 - items.length);

    items = items.concat(items2);
  }

  // If still less than 25 items, perform the third search
  if (items.length < 25) {
    const items3 = await medicine.find({
      $or: [
        { company_full_name: { $regex: new RegExp(searchKeyword), $options: 'i' } }
      ]
    }).limit(25 - items.length);

    items = items.concat(items3);
  }

  // Deduplicate results
  const uniqueItems = Array.from(new Set(items.map(item => JSON.stringify(item)))).map(item => JSON.parse(item));

  // Return only the first 25 unique items
  return res.json(uniqueItems.slice(0, 25));

} catch (error) {
  return res.status(500).json({ error: 'An error occurred while fetching data' });
}
}

module.exports = {
    handleGetAllMedicines,
    handleGetFindByNameMedicines
};