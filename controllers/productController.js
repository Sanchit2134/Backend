import { v2 as cloudinary } from 'cloudinary';
import productModel from '../models/productModel.js';

// function for add product
export const addProduct = async (req, res) => {
    try {
        const { name, description, price, category, subCategory, sizes, bestselller } = req.body;
        const image1 = req.files.image1 && req.files.image1[0];
        const image2 = req.files.image2 && req.files.image2[0];
        const image3 = req.files.image3 && req.files.image3[0];
        const image4 = req.files.image4 && req.files.image4[0];

        const images = [image1, image2, image3, image4].filter(image => image !== undefined);
        let imagesURL = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path, { resource_type: "image" });
                return result.secure_url;
            })
        )

        const productData = {
            name,
            description,
            price: Number(price),
            category,
            subCategory,
            sizes: JSON.parse(sizes),
            bestselller: bestselller === 'true' ? true : false,
            image: imagesURL,
            date: Date.now()
        }
        console.log(productData);

        const product = new productModel(productData);
        console.log(product);
        res.json({ success: true, message: 'Product added successfully!' })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: 'Something went wrong!' })
    }
}
// function for list product
export const listProducts = async (req, res) => {
    const products = await productModel.find({});
    res.json({ success: true, products });

}
// function for remove product
export const removeProduct = async (req, res) => {
    try {
        await productModel.findByIdAndRemove(req.body);
        res.json({ success: true, message: 'Product removed successfully!' });
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: 'Something went wrong!' })
    }

}
// function for single product onfo
export const singleProduct = async (req, res) => {
    try {
        const {productId} = req.body;
        const product = await productModel.findById(productId);
        res.json({success: true, product});
    } catch (error) {
        console.log(error)
        res.json({success: false, message: 'Something went wrong!'})
    }
}