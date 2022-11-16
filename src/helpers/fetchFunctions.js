export const fetchProduct = async (id) => {
  if (typeof id === 'undefined') {
    throw new Error('ID não informado');
  }
  const PRODUCT_API = `https://api.mercadolibre.com/items/${id}`;
  const productDetail = await fetch(PRODUCT_API);
  const infoList = await productDetail.json();
  return infoList;
};

export const fetchProductsList = async (product) => {
  if (typeof product === 'undefined') {
    throw new Error('Termo de busca não informado');
  }
  const ML_API = `https://api.mercadolibre.com/sites/MLB/search?q=${product}`;
  const productsList = await fetch(ML_API);
  const dataList = await productsList.json();
  return dataList.results;
};
