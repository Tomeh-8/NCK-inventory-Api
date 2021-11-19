const Cart  = require('../models/cartModel');

const cartController = {

    getCarts: async (req , res) => {
       try {
          // Get all carts
           const carts = await Cart.find();
           res.status(200).json(carts);
       } catch (err) {
        res.status(500).json({err, message: 'Something went wrong!'});  
       }
    },
    
    getUserCart: async (req , res) => {
        try {
            //Get user cart
            const cart = await Cart.findOne({userId:req.params.userId});
            res.status(200).json(cart);
        } catch (err) {
         res.status(500).json({err, message: 'Something went wrong!'});  
        }
    },

    createCart: async (req , res) => {
       
        try {
            //Create a cart
            const newCart  = await Cart.create(req.body);
              res.status(201).json({message: 'cart created!' , newCart});
        } catch (err) {
            res.status(500).json({err, message: 'Something went wrong!'}); 
        }
    },

    addToCart: async (req , res) => {
        //Update a Cart
        const {userId , products} = req.body;
        const {productId , quantity} = products;
         try {
             //check for existing user card
           const userCart = await Cart.findOne({userId});
          
           if(userCart){
               //check for existing products in cart
              const productIndex = userCart.products.findIndex(p => p.productId === productId);
              
              if(productIndex > -1){
                  //for already existing product
                   let product = userCart.products[productIndex];
                    product.quantity++;
                    userCart.products[productIndex] = product;
              }else{
                  //for new product
                  userCart.products.push({productId , quantity});
              }
                
           } else {
               //For a new cart
             const newUserCart = await Cart.create({userId , products: [{productId, quantity}]});
             res.status(201).json({message: 'new user cart created!' , newUserCart});
           }
           //Update and save  changes
           const updatedCart = await userCart.save();
           res.status(200).json({message: 'cart updated!' , updatedCart});

         } catch (err) {
            res.status(500).json({err, message: 'Something went wrong!'});  
         }
    },

    deleteCart: async (req , res) => {
        try {
            //Delete a cart 
            const deletedCart = await Cart.findOneAndDelete(req.params.id);
            res.status(200).json({message: 'cart deleted!' , deletedCart});
          } catch (err) {
             res.status(500).json({err, message: 'Something went wrong!'});  
          }
    },

};

module.exports = cartController;