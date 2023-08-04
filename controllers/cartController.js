//import cart collection
const carts = require('../models/cartSchema')
const products = require('../models/productSchema')

//add to cart
exports.addToCart = async (req, res) => {


    //get products details from the request

    //destructure
    const { id, title, price, image, quantity, grandTotal } = req.body

    //logic
    try {
        //check the product is already in cart collection
        const product = await carts.findOne({ id })
        if (product) {
            //product is in the cart collection so increment product quantity
            product.quantity += 1
            //update the product grandTotal
            product.grandTotal = product.price * product.quantity
            //to update product grand total in mongodb collection
            product.save()
            //to send response back to client
            res.status(200).json("Product Added Successfully")
        }
        else {
            //product is not  in the cart collection
            //add product in the cart
            const newProduct = new carts({ id, title, price, image, quantity, grandTotal: price })
            //save new product in cart
            await newProduct.save()
            //to send response back to client
            res.status(200).json("Product Added Successfully")
        }
    }
    catch (error) {
        res.status(401).json(error)
    }
}

//get cart
exports.getCart = async (req, res) => {
    //get all products from the cart
    try {
        //logic
        const allCarts = await carts.find()
        res.status(200).json(allCarts)
    }
    catch (error) {
        res.status(404).json(error)
    }

}

//cart deletion
exports.removeCartItem = async (req, res) => {

    //get id from the request
    const { id } = req.params
    //product remove from the cart collection
    try {
        //logic
        const removeCart = await carts.deleteOne({ id })
        if (removeCart.deletedCount != 0) {
            //to get the remaining products from the cart displayed fronted
            const allCarts = await carts.find()
            res.status(200).json(allCarts)
        }
        else {
            res.status(404).json("Item Not Found")
        }
    }
    catch (error) {
        res.status(401).json(error)
    }

}



//cart increment
exports.incrementCart = async (req, res) => {
    //get product id from the request
    const { id } = req.params
    try {
        //logic -- to check the product in the cart collection if its exits then increment the quantity
        const product = await carts.findOne({ id })
        //if it exists then increment the quantity
        if (product) {
            //update the quantity and grand total price
            product.quantity += 1
            product.grandTotal = product.price * product.quantity
            //save change in mongodb
            await product.save()
            //increment the quantity,get all cart collection item and updating in particular item count
            //item count
            const allCarts = await carts.find()
            res.status(200).json(allCarts)
        }
        else {
            res.status(404).json("item Not Found")
        }
    }
    catch (error) {
        res.status(404).json(error)
    }
}


//cart decrement

exports.decrementCart =async (req,res) =>{
    //get product id from the request
    const {id} = req.params
    try{
        //logic
        //check the product in the cart collection if its exists the decrement the quantity
        const product = await carts.findOne({id})
        if(product.quantity ==0){
            const removeCart = await carts.deleteOne({id})
            // to get the remaining product from the  cart displayed to frontend
            const allCarts = await carts.find()
            res.status(200).json(allCarts)
        }
        else{
            //if it exits then decrement the quantity
            if(products){
                //update the quantity and grand total price
                product.quantity -=1
                product.grandTotal = product.price * product.quantity

                //save changes to mongodb
                await product.save()
                //increment the quantity get all cart collection item and updating in particular item count
                const allCarts = await carts.find()
                res.status(200).json(allCarts)
            }
            else{
                res.status(404).json("Item not found")
            }
            }
        }
        catch(error){
            res.status(404).json(error)
        }
    }
