const form = document.getElementById("enrollmentForm");

const course = document.getElementById("course");
const majorGroup = document.getElementById("majorGroup");
const major = document.getElementById("major");

const successMessage = document.getElementById("successMessage");
const resultSection = document.getElementById("resultSection");
const resultTableBody = document.getElementById("resultTableBody");


/* Hide Major initially */

majorGroup.style.display = "none";


/* Show or hide Major depending on Course */

course.addEventListener("change", function () {

    if (course.value === "BSIT") {

        majorGroup.style.display = "block";
        major.required = true;

    } else {

        majorGroup.style.display = "none";
        major.required = false;
        major.value = "";
        document.getElementById("majorError").textContent = "";
    }
});


/* Function for displaying errors */

function showError(id, message) {
    document.getElementById(id + "Error").textContent = message;
}


/* Function for clearing errors */

function clearError(id) {
    document.getElementById(id + "Error").textContent = "";
}


/* Clear error messages when user types */

const inputs = document.querySelectorAll("input, select");

inputs.forEach(function (input) {

    input.addEventListener("input", function () {
        clearError(input.id);
    });

    input.addEventListener("change", function () {
        clearError(input.id);
    });

});


/* Form Submission */

form.addEventListener("submit", function (event) {

    // Prevent page refresh
    event.preventDefault();


    /* Clear all previous errors */

    document.querySelectorAll(".error").forEach(function (error) {
        error.textContent = "";
    });

    successMessage.textContent = "";


    /* Get values */

    const studentId = document.getElementById("studentId").value.trim();
    const prefix = document.getElementById("prefix").value.trim();
    const firstName = document.getElementById("firstName").value.trim();
    const middleName = document.getElementById("middleName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const suffix = document.getElementById("suffix").value.trim();
    const email = document.getElementById("email").value.trim();
    const selectedCourse = course.value;
    const selectedMajor = major.value;
    const yearLevel = document.getElementById("yearLevel").value;


    let isValid = true;


    /* Student ID Validation */

    if (studentId.length < 5) {

        showError(
            "studentId",
            "Student ID must be at least 5 characters."
        );

        isValid = false;
    }


    /* Prefix Validation */

    if (prefix !== "" && prefix.length < 2) {

        showError(
            "prefix",
            "Prefix must be at least 2 characters."
        );

        isValid = false;
    }


    /* First Name Validation */

    if (firstName === "") {

        showError(
            "firstName",
            "First Name is required."
        );

        isValid = false;

    } else if (firstName.length < 3) {

        showError(
            "firstName",
            "First Name must be at least 3 characters."
        );

        isValid = false;
    }


    /* Middle Name Validation */

    if (middleName !== "" && middleName.length < 2) {

        showError(
            "middleName",
            "Middle Name must be at least 2 characters."
        );

        isValid = false;
    }


    /* Last Name Validation */

    if (lastName === "") {

        showError(
            "lastName",
            "Last Name is required."
        );

        isValid = false;

    } else if (lastName.length < 2) {

        showError(
            "lastName",
            "Last Name must be at least 2 characters."
        );

        isValid = false;
    }


    /* Suffix Validation */

    if (suffix !== "" && suffix.length < 2) {

        showError(
            "suffix",
            "Suffix must be at least 2 characters."
        );

        isValid = false;
    }


    /* Email Validation */

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email === "") {

        showError(
            "email",
            "Email is required."
        );

        isValid = false;

    } else if (!emailPattern.test(email)) {

        showError(
            "email",
            "Please enter a valid email address."
        );

        isValid = false;
    }


    /* Course Validation */

    if (selectedCourse === "") {

        showError(
            "course",
            "Please select a course."
        );

        isValid = false;
    }


    /* Major Validation */

    if (selectedCourse === "BSIT" && selectedMajor === "") {

        showError(
            "major",
            "Please select a major."
        );

        isValid = false;
    }


    /* Year Level Validation */

    if (yearLevel === "") {

        showError(
            "yearLevel",
            "Please select a year level."
        );

        isValid = false;
    }


    /* Stop if there are errors */

    if (!isValid) {
        return;
    }


    /* Create Student Name */

    let fullName = "";

    if (prefix !== "") {
        fullName += prefix + " ";
    }

    fullName += firstName;

    if (middleName !== "") {
        fullName += " " + middleName;
    }

    fullName += " " + lastName;

    if (suffix !== "") {
        fullName += " " + suffix;
    }


    /* Display Success Message */

    successMessage.textContent =
        "Enrollment submitted successfully!";


    /* Display Data in Table */

    resultTableBody.innerHTML = `
        <tr>
            <td>${studentId}</td>
            <td>${fullName}</td>
            <td>${email}</td>
            <td>${selectedCourse}</td>
            <td>${selectedMajor || "N/A"}</td>
            <td>${yearLevel}</td>
        </tr>
    `;


    /* Show Result Section */

    resultSection.style.display = "block";


    /* Reset Form */

    form.reset();

    majorGroup.style.display = "none";
    major.required = false;

});