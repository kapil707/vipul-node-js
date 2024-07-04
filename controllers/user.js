const users = require("../models/user");

async function handleGetAllUsers(req,res){
    const dbusers = await users.find({});
    return res.send(dbusers);
}

async function handleGetUserById(req,res){
    /*const id = Number(req.params.id);
    const user = users.find((usr)=>usr.id===id);*/
    const user = await users.findById(req.params.id);
    return res.json(user);
}

async function handleGetUserByIdAndUpdate(req,res){
    await users.findByIdAndUpdate(req.params.id,{firstName:'vedant'});
    return res.status(201).json({msg:"success"});
}

async function handleGetUserByIdAndDelete(req,res){
    await users.findByIdAndDelete(req.params.id);
    return res.status(201).json({msg:"success"});
}
async function handleInsertUsers(req,res){
    const body = req.body;
    const ret = await users.create({
        firstName:body.first_name
    });
    console.log(ret);
    return res.status(201).json({msg:"success"});
}

module.exports = {
    handleGetAllUsers,
    handleGetUserById,
    handleGetUserByIdAndUpdate,
    handleGetUserByIdAndDelete,
    handleInsertUsers,
};