// import wishlist
const wishlists= require('../models/wishlistSchema')

//logic for wishlist
exports.addtowishlist = async (req,res)=>{

//destructure req.body
const{id,title,price,image}=req.body
//logic
try{
    const item= await wishlists.findOne({id})
    if(item){
        res.status(404).json("Product  Already Exists")
    }
    else{
        //add item to wishlist collection
        const newItem = new wishlists({id,title,price,image})
        //store in wishlist collection
        await newItem.save()
        //response send back to client
        res.status(200).json("Product Added To Favorite")
    }
}    
catch(error){
    res.status(404).json()
}
}

//logic for view wishlist product details
exports.getWishlist = async(req,res)=>{
    //logic for view wishlist product details
    try{
        const allWishlists =await wishlists.find()
        res.status(200).json(allWishlists)
    }
    catch(error){
        res.status(404).json(error)
    }
}

//delete wishlist product details

exports.deleteWishlist=async(req,res)=>{
    //get id from the  request
    const {id}= req.params

    //logic for delete wishlist product details
    try{
        const removeWishlist = await wishlists.deleteOne({id})
        //get all wishlist product after removing particular product details
        if(removeWishlist){
            const allitems = await wishlists.find()
            res.status(200).json(allitems)
        }
    }
    catch(error){
        res.status(404).json(error)
    }
}