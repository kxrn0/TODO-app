import { todoObj } from "./todo.js";

const navTodo = document.querySelector(".nav-todo");
const navThingCounter = document.querySelector(".nav-thing-counter");
const navHabitTracker = document.querySelector(".nav-habit-tracker");
const mainSection = document.querySelector(".main-section");

navTodo.addEventListener("click", () => {
    todoObj.switch_to_todo(mainSection);
    navThingCounter.id = '';
    navHabitTracker.id = '';
    navTodo.id = "focused";
});

navThingCounter.addEventListener("click", () => {
    navHabitTracker.id = '';
    navTodo.id = '';
    navThingCounter.id = "focused";
});

navHabitTracker.addEventListener("click", () => {
    navTodo.id = '';
    navThingCounter.id = '';
    navHabitTracker.id = "focused";
});

//navTodo.click();