// ================= AUTHENTICATION =================

// SIGN UP
const signupForm = document.getElementById("signupForm");

if (signupForm) {

    signupForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const name = document.getElementById("signupName").value.trim();
        const email = document.getElementById("signupEmail").value.trim();
        const password = document.getElementById("signupPassword").value;

        // Check if account already exists
        const existingUser = JSON.parse(localStorage.getItem("electroUser"));

        if (existingUser && existingUser.email === email) {
            alert("An account with this email already exists!");
            return;
        }

        // Save user information
        const user = {
            name: name,
            email: email,
            password: password
        };

        localStorage.setItem("electroUser", JSON.stringify(user));

        alert("Account created successfully! 🎉");

        // Go to login page
        window.location.href = "login.html";
    });
}


// LOGIN
const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const email = document.getElementById("loginEmail").value.trim();
        const password = document.getElementById("loginPassword").value;

        // Get saved user
        const savedUser = JSON.parse(localStorage.getItem("electroUser"));

        if (!savedUser) {
            alert("No account found. Please sign up first.");
            return;
        }

        // Check email and password
        if (
            email === savedUser.email &&
            password === savedUser.password
        ) {

            // Store login status
            localStorage.setItem("isLoggedIn", "true");

            alert("Login successful! 🎉");

            // Go to shopping page
            window.location.href = "index.html";

        } else {

            alert("Invalid email or password!");

        }
    });
}