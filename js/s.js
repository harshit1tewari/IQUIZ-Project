const input1 = document.getElementById("input1");
const input2 = document.getElementById("input2");

const span1 = document.getElementById("span1");
const span2 = document.getElementById("span2");

input1.addEventListener("click", () => {span1.style.width = "100%"})
input1.addEventListener("blur", () => {span1.style.width = "0"})

input2.addEventListener("click", () => {span2.style.width = "100%"})
input2.addEventListener("blur", () => {span2.style.width = "0"})

// here begins the show the password

const eyeIcon = document.getElementById("eye-icon");

input2.addEventListener("input", () => {eyeIcon.style.visibility = "visible"})

let flag = 0;
eyeIcon.addEventListener("click", () => {
    
    if (flag == 0) {
        input2.type = "text";
        flag = 1;
        eyeIcon.setAttribute("class", "fa-solid fa-eye-slash")
    } else {
        input2.type = "password";
        flag = 0;
        eyeIcon.setAttribute("class", "fa-solid fa-eye")
    }

})