import axios from 'axios';
import products from '../data/products';

// Backend API
export const apiClient = axios.create({
  baseURL:
    import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080',
  timeout: 8000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ===============================
// AUTH
// ===============================

// POST /api/auth/login
export async function loginUser(email, password) {
  const { data } = await apiClient.post('/api/auth/login', {
    email,
    password,
  });

  return data;
}

// POST /api/auth/register
export async function registerUser(
  fullName,
  email,
  password,
  phone,
  address,
  city,
  state,
  pincode
) {
  const { data } = await apiClient.post('/api/auth/register', {
    fullName,
    email,
    password,
    phone,
    address,
    city,
    state,
    pincode,
  });

  return data;
}

// PUT /api/auth/profile/{id}
export async function updateProfile(
  id,
  fullName,
  phone,
  address,
  city,
  state,
  pincode
) {
  const { data } = await apiClient.put(
    `/api/auth/profile/${id}`,
    {
      fullName,
      phone,
      address,
      city,
      state,
      pincode,
    }
  );

  return data;
}

// ===============================
// PRODUCTS
// ===============================

// GET /products
export async function fetchProducts() {
  await new Promise((resolve) => setTimeout(resolve, 350));

  return products;
}

// GET /products/:id
export async function fetchProductById(id) {
  await new Promise((resolve) => setTimeout(resolve, 350));

  const found = products.find(
    (p) => p.id === Number(id)
  );

  if (!found) {
    throw new Error('Product not found');
  }

  return found;
}

// ===============================
// ORDERS
// ===============================

// GET USER ORDERS
export async function fetchUserOrders(email) {
  const { data } = await apiClient.get(
    `/api/orders/user/${encodeURIComponent(email)}`
  );

  return data;
}
// POST /api/orders
export async function placeOrder(orderPayload) {
  const { data } = await apiClient.post('/api/orders', {
    fullName: orderPayload.customer.fullName,
    email: orderPayload.customer.email,
    phone: orderPayload.customer.phone,
    address: orderPayload.customer.address,
    city: orderPayload.customer.city,
    state: orderPayload.customer.state,
    pincode: orderPayload.customer.pincode,

    subtotal: orderPayload.subtotal,
    delivery: orderPayload.delivery,
    total: orderPayload.total,
    paymentMethod: orderPayload.paymentMethod,

    items: orderPayload.items.map((item) => ({
      productId: String(item.id),
      productName: item.name,
      price: item.price,
      qty: item.qty,
    })),
  });

  return data;
}

// ===============================
// CONTACT
// ===============================

// POST /contact
export async function submitContactForm(formPayload) {
  await new Promise((resolve) => setTimeout(resolve, 350));

  return {
    success: true,
    receivedAt: new Date().toISOString(),
    ...formPayload,
  };
}