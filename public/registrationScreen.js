(function () {
    'use strict'

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')

    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
        .forEach(function (form) {
            form.addEventListener('submit', function (event) {
                if (!form.checkValidity()) {
                    event.preventDefault()
                    event.stopPropagation()
                }

                form.classList.add('was-validated')
            }, false)
        })
})()
var myInput = document.getElementById("inputPassword");

var letter = document.getElementById("letter");

var capital = document.getElementById("capital");

var number = document.getElementById("number");

var length = document.getElementById("length")

myInput.onfocus = function () {

    document.getElementById("message").style.display = "block";

}

myInput.onblur = function () {

    document.getElementById("message").style.display = "none";

}

myInput.onkeyup = function () {

    var lowerCaseLetters = /[a-z]/g;

    if (myInput.value.match(lowerCaseLetters)) {

        letter.classList.remove("invalid");

        letter.classList.add("valid");

    } else {

        letter.classList.remove("valid");

        letter.classList.add("invalid");

    }

    var upperCaseLetters = /[A-Z]/g;

    if (myInput.value.match(upperCaseLetters)) {

        capital.classList.remove("invalid");

        capital.classList.add("valid");

    } else {

        capital.classList.remove("valid");

        capital.classList.add("invalid");

    }

    var numbers = /[0-9]/g;

    if (myInput.value.match(numbers)) {

        number.classList.remove("invalid");

        number.classList.add("valid");

    } else {

        number.classList.remove("valid");

        number.classList.add("invalid");

    }
    if (myInput.value.length >= 8) {

        length.classList.remove("invalid");

        length.classList.add("valid");

    } else {

        length.classList.remove("valid");

        length.classList.add("invalid");

    }
}

var imageRoi = new Image();
imageRoi.src = "C:\Users\hezi\Desktop\javascript\webClient.jpg";
var imageShira = new Image();
imageShira.src = "C:\Users\hezi\Desktop\javascript\webClient.jpg";
var dict = {
    "Roi Avraham": ["Rrughtcrvo90", "roi", imageRoi],
    "Shira Goran": ["Ssiragoran90", "shira", imageShira]
};

const submit = document.getElementById("submit");

submit.addEventListener("click", validateUserName);
submit.addEventListener("click", checkPassword);
submit.addEventListener("click", validateFileType);

function validateUserName(e) {

    const firstNameField = document.getElementById("validationCustomUsername");
    let valid = true;

    if (dict.hasOwnProperty(firstNameField.value)) {
        const nameError = document.getElementById("nameError");
        nameError.classList.add("visible");
        firstNameField.classList.add("invalid");
        nameError.setAttribute("aria-hidden", false);
        nameError.setAttribute("aria-invalid", true);
        e.preventDefault();
        return false;
    }
    return true;
}

function checkPassword(e) {
    const password = document.getElementById("inputPassword");
    const verifyPassword = document.getElementById("verifyPassword");
    let valid = true;

    //If Not same return False.    
    if (password.value != verifyPassword.value) {
        // alert("\nPassword did not match: Please try again...")
        var myModal = new bootstrap.Modal(document.getElementById('staticBackdrop'), {
            keyboard: false
        })
        myModal.show()

        e.preventDefault();
        return false;
    }
    // If same return True.
    else {
        return true;
    }
}

function samePassword(password1, password2) {
    return password1 == password2;
}
function isImg(image) {
    var idxDot = image.lastIndexOf(".") + 1;
    var extFile = image.substr(idxDot, fileName.length).toLowerCase();
    if (extFile == "jpg" || extFile == "jpeg" || extFile == "png" || fileName == "") {
        return true;
    } else {
        return false;
    }
}

function validPassword(password) {
    var lowerCaseLetters = /[a-z]/g;
    if (!password.match(lowerCaseLetters)) {
        return false;
    }
    var upperCaseLetters = /[A-Z]/g;
    if (!password.match(upperCaseLetters)) {
        return false;
    }
    var numbers = /[0-9]/g;
    if (!password.match(numbers)) {
        return false;
    }
    if (!password.length >= 8) {
        return false;
    }
    return true;
}

function validDetails(e) {
    const userName = document.getElementById("validationCustomUsername").value;
    const password = document.getElementById("inputPassword").value;
    const verifyPassword = document.getElementById("verifyPassword").value;
    const displayName = document.getElementById("DisplayName").value;
    const image = document.getElementById("fileName").value;
    if (userName != '' && password != '' && verifyPassword != '' && displayName != '') {
        if (validateUserName(e) && samePassword(password, verifyPassword) && isImg(image) && validPassword(password)) {
            window.location = 'loginScreen.html';
        }
    }
}