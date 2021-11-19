const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true
    },

    products: [
          {
              productId:{type: String},
              quantity:{type: Number , default: 1}
          }
             ],
             
    modifiedAt: {
                type: Date,
                default: Date.now
        }
},
{timestamps: true}
);

module.exports = mongoose.model('Cart' , cartSchema);