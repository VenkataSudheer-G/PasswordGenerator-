const result = document.getElementById("result");
const copyBtn = document.getElementById("copyBtn");
const length = document.getElementById("length");
const uppercase = document.getElementById("uppercase");
const lowercase = document.getElementById("lowercase");
const numbers = document.getElementById("numbers");
const symbols = document.getElementById("symbols");
const generateBtn = document.getElementById("generateBtn");
const strengthIndicator = document.getElementById("strengthIndicator");
const themeBtn = document.getElementById("themeBtn");

// Character sets
const upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerChars = "abcdefghijklmnopqrstuvwxyz";
const numberChars = "0123456789";
const symbolChars = "!@#$%^&*()_+-={}[]|:;<>,.?/";

// Generate Password
function generatePassword() {
    let passLength = length.value;
    let characters = "";

    if (uppercase.checked) characters += upperChars;
    if (lowercase.checked) characters += lowerChars;
    if (numbers.checked) characters += numberChars;
    if (symbols.checked) characters += symbolChars;

    if (!characters.length) {
        alert("Please select at least one option!");
        return;
    }

    let password = "";
    for (let i = 0; i < passLength; i++) {
        password += characters[Math.floor(Math.random() * characters.length)];
    }

    result.value = password;
    checkStrength(password);
}
result.addEventListener("input", () => {
    checkStrength(result.value);
});


// Check Password Strength
function checkStrength(password) {
    let strength = 0;

    // CONDITIONS
    if (password.length >= 6) strength++;       // length rule
    if (/[A-Z]/.test(password)) strength++;     // uppercase
    if (/[a-z]/.test(password)) strength++;     // lowercase
    if (/[0-9]/.test(password)) strength++;     // numbers
    if (/[^A-Za-z0-9]/.test(password)) strength++; // symbols

    // STRENGTH BAR SETTINGS
    if (strength <= 2) {
        strengthIndicator.style.width = "33%";
        strengthIndicator.style.background = "red";
    } 
    else if (strength === 3 || strength === 4) {
        strengthIndicator.style.width = "66%";
        strengthIndicator.style.background = "orange";
    } 
    else if (strength >= 5) {
        strengthIndicator.style.width = "100%";
        strengthIndicator.style.background = "green";
    }
}


// Copy to clipboard
copyBtn.addEventListener("click", () => {
    if (!result.value) return;

    navigator.clipboard.writeText(result.value);
    copyBtn.innerText = "Copied!";
    setTimeout(() => (copyBtn.innerText = "Copy"), 1500);
});

// Dark/Light Mode Toggle
themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("light");

    themeBtn.innerText = 
        document.body.classList.contains("light")
        ? "🌞 Light Mode"
        : "🌙 Dark Mode";
});

generateBtn.addEventListener("click", generatePassword);
