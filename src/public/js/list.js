const socket = io();

const selectSort = document.getElementById("selectSort");

selectSort.addEventListener("change", () => {
  const limit = document.getElementById("limit").value;
  const page = document.getElementById("page").value;
  const sort = selectSort.value;

  const url = `/products?limit=${limit}&page=${page}&sort=${sort}`;
  window.location.href = url;
});

//Envia el front
document.addEventListener("click", (event) => {
  if (event.target.classList.contains("add")) {
    const id = event.target.getAttribute("id");

    socket.emit("client:addProductOnCart", {id, selectedQuantity: 1});
  }
});