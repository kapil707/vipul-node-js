const express = require("express");
const axios = require('axios');
const router = express.Router();
const medicine_model = require("../models/medicine");

// Function to get the _id of the last inserted document
async function getLastInsertedItemId() {
  try {
    const lastItem = await medicine_model.findOne().sort({ _id: -1 }).select('id');
    return lastItem ? lastItem.id : null;
  } catch (error) {
    console.error('Error getting last inserted item:', error);
  }
}

// Route to display the last inserted item ID
router.get('/myid', async (req, res) => {
  try {
    const lastItemId = await getLastInsertedItemId();
    const lastItemIdString = lastItemId ? lastItemId.toString() : 'No items found';

    const html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Last Inserted Item ID</title>
      </head>
      <body>
        <h1>Last Inserted Item ID</h1>
        <p>The last inserted item ID is: ${lastItemIdString}</p>
      </body>
      </html>
    `;
    res.send(html);
  } catch (error) {
    res.status(500).send('Error retrieving last inserted item ID');
  }
});

router.route("/insert/:id").
  get((req,res)=>{
  fetchAndSaveData();
    return res.send("jai ho");
});
    // API URL jahan se data fetch karna hai
const apiUrl = 'https://drdweb.co.in/api_01/api01/index/';

// Function to make API call and save response to MongoDB
async function fetchAndSaveData() {
  console.log('working fetchAndSaveData');
  try {
    // Make API call
    
    const lastItemId = await getLastInsertedItemId();
    const lastItemIdString = lastItemId ? lastItemId.toString() : '0';

    const response = await axios.get(apiUrl+lastItemIdString);
    const data = response.data;

    console.log('working hear');

    // Assuming the API response is an array of items
    for (const itemData of data) {
      const newItem = new medicine_model({
        id: itemData.id || '1',
        i_code: itemData.i_code || '-1',
        item_code: itemData.item_code || '',
        item_name: itemData.item_name || '',
        title: itemData.title || '',
        packing: itemData.packing || '',
        expiry: itemData.expiry || null,
        batch_no: itemData.batch_no || '',
        batchqty: itemData.batchqty || 0,
        salescm1: itemData.salescm1 || 0,
        salescm2: itemData.salescm2 || 0,
        sale_rate: itemData.sale_rate || 0,
        mrp: itemData.mrp || 0,
        final_price: itemData.final_price || 0,
        costrate: itemData.costrate || 0,
        compcode: itemData.compcode || '-1',
        comp_altercode: itemData.comp_altercode || '',
        company_name: itemData.company_name || '',
        company_full_name: itemData.company_full_name || '',
        division: itemData.division || '00',
        qscm: itemData.qscm || 'N',
        hscm: itemData.hscm || 'N',
        misc_settings: itemData.misc_settings || '',
        item_date: itemData.item_date || '2014-08-30',
        itemcat: itemData.itemcat || 0,
        gstper: itemData.gstper || 0,
        itemjoinid: itemData.itemjoinid || '',
        present: itemData.present || 0,
        time: itemData.time || '07:35 AM',
        margin: itemData.margin || 0,
        hotdeals: itemData.hotdeals || null,
        hotdeals_short: itemData.hotdeals_short || null,
        status: itemData.status || '1',
        featured: itemData.featured || '0',
        discount: itemData.discount || 4.5,
        image1: itemData.image1 || '',
        image2: itemData.image2 || '',
        image3: itemData.image3 || '',
        image4: itemData.image4 || '',
        title2: itemData.title2 || '',
        description: itemData.description || '',
        json_check: itemData.json_check || 0,
        note: itemData.note || '',
        category: itemData.category || ''
      });

      await newItem.save();
      console.log('Item saved:', newItem);
    }
  } catch (error) {
    console.error('Error fetching or saving data:', error);
  } finally {
    //mongoose.connection.close();
  }
}

module.exports = router;