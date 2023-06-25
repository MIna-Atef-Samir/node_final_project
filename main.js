import express from "express";
import {router} from './routes/router.js'


const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

export let Products = [];

const fetchData = async () => {

    const fetchProducts = await fetch('https://api.escuelajs.co/api/v1/products');
    const data = await fetchProducts.json();
    Products = [...data];
    app.use('/products', router) // main function 👈
    app.listen(process.env.PORT || 8080, () => {
    console.log('Your Server is working on: http://localhost:8080');
    });

};

fetchData();
