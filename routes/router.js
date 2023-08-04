//Inside router.js file, import express
const express = require('express')

//import product controller
const productController = require('../controllers/productController')

//import wishlist controller
const wishlistController = require('../controllers/wishlistController')

//import cart controller
const cartController = require('../controllers/cartController')

// import register

const registerController = require ('../controllers/registerController')

// import login
const loginController = require ('../controllers/loginController')

//using express create an object for router class inorder to setup the path
const router = new express.Router()

// Resolve client request in various server routes

//all api call will be resolved

//get all products
router.get('/products/all-products',productController.getAllProducts)

// //get particular product details
router.get('/products/viewproduct/:id',productController.viewProduct)

//add to wishlist product details
router.post('/products/addtowishlist',wishlistController.addtowishlist)

//get wishlist product details
router.get('/products/getwishlist',wishlistController.getWishlist)

//delete wishlist product details
router.delete('/products/deletewishlist/:id',wishlistController.deleteWishlist)

//add to cart
router.post('/products/addtocart',cartController.addToCart)

//get cart
router.get('/products/getcart',cartController.getCart)


//delete cart
router.delete('/products/deletecart/:id',cartController.removeCartItem)

//cart increment
router.get('/products/increment/:id',cartController.incrementCart)

//cart decrement
router.get('/products/decrement/:id',cartController.decrementCart)

// register
router.post('/products/login/register', registerController.employeeRegister)
router.post('/products/login', loginController.login)




//export router
module.exports =router