export const fetchProduct = () => {
  // seu código aqui
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
