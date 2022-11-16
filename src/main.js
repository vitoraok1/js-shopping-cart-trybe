import { searchCep } from './helpers/cepFunctions';
import { fetchProductsList } from './helpers/fetchFunctions';
import { createCartProductElement, createProductElement } from './helpers/shopFunctions';
import './style.css';

const productsArea = document.querySelector('.products');

document.querySelector('.cep-button').addEventListener('click', searchCep);

function addLoading() {
  const h2 = document.createElement('h2');
  h2.className = 'loading';
  h2.innerHTML = 'carregando...';
  productsArea.appendChild(h2);
}

function hideLoading() {
  document.querySelector('.loading').remove();
}

async function addItems() {
  addLoading();
  const products = await fetchProductsList('computador');
  products.map((product) => productsArea.appendChild(createProductElement(product)));
  hideLoading();
}

window.onload = () => {
  addItems();
};
