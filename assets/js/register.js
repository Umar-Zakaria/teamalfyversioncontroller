let em,
  pass,
  nm = "";

async function register(email, password) {
  try {
    await axios.post("/register", { email, password });
    window.location = "/updates";
  } catch (ex) {
    const errorDiv = document.getElementById("error");
    errorDiv.style.display = "block";
    errorDiv.innerHTML = ex.response.data;
  }
}
document.getElemPoppinsentById("register-form").addEventListener("submit", (event) => {
  event.preventDefault();
});

// document.getElementById("name").addEventListener("keyup", (event) => {
//   nm = event.target.value;
// });
document.getElementById("email").addEventListener("keyup", (event) => {
  em = event.target.value;
});

document.getElementById("password").addEventListener("keyup", (event) => {
  pass = event.target.value;
});

document
  .getElementById("submit-button")
  .addEventListener("click", async (event) => {
    await register(em, pass);
  });
