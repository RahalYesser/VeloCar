export const initAdmin = () => {
  const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];
  
  // Check if admin already exists
  const adminExists = registeredUsers.some(user => user.role === 'admin');
  
  if (!adminExists) {
    const adminUser = {
      id: 'admin-' + Date.now(),
      name: 'Admin',
      email: 'admin@admin.com',
      password: 'admin123',
      role: 'admin'
    };
    
    registeredUsers.push(adminUser);
    localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
    console.log('✅ Admin user initialized with email: admin@admin.com and password: admin123');
  }
};
