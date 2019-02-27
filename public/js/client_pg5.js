const socket = io.connect("http://localhost:3000");
let len = 0;
let date = "";
let duration = "";
// const socket = io.connect('192.168.137.1:3001');
socket.on("connect", () => {
  socket.emit("addUser");
});

// socket.on("reconnect",()=>{
//       socket.emit("addUser");
// })

// Listen for events
socket.on("updateData", history => {
  console.log("Got data", history);
  if (history.length) {
    len = len + history.length;
    date = history[0].date;
    duration = history[0].duration;
    $("table tbody").append(
      `
      <tr>
        <td>` +
        len +
        `</td>
        <td>` +
        date +
        `</td>
        <td>` +
        duration +
        `</td>
      </tr>
      `
    );
  }
});

// ===========================================================
// -program dipakai banyak orang
// -mengerti -memilihh -memulai belajar -buat aplikasi sederhana --> update -join grup dan komunitas
// ===========================================================
