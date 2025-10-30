const todotask = document.getElementById("todotask");
const addbtn = document.getElementById("addbtn");
const tasklist = document.getElementById("tasklist");

// step1 add tasks to localstorage

function saveTodos() {
  const todoarr = [];
  document.querySelectorAll("#tasklist li").forEach((li) => {
    // [text][completed];
    todoarr.push({
      text: li.firstChild.textContent,
      completed: li.classList.contains("completed"),
    });
  });
  console.log(todoarr);
  localStorage.setItem("todoele", JSON.stringify(todoarr));
}

//✅ Step 2: Load saved tasks when the page loads
//We’ll read from localStorage using

//JSON.parse(localStorage.getItem("todoele"));

function loadTodos() {
  const saved = JSON.parse(localStorage.getItem("todoele")) || [];

  saved.forEach((todo) => {
    const li = document.createElement("li");
    li.textContent = todo.text;

    const deletebtn = document.createElement("button");
    deletebtn.textContent = todo.completed ? "Completed" : "Delete";
    li.appendChild(deletebtn);

    if (todo.completed) li.classList.add("completed");

    // delete btn logic

    deletebtn.addEventListener("click", () => {
      li.remove();
      saveTodos();
      // why we are calling savetodos??
    });

    li.addEventListener("click", () => {
      li.classList.toggle("completed");
      if (li.classList == "completed") {
        deletebtn.textContent = "Completed";
      } else {
        deletebtn.textContent = "Delete";
      }
      saveTodos();
    });

    tasklist.appendChild(li);
  });
}

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
    saveTodos(); //?
  });

  li.addEventListener("click", () => {
    li.classList.toggle("completed");
    if (li.classList == "completed") {
      deletebtn.textContent = "Completed";
    } else {
      deletebtn.textContent = "Delete";
    }
    saveTodos();
  });

  tasklist.appendChild(li);

  todotask.value = "";
  saveTodos(); // save updated list
});

document.getElementById("clearAll").addEventListener("click", () => {
  localStorage.clear(); // removes all saved todos
  tasklist.innerHTML = ""; // clears from screen too
});
// 👇 Add this line at the very bottom of your script
loadTodos();
