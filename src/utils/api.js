const config = {
  ingredientUrl: "https://norma.nomoreparties.space/api/ingredients",
  orderUrl: "https://norma.nomoreparties.space/api/orders",
};

function getResponseData(res) {
  if (!res.ok) {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  return res.json();
}

function requestApi(url, headers) {
  return fetch(url, {
    method: "GET",
    headers: headers,
  }).then((res) => getResponseData(res));
}

export function getDataIngredients() {
  return requestApi(config.ingredientUrl, {
    "Content-Type": "application/json",
  });
}

export function getOrderDetails(data) {
  return fetch(config.orderUrl, {
    method: "POST",
    body: JSON.stringify({
      ingredients: data,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => getResponseData(res))
    .catch((error) => {
      console.error("Error in getOrderDetails:", error);
      throw error;
    });
}
