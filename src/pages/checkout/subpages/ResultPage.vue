<template>
  <result-page class="result-page">
    <div class="container">
      <div class="result-content">
        <div v-if="orderStatus === 'success'" class="success-result">
          <div class="success-icon">✓</div>
          <h1>Order Placed Successfully!</h1>
          <p class="order-id">Order ID: {{ orderId }}</p>
          <p class="message">Thank you for your order. We'll send you an email confirmation shortly.</p>
          
          <div class="order-details">
            <h3>Order Details</h3>
            <div class="detail-item">
              <span>Order Date:</span>
              <span>{{ orderDate }}</span>
            </div>
            <div class="detail-item">
              <span>Estimated Delivery:</span>
              <span>{{ estimatedDelivery }}</span>
            </div>
            <div class="detail-item">
              <span>Total Amount:</span>
              <span>${{ totalAmount.toFixed(2) }}</span>
            </div>
            <div class="detail-item">
              <span>Payment Status:</span>
              <span class="status-badge success">Confirmed</span>
            </div>
          </div>

          <div class="action-buttons">
            <button @click="goToProfile" class="btn-primary">View Order History</button>
            <button @click="continueShopping" class="btn-secondary">Continue Shopping</button>
          </div>
        </div>

        <div v-else-if="orderStatus === 'failed'" class="failed-result">
          <div class="failed-icon">✕</div>
          <h1>Order Failed</h1>
          <p class="message">{{ errorMessage }}</p>
          
          <div class="action-buttons">
            <button @click="retryCheckout" class="btn-primary">Try Again</button>
            <button @click="goHome" class="btn-secondary">Go Home</button>
          </div>
        </div>

        <div v-else-if="orderStatus === 'pending'" class="pending-result">
          <div class="pending-spinner"></div>
          <h1>Processing Your Order</h1>
          <p class="message">Please wait while we process your order...</p>
        </div>
      </div>
    </div>
  </result-page>
</template>

<script>
export default {
  name: 'ResultPage',
  components: {},
  data() {
    return {
      orderId: 'ORD-2024-001',
      orderStatus: 'success', // success, failed, pending
      orderDate: new Date().toLocaleDateString(),
      estimatedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      totalAmount: 129.99,
      errorMessage: '',
      loading: false,
    };
  },
  computed: {},
  methods: {
    goToProfile() {
      this.$router.push('/profile');
    },
    continueShopping() {
      this.$router.push('/products');
    },
    retryCheckout() {
      this.$router.push('/checkout');
    },
    goHome() {
      this.$router.push('/');
    },
  },
  mounted() {
    // Fetch order result from API
  },
};
</script>

<style scoped>
.result-page {
  padding: 40px 20px;
  background-color: #f5f5f5;
  min-height: 100vh;
}

.container {
  max-width: 600px;
  margin: 0 auto;
}

.result-content {
  background: white;
  border-radius: 8px;
  padding: 40px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.success-result {
  animation: slideIn 0.5s ease;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.success-icon {
  width: 80px;
  height: 80px;
  background-color: #4caf50;
  color: white;
  font-size: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
}

.failed-icon {
  width: 80px;
  height: 80px;
  background-color: #d32f2f;
  color: white;
  font-size: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
}

.pending-spinner {
  width: 60px;
  height: 60px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #2196f3;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 20px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

h1 {
  color: #333;
  margin: 20px 0 10px;
}

.order-id {
  font-size: 18px;
  color: #2196f3;
  font-weight: bold;
  margin-bottom: 10px;
}

.message {
  color: #666;
  font-size: 16px;
  margin-bottom: 30px;
}

.order-details {
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 30px;
  text-align: left;
}

.order-details h3 {
  margin-top: 0;
  margin-bottom: 15px;
  color: #333;
}

.detail-item {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
  color: #666;
}

.detail-item:last-child {
  border-bottom: none;
}

.status-badge {
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: bold;
}

.status-badge.success {
  background-color: #c8e6c9;
  color: #2e7d32;
}

.action-buttons {
  display: flex;
  gap: 10px;
  flex-direction: column;
}

.btn-primary,
.btn-secondary {
  padding: 12px 30px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.btn-primary {
  background-color: #2196f3;
  color: white;
}

.btn-primary:hover {
  background-color: #1976d2;
}

.btn-secondary {
  background-color: #f5f5f5;
  color: #333;
  border: 1px solid #ddd;
}

.btn-secondary:hover {
  background-color: #eee;
}
</style>
