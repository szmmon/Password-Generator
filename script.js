const lenghtSlider = document.querySelector(".pass-length input");
const options = document.querySelectorAll(".option input");
const copyIcon = document.querySelector(".input-box span");
const passInput = document.querySelector(".input-box input");
const passIndicator = document.querySelector(".pass-indicator");
const generateBtn = document.querySelector(".generate-btn");

const characters = {
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  numbers: "0123456789",
  symbols: "!$%&|[](){}:;.,*+-#@<>~",
};

const generatePass = () => {
  let staticPass = "",
    randomPass = "",
    excludeDuplicate = false,
    passLength = lenghtSlider.value;

  options.forEach((option) => {
    if (option.checked) {
      if (option.id !== "duplicates" && option.id !== "spaces") {
        staticPass += characters[option.id];
      } else if (option.id === "spaces") {
        staticPass += ` ${staticPass} `;
      } else excludeDuplicate = true;
    }
  });

  for (let i = 0; i < lenghtSlider.value; i++) {
    let randomChar = staticPass[Math.floor(Math.random() * staticPass.length)];
    if (excludeDuplicate) {
      !randomPass.includes(randomChar) || randomChar == " "
        ? (randomPass += randomChar)
        : i--;
    } else {
      randomPass += randomChar;
    }
    passInput.value = randomPass;
  }
};
const updatePassIndicator = () => {
  passIndicator.id =
    lenghtSlider.value <= 8
      ? "weak"
      : lenghtSlider.value <= 16
      ? "medium"
      : "strong";
};

const updateSlider = () => {
  document.querySelector(".pass-length span").innerText = lenghtSlider.value;
  generatePass();
  updatePassIndicator();
};
updateSlider();

const copyPass = () => {
  navigator.clipboard.writeText(passInput.value);
  copyIcon.innerText = "check";
  copyIcon.style.color = "blue";
  setTimeout(() => {
    copyIcon.innerText = "copy_all";
    copyIcon.style.color = "#000";
  }, 1500);
};
copyIcon.addEventListener("click", copyPass);
lenghtSlider.addEventListener("input", updateSlider);
generateBtn.addEventListener("click", generatePass);
