import { searchCep } from './helpers/cepFunctions';
import { fetchProductsList } from './helpers/fetchFunctions';
import { createCartProductElement, createProductElement } from './helpers/shopFunctions';
import './style.css';

const productsArea = document.querySelector('.products');

document.querySelector('.cep-button').addEventListener('click', searchCep);

async function addItems() {
  const products = await fetchProductsList('computador');
  products.map((product) => productsArea.appendChild(createProductElement(product)));
}

window.onload = () => {
  addItems();
};
