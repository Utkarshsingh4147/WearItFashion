const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min : 0
    },
    category: {
        type: String,
        required: true
    },
    images: {
        type: [String],
        required: true
    },
    sizes: [
        {
            size: {
                type: String,
                required: true 
            },
            stock: {
                type: Number,
                required: true,
                min: 0
            }
        }
    ],
    bestseller: {
        type: Boolean,
        default: false
    },
    isActive: {
      type: Boolean,
      default: true
    }
}, { timestamps: true })

module.exports = mongoose.model("Product", productSchema);