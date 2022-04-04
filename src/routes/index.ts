import { Router } from "express";
import { IProduct } from "interfaces/IProduct";
import { v4 as uuid } from 'uuid';

const router = Router();

const products: IProduct[] = [];

router.post('/products', (request, response) => {
  const { name, price, status } = request.body;
  const id = uuid();

  const product: IProduct = { id, name, price, status };

  products.push(product);

  return response.status(201).json(product);

});

router.get('/products', (request, response) => {
  return response.json(products);
});

router.put('/products/:id', (request, response) => {
  const { id } = request.params;
  const { name, price, status } = request.body;

  const productIndex = products.findIndex(product => product.id === id);

  if(productIndex > 0) {
    products[productIndex] = { id, name, price, status};
  }

  return response.json(products[productIndex]);
});

router.delete('/products/:id', (request, response) => {
  const { id } = request.params;

  const productIndex = products.findIndex(product => product.id === id);

  if(productIndex > 0) {
    products.slice(productIndex, 1);
  }

  return response.status(204).json();
});

export { router };