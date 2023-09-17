const config = {
  ingredientUrl: "https://norma.nomoreparties.space/api/ingredients",
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
  }).catch((err) => {
    console.log(err);
  });
}
