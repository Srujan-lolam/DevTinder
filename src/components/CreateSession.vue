<template>
  <create-session class="create-session">
    <div class="session-container">
      <div class="session-header">
        <h2>Create New Session</h2>
        <button @click="closeModal" class="close-btn">×</button>
      </div>

      <form @submit.prevent="createSession" class="session-form">
        <div class="form-group">
          <label>Session Name</label>
          <input v-model="sessionForm.name" type="text" placeholder="Enter session name" required />
        </div>

        <div class="form-group">
          <label>Session Type</label>
          <select v-model="sessionForm.type" required>
            <option value="">Select type</option>
            <option value="shopping">Shopping Session</option>
            <option value="browsing">Browsing Session</option>
            <option value="checkout">Checkout Session</option>
          </select>
        </div>

        <div class="form-group">
          <label>Description</label>
          <textarea v-model="sessionForm.description" placeholder="Enter session description"></textarea>
        </div>

        <div class="form-group">
          <label>
            <input v-model="sessionForm.persistent" type="checkbox" />
            Make this session persistent
          </label>
        </div>

        <div class="form-group">
          <label>Session Timeout (minutes)</label>
          <input v-model.number="sessionForm.timeout" type="number" min="1" max="1440" />
        </div>

        <div class="form-actions">
          <button type="submit" class="btn-create">Create Session</button>
          <button type="button" @click="closeModal" class="btn-cancel">Cancel</button>
        </div>
      </form>

      <div v-if="error" class="error-message">{{ error }}</div>
      <div v-if="success" class="success-message">Session created successfully!</div>
    </div>
  </create-session>
</template>

<script>
export default {
  name: 'CreateSession',
  components: {},
  data() {
    return {
      sessionForm: {
        name: '',
        type: '',
        description: '',
        persistent: false,
        timeout: 30,
      },
      error: '',
      success: false,
      loading: false,
    };
  },
  computed: {},
  methods: {
    async createSession() {
      this.loading = true;
      this.error = '';
      this.success = false;

      try {
        // Create session API call
        this.success = true;
        this.$emit('session-created', this.sessionForm);
        
        setTimeout(() => {
          this.closeModal();
        }, 1500);
      } catch (err) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },
    closeModal() {
      this.$emit('close');
    },
  },
};
</script>

<style scoped>
.create-session {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.session-container {
  background: white;
  border-radius: 8px;
  padding: 30px;
  max-width: 500px;
  width: 90%;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  animation: modalIn 0.3s ease;
}

@keyframes modalIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.session-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  border-bottom: 1px solid #eee;
  padding-bottom: 15px;
}

.session-header h2 {
  margin: 0;
  color: #333;
}

.close-btn {
  background: none;
  border: none;
  font-size: 28px;
  cursor: pointer;
  color: #999;
  transition: color 0.3s ease;
}

.close-btn:hover {
  color: #333;
}

.session-form {
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #333;
}

.form-group input[type="text"],
.form-group input[type="number"],
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  font-family: inherit;
  box-sizing: border-box;
}

.form-group textarea {
  resize: vertical;
  min-height: 80px;
}

.form-group input[type="checkbox"] {
  margin-right: 8px;
  cursor: pointer;
}

.form-group input[type="text"]:focus,
.form-group input[type="number"]:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #2196f3;
  box-shadow: 0 0 0 3px rgba(33, 150, 243, 0.1);
}

.form-actions {
  display: flex;
  gap: 10px;
}

.btn-create,
.btn-cancel {
  flex: 1;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.btn-create {
  background-color: #2196f3;
  color: white;
}

.btn-create:hover {
  background-color: #1976d2;
}

.btn-cancel {
  background-color: #f5f5f5;
  color: #333;
  border: 1px solid #ddd;
}

.btn-cancel:hover {
  background-color: #eee;
}

.error-message {
  padding: 12px;
  background-color: #ffebee;
  color: #d32f2f;
  border-radius: 4px;
  font-size: 14px;
  margin-bottom: 10px;
}

.success-message {
  padding: 12px;
  background-color: #e8f5e9;
  color: #2e7d32;
  border-radius: 4px;
  font-size: 14px;
  margin-bottom: 10px;
}
</style>
