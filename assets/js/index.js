let name,
  updates,
  version1 = "";

const editor = CKEDITOR.replace("editor");
editor.on("change", (event) => {
  updates = event.editor.getData();
});

const developers = document.getElementById("developers");
developers.value = "Sadick Odai";
const socket = io();

socket.on("new", (msg) => {
  msg.forEach((ms, index) => {
    const option = document.createElement("option");
    option.value = ms._id;
    option.innerHTML = ms.name;
    developers.appendChild(option);
  });
});

socket.on("new version", (data) => {
  document.getElementById("listener").innerHTML = data;
});

socket.on("all updates", (data) => {
  const currentUpdate = data[data.length - 1];
  document.getElementById("listener").innerHTML = currentUpdate.version;
});
async function postToServer(developer, version, update) {
  try {
    const { data } = await axios.post("/updates", {
      developer,
      version,
      update,
    });
    window.location = "/";
  } catch (ex) {
    document.getElementById("error").innerHTML = ex.response.data;
    document.getElementById("error").style.display = "block";
  }
}

function handleSelectionChange(target) {
  name = target.value;
}

document.getElementById("version").addEventListener("keyup", (event) => {
  version1 = event.target.value;
});

document.getElementById("update-form").addEventListener("submit", (event) => {
  event.preventDefault();
});

document.getElementById("submit").addEventListener("click", async (event) => {
  await postToServer(name, version1, updates);
});
