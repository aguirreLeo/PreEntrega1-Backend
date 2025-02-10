import fs from 'fs';

const CARTS_FILE = './src/data/carts.json';

export class CartManager {
  constructor() {
    // Si el archivo no existe, lo inicializamos con un array vacío
    if (!fs.existsSync(CARTS_FILE)) {
      fs.writeFileSync(CARTS_FILE, JSON.stringify([]));
    }
  }

  async getCarts() {
    const data = await fs.promises.readFile(CARTS_FILE, 'utf-8');
    return JSON.parse(data);
  }

  async saveCarts(carts) {
    await fs.promises.writeFile(CARTS_FILE, JSON.stringify(carts, null, 2));
  }

  async createCart() {
    const carts = await this.getCarts();

    const newCart = {
      id: carts.length > 0 ? carts[carts.length - 1].id + 1 : 1, // Generar ID único
      products: [],
    };

    carts.push(newCart);
    await this.saveCarts(carts);

    return newCart;
  }

  async getCartById(cartId) {
    const carts = await this.getCarts();
    return carts.find((cart) => cart.id === cartId);
  }

  async addProductToCart(cartId, productId) {
// Verificar si el producto existe 
const products = await this.getProducts(); //  cargar productos
const productExists = products.some((product) => product.id === productId);

if (!productExists) {
  throw new Error('El producto no existe');
}


    const carts = await this.getCarts();

    const cart = carts.find((cart) => cart.id === cartId);
    if (!cart) {
      throw new Error('Carrito no encontrado');
    }

  
    const productInCart = cart.products.find((prod) => prod.product === String(productId));


    if (productInCart) {
      // Incrementar cantidad si el producto ya está en el carrito
      productInCart.quantity += 1;
    } else {
      // Agregar un nuevo producto al carrito
      cart.products.push({
        product: String(productId),
        quantity: 1,
      });
      
    }

    await this.saveCarts(carts);

    return cart;
  }
  async removeProductFromCart(cartId, productId) {
    const carts = await this.getCarts();
    const cartIndex = carts.findIndex((cart) => cart.id === cartId);
    if (cartIndex === -1) {
      throw new Error('Carrito no encontrado');
    }

    const cart = carts[cartIndex];
    const productIndex = cart.products.findIndex((prod) => prod.product === productId);
    if (productIndex === -1) {
      throw new Error('Producto no encontrado en el carrito');
    }

    // Eliminar el producto del carrito
    cart.products.splice(productIndex, 1);
    await this.saveCarts(carts);

    return cart;
  }
}
