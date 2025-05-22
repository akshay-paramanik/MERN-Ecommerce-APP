const catagoryModel = require('../models/catagoryModel');
const catagoryControl = {
    getCatagory: async (req,res)=>{
        try{
            const catagories = await catagoryModel.find();
            res.json(catagories)
        }catch(err){
            res.status(500).json({msg:err.message});
        }
    },
    createCatagory: async (req,res)=>{
        try{
            const {name} = req.body;
            const catagoryFind = await catagoryModel.findOne({name});
            if(catagoryFind) return res.status(400).json({msg:"already exist"});
            const newCatagory = new catagoryModel({name});
            await newCatagory.save();
            res.json({msg:"created a catagory"})
        }catch(err){
            res.status(500).json({msg:err.message});

        }
    },
    deleteCatagory: async (req,res)=>{
        try{
            await catagoryModel.findByIdAndDelete(req.params.id);
            res.json({msg:"catagory deleted"});
        }catch(err){
            res.status(500).json({msg:err.message});
        }
    },
    updateCatagory: async (req,res)=>{
        try{
            const {name} = req.body;
            await catagoryModel.findByIdAndUpdate({_id:req.params.id},{name})
            res.json({msg:"updated"})
        }catch(err){
            res.status(500).json({msg:err.message});

        }
    }
}

module.exports=catagoryControl;