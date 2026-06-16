<template>
  <guest-wishlist-page class="guest-wishlist-page">
    <div class="container">
      <h1>My Wishlist</h1>

      <div class="wishlist-controls">
        <input 
          v-model="searchQuery" 
          type="text" 
          placeholder="Search wishlist..."
          class="search-input"
        />
        <select v-model="sortBy" class="sort-select">
          <option value="added">Recently Added</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="name">Name: A to Z</option>
        </select>
      </div>

      <div v-if="loading" class="loading">Loading wishlist...</div>
      <div v-else-if="error" class="error">{{ error }}</div>
      <div v-else class="wishlist-content">
        <div v-if="wishlistItems.length > 0" class="wishlist-grid">
          <div v-for="item in filteredItems" :key="item.id" class="wishlist-item">
            <div class="item-image">
              <img :src="item.image" :alt="item.name" />
              <button @click="removeItem(item.id)" class="btn-remove">Remove</button>
            </div>
            <div class="item-details">
              <h3>{{ item.name }}</h3>
              <p class="item-price">${{ item.price.toFixed(2) }}</p>
              <p v-if="item.inStock" class="in-stock">In Stock</p>
              <p v-else class="out-of-stock">Out of Stock</p>
              <div class="item-actions">
                <button @click="addToCart(item.id)" class="btn-cart">Add to Cart</button>
                <button @click="viewDetails(item.id)" class="btn-details">View Details</button>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="empty-wishlist">
          <p>Your wishlist is empty</p>
          <button @click="continueShopping" class="btn-shop">Continue Shopping</button>
        </div>

        <div v-if="wishlistItems.length > 0" class="wishlist-actions">
          <button @click="shareWishlist" class="btn-share">Share Wishlist</button>
          <button @click="clearWishlist" class="btn-clear">Clear Wishlist</button>
        </div>
      </div>
    </div>
  </guest-wishlist-page>
</template>

<script>
export default {
  name: 'GuestWishlistPage',
  components: {},
  data() {
    return {
      wishlistItems: [],
      searchQuery: '',
      sortBy: 'added',
      loading: false,
      error: null,
    };
  },
  computed: {
    filteredItems() {
      let items = this.wishlistItems.filter(item =>
        item.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );

      if (this.sortBy === 'price-low') {
        items.sort((a, b) => a.price - b.price);
      } else if (this.sortBy === 'price-high') {
        items.sort((a, b) => b.price - a.price);
      } else if (this.sortBy === 'name') {
        items.sort((a, b) => a.name.localeCompare(b.name));
      }

      return items;
    },
  },
  methods: {
    async fetchWishlist() {
      this.loading = true;
      try {
        // Fetch wishlist logic here
      } catch (err) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },
    removeItem(itemId) {
      this.wishlistItems = this.wishlistItems.filter(item => item.id !== itemId);
    },
    addToCart(itemId) {
      this.$emit('add-to-cart', itemId);
    },
    viewDetails(itemId) {
      this.$router.push(`/product/${itemId}`);
    },
    continueShopping() {
      this.$router.push('/products');
    },
    shareWishlist() {
      // Share wishlist logic
    },
    clearWishlist() {
      if (confirm('Are you sure you want to clear your entire wishlist?')) {
        this.wishlistItems = [];
      }
    },
  },
  mounted() {
    this.fetchWishlist();
  },
};
</script>

<style scoped>
.guest-wishlist-page {
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

.wishlist-controls {
  display: flex;
  gap: 15px;
  margin-bottom: 30px;
  flex-wrap: wrap;
}

.search-input,
.sort-select {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.search-input {
  flex: 1;
  min-width: 200px;
}

.loading,
.error {
  text-align: center;
  padding: 40px;
  font-size: 16px;
  background: white;
  border-radius: 8px;
}

.error {
  color: #d32f2f;
}

.wishlist-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.wishlist-item {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.wishlist-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.item-image {
  position: relative;
  width: 100%;
  height: 200px;
  overflow: hidden;
  background-color: #f0f0f0;
}

.item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.btn-remove {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: rgba(211, 47, 47, 0.9);
  color: white;
  border: none;
  padding: 8px 15px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.wishlist-item:hover .btn-remove {
  opacity: 1;
}

.item-details {
  padding: 15px;
}

.item-details h3 {
  margin: 0 0 10px 0;
  color: #333;
  font-size: 16px;
}

.item-price {
  font-size: 18px;
  font-weight: bold;
  color: #2196f3;
  margin: 10px 0;
}

.in-stock {
  color: #4caf50;
  font-size: 12px;
  font-weight: 500;
  margin: 5px 0;
}

.out-of-stock {
  color: #d32f2f;
  font-size: 12px;
  font-weight: 500;
  margin: 5px 0;
}

.item-actions {
  display: flex;
  gap: 10px;
  margin-top: 15px;
}

.btn-cart,
.btn-details {
  flex: 1;
  padding: 8px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.btn-cart {
  background-color: #2196f3;
  color: white;
}

.btn-cart:hover {
  background-color: #1976d2;
}

.btn-details {
  background-color: #f5f5f5;
  color: #333;
  border: 1px solid #ddd;
}

.btn-details:hover {
  background-color: #eee;
}

.empty-wishlist {
  text-align: center;
  padding: 60px 20px;
  background: white;
  border-radius: 8px;
}

.empty-wishlist p {
  color: #999;
  font-size: 18px;
  margin-bottom: 20px;
}

.btn-shop {
  background-color: #2196f3;
  color: white;
  border: none;
  padding: 10px 30px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.btn-shop:hover {
  background-color: #1976d2;
}

.wishlist-actions {
  display: flex;
  gap: 15px;
  justify-content: center;
  padding: 20px;
}

.btn-share,
.btn-clear {
  padding: 10px 30px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.btn-share {
  background-color: #4caf50;
  color: white;
}

.btn-share:hover {
  background-color: #45a049;
}

.btn-clear {
  background-color: #f5f5f5;
  color: #333;
  border: 1px solid #ddd;
}

.btn-clear:hover {
  background-color: #eee;
}
</style>
