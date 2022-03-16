import { deleteModalObj } from "./delete_modal.js";

export const thingsCounterObj = (
    () => {
        const thingsContainer = document.createElement("div");
        const foldersContainer = document.createElement("div");
        const addFolderDiv = document.createElement("div");
        const addFolderButton = document.createElement("button");

        const folders = [];

        function init() {
            thingsContainer.classList.add("todo-container");
            foldersContainer.classList.add("folders");
            addFolderDiv.classList.add("add-folder");

            foldersContainer.append(addFolderDiv);
            thingsContainer.append(foldersContainer);
            addFolderDiv.append(addFolderButton);

            addFolderButton.addEventListener("click", () => {
                const folderContainer = document.createElement("div");
                const deleteFolder = document.createElement("button");
                const enterFolder = document.createElement("button");
                const folderName = document.createElement("p");

                const footer = document.createElement("footer");
                const footerGoBack = document.createElement("button");
                const footerAdd = document.createElement("button");

                const thingsSubContainer = document.createElement("div");
                const things = [];

                folderContainer.classList.add("folder");
                deleteFolder.classList.add("delete-folder");
                deleteFolder.classList.add("delete-button");
                enterFolder.classList.add("enter-folder");

                footer.classList.add("footer");
                footerGoBack.classList.add("go-back");
                footerAdd.classList.add("add-todo");

                //thingsSubContainer.classList.add("");

                folderContainer.append(deleteFolder);
                folderContainer.append(enterFolder);
                folderContainer.append(folderName);
                folders.push(folderContainer);
                folderName.innerText = `New Folder ${folders.length}`;

                footer.append(footerGoBack);
                footer.append(footerAdd);

                footerGoBack.addEventListener("click", () => {
                    thingsContainer.innerHTML = '';
                    thingsContainer.append(foldersContainer);
                });

                footerAdd.addEventListener("click", () => {
                    // const todo = document.createElement("div");
                    // const todoNameInput = document.createElement("input");
                    // const todoNameH2 = document.createElement("h2");
                    // const todoDescriptionTextarea = document.createElement("textarea");
                    // const todoDescriptionParag = document.createElement("p");
                    // const todoControls = document.createElement("div");
                    // const checkWrapper = document.createElement("div");
                    // const check = document.createElement("input");
                    // const label = document.createElement("label");
                    // const deleteTodo = document.createElement("button");
                    // let id;

                    // todo.classList.add("todo");
                    // todo.classList.add("unchecked");
                    // todoNameInput.setAttribute("type", "text");
                    // todoControls.classList.add("controls");
                    // checkWrapper.classList.add("check-wrapper");
                    // todoNameInput.setAttribute("placeholder", "Todo : ");
                    // todoDescriptionTextarea.setAttribute("placeholder", "Description");
                    // check.type = "checkbox";
                    // label.innerText = "Done!";

                    // id = `check_${Math.floor(Math.random() * 1e6)}`;
                    // for (let todoElem of todos)
                    //     while (todoElem.querySelector(`#${id}`))
                    //         id = `check_${Math.floor(Math.random() * 1e6)}`;
                    // check.id = id;
                    // label.setAttribute("for", id)

                    // todo.append(todoNameInput);
                    // todo.append(todoDescriptionTextarea);
                    // todoControls.append(checkWrapper);
                    // checkWrapper.append(check);
                    // checkWrapper.append(label);
                    // todoControls.append(deleteTodo);
                    // todo.append(todoControls);
                    // thingsSubContainer.append(todo);
                    // todo.scrollIntoView({ block : "center"});

                    // todoNameInput.focus();
                    // todos.push(todo);

                    // todoNameInput.addEventListener("focusout", () => {
                    //     todoNameH2.innerText = todoNameInput.value ? todoNameInput.value : "TODO";
                    //     todoNameInput.replaceWith(todoNameH2);
                    // });

                    // todoNameH2.addEventListener("click", () => {
                    //     if (!check.checked) {
                    //         todoNameInput.value = todoNameH2.innerText;
                    //         todoNameH2.replaceWith(todoNameInput);
                    //         todoNameInput.focus();
                    //     }
                    // });

                    // todoDescriptionTextarea.addEventListener("focusout", () => {
                    //     todoDescriptionParag.innerText = todoDescriptionTextarea.value;
                    //     todoDescriptionTextarea.replaceWith(todoDescriptionParag);
                    // });

                    // todoDescriptionParag.addEventListener("click", () => {
                    //     if (!check.checked) {
                    //         todoDescriptionTextarea.value = todoDescriptionParag.innerText;
                    //         todoDescriptionParag.replaceWith(todoDescriptionTextarea);
                    //         todoDescriptionTextarea.focus();
                    //     }
                    // });

                    // check.addEventListener("click", () => {
                    //     todo.classList.toggle("checked");
                    //     todo.classList.toggle("unchecked");
                    //     todo.parentElement.removeChild(todo);
                    //     if (todo.classList.contains("checked")) {
                    //         thingsSubContainer.append(todo);
                    //     }
                    //     else {
                    //         thingsSubContainer.prepend(todo);
                    //     }
                    //     todo.scrollIntoView({ block : "center", behavior : "smooth" });
                    // });

                    // deleteTodo.addEventListener("click", () => {
                    //     deleteModalObj.delete_element(todoNameH2.innerText, todo, thingsContainer, todos);
                    // });

                    // document.addEventListener("keydown", event => {
                    //     if (event.key == "Enter" && document.activeElement == todoNameInput)
                    //         document.activeElement.blur();
                    // })
                    console.log("shalom");
                });

                addFolderDiv.replaceWith(folderContainer);
                foldersContainer.append(addFolderDiv);

                folderName.addEventListener("click", () => {
                    const inputName = document.createElement("input");

                    inputName.type = "text";
                    inputName.value = folderName.innerText;

                    folderContainer.removeChild(folderName);
                    folderContainer.append(inputName);
                    inputName.focus();

                    inputName.addEventListener("focusout", () => {
                        folderName.innerText = inputName.value ? inputName.value : "folder";
                        folderContainer.removeChild(inputName);
                        folderContainer.append(folderName);
                    });

                    document.addEventListener("keydown", event => {
                        if (event.key == "Enter" && document.activeElement == inputName)
                            document.activeElement.blur();
                    });
                });

                deleteFolder.addEventListener("click", () => {
                    deleteModalObj.delete_element(folderName.innerText, folderContainer, thingsContainer, folders);
                })

                enterFolder.addEventListener("click", () => {
                    thingsContainer.innerHTML = '';
                    thingsContainer.append(thingsSubContainer);
                    thingsContainer.append(footer);
                });
            });
        }

        function append_to_element(element) {
            element.innerHTML = '';
            element.append(thingsContainer);
        }

        function switch_to_things_counter(main) {
            append_to_element(main);
        }

        init();

        return { switch_to_things_counter }
    }
)();