export const getAddress = async (cep) => {
  const AWESOME_API = `https://cep.awesomeapi.com.br/json/${cep}`;
  const BRASIL_API = `https://brasilapi.com.br/api/cep/v2/${cep}`;

  const returnAPIS = await Promise.any([fetch(AWESOME_API), fetch(BRASIL_API)])
    .then((response) => response.json())
    .catch(() => {
      throw new Error('CEP não encontrado');
    });
  return returnAPIS;
};

export const searchCep = async () => {
  const spanInput = document.querySelector('.cart__address');

  try {
    const cepInput = document.querySelector('.cep-input');
    const d = await getAddress(cepInput.value);

    if (d !== undefined) {
      const returnAddress = `${d.address} - ${d.district} - ${d.city} - ${d.state}`;
      spanInput.innerHTML = returnAddress;
    }
  } catch (e) {
    spanInput.innerHTML = e.message;
  }
};
