import { Router } from 'express'
import fs from 'fs'
import path from 'path'
import { config } from '../config/index.js'
import { v4 as uuidv4 } from 'uuid'
import { validateInputProductsPut, validateInputProductsPost } from '../middlewares/validationMiddleware.js'

export const ProductsRouter = Router()

const pathToProducts = path.join(config.dirname, '/src/data/products.json')

console.log(pathToProducts)
// console.log(config.dirname)
ProductsRouter.get('/', async (req, res) => {
  let productsString = await fs.promises.readFile(pathToProducts, 'utf-8')
  const products = JSON.parse(productsString)
  res.send({ products })
})

ProductsRouter.post('/', validateInputProductsPost, async (req, res) => {
  //Logica para generar el producto
  let productsString = await fs.promises.readFile(pathToProducts, 'utf-8')
  const products = JSON.parse(productsString)

  const id = uuidv4() // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'

  const {
    title,
    description,
    code,
    price,
    status,
    stock,
    category,
    thumbnails,
  } = req.body

  const product = {
    //id autogenerado
    id,
    title,
    description,
    code,
    price,
    status,
    stock,
    category,
    thumbnails,
  }

  products.push(product)

  const productsStringified = JSON.stringify(products, null, '\t')
  await fs.promises.writeFile(pathToProducts, productsStringified)
  res.send({ message: 'Producto creado', data: product })
})

ProductsRouter.put('/:pid', validateInputProductsPut, async (req, res) => {
  try {
    const { pid } = req.params;
    const {
      title,
      description,
      code,
      price,
      status,
      stock,
      category,
      thumbnails,
    } = req.body;

    let productsString = await fs.promises.readFile(pathToProducts, 'utf-8');
    const products = JSON.parse(productsString);

    const productIndex = products.findIndex((product) => product.id === pid);

    if (productIndex === -1) {
      return res.status(404).send({ message: 'Producto no encontrado' });
    }

    // Actualizar solo los campos que se envían en el body, exceptuando el id
    const updatedProduct = {
      ...products[productIndex],
      ...(title && { title }),
      ...(description && { description }),
      ...(code && { code }),
      ...(price !== undefined && { price }),
      ...(status !== undefined && { status }),
      ...(stock !== undefined && { stock }),
      ...(category && { category }),
      ...(thumbnails && { thumbnails }),
    };

    products[productIndex] = updatedProduct;

    const productsStringified = JSON.stringify(products, null, '\t');
    await fs.promises.writeFile(pathToProducts, productsStringified);

    res.send({ message: 'Producto actualizado', data: updatedProduct });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error al actualizar el producto' });
  }
});

ProductsRouter.delete('/:pid', async (req, res) => {
  try {
    const { pid } = req.params;

    let productsString = await fs.promises.readFile(pathToProducts, 'utf-8');
    const products = JSON.parse(productsString);

    const productIndex = products.findIndex((product) => product.id === pid);

    if (productIndex === -1) {
      return res.status(404).send({ message: 'Producto no encontrado' });
    }

    const deletedProduct = products.splice(productIndex, 1); // Eliminar el producto

    const productsStringified = JSON.stringify(products, null, '\t');
    await fs.promises.writeFile(pathToProducts, productsStringified);

    res.send({ message: 'Producto eliminado', data: deletedProduct });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error al eliminar el producto' });
  }
});


