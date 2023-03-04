const express = require("express");
const router = express.Router();

const user = {
    id:1,
    name:"fish"
}

router.get('/', (req,res)=>{
    res.json(user)
})

module.exports = router