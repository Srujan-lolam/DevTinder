<template>
  <cart-page class="cart-page">
    <div class="container">
      <h1>Shopping Cart</h1>
      
      <div v-if="loading" class="loading">Loading cart...</div>
      <div v-else-if="error" class="error">{{ error }}</div>
      <div v-else class="cart-content">
        <div v-if="cartItems.length > 0" class="cart-items">
          <table class="cart-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Subtotal</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <!-- Cart items will be displayed here -->
            </tbody>
          </table>

          <div class="cart-summary">
            <h3>Order Summary</h3>
            <div class="summary-item">
              <span>Subtotal:</span>
              <span>${{ subtotal.toFixed(2) }}</span>
            </div>
            <div class="summary-item">
              <span>Shipping:</span>
              <span>${{ shipping.toFixed(2) }}</span>
            </div>
            <div class="summary-item">
              <span>Tax:</span>
              <span>${{ tax.toFixed(2) }}</span>
            </div>
            <div class="summary-item total">
              <span>Total:</span>
              <span>${{ total.toFixed(2) }}</span>
            </div>
            <button class="btn-checkout">Proceed to Checkout</button>
            <button class="btn-continue-shopping">Continue Shopping</button>
          </div>
        </div>
        
        <div v-else class="empty-cart">
          <h2>Your cart is empty</h2>
          <p>Start shopping to add items to your cart</p>
          <button class="btn-shop">Start Shopping</button>
        </div>
      </div>
    </div>
  </cart-page>
</template>

<script>
export default {
  name: 'CartPage',
  components: {},
  data() {
    return {
      cartItems: [],
      subtotal: 0,
      shipping: 10,
      tax: 0,
      total: 0,
      loading: false,
      error: null,
    };
  },
  computed: {},
  methods: {
    async fetchCart() {
      this.loading = true;
      try {
        // Fetch cart items logic here
      } catch (err) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },
    calculateTotal() {
      this.tax = this.subtotal * 0.1; // 10% tax
      this.total = this.subtotal + this.shipping + this.tax;
    },
    removeItem(itemId) {
      this.cartItems = this.cartItems.filter(item => item.id !== itemId);
      this.calculateTotal();
    },
    updateQuantity(itemId, quantity) {
      const item = this.cartItems.find(item => item.id === itemId);
      if (item) {
        item.quantity = quantity;
        this.calculateTotal();
      }
    },
  },
  mounted() {
    this.fetchCart();
  },
};
</script>

<style scoped>
.cart-page {
  padding: 20px;
  background-color: #f5f5f5;
  min-height: 100vh;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

h1 {
  text-align: center;
  margin-bottom: 30px;
  color: #333;
}

.loading,
.error {
  text-align: center;
  padding: 40px;
  font-size: 16px;
}

.error {
  color: #d32f2f;
}

.cart-content {
  display: flex;
  gap: 30px;
}

.cart-items {
  flex: 1;
}

.cart-table {
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
}

.cart-table thead {
  background-color: #f5f5f5;
  border-bottom: 2px solid #ddd;
}

.cart-table th,
.cart-table td {
  padding: 15px;
  text-align: left;
}

.cart-table tbody tr:hover {
  background-color: #f9f9f9;
}

.cart-summary {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 300px;
  position: sticky;
  top: 20px;
}

.cart-summary h3 {
  margin-top: 0;
  margin-bottom: 20px;
  border-bottom: 2px solid #f5f5f5;
  padding-bottom: 10px;
}

.summary-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  padding: 10px 0;
  border-bottom: 1px solid #f5f5f5;
}

.summary-item.total {
  font-size: 18px;
  font-weight: bold;
  color: #333;
  border-top: 2px solid #ddd;
  padding-top: 15px;
  margin-bottom: 20px;
}

.btn-checkout,
.btn-continue-shopping,
.btn-shop {
  width: 100%;
  padding: 12px;
  margin-bottom: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.btn-checkout {
  background-color: #2196f3;
  color: white;
}

.btn-checkout:hover {
  background-color: #1976d2;
}

.btn-continue-shopping,
.btn-shop {
  background-color: #f5f5f5;
  color: #333;
  border: 1px solid #ddd;
}

.btn-continue-shopping:hover,
.btn-shop:hover {
  background-color: #eee;
}

.empty-cart {
  text-align: center;
  padding: 60px 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.empty-cart h2 {
  color: #333;
  margin-bottom: 10px;
}

.empty-cart p {
  color: #999;
  margin-bottom: 30px;
}
</style>
