async function testLogin() {
  const url = 'https://lms-backend-n83k.onrender.com/auth/login';
  const credentials = {
    email: 'superadmin@lms.com',
    password: 'SuperLmsPassword@2026'
  };

  console.log('Testing login at:', url);
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    });

    console.log('Status:', response.status);
    const data = await response.json();
    console.log('Response Body:', JSON.stringify(data, null, 2));
  } catch (err) {
    console.error('Error:', err.message);
  }
}

testLogin();
