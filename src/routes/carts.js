import { Router } from 'express';
import { CartManager } from '../CartManager/CartManager.js';


export const CartsRouter = Router();

const cartManager = new CartManager

// POST / - Crear un nuevo carrito
CartsRouter.post('/', async (req, res) => {
  try {
    const newCart = await cartManager.createCart();
    res.status(201).send({ message: 'Carrito creado con éxito', cart: newCart });
  } catch (error) {
    res.status(500).send({ message: 'Error al crear el carrito', error: error.message });
  }
});

// GET /:cid - Listar los productos de un carrito
CartsRouter.get('/:cid', async (req, res) => {
  const { cid } = req.params;

  try {
    const cart = await cartManager.getCartById(parseInt(cid));
    if (!cart) {
      return res.status(404).send({ message: 'Carrito no encontrado' });
    }
    res.send(cart);
  } catch (error) {
    res.status(500).send({ message: 'Error al obtener el carrito', error: error.message });
  }
});

// POST /:cid/product/:pid - Agregar producto a un carrito
CartsRouter.post('/:cid/product/:pid', async (req, res) => {
  const { cid, pid } = req.params;

  try {
    const cart = await cartManager.addProductToCart(parseInt(cid), parseInt(pid));
    res.send({ message: 'Producto agregado al carrito con éxito', cart });
  } catch (error) {
    res.status(500).send({ message: 'Error al agregar producto al carrito', error: error.message });
  }
});
