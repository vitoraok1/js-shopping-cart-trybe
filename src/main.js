import { searchCep } from './helpers/cepFunctions';
import { fetchProduct, fetchProductsList } from './helpers/fetchFunctions';
import { createCartProductElement, createProductElement } from './helpers/shopFunctions';
import { saveCartID, getSavedCartIDs } from './helpers/cartFunctions';
import './style.css';

const productsArea = document.querySelector('.products');
const cartContainer = document.querySelector('.cart__products');

document.querySelector('.cep-button').addEventListener('click', searchCep);

function loadCart() {
  const saveIds = getSavedCartIDs();
  saveIds.map((productId) => Promise.all([fetchProduct(productId)])
    .then((response) => response.map((id) => cartContainer
      .appendChild(createCartProductElement(id)))));
}

function addLoading() {
  const h2 = document.createElement('h2');

  h2.className = 'loading';
  h2.innerHTML = 'carregando...';
  productsArea.appendChild(h2);
}

function addErrorMessage(p) {
  const h2 = document.createElement('h2');
  if (p === 'error') {
    h2.className = 'error';
    h2.innerHTML = 'Algum erro ocorreu, recarregue a página e tente novamente';
    productsArea.appendChild(h2);
  }
}

function hideLoading() {
  document.querySelector('.loading').remove();
}

async function addItems() {
  addLoading();
  try {
    const products = await fetchProductsList('computador');
    products.map((product) => productsArea.appendChild(createProductElement(product)));
    hideLoading();
  } catch (e) {
    hideLoading();
    addErrorMessage('error');
  }
}

async function addCartItems(product) {
  const getID = product.target.parentNode.firstChild.innerHTML;
  const productDetails = await fetchProduct(getID);
  const addProduct = createCartProductElement(productDetails);
  cartContainer.appendChild(addProduct);

  saveCartID(getID);
}

function btnAddToCart() {
  const everyBtn = document.querySelectorAll('.product__add');
  everyBtn.forEach((eachBtn) => eachBtn.addEventListener('click', addCartItems));
}

window.onload = async () => {
  await addItems();
  loadCart();
  btnAddToCart();
};
