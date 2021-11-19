const Product  = require('../models/productModel');

const productController = {

    getProducts: async (req , res) => {
       try {
           //Get all products
           const products = await Product.find();
           res.status(200).json(products);
       } catch (err) {
        res.status(500).json({err, message: 'Something went wrong!'});  
       }
    },

    getProduct: async (req , res) => {
        try {
            //Get a product
            const product = await Product.findById(req.params.id);
            res.status(200).json(product);
        } catch (err) {
         res.status(500).json({err, message: 'Something went wrong!'});  
        }
    },

    createProduct: async (req , res) => {
        const {name , price, quantity} = req.body;
         
        try {
            //Create a product
            const newProduct  = await Product.create({ name, price, quantity });
            res.status(201).json({message: 'product created!' , newProduct});
        } catch (err) {
            res.status(500).json({err, message: 'Something went wrong!'}); 
        }
    },

    updateProduct: async (req , res) => {
         try {
           //Update a product
           const updatedProduct = await Product.findByIdAndUpdate(req.params.id , {$set: req.body}, {new: true});
           res.status(200).json({message: 'product updated!' , updatedProduct});
         } catch (err) {
            res.status(500).json({err, message: 'Something went wrong!'});  
         }
    },

    deleteProduct: async (req , res) => {
        try {
            //Delete a product
            const deletedProduct = await Product.findOneAndDelete(req.params.id);
            res.status(200).json({message: 'product deleted!' , deletedProduct});
          } catch (err) {
             res.status(500).json({err, message: 'Something went wrong!'});  
          }
    },

};

module.exports = productController;