const productModel = require('../models/productModel');
const catagoryModel = require('../models/catagoryModel');
const APIfeatures = require('../utils/APIfeature');

const productControl = {
    getProduct: async (req,res)=>{
        try{
            const features = new APIfeatures(productModel.find(), req.query)
            .filtering()
            .sorting()
            .paginating();

            const products = await features.query;
            res.json({status:'success',
                result: products.length,
            products:products})
        }catch(err){
            res.status(500).json({msg:err.message});
        }
    },
    createProduct: async (req, res) => {
        try {
            const { product_id, title, price, description, content, catagory, quantity } = req.body;
    
            if (!req.file) return res.status(400).json({ msg: "No Image Uploaded" });
    
            const product = await productModel.findOne({ product_id });
    
            if (product) return res.status(400).json({ msg: "This product already exists" });

            const imageUrl = req.file.path; // ✅ This should be a full URL
    
            const newProduct = new productModel({
                product_id,
                title: title.toLowerCase(),
                price: Number(price),
                description,
                content,
                images: imageUrl,  // Store image path
                catagory,
                quantity
            });
    
            await newProduct.save();
            res.json({ msg: "Product created" });
    
        } catch (err) {
            res.status(500).json({ msg: err.message });
        }
    },
    
    deleteProduct: async (req,res)=>{
        try{
            await productModel.findByIdAndDelete(req.params.id);
            res.json({msg:"product deleted"});
        }catch(err){
            res.status(500).json({msg:err.message});
        }
    },
    updateProduct: async (req,res)=>{
        try{
            const { product_id, title, price, description, content, catagory, quantity } = req.body;
    
            if (!req.file) return res.status(400).json({ msg: "No Image Uploaded" });
            const imageUrl = req.file.path;

            await productModel.findByIdAndUpdate({_id:req.params.id},{
                product_id,
                title: title.toLowerCase(),
                price,
                description,
                content,
                images: imageUrl,  // Store image path
                catagory
            })
            res.json({msg:"product updated"});

        }catch(err){
            res.status(500).json({msg:err.message});
        }
    }
}
module.exports=productControl