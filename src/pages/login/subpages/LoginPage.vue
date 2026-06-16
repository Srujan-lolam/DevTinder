<template>
  <login-page class="login-page">
    <div class="login-container">
      <div class="login-box">
        <div class="login-header">
          <h1>Login</h1>
          <p>Sign in to your account</p>
        </div>

        <div v-if="error" class="error-message">{{ error }}</div>
        <div v-if="success" class="success-message">{{ success }}</div>

        <form @submit.prevent="handleLogin" class="login-form">
          <div class="form-group">
            <label for="email">Email Address</label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              placeholder="Enter your email"
              required
            />
          </div>

          <div class="form-group">
            <label for="password">Password</label>
            <div class="password-input">
              <input
                id="password"
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="Enter your password"
                required
              />
              <button 
                type="button" 
                @click="showPassword = !showPassword"
                class="toggle-password"
              >
                {{ showPassword ? '👁️' : '👁️‍🗨️' }}
              </button>
            </div>
          </div>

          <div class="form-group remember-forgot">
            <label>
              <input v-model="form.rememberMe" type="checkbox" />
              Remember me
            </label>
            <a href="#" class="forgot-password">Forgot Password?</a>
          </div>

          <button type="submit" :disabled="loading" class="btn-login">
            {{ loading ? 'Logging in...' : 'Login' }}
          </button>
        </form>

        <div class="divider">OR</div>

        <div class="social-login">
          <button @click="loginWithGoogle" class="btn-google">
            <span>Google</span>
          </button>
          <button @click="loginWithFacebook" class="btn-facebook">
            <span>Facebook</span>
          </button>
        </div>

        <div class="signup-link">
          <p>Don't have an account? <a href="/signup">Sign up here</a></p>
        </div>
      </div>

      <div class="login-image">
        <div class="image-content">
          <h2>Welcome Back</h2>
          <p>Continue your shopping journey with us</p>
        </div>
      </div>
    </div>
  </login-page>
</template>

<script>
export default {
  name: 'loginPage',
  components: {},
  data() {
    return {
      form: {
        email: '',
        password: '',
        rememberMe: false,
      },
      showPassword: false,
      loading: false,
      error: '',
      success: '',
    };
  },
  computed: {},
  methods: {
    async handleLogin() {
      this.loading = true;
      this.error = '';
      this.success = '';

      try {
        // Login API call
        if (!this.form.email || !this.form.password) {
          throw new Error('Email and password are required');
        }

        // Simulate API call
        this.success = 'Login successful! Redirecting...';
        
        setTimeout(() => {
          this.$router.push('/');
        }, 2000);
      } catch (err) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },
    async loginWithGoogle() {
      // Google login logic
    },
    async loginWithFacebook() {
      // Facebook login logic
    },
  },
  mounted() {},
};
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
}

.login-container {
  display: flex;
  gap: 40px;
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  max-width: 900px;
  width: 100%;
}

.login-box {
  flex: 1;
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.login-header {
  margin-bottom: 30px;
}

.login-header h1 {
  margin: 0 0 10px 0;
  color: #333;
  font-size: 28px;
}

.login-header p {
  margin: 0;
  color: #999;
  font-size: 14px;
}

.error-message {
  padding: 12px;
  background-color: #ffebee;
  color: #d32f2f;
  border-radius: 4px;
  margin-bottom: 20px;
  font-size: 14px;
}

.success-message {
  padding: 12px;
  background-color: #e8f5e9;
  color: #2e7d32;
  border-radius: 4px;
  margin-bottom: 20px;
  font-size: 14px;
}

.login-form {
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
  font-size: 14px;
}

.form-group input[type="email"],
.form-group input[type="password"],
.password-input {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  box-sizing: border-box;
}

.password-input {
  display: flex;
  align-items: center;
  padding: 0;
}

.password-input input {
  border: 1px solid #ddd;
  border-right: none;
  border-radius: 4px 0 0 4px;
  flex: 1;
  padding: 12px;
  margin: 0;
}

.toggle-password {
  background: #f5f5f5;
  border: 1px solid #ddd;
  border-left: none;
  border-radius: 0 4px 4px 0;
  padding: 12px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.toggle-password:hover {
  background-color: #eee;
}

.form-group input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.remember-forgot {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.remember-forgot label {
  margin: 0;
  display: flex;
  align-items: center;
  cursor: pointer;
}

.remember-forgot input[type="checkbox"] {
  margin-right: 8px;
}

.forgot-password {
  color: #667eea;
  text-decoration: none;
  font-size: 14px;
  transition: color 0.3s ease;
}

.forgot-password:hover {
  color: #764ba2;
}

.btn-login {
  width: 100%;
  padding: 12px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.btn-login:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

.btn-login:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.divider {
  text-align: center;
  color: #999;
  margin: 30px 0;
  position: relative;
}

.divider::before,
.divider::after {
  content: '';
  position: absolute;
  top: 50%;
  width: 45%;
  height: 1px;
  background-color: #ddd;
}

.divider::before {
  left: 0;
}

.divider::after {
  right: 0;
}

.social-login {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.btn-google,
.btn-facebook {
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  background-color: #f5f5f5;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s ease;
}

.btn-google:hover,
.btn-facebook:hover {
  background-color: #eee;
}

.signup-link {
  text-align: center;
  margin-top: 20px;
}

.signup-link p {
  margin: 0;
  color: #666;
  font-size: 14px;
}

.signup-link a {
  color: #667eea;
  text-decoration: none;
  font-weight: 500;
}

.signup-link a:hover {
  text-decoration: underline;
}

.login-image {
  flex: 1;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-align: center;
  padding: 40px;
}

.image-content h2 {
  font-size: 32px;
  margin-bottom: 15px;
}

.image-content p {
  font-size: 16px;
  opacity: 0.9;
}

@media (max-width: 768px) {
  .login-container {
    flex-direction: column;
    gap: 0;
  }

  .login-image {
    display: none;
  }

  .login-box {
    padding: 30px;
  }
}
</style>
