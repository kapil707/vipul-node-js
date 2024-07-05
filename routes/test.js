const express = require("express");
const axios = require('axios');
const fs = require('fs');

const medicine_data = require("../medicine_data.json");
const router = express.Router();


router.route("/:id").
    get((req,res)=>{
        fetchDataAndUpdateJson(getLastId());
        return res.send("jai ho");
    });

// Function to get the last id from medicine_data.json
function getLastId() {
    try {
      // Read the JSON file
      const jsonData = fs.readFileSync(jsonFilePath, 'utf8');
      
      // Parse JSON data to JavaScript array
      const medicineData = JSON.parse(jsonData);
      
      // Check if there are any entries
      if (medicineData.length > 0) {
        // Get the last object from the array
        const lastMedicine = medicineData[medicineData.length - 1];
        
        // Return the id of the last object
        return lastMedicine.id;
      } else {
        console.log('No medicine data found.');
        return null;
      }
    } catch (error) {
      console.error('Error reading JSON file:', error);
      return null;
    }
  }
    // API URL jahan se data fetch karna hai
const apiUrl = 'https://drdweb.co.in/api_01/api01/index/';

// JSON file ka path jahan data save karna hai
const jsonFilePath = 'medicine_data.json';

// Function to fetch data from API and update JSON file
async function fetchDataAndUpdateJson(id) {
    try {
      // API se data fetch karna
      const response = await axios.get(apiUrl+id);
  
      // Check for duplicate id
      const newData = response.data[0];
      const existingIds = medicine_data.map(item => item.id);
  
      if (!existingIds.includes(newData.id)) {
        // Data ko JSON file me add karna
        medicine_data.push(newData);
  
        // Data ko JSON file me write karna
        fs.writeFile(jsonFilePath, JSON.stringify(medicine_data, null, 2), 'utf8', (err) => {
          if (err) {
            console.error('Error writing to JSON file:', err);
          } else {
            console.log('JSON file has been updated successfully.');
          }
        });
      } else {
        console.log(`Duplicate entry found for id: ${newData.id}. Skipping...`);
      }
    } catch (error) {
      console.error('Error fetching data from API:', error);
    }
  }

module.exports = router;