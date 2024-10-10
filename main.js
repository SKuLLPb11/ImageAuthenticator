const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');
let uppass = [];
let inpass = [];
let selectedPassword = "";

// Mapping each image ID to a specific string of characters
const imageToStringMap = {
    "s01": "@b=",
    "s02": "^",
    "s03": "gh!",
    "s04": "jk#",
    "s05": "*n0",
    "s06": "p)r",
    "s07": "$tu",
    "s08": "^",
    "s09": "y1",
    "s10": "2*4",
    "s11": "57",
    "s12": "8&&0",
    "s13": "A^C",
    "s14": "DkF",
    "s15": "9I"
};

signUpButton.addEventListener('click', () => {
    container.classList.add('right-panel-active');
});

signInButton.addEventListener('click', () => {
    container.classList.remove('right-panel-active');
});

// Image selection for signup
function upimg(element) {
    const imageId = element.id; // Get the ID of the selected image
    const imageString = imageToStringMap[imageId]; // Get the string associated with the image

    if (element.querySelector('img').classList.contains('clicked')) {
        element.querySelector('img').classList.remove('clicked');
        uppass = uppass.filter(item => item !== imageId);
        selectedPassword = selectedPassword.replace(imageString, "");
    } else {
        element.querySelector('img').classList.add('clicked');
        uppass.push(imageId);
        selectedPassword += imageString; // Append the string to the password
    }

    displayPassword(selectedPassword); // Update the displayed password
    displayPasswordStrength(selectedPassword); // Update password strength
}

// Display the generated password
function displayPassword(password) {
    document.getElementById('generated-password').innerText = `Generated Password: ${password}`;
}

// Display the password strength
function displayPasswordStrength(password) {
    const strength = zxcvbn(password); // Assess password strength using zxcvbn
    const strengthText = `Password Strength: ${(strength.score*100)/4-3}`; // zxcvbn score ranges from 0 to 4
    document.getElementById('password-strength').innerText = strengthText;
}

function signup() {
    sessionStorage.setItem("upname", document.getElementById('upmail').value);
    sessionStorage.setItem("uppass", uppass.join(',')); // Store as a string
    alert("Account Created Successfully");
}

function inimg(element) {
    const imageId = element.id; // Get the ID of the selected image
    if (element.querySelector('img').classList.contains('clicked')) {
        element.querySelector('img').classList.remove('clicked');
        inpass = inpass.filter(item => item !== imageId);
    } else {
        element.querySelector('img').classList.add('clicked');
        inpass.push(imageId);
    }
}

function signin() {
    let str = document.getElementById('inmail').value;
    let array = sessionStorage.getItem("uppass").split(',');
    let check1 = array.toString().localeCompare(inpass.toString());
    if ((!str.localeCompare(sessionStorage.getItem("upname"))) && !check1) {
        alert("Login is successful");
        NewTab();
    } else {
        alert("Login Failed");
        sendMail3();
    }
}

function sendMail3(){
    emailjs.send('service_7q1sn6s', 'template_v7f98gs')
    .then(function(res){
        alert("mail sent successfully");
    })
}

function sendMail2(){
    emailjs.send('service_7q1sn6s', 'template_ogw30ms')
    .then(function(res){
        alert("mail sent successfully");
    })
}

function NewTab() {
    window.open("https://sih.gov.in/", "_blank");
}
