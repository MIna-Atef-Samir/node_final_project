import { Router } from "express";
import {validate, registerValid , loginValid, catValidate} from "./validation.js"
import {productsHandler, singleProduct, addProduct, updateProduct, deleteProduct, register ,login, categoriesHandler, singleCategory, addCategory, updateCategory, deleteCategory} from "./eventHandler.js"
export const router = Router()

router.get('/', productsHandler);
router.get('/category', categoriesHandler);
router.get('/category/:categoryId', singleCategory);
router.put('/category/:categoryId', catValidate, updateCategory);
router.post('/add-new-category', catValidate, addCategory);
router.delete('/category/:categoryId', deleteCategory)
router.get('/:productId', singleProduct);
router.post('/add-new-product', validate, addProduct);
router.put('/:productId', validate, updateProduct);
router.delete('/:productId', deleteProduct)
router.post('/register',registerValid , register)
router.post('/login',loginValid , login)



