const API = "http://localhost:5000/api/cart";

export const addToCartAPI = async (data) => {
  const res = await fetch(`${API}/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await res.json();
  console.log(result)
  return result;
};

export const getCartAPI = async (userId) => {
  const res = await fetch(`${API}/${userId}`);

  const result = await res.json();
  return result;
};
export const updateQuantityAPI = async (data) => {
  const res = await fetch(`${API}/update`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  return res.json();
};

export const clearCartAPI = async (userId) => {

  const res = await fetch(`${API}/clear/${userId}`, {
    method: "DELETE"
  });

  return res.json();
};