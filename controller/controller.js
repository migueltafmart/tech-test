const db = require("../model/db");
exports.getProducts = async (req, res) => {
    let products = await db.getProducts();
    if(products.length > 0){
        res.status(200).json(products);
    }else{
        res.status(404).json({message:"No products found"});
    };
};

exports.findProducts = async (req, res) => {
    let query = req.query.q;
    let products = await db.findProducts(query);
    if (products.length > 0 && query){
        res.status(200).json(products);
    }else{
        res.status(200).json();
    };
};