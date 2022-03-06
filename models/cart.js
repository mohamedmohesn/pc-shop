const Product = require("./products");

let cart = null;

module.exports = class Cart {

    static async save(product) {

        if (cart === null) {
            cart = { products: [], totalPrice: 0 ,totalqty: 0};
        }
        // console.log(product);
       
        const existingProductIndex = cart.products.findIndex(returns => returns.id == product.id); // to check product is existing in cart
        if (existingProductIndex >= 0) { // exist in cart already
            const exsitingProduct = cart.products[existingProductIndex];
            exsitingProduct.qty += 1;
            product.number -= 1;
            cart.totalqty += 1 ;
        } else { //not exist
            product.qty = 1;
            product.number -= 1;
            cart.products.push(product);
            cart.totalqty += product.qty; 
        }
        
        cart.totalPrice += product.price;
        const use = await Product.findByIdAndUpdate({_id:product.id},{number:product.number});
        console.log(use);
    }
    static getCart() {
        return cart;
    }
    static getproducts() {
        return cart.products;
    }
    static gettotalPrice() {
        return cart.totalPrice;
    }
    static getqty() {
        return cart.totalqty;
    }
    static async delete(productId)  {
        const isExisting =  cart.products.findIndex(p => p.id == productId);
        const pirce = await Product.findById(productId);
        
            let product = cart.products[isExisting]
        if (isExisting >= 0) {
            cart.products.splice(isExisting, 1);
            
            cart.totalPrice -= pirce.price * product.qty ;
            cart.totalqty -= product.qty;
            pirce.number += product.qty;
        }
        const use = await Product.findByIdAndUpdate({_id:productId},{number:pirce.number});
        console.log(use);

    }
    static async clear() {
        for(let i = 0; i < cart.products.length; i++){
            let product = cart.products[i];  
            const pirce = await Product.findById(product._id);
            pirce.number += product.qty;
            const use = await Product.findByIdAndUpdate({_id:pirce._id},{number:pirce.number});
            console.log(use);
        }
        cart = null;
    }
    static clearall() {
       
        cart = null;
    }
} 