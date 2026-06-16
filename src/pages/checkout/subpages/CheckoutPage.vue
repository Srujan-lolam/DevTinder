<template>
  <checkout-page class="checkout-page">
    <div class="container">
      <h1>Checkout</h1>

      <div v-if="loading" class="loading">Processing...</div>
      <div v-else-if="error" class="error">{{ error }}</div>
      <div v-else class="checkout-container">
        <div class="checkout-form">
          <div class="form-section">
            <h2>Shipping Information</h2>
            <form>
              <div class="form-row">
                <div class="form-group">
                  <label>First Name</label>
                  <input v-model="form.firstName" type="text" placeholder="First Name" />
                </div>
                <div class="form-group">
                  <label>Last Name</label>
                  <input v-model="form.lastName" type="text" placeholder="Last Name" />
                </div>
              </div>
              <div class="form-group">
                <label>Email</label>
                <input v-model="form.email" type="email" placeholder="Email" />
              </div>
              <div class="form-group">
                <label>Address</label>
                <input v-model="form.address" type="text" placeholder="Street Address" />
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label>City</label>
                  <input v-model="form.city" type="text" placeholder="City" />
                </div>
                <div class="form-group">
                  <label>State</label>
                  <input v-model="form.state" type="text" placeholder="State" />
                </div>
                <div class="form-group">
                  <label>Zip Code</label>
                  <input v-model="form.zipCode" type="text" placeholder="Zip Code" />
                </div>
              </div>
            </form>
          </div>

          <div class="form-section">
            <h2>Payment Information</h2>
            <form>
              <div class="form-group">
                <label>Cardholder Name</label>
                <input v-model="form.cardName" type="text" placeholder="Name on Card" />
              </div>
              <div class="form-group">
                <label>Card Number</label>
                <input v-model="form.cardNumber" type="text" placeholder="1234 5678 9012 3456" />
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label>Expiration Date</label>
                  <input v-model="form.cardExpiry" type="text" placeholder="MM/YY" />
                </div>
                <div class="form-group">
                  <label>CVV</label>
                  <input v-model="form.cardCvv" type="text" placeholder="123" />
                </div>
              </div>
            </form>
          </div>

          <div class="form-section">
            <h2>Shipping Method</h2>
            <div class="shipping-options">
              <div class="shipping-option">
                <input id="standard" v-model="form.shippingMethod" type="radio" value="standard" />
                <label for="standard">Standard Shipping - $10.00 (5-7 days)</label>
              </div>
              <div class="shipping-option">
                <input id="express" v-model="form.shippingMethod" type="radio" value="express" />
                <label for="express">Express Shipping - $25.00 (2-3 days)</label>
              </div>
              <div class="shipping-option">
                <input id="overnight" v-model="form.shippingMethod" type="radio" value="overnight" />
                <label for="overnight">Overnight Shipping - $50.00 (Next day)</label>
              </div>
            </div>
          </div>
        </div>

        <div class="order-summary">
          <h2>Order Summary</h2>
          <div class="summary-items">
            <!-- Order items will be displayed here -->
          </div>
          <div class="summary-totals">
            <div class="total-item">
              <span>Subtotal:</span>
              <span>${{ subtotal.toFixed(2) }}</span>
            </div>
            <div class="total-item">
              <span>Shipping:</span>
              <span>${{ shippingCost.toFixed(2) }}</span>
            </div>
            <div class="total-item">
              <span>Tax:</span>
              <span>${{ tax.toFixed(2) }}</span>
            </div>
            <div class="total-item grand-total">
              <span>Total:</span>
              <span>${{ grandTotal.toFixed(2) }}</span>
            </div>
          </div>
          <button @click="submitOrder" class="btn-place-order">Place Order</button>
        </div>
      </div>
    </div>
  </checkout-page>
</template>

<script>
export default {
  name: 'CheckoutPage',
  components: {},
  data() {
    return {
      form: {
        firstName: '',
        lastName: '',
        email: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        cardName: '',
        cardNumber: '',
        cardExpiry: '',
        cardCvv: '',
        shippingMethod: 'standard',
      },
      subtotal: 0,
      tax: 0,
      shippingCost: 10,
      loading: false,
      error: null,
    };
  },
  computed: {
    grandTotal() {
      return this.subtotal + this.shippingCost + this.tax;
    },
  },
  methods: {
    async fetchOrderSummary() {
      this.loading = true;
      try {
        // Fetch order summary logic here
      } catch (err) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },
    async submitOrder() {
      this.loading = true;
      try {
        // Submit order logic here
      } catch (err) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },
  },
  mounted() {
    this.fetchOrderSummary();
  },
};
</script>

<style scoped>
.checkout-page {
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

.checkout-container {
  display: flex;
  gap: 30px;
}

.checkout-form {
  flex: 1;
}

.form-section {
  background: white;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.form-section h2 {
  margin-top: 0;
  margin-bottom: 20px;
  color: #333;
  border-bottom: 2px solid #f5f5f5;
  padding-bottom: 10px;
}

.form-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #333;
}

.form-group input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  box-sizing: border-box;
}

.form-group input:focus {
  outline: none;
  border-color: #2196f3;
  box-shadow: 0 0 0 3px rgba(33, 150, 243, 0.1);
}

.shipping-options {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.shipping-option {
  display: flex;
  align-items: center;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.shipping-option:hover {
  background-color: #f9f9f9;
}

.shipping-option input[type="radio"] {
  margin-right: 10px;
  cursor: pointer;
}

.shipping-option label {
  margin: 0;
  cursor: pointer;
  flex: 1;
}

.order-summary {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  height: fit-content;
  position: sticky;
  top: 20px;
  width: 350px;
}

.order-summary h2 {
  margin-top: 0;
  margin-bottom: 20px;
  color: #333;
}

.summary-items {
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #eee;
}

.summary-totals {
  margin-bottom: 20px;
}

.total-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  padding: 10px 0;
  border-bottom: 1px solid #f5f5f5;
}

.total-item.grand-total {
  font-size: 18px;
  font-weight: bold;
  color: #333;
  border-top: 2px solid #ddd;
  border-bottom: none;
  padding-top: 15px;
  margin-bottom: 20px;
}

.btn-place-order {
  width: 100%;
  padding: 12px;
  background-color: #2196f3;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-place-order:hover {
  background-color: #1976d2;
}
</style>
