import { get, onValue, ref, set, update } from 'firebase/database';
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

  const product = products.filter((item) => item.id === itemId);
  return product || null;
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
    [`carts/${userId}/items/${itemId}/id`]: product[0].id,
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

export const removeFromCart = async (userId, itemId) => {
  const cart = await getCartByUserId(userId);

  console.log(itemId);
  let updates = {
    [`carts/${userId}/items/${itemId}/quantity`]: cart[0][itemId]?.quantity - 1,
  };

  if (cart[0][itemId]?.quantity <= 1) {
    updates = {
      [`carts/${userId}/items/${itemId}`]: null,
    };
  }
  await update(ref(db), updates);
  console.log('Data updated successfully');
};

export const onCartChange = (userId, callback) => {
  const cartRef = ref(db, `carts/${userId}/items`);

  const unsubscribe = onValue(cartRef, (snapshot) => {
    if (snapshot.exists()) {
      const items = Object.values(snapshot.val());
      callback(items);
    } else {
      callback([]);
    }
  });
  return unsubscribe;
};

export const setInitialCartData = async (userId, initialData) => {
  const cartRef = ref(db, `carts/${userId}/items`);
  await set(cartRef, initialData);
};
