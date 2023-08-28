const signupForm = document.querySelector('#signup-form');

signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.querySelector('#username').value;
    const password = document.querySelector('#password').value;

    try {
        // Send a POST request to your signup route
        const response = await fetch('/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, email, password })
        });

        if (response.ok) {
            // If signup is successful, log the user in
            window.location.href = '/login'; // Redirect to login page
        } else {
            // Handle signup error (display error message, etc.)
        }
    } catch (error) {
        // Handle fetch error
    }
});
