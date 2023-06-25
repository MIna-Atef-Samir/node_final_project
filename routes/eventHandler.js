import { Products } from "../main.js";
import { LocalStorage } from "node-localstorage";
import Jwt from "jsonwebtoken";
let tokens ={}

const addCatogoriesToArray= ()=>{
  return Products.map(p => categories.push(p.category))
}

const localStorage = new LocalStorage('./scratch');
const categories = []
export const productsHandler = (req, res) => {
  res.send(Products);
};

export const singleProduct = (req, res) => {
  try {
    let id = req.params.productId;
    const single = Products.find((product) => product.id === Number(id));
    if (!single) {
      res.status(404);
      res.send("Product not found");
    }
    res.send(single);
  } catch (err) {
    res.status(404);
    res.send(`Product not found! Number of products: ${Products.length}`);
  }
};

export const addProduct = (req, res) => {
  if(!tokens.edit){
  return res.send("PLease login first!");
  }
    let newProduct = {
      id: Products.length + 1,
      ...req.body,
      title: req.body.title,
      price: req.body.price,
      description: req.body.description,
      images: req.body.images,
    };
    res.status(201);
    Products.push(newProduct);
    res.send(Products[Products.indexOf(newProduct)]);
};

export const updateProduct = (req, res) => {
  if(!tokens.edit){
    return res.send("PLease login first!");
    }
  let id = req.params.productId;
  const update = Products.find((product) => product.id === Number(id));
  if(categories.find(c => c.id == req.body.category_id)){
    res.send({
      ...update,
      title: req.body.title,
      price: req.body.price,
      category_id: req.body.category_id
    });
  }else{
    res.status(400)
    res.send("category Id not found!")
  }
  
};

export const deleteProduct = (req, res) => {
  if(!tokens.edit){
    return res.send("PLease login first!");
    }
  let id = req.params.productId;
  const deleteProduct = Products.find((product) => product.id === Number(id));
  if (deleteProduct) {
    res.status(202);
    res.send(deleteProduct);
    Products.splice(Products.indexOf(deleteProduct), 1);
  } else {
    res.status(404);
    res.send("Product not found!");
  }
};
export const deleteCategory = (req, res)=>{
  if(!categories.length){
    addCatogoriesToArray()
  }
  if(!tokens.edit){
    return res.send("PLease login first!");
    }
  let id = req.params.categoryId;
  const deleteProduct = categories.find((product) => product.id === Number(id));
  if (deleteProduct) {
    res.status(202);
    res.send(deleteProduct);
      categories.splice(categories.indexOf(deleteProduct), 10);
    console.log(deleteProduct.length);
  } else {
    res.status(404);
    res.send("Product not found!");
  }
}

let allUsers = [];
const userS = localStorage.getItem("users") || "[]";
allUsers = JSON.parse(userS);

export const register = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const passwordRepeat = req.body.passwordRepeat;

  try {
    if (email.includes("@") && email.includes(".")) {
      if (password === passwordRepeat) {
        console.log(true);
        if (allUsers.filter((u) => u.email === email).length > 0) {
          console.log("already there");
          res.end("Already There");
          return;
        }
        const user = {
          email: email,
          password: password,
          token: Jwt.sign({ email }, "mysectet"), // Generate a JWT token with the email payload
        };
        allUsers.push(user);
        localStorage.setItem("users", JSON.stringify(allUsers));
        console.log(user ? user : userS);
        res.send({ success: true });
        res.end();
      } else {
        res.end("Password doesn't match");
      }
    } else {
      res.end("Please enter a valid email!");
    }
  } catch (error) {
    console.log(error.message);
  }
  res.end();
};

export const login = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  try {
    if (email.includes("@") && email.includes(".")) {
      const user = allUsers.find((u) => u.email === email);
      if (user) {
        console.log("right email");
        if (user.password === password) {
          console.log("right pass");
          res.send(user); // Send the user object as the response
          tokens = {edit: true}
        } else {
          res.end("Invalid password!");
        }
      } else {
        res.end("Invalid email!");
      }
    } else {
      res.end("Please enter a valid email!");
    }
  } catch (error) {
    console.log(error.message);
  }
  res.end();
};


export const categoriesHandler = (req , res)=>{
  addCatogoriesToArray()
  console.log(categories)
  res.send(categories);
  res.end()
}
export const singleCategory = (req , res)=>{
  try {
    addCatogoriesToArray()
    let id = req.params.categoryId;
    const single = categories.find((product) => product.id === Number(id));
    if (!single) {
      res.status(404);
      res.send("Product not found");
    }
    res.send(single);
  } catch (err) {
    res.status(404);
    res.send(`category not found! Number of categories: ${categories.length}`);
  }
}
export const addCategory = (req , res)=>{
  if(!tokens.edit){
    return res.send("PLease login first!");
    }
      let newCategory = {
        id : categories.length+1,
        name: req.body.name,
      };
      res.status(201);
      categories.push(newCategory);
      res.send(categories[categories.indexOf(newCategory)]);
}
export const updateCategory = (req , res)=>{
  if(!tokens.edit){
    return res.send("PLease login first!");
    }
    try{
      let id = req.params.categoryId;
      const update = categories.find((product) => product.id === Number(id));
        res.send({
          ...update,
          name: req.body.name,
        });
    }catch{
      res.status(400)
      res.send("category Id not found!")
    }
}