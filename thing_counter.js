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
                    /**
                     * How should I proceed with this?
                     * I think that I need to create  a modal component and load it up everytime I press the footerAdd button.
                     * Whenever I load up the modal component, it will populate its fileds so that a new thing can be created 
                     * even if the user only enters the label of the thing.
                     * 
                     * So, how would a new thing be created? do I need to call a function to set up the modal?
                     * Whenever I press the footerAdd button the modal's fields are populated, then the modal is 
                     * appended to thingsContainer. Once the modal is set up the user can fiddle with the parameters of the thing, 
                     * and once they are happy with the result they can press the save button, which will create a new thing, and 
                     * save it on the things array.
                     * So there's a function on the modal object called load_modal(), it resets the fields of the modal, appends it 
                     * to thignsContainer, and that's basically it.
                     * I should add an event listener to the save button so that it saves a thing on the array of things.
                     */
                    creatorObj.load_modal(thingsContainer);
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

const creatorObj = (
    () => {
        const modal = document.createElement("div"); // .add-thing-modal
        const modalContent = document.createElement("div"); // .add-thing-modal-content
        const mainContent = document.createElement("div"); // .main-modal-content
        const closeButton = document.createElement("button"); // .delete-button
        const mainPropertiesContent = document.createElement("div"); // .left
        const labelContent = document.createElement("div"); // .label-content
        const labelLabel = document.createElement("label");
        const labelInput = document.createElement("input");
        const advancedWrapper = document.createElement("div"); // .advanced-wrapper
        const advancedH3 = document.createElement("h3");
        const advancedButton = document.createElement("button"); // .advanced-configurations
        const save = document.createElement("button"); // .save
        const advancedContent = document.createElement("div"); // .advanced-modal-content
        const advancedInputs = document.createElement("div"); // .inputs
        const leftPortion = document.createElement("div"); // .left-portion
        const startWrapper = document.createElement("div");
        const startLabel = document.createElement("label");
        const startInput = document.createElement("input");
        const decrementWrapper = document.createElement("div");
        const decrementLabel = document.createElement("label");
        const decrementInput = document.createElement("input");
        const rigthPortion = document.createElement("div"); // .right-portion
        const resetWrapper = document.createElement("div");
        const resetLabel = document.createElement("label");
        const resetInput = document.createElement("input");
        const incrementWrapper = document.createElement("div");
        const incrementLabel = document.createElement("label");
        const incrementInput = document.createElement("input");
        const colors = document.createElement("div"); // .colors
        const preview = document.createElement("div");
        const line = document.createElement("div");
        const textPreview = document.createElement("div");
        const colorContent = document.createElement("div"); // .color-inputs
        const mainColorWrapper = document.createElement("div"); // .main-color-wrapper
        const mainColorInputWrapper = document.createElement("div"); // .color-input-wrapper
        const mainColorInput = document.createElement("input");
        const mainColorLabel = document.createElement("label");
        const bgTextColor = document.createElement("div"); // .bg-text-color
        const bgColorInputWrapper = document.createElement("div"); // .color-input-wrapper
        const bgColorInput = document.createElement("input");
        const bgColorLabel = document.createElement("label");
        let advancedShown;

        advancedShown = false;
        modal.classList.add("add-thing-modal");
        modalContent.classList.add("add-thing-modal-content");
        mainContent.classList.add("main-modal-content");
        closeButton.classList.add("delete-button");
        mainPropertiesContent.classList.add("left");
        labelContent.classList.add("label-content");
        labelLabel.setAttribute("for", "label-input");
        labelLabel.innerText = "Label : ";
        labelInput.setAttribute("type", "text");
        labelInput.id = "label-input";
        advancedWrapper.classList.add("advanced-wrapper");
        advancedH3.innerText = "Advanced";
        advancedButton.classList.add("advanced-configurations");
        save.classList.add("save");
        save.innerText = "Save";
        advancedContent.classList.add("advanced-modal-content");
        advancedInputs.classList.add("inputs");
        leftPortion.classList.add("left-portion");
        startLabel.setAttribute("for", "start");
        startLabel.innerText = "Start Value : ";
        startInput.setAttribute("type", "tel");
        startInput.id = "start";
        decrementLabel.setAttribute("for", "step-minus");
        decrementLabel.innerText = "Decrease by : ";
        decrementInput.setAttribute("type", "tel");
        decrementInput.id = "step-minus";
        rigthPortion.classList.add("rigth-portion");
        resetLabel.setAttribute("for", "reset");
        resetLabel.innerText = "Reset Value : ";
        resetInput.setAttribute("type", "tel");
        resetInput.id = "reset";
        incrementLabel.setAttribute("for", "step-plus");
        incrementLabel.innerText = "Increase by : ";
        incrementInput.setAttribute("type", "tel");
        incrementInput.id = "step-plus";
        colors.classList.add("colors");
        preview.classList.add("preview");
        line.classList.add("line");
        textPreview.classList.add("text-preview");
        colorContent.classList.add("color-inputs");
        mainColorWrapper.classList.add("main-color-wrapper");
        mainColorInputWrapper.classList.add("color-input-wrapper");
        mainColorInput.setAttribute("type", "color");
        mainColorInput.id = "main-color";
        mainColorLabel.setAttribute("for", "main-color");
        mainColorLabel.innerText = "Main Color";
        bgTextColor.classList.add("bg-text-color");
        bgColorInputWrapper.classList.add("color-input-wrapper");
        bgColorInput.setAttribute("type", "color");
        bgColorInput.id = "bg-text";
        bgColorLabel.setAttribute("for", "bg-text");
        bgColorLabel.innerText = "Text Background Color";

        modal.append(modalContent);
        modalContent.append(mainContent);
        modalContent.append(advancedContent);
        mainContent.append(closeButton);
        mainContent.append(mainPropertiesContent);
        mainContent.append(save);
        mainPropertiesContent.append(labelContent);
        mainPropertiesContent.append(advancedWrapper);
        labelContent.append(labelLabel);
        labelContent.append(labelInput);
        advancedWrapper.append(advancedH3);
        advancedWrapper.append(advancedButton);

        advancedContent.append(advancedInputs);
        advancedContent.append(colors);
        advancedInputs.append(leftPortion);
        advancedInputs.append(rigthPortion);
        leftPortion.append(startWrapper);
        leftPortion.append(decrementWrapper);
        rigthPortion.append(resetWrapper);
        rigthPortion.append(incrementWrapper);
        startWrapper.append(startLabel);
        startWrapper.append(startInput);
        decrementWrapper.append(decrementLabel);
        decrementWrapper.append(decrementInput);
        resetWrapper.append(resetLabel);
        resetWrapper.append(resetInput);
        incrementWrapper.append(incrementLabel);
        incrementWrapper.append(incrementInput);
        colors.append(preview);
        colors.append(colorContent);
        preview.append(line)
        preview.append(textPreview);
        colorContent.append(mainColorWrapper);
        colorContent.append(bgTextColor);
        mainColorWrapper.append(mainColorInputWrapper);
        mainColorWrapper.append(mainColorLabel);
        bgTextColor.append(bgColorInputWrapper);
        bgTextColor.append(bgColorLabel);
        mainColorInputWrapper.append(mainColorInput);
        bgColorInputWrapper.append(bgColorInput);

        advancedButton.addEventListener("click", () => {
            if (advancedShown)
                close_advanced_options();
            else {
                advancedButton.style.backgroundImage = "url('images/down-arrow.png')";
                advancedContent.style.display = "flex";
            }
            advancedShown = !advancedShown;
        });

        mainColorInput.addEventListener("input", change_color);

        bgColorInput.addEventListener("input", change_color);

        closeButton.addEventListener("click", () => {
            modal.parentElement.removeChild(modal);
            close_advanced_options();
            advancedShown = false;
        });

        save.addEventListener("click", () => {
            console.log("hi");
        });

        function change_color() {
            mainColorInput.parentElement.style.background = mainColorInput.value;
            preview.style.background = mainColorInput.value;
            bgColorInput.parentElement.style.background = bgColorInput.value;
            textPreview.style.background = bgColorInput.value;
        }

        function close_advanced_options() {
            advancedButton.style.backgroundImage = "url('images/right-arrow.png')";
            advancedContent.style.display = "none";
        }

        function load_modal(container) {
            startInput.value = 0;
            resetInput.value = 0;
            decrementInput.value = 1;
            incrementInput.value = 1;
            mainColorInput.value = "#facb8d";
            bgColorInput.value = "#e2eeb9";
            change_color();
            
            container.append(modal);
        }
        return { load_modal };
    }
)();