const express = require('express')
const app = express()
const mongoose = require('mongoose')
const path = require('path')
const Schema = mongoose.Schema


const UserSchema = new Schema({
    name:String,
    description:String,
})

const Product = mongoose.model('Product' , UserSchema)

const data = [
    {
        'name': 'safwan',
        'description': 'software developer'
    },
    {
        'name': 'jubair',
        'description': 'software developer'
    },
    {
        'name': 'hiyas',
        'description': 'software developer'
    },
    {
        'name': 'jubi',
        'description': 'software developer'
    }
]

app.set('view engine', 'ejs')
app.set('View', path.join(__dirname, 'views'))

mongoose.connect('mongodb://localhost:27017/products',)
.then(()=>{
    console.log('database connected succesfully')
})
.catch((err)=>{
    console.log('error occured')
})


app.get('/', async(req, res)=>{
    const newData = Product.find({})
    console.log(newData)
    res.render('index' )
})


app.listen(3000,()=>{
    console.log('app listening on port 3000');
});




