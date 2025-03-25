export const HTTP_METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE'
};

export const ROOT_API = process.env.NEXT_PUBLIC_SERVER_URL ?? '';

export const API_URL = {
  PRODUCT: `${ROOT_API}/product`,
  CART: `${ROOT_API}/carts`
};
