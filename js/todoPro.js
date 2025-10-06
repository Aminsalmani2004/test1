const themeSwitchBtn = document.getElementById("theme-switcher");
const bodyTag = document.querySelector("body");
const addtodo = document.getElementById("add-btn");
const todoInput = document.getElementById("addt");
const ul = document.querySelector(".todos");
const textInput = document.querySelector(".txt-input");
const remainder = document.getElementById("items-left");
const clearCompleted = document.getElementById("clear-completed");
const allFilterBtn = document.getElementById("all");
const activeFilterBtn = document.getElementById("active");
const completedFilterBtn = document.getElementById("completed");
const filter = document.getElementById("filter");


function updateRemainingCount() {
    const todos = JSON.parse(localStorage.getItem("todos")) || [];
    const remaining = todos.filter(todo => !todo.isCompleted).length;
    remainder.textContent = remaining;
}

function main() {

    /* Theme Switcher */

    themeSwitchBtn.addEventListener("click", () => {

        bodyTag.classList.toggle("light");

        const themeImg = themeSwitchBtn.children[0];

        themeImg.setAttribute("src",
            themeImg.getAttribute("src") === "/img/icon-sun.svg" ?
            "/img/icon-moon.svg" :
            "/img/icon-sun.svg"
        );
    });

    makeTodoElement(JSON.parse(localStorage.getItem("todos")));

    ul.addEventListener('dragover', (e) => {
        e.preventDefault();
        if (e.target.classList.contains("card") && !e.target.classList.contains("dragging")) {
            const draggingCard = document.querySelector(".dragging");
            const cards = [...ul.querySelectorAll(".card")];
            const currentPos = cards.indexOf(draggingCard);
            const newPos = cards.indexOf(e.target);

            if (newPos < currentPos) {
                ul.insertBefore(draggingCard, e.target);
            } else {
                ul.insertBefore(draggingCard, e.target.nextSibling);
            };
            const todos = JSON.parse(localStorage.getItem("todos"));
            const removed = todos.splice(currentPos, 1);
            todos.splice(newPos, 0, removed[0]);
            localStorage.setItem("todos", JSON.stringify(todos));
        }

    });

    /* Add Todo In LocalStorage */
    addtodo.addEventListener("click", () => {

        const item = todoInput.value.trim();
        if (item) {
            todoInput.value = "";
            const todos = !localStorage.getItem("todos") ? [] :
                JSON.parse(localStorage.getItem("todos"));

            const currenttodo = {
                item: item,
                isCompleted: false,
            };
            todos.push(currenttodo);
            localStorage.setItem("todos", JSON.stringify(todos))
            makeTodoElement([currenttodo]);
        }
    });

    textInput.addEventListener("keydown", (e) => {
        if (e.key == "Enter") {
            addtodo.click();
        }
    });


    updateRemainingCount();

}

function makeTodoElement(todoArray) {
    if (!todoArray) {
        return null;
    }
    todoArray.forEach(todoObject => {


        /* create html element of todo */
        const card = document.createElement("li");
        const cbContianer = document.createElement("div");
        const cbInput = document.createElement("input");
        const checkSpan = document.createElement("span");
        const item = document.createElement("p");
        const clrBtn = document.createElement("button");
        const iconImg = document.createElement("img");

        /* add classes */
        card.classList.add("card");
        cbContianer.classList.add("cb-container");
        cbInput.classList.add("cb-input");
        checkSpan.classList.add("check");
        item.classList.add("item");
        clrBtn.classList.add("clear");

        /* set attribute */
        card.setAttribute("draggable", true);
        cbInput.setAttribute("type", "checkbox");
        iconImg.setAttribute("src", "/img/icon-cross.svg");
        iconImg.setAttribute("alt", "Clear it");
        item.textContent = todoObject.item;

        /* event listener */
        card.addEventListener('dragstart', () => {
            card.classList.add("dragging");
        });
        card.addEventListener('dragend', () => {
            card.classList.remove("dragging");
        });

        clrBtn.addEventListener("click", (e) => {
            const removeLi = e.target.closest("li");
            const text = removeLi.querySelector(".item").textContent;
            removeLi.classList.add("fall");

            // حذف از DOM
            removeLi.addEventListener("transitionend", () => {
                removeLi.remove();

                // حذف از localStorage

                const todos = JSON.parse(localStorage.getItem("todos")) || [];
                const updateTodos = todos.filter(todo => todo.item !== text);
                localStorage.setItem("todos", JSON.stringify(updateTodos));

                updateRemainingCount();

            });
        });

        cbInput.addEventListener("change", () => {
            const card = cbInput.closest("li");
            const text = card.querySelector(".item").textContent;

            // اعمال/حذف کلاس ظاهری
            card.classList.toggle("checked");

            // به‌روزرسانی localStorage
            const todos = JSON.parse(localStorage.getItem("todos")) || [];
            const updatedTodos = todos.map(todo => {
                if (todo.item === text) {
                    return {
                        ...todo,
                        isCompleted: cbInput.checked
                    };
                }
                return todo;

            });

            localStorage.setItem("todos", JSON.stringify(updatedTodos));

            updateRemainingCount();


        });

        clearCompleted.addEventListener("click", () => {
            const todos = JSON.parse(localStorage.getItem("todos")) || [];
            const updatedoto = todos.filter(todo => todo.isCompleted == false);
            localStorage.setItem("todos", JSON.stringify(updatedoto));

            document.querySelectorAll(".todos .card.checked").forEach(card => {
                card.classList.add("fall"); // کلاس انیمیشن
                card.addEventListener("transitionend", () => {
                    card.remove();
                    updateRemainingCount(); // شمارش جدید
                });
            });
        });


        /* set element by parent child */
        clrBtn.appendChild(iconImg);
        cbContianer.appendChild(cbInput);
        cbContianer.appendChild(checkSpan);
        card.appendChild(cbContianer);
        card.appendChild(item);
        card.appendChild(clrBtn);
        document.querySelector(".todos").appendChild(card);


        if (todoObject.isCompleted) {
            card.classList.add("checked");
            cbInput.checked = true;
        }

        /* ative page */
        function setFilter(filter) {
            ul.classList.remove("active", "completed");
            if (filter === "active") {
                ul.classList.add("active");
            } else if (filter === "completed") {
                ul.classList.add("completed");
            }

            // تغییر کلاس "on" برای ظاهر فعال بودن دکمه
            [allFilterBtn, activeFilterBtn, completedFilterBtn].forEach(btn =>
                btn.classList.remove("on")
            );
            if (filter === "all") {
                allFilterBtn.classList.add("on");
            } else if (filter === "active") {
                activeFilterBtn.classList.add("on");
            } else if (filter === "completed") {
                completedFilterBtn.classList.add("on");
            }
        }

        // اتصال رویدادها
        allFilterBtn.addEventListener("click", () => setFilter("all"));
        activeFilterBtn.addEventListener("click", () => setFilter("active"));
        completedFilterBtn.addEventListener("click", () => setFilter("completed"));


        updateRemainingCount();
    });


    const date = new Date();
    const formatter = new Intl.DateTimeFormat("fa-IR", {
        year: "numeric",
        month: "long",
        day: "numeric",
        weekday: "long"
    });

    const dateText = formatter.format(date);
    const dateElement = document.querySelector(".today-date");

    if (dateElement) {
        dateElement.textContent = dateText;
    }
}


document.addEventListener("DOMContentLoaded", main);