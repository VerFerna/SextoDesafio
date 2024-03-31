const socket = io();

const chatbox = document.getElementById("chatbox");

window.onload = function () {
  const logs = document.getElementById("logs");
  logs.scrollTop = logs.scrollHeight;
};

let user = sessionStorage.getItem("user") || "";

//SweetAlert
if (!user) {
  Swal.fire({
    title: "Auth",
    input: "text",
    text: "Set username",
    inputAttributes: {
      maxlength: 10,
    },
    inputValidator: (value) => {
      return !value.trim() && "Please write a username";
    },
    allowOutsideClick: false,
  }).then((result) => {
    user = result.value;
    user = user.charAt(0).toUpperCase() + user.slice(1);
    document.getElementById("username").innerHTML = user;
    sessionStorage.setItem("user", user);
    socket.emit("new", user);
  });
} else {
  document.getElementById("username").innerHTML = user;
  socket.emit("new", user);
}

//Envia el front
chatbox.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    const message = chatbox.value.trim();

    if (message.length > 0) {
      const date = new Date();
      const hourDate = date.getHours();
      const minuteDate = date.getMinutes();
      const formarttedMinute = minuteDate.toString().padStart(2, "0");
      const hour = `${hourDate}:${formarttedMinute}`;

      socket.emit("client:message", {
        user,
        message,
        hour,
      });

      chatbox.value = "";
    }
  }
});

//Respuesta del back
socket.on("server:messages", (data) => {
  const divLogs = document.getElementById("logs");
  let messages = "";
  data.forEach((message) => {
    messages =
      `
        <div class="card m-3" style="width: 200px">
          <div class="m-2" style="display: flex; flex-direction: column;">
            <p class="m-0" style="font-size: 10px;"><b>${message.user}</b></p>
            <p class="m-0" style="font-size: 16px;">${message.message}</p>
            <div style="margin-left: auto;">
              <i style="font-size: x-small; margin-left: 5px;">${message.hour}</i>
            </div>
          </div>
        </div>
      ` + messages;
  });

  divLogs.innerHTML = messages;
});
