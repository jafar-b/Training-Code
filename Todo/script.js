document.addEventListener("DOMContentLoaded", () => {
  const inputTodo = document.getElementById("input-todo");
  const buttonTodo = document.getElementById("button-todo");
  const ulTodo = document.getElementById("ul-todo");
  const deleteAll = document.getElementById("deleteAll");

  let editMode = false;
  let editElement = null;

  buttonTodo.addEventListener("click", () => {
    const text = inputTodo.value;
    if (editMode) {
      editElement.querySelector(".text-todo").textContent = text;
      editMode = false;
      editElement = null;
      buttonTodo.textContent = "Add";
    } else {
      createTodo(text);
    }
    inputTodo.value = "";
    saveAllTodo();
  });

  const createTodo = (task) => {
    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-start";
    li.innerHTML = `<span class="text-todo">${task}</span>
    <div class="btn-group" role="group" aria-label="Basic mixed styles example">
      <button type="button" class="btn btn-danger">Edit</button>
      <button type="button" class="btn btn-warning">Delete</button>
    </div>`;
    ulTodo.appendChild(li);
  };

  ulTodo.addEventListener("click", (e) => {
    const li = e.target.closest(".list-group-item");
    if (!li) return;

    if (e.target.classList.contains("btn-warning")) {
      li.remove();
      saveAllTodo();
    }

    if (e.target.classList.contains("btn-danger")) {
      const taskText = li.querySelector(".text-todo");
      if (e.target.textContent === "Edit") {
        const input = document.createElement("input");
        input.type = "text";
        input.className = "edit-text d-flex justify-content-between align-items-start";
        input.value = taskText.textContent;
        li.replaceChild(input, taskText);
        e.target.textContent = "Set";
      } else {
        const input = li.querySelector(".edit-text");
        if (!input) return;
        const newText = input.value;
        const span = document.createElement("span");
        span.className = "text-todo";
        span.textContent = newText;
        li.replaceChild(span, input);
        e.target.textContent = "Edit";
        saveAllTodo();
      }
    }
  });

  const saveAllTodo = () => {
    const allTodos = [...document.querySelectorAll(".text-todo")].map(
      (task) => task.textContent
    );
    localStorage.setItem("allTodos", JSON.stringify(allTodos));
  };

  const loadAllTodo = () => {
    const allTodos = JSON.parse(localStorage.getItem("allTodos")) || [];
    allTodos.forEach((task) => createTodo(task));
  };

  const deleteAllTodos = () => {
    if (confirm("Do you really want to delete all Todos?")) {
      localStorage.clear();
      window.location.reload(true);
    }
  };
  deleteAll.addEventListener("click", deleteAllTodos);

  loadAllTodo();
});
