const todotask = document.getElementById("todotask");
const addbtn = document.getElementById("addbtn");
const tasklist = document.getElementById("tasklist");

// how to use localstorage
// local storage

addbtn.addEventListener("click", () => {
  const todo = todotask.value.trim();

  if (todo.length === 0) {
    alert("Kindly enter the Todo Task");
    return;
  }

  // add ele to ul

  const li = document.createElement("li");
  li.textContent = todo;

  const deletebtn = document.createElement("button");
  deletebtn.textContent = "Delete";

  li.appendChild(deletebtn);

  deletebtn.addEventListener("click", () => {
    li.remove();
  });

  li.addEventListener("click", () => {
    li.classList.toggle("completed");
    if (li.classList == "completed") {
      deletebtn.textContent = "Completed";
    } else deletebtn.textContent = "Delete";
  });

  tasklist.appendChild(li);

  todotask.value = "";
});
