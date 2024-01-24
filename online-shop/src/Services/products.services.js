import { get, ref, set, update } from 'firebase/database';
import { db } from '../Config/firebase-config';

export const getAllProducts = async () => {
  return get(ref(db, 'products')).then((snapshot) => {
    if (!snapshot.exists()) {
      return [];
    }
    return Object.values(snapshot.val());
  });
};

export const getProductById = async (itemId) => {
  const products = await getAllProducts();
  return products.filter((item) => item.id === itemId);
};

export const setCartByUserId = async (userId) => {
  return set(ref(db, `carts/${userId}`), {
    items: [],
    createdOn: Date.now(),
  });
};

export const getCartByUserId = async (userId) => {
  return get(ref(db, `carts/${userId}`)).then((snapshot) => {
    if (!snapshot.exists()) {
      return [];
    }
    return Object.values(snapshot.val());
  });
};

export const checkForItemInCart = async (userId, itemId) => {
  return get(ref(db, `carts/${userId}/items/${itemId}`)).then((snapshot) => {
    return snapshot.exists();
  });
};

export const addToCart = async (userId, itemId) => {
  const product = await getProductById(itemId);
  const cart = await getCartByUserId(userId);
  let item = await checkForItemInCart(userId, itemId);
  if (!cart) {
    await setCartByUserId(userId);
    //cart = {};
  }

  let updates = {
    [`carts/${userId}/items/${itemId}/title`]: product[0].title,
    [`carts/${userId}/items/${itemId}/image`]: product[0].image,
    [`carts/${userId}/items/${itemId}/price`]: product[0].price,
    [`carts/${userId}/items/${itemId}/quantity`]: 1,
  };

  if (item) {
    updates = {
      [`carts/${userId}/items/${itemId}/quantity`]:
        cart[0][itemId]?.quantity + 1,
    };
  }
  await update(ref(db), updates);
  console.log('Data updated successfully');
};

export const getAllCartItems = async (userId) => {
  return get(ref(db, `carts/${userId}/items`)).then((snapshot) => {
    if (!snapshot.exists()) {
      return [];
    }
    return Object.values(snapshot.val());
  });
};
