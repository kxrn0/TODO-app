import { deleteModalObj } from "./delete_modal.js";

export const thingsCounterObj = (
    () => {
        const thingsContainer = document.createElement("div");
        const foldersContainer = document.createElement("div");
        const addFolderDiv = document.createElement("div");
        const addFolderButton = document.createElement("button");

        const folders = [];

        function init() {
            thingsContainer.classList.add("thing-container");
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

                thingsSubContainer.classList.add("things-sub-container");

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
                    thingsContainer.parentElement.removeChild(footer)
                });

                footerAdd.addEventListener("click", () => {
                    console.log("hi");
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
                    console.log(folders);
                })

                enterFolder.addEventListener("click", () => {
                    thingsContainer.innerHTML = '';
                    thingsContainer.append(thingsSubContainer);
                    thingsContainer.parentElement.append(footer);
                });
            });
        }

        function append_to_element(element) {
            thingsContainer.innerHTML = '';
            thingsContainer.append(foldersContainer);
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