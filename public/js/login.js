const loginFormHandler = async (event) => {
  event.preventDefault();

  const username = document.querySelector('#user-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (username && password) {
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }), // Changed 'email' to 'username'
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/homepage'); // Replace with the actual path to your homepage
    } else {
      alert('Failed to log in');
    }
  }
};

const signupFormHandler = async (event) => {
  event.preventDefault();

  const newUsername = document.querySelector('#username-signup').value.trim();
  const newPassword = document.querySelector('#password-signup').value.trim();

  if (newUsername && newPassword) {
    const response = await fetch('/api/users/signup', {
      method: 'POST',
      body: JSON.stringify({ username: newUsername, password: newPassword }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      alert('Signup successful! You can now log in.');
    } else {
      alert('Failed to sign up');
    }
  }
};

document.querySelector('.login-form').addEventListener('submit', loginFormHandler);
document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);

  