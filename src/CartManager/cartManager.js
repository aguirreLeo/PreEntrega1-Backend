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
    const carts = await this.getCarts();

    const cart = carts.find((cart) => cart.id === cartId);
    if (!cart) {
      throw new Error('Carrito no encontrado');
    }

    const productInCart = cart.products.find((prod) => prod.product === productId);

    if (productInCart) {
      // Incrementar cantidad si el producto ya está en el carrito
      productInCart.quantity += 1;
    } else {
      // Agregar un nuevo producto al carrito
      cart.products.push({
        product: productId,
        quantity: 1,
      });
    }

    await this.saveCarts(carts);

    return cart;
  }
}
