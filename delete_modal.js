export const deleteModalObj = (
    () => {
        const modal = document.createElement("div");
        const modalContainer = document.createElement("div");
        const closeModal = document.createElement("button");
        const warningContainer = document.createElement("div");
        const message = document.createElement("p");
        const elementName = document.createElement("p");
        const buttonsContainer = document.createElement("div");
        const yesButton = document.createElement("button");
        const noButton = document.createElement("button");
        let elementToDelete, elementsArray;

        modal.classList.add("delete-modal");
        modalContainer.classList.add("modal-content");
        closeModal.classList.add("close-modal");
        closeModal.classList.add("delete-button");
        warningContainer.classList.add("warning");
        message.classList.add("message");
        elementName.classList.add("delete-name");
        buttonsContainer.classList.add("modal-buttons");
        yesButton.classList.add("yes-delete");
        noButton.classList.add("no-delete");

        modal.append(modalContainer);
        modalContainer.append(closeModal);
        modalContainer.append(warningContainer);
        warningContainer.append(message);
        warningContainer.append(elementName);
        modalContainer.append(buttonsContainer);
        buttonsContainer.append(yesButton);
        buttonsContainer.append(noButton);

        message.innerText = "Are you sure that you want to delete";
        yesButton.innerText = "YES";
        noButton.innerText = "NO";

        yesButton.addEventListener("click", () => {
            elementToDelete.parentElement.removeChild(elementToDelete);
            elementsArray.splice(elementsArray.indexOf(elementToDelete), 1);
            close_modal();
        });

        noButton.addEventListener("click", () => {
            close_modal();
        });

        closeModal.addEventListener("click", () => {
            close_modal();
        });

        function delete_element(name, element, container, array) {
            container.append(modal);
            elementName.innerText = `${name}?`;
            elementToDelete = element;
            elementsArray = array;
        }

        function close_modal() {
            elementToDelete = '';
            elementsArray = [];
            modal.parentElement.removeChild(modal);
        }

        document.addEventListener("click", event => {
            if (!event.target.closest(".modal-content") && !event.target.closest(".delete-folder") && !event.target.closest(".controls > button") && elementToDelete)
                close_modal();
        });

        return { delete_element };
    }
)();