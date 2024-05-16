import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
        minLength: [2, 'Name must be at least 2 characters'],
        maxLength: [40, 'Name must be less than 40 characters']
    },
    description: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
        minLength: [20, 'Name must be at least 20 characters'],
        maxLength: [255, 'Name must be less than 255 characters']
    },
    price: {
        type: Number,
        required: [true, "Price is required"],
        min: [1, 'Price must be greater than 1'],
        max: [10000, 'Price must be less than 10000']
    },
    category: {
        type: String,
        required: [true, "Category is required"],
        trim: true,
        minLength: [5, 'Name must be at least 5 characters'],
        maxLength: [20, 'Name must be less than 20 characters']
    },
    image: {
        type: String,
        // required: [true, "Image is required"]
    }
});

const Product = mongoose.model('Product', productSchema);

export { Product };