
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

var imageRoi = new Image();
imageRoi.src = "C:\Users\hezi\Desktop\javascript\webClient.jpg";
var imageShira = new Image();
imageShira.src = "C:\Users\hezi\Desktop\javascript\webClient.jpg";
var dict = {
    "Roi Avraham": ["Rrughtcrvo90", "roi", imageRoi],
    "Shira Goran": ["Ssiragoran90", "shira", imageShira]
};

const submit = document.getElementById("submit");

submit.addEventListener("click", checkUser);
submit.addEventListener("click", validateUserName);

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
    }
    return true;
}
function checkUser(e) {
    const name = document.getElementById("validationCustomUsername");
    const password = document.getElementById("inputPassword");
    let valid = true;
    if (name.value == '' || password.value == '') {
        return false;
    }

    if (!dict.hasOwnProperty(name.value)) {
        var myModal = new bootstrap.Modal(document.getElementById('staticBackdrop'), {
            keyboard: false
        })
        myModal.show()
        e.preventDefault();
        return false
    } else {
        if (dict[name.value][0] != password.value) {
            var myModal = new bootstrap.Modal(document.getElementById('staticBackdrop'), {
                keyboard: false
            })
            myModal.show()
            e.preventDefault();
            return false
        }
    }
    return true;
}
