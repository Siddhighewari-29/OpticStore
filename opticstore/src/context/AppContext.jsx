import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  useCallback,
} from 'react';

import { fetchProducts, loginUser } from '../services/api';

const AppContext = createContext(null);

const STORAGE_KEYS = {
  auth: 'opticstore_auth',
  cart: 'opticstore_cart',
  wishlist: 'opticstore_wishlist',
};

// ===============================
// Local Storage
// Cart + Wishlist साठी
// ===============================

function readStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (err) {
    console.error(`Failed to read ${key} from localStorage`, err);
    return fallback;
  }
}

function writeStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error(`Failed to write ${key} to localStorage`, err);
  }
}

// ===============================
// Session Storage
// Login user साठी
// ===============================

function readSessionUser() {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEYS.auth);
    return raw ? JSON.parse(raw) : null;
  } catch (err) {
    console.error('Failed to read auth session', err);
    return null;
  }
}

function writeSessionUser(user) {
  try {
    sessionStorage.setItem(
      STORAGE_KEYS.auth,
      JSON.stringify(user)
    );
  } catch (err) {
    console.error('Failed to write auth session', err);
  }
}

export function AppProvider({ children }) {

  // ===============================
  // Auth
  // ===============================

  const [user, setUser] = useState(() => readSessionUser());

  const login = useCallback(async (email, password) => {

    const loggedInUser = await loginUser(email, password);

    const sessionUser = {
  id: loggedInUser.id,
  name: loggedInUser.fullName,
  email: loggedInUser.email,
  phone: loggedInUser.phone,
  address: loggedInUser.address,
  city: loggedInUser.city,
  state: loggedInUser.state,
  pincode: loggedInUser.pincode,
};

    setUser(sessionUser);

    // Login session मध्ये save
    writeSessionUser(sessionUser);

    return sessionUser;

  }, []);

  const logout = useCallback(() => {

    setUser(null);

    // फक्त login session remove होईल
    sessionStorage.removeItem(STORAGE_KEYS.auth);

  }, []);

  // ===============================
  // Products
  // ===============================

  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const [productsError, setProductsError] = useState(null);

  useEffect(() => {

    let isMounted = true;

    setProductsLoading(true);

    fetchProducts()
      .then((data) => {
        if (isMounted) {
          setProducts(data);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setProductsError(
            err.message || 'Failed to load products'
          );
        }
      })
      .finally(() => {
        if (isMounted) {
          setProductsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };

  }, []);

  // ===============================
  // Cart
  // ===============================

  const [cart, setCart] = useState(() =>
    readStorage(STORAGE_KEYS.cart, [])
  );

  useEffect(() => {
    writeStorage(STORAGE_KEYS.cart, cart);
  }, [cart]);

  const addToCart = useCallback((product, qty = 1) => {

    setCart((prev) => {

      const existing = prev.find(
        (item) => item.id === product.id
      );

      if (existing) {

        return prev.map((item) =>
          item.id === product.id
            ? {
                ...item,
                qty: item.qty + qty,
              }
            : item
        );

      }

      return [
        ...prev,
        {
          ...product,
          qty,
        },
      ];

    });

  }, []);

  const removeFromCart = useCallback((productId) => {

    setCart((prev) =>
      prev.filter((item) => item.id !== productId)
    );

  }, []);

  const updateCartQty = useCallback((productId, qty) => {

    setCart((prev) =>
      prev
        .map((item) =>
          item.id === productId
            ? {
                ...item,
                qty: Math.max(1, qty),
              }
            : item
        )
        .filter((item) => item.qty > 0)
    );

  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const cartCount = useMemo(
    () =>
      cart.reduce(
        (sum, item) => sum + item.qty,
        0
      ),
    [cart]
  );

  const cartSubtotal = useMemo(
    () =>
      cart.reduce(
        (sum, item) =>
          sum + item.price * item.qty,
        0
      ),
    [cart]
  );

  // ===============================
  // Wishlist
  // ===============================

  const [wishlist, setWishlist] = useState(() =>
    readStorage(STORAGE_KEYS.wishlist, [])
  );

  useEffect(() => {
    writeStorage(
      STORAGE_KEYS.wishlist,
      wishlist
    );
  }, [wishlist]);

  const isInWishlist = useCallback(
    (productId) =>
      wishlist.some(
        (item) => item.id === productId
      ),
    [wishlist]
  );

  const toggleWishlist = useCallback((product) => {

    setWishlist((prev) => {

      const exists = prev.some(
        (item) => item.id === product.id
      );

      if (exists) {
        return prev.filter(
          (item) => item.id !== product.id
        );
      }

      return [
        ...prev,
        product,
      ];

    });

  }, []);

  const removeFromWishlist = useCallback((productId) => {

    setWishlist((prev) =>
      prev.filter(
        (item) => item.id !== productId
      )
    );

  }, []);

  // ===============================
  // Search / Filters
  // ===============================

  const [searchTerm, setSearchTerm] = useState('');

  // ===============================
  // Context Value
  // ===============================

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
      isAuthenticated: Boolean(user),

      products,
      productsLoading,
      productsError,

      cart,
      addToCart,
      removeFromCart,
      updateCartQty,
      clearCart,
      cartCount,
      cartSubtotal,

      wishlist,
      isInWishlist,
      toggleWishlist,
      removeFromWishlist,
      wishlistCount: wishlist.length,

      searchTerm,
      setSearchTerm,
    }),

    [
      user,
      login,
      logout,
      products,
      productsLoading,
      productsError,
      cart,
      addToCart,
      removeFromCart,
      updateCartQty,
      clearCart,
      cartCount,
      cartSubtotal,
      wishlist,
      isInWishlist,
      toggleWishlist,
      removeFromWishlist,
      searchTerm,
    ]
  );

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {

  const ctx = useContext(AppContext);

  if (!ctx) {
    throw new Error(
      'useApp must be used within an AppProvider'
    );
  }

  return ctx;
}