let em,
  pass = "";

async function login(email, password) {
  try {
    await axios.post("/login", { email, password });
    window.location = "/updates";
  } catch (ex) {
    alert(ex.response.data);
  }
}
document.getElementById("login-form").addEventListener("submit", (event) => {
  event.preventDefault();
});

document.getElementById("email").addEventListener("keyup", (event) => {
  em = event.target.value;
});

document.getElementById("password").addEventListener("keyup", (event) => {
  pass = event.target.value;
});

document.getElementById("submit").addEventListener("click", async (event) => {
  await login(em, pass);
});
