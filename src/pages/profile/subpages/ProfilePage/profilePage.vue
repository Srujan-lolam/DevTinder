<template>
  <profile-page class="profile-page">
    <div class="container">
      <h1>My Profile</h1>
      <div class="profile-content">
        <div class="profile-header">
          <div class="profile-avatar">
            <img src="default-avatar.png" alt="Profile Avatar" />
          </div>
          <div class="profile-info">
            <h2>User Name</h2>
            <p class="email">user@example.com</p>
            <button class="btn-edit-profile">Edit Profile</button>
          </div>
        </div>

        <div class="profile-details">
          <div class="details-card">
            <h3>Personal Information</h3>
            <div class="info-item">
              <label>First Name:</label>
              <span>{{ user.firstName }}</span>
            </div>
            <div class="info-item">
              <label>Last Name:</label>
              <span>{{ user.lastName }}</span>
            </div>
            <div class="info-item">
              <label>Email:</label>
              <span>{{ user.email }}</span>
            </div>
            <div class="info-item">
              <label>Phone:</label>
              <span>{{ user.phone }}</span>
            </div>
          </div>

          <div class="details-card">
            <h3>Address Information</h3>
            <div class="info-item">
              <label>Street:</label>
              <span>{{ user.address?.street }}</span>
            </div>
            <div class="info-item">
              <label>City:</label>
              <span>{{ user.address?.city }}</span>
            </div>
            <div class="info-item">
              <label>State:</label>
              <span>{{ user.address?.state }}</span>
            </div>
            <div class="info-item">
              <label>Zip Code:</label>
              <span>{{ user.address?.zipCode }}</span>
            </div>
          </div>

          <div class="details-card">
            <h3>Preferences</h3>
            <div class="info-item">
              <label>Language:</label>
              <span>English</span>
            </div>
            <div class="info-item">
              <label>Newsletter:</label>
              <span>{{ user.newsletter ? 'Subscribed' : 'Not Subscribed' }}</span>
            </div>
            <div class="info-item">
              <label>Member Since:</label>
              <span>{{ user.createdAt }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </profile-page>
</template>

<script>
export default {
  name: 'profilePage',
  components: {},
  data() {
    return {
      user: {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phone: '+1 (555) 000-0000',
        address: {
          street: '123 Main St',
          city: 'New York',
          state: 'NY',
          zipCode: '10001',
        },
        newsletter: true,
        createdAt: '2024-01-15',
      },
      loading: false,
      error: null,
    };
  },
  computed: {},
  methods: {
    async fetchUserProfile() {
      this.loading = true;
      try {
        // Fetch user profile logic here
      } catch (err) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },
  },
  mounted() {
    this.fetchUserProfile();
  },
};
</script>

<style scoped>
.profile-page {
  padding: 20px;
  background-color: #f5f5f5;
  min-height: 100vh;
}

.container {
  max-width: 1000px;
  margin: 0 auto;
}

h1 {
  text-align: center;
  margin-bottom: 30px;
  color: #333;
}

.profile-content {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.profile-header {
  display: flex;
  gap: 30px;
  padding: 30px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  align-items: center;
}

.profile-avatar {
  flex-shrink: 0;
}

.profile-avatar img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 4px solid white;
  object-fit: cover;
}

.profile-info h2 {
  margin: 0 0 5px 0;
  font-size: 24px;
}

.email {
  margin: 0 0 15px 0;
  opacity: 0.9;
}

.btn-edit-profile {
  background-color: rgba(255, 255, 255, 0.2);
  color: white;
  border: 1px solid white;
  padding: 8px 20px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-edit-profile:hover {
  background-color: rgba(255, 255, 255, 0.3);
}

.profile-details {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  padding: 30px;
}

.details-card {
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 20px;
  background-color: #f9f9f9;
}

.details-card h3 {
  margin-top: 0;
  margin-bottom: 15px;
  color: #333;
  border-bottom: 2px solid #667eea;
  padding-bottom: 10px;
}

.info-item {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
}

.info-item:last-child {
  border-bottom: none;
}

.info-item label {
  font-weight: 500;
  color: #666;
}

.info-item span {
  color: #333;
}
</style>
