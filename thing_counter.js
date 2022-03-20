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
                    creatorObj.load_modal(thingsContainer, thingsSubContainer, things);
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

        return { switch_to_things_counter, things : thingsContainer }
    }
)();

function create_thing(name, startValue, resetValue, stepPlus, stepMinus, mainColor, textBgColor, array) {
    const thingMarkup = document.createElement("div");
    const mainContent = document.createElement("div");
    const incDecContent = document.createElement("div");
    const plus = document.createElement("button");
    const countSpan = document.createElement("span");
    const minus = document.createElement("button");
    const titleContent = document.createElement("div");
    const title = document.createElement("h2");
    const changeButton = document.createElement("button");
    const modifyContent = document.createElement("div");
    const edit = document.createElement("button");
    const reset = document.createElement("button");
    const delet = document.createElement("button");
    let count, advanced, thingObj, arrayOfThings;

    thingMarkup.classList.add("thing");
    mainContent.classList.add("main-thing-content");
    incDecContent.classList.add("inc-dec");
    plus.classList.add("plus");
    minus.classList.add("minus");
    titleContent.classList.add("title-wrapper");
    title.classList.add("title");
    changeButton.classList.add("change-thing-button");
    modifyContent.classList.add("modify-thing");
    edit.classList.add("edit-thing");
    reset.classList.add("reset-thing");
    delet.classList.add("delete-thing");

    thingMarkup.append(mainContent);
    thingMarkup.append(changeButton);
    thingMarkup.append(modifyContent);
    mainContent.append(incDecContent);
    mainContent.append(titleContent);
    incDecContent.append(plus);
    incDecContent.append(countSpan);
    incDecContent.append(minus);
    titleContent.append(title);
    modifyContent.append(edit);
    modifyContent.append(reset);
    modifyContent.append(delet);

    startValue = Number(startValue);
    resetValue = Number(resetValue);
    stepPlus = Number(stepPlus);
    stepMinus = Number(stepMinus);

    count = startValue;
    countSpan.innerText = count;
    change_title(name);
    advanced = false;
    arrayOfThings = array;

    thingMarkup.style.background = mainColor;
    titleContent.style.background = textBgColor;
    modifyContent.style.background = textBgColor;

    title.addEventListener("click", () => {
        const input = document.createElement("input");

        input.setAttribute("type", "text");
        input.classList.add("temp-input");
        input.value = title.innerText;
        title.replaceWith(input);
        input.focus();

        document.addEventListener("keydown", event => {
            if (event.key == "Enter" && document.activeElement == input)
                document.activeElement.blur();
        });

        input.addEventListener("focusout", () => {
            change_title(input.value);
            input.replaceWith(title);
            thingObj.name = input.value;
            name = input.value;
        });
    });

    plus.addEventListener("click", () => {
        count += stepPlus;
        countSpan.innerText = count;
    });

    minus.addEventListener("click", () => {
        count -= stepMinus;
        countSpan.innerText = count;
    });

    changeButton.addEventListener("click", () => {
        if (advanced) {
            modifyContent.style.display = "none";
            changeButton.style.backgroundImage = "url('images/right-arrow.png')";
        }
        else {
            modifyContent.style.display = "flex";
            changeButton.style.backgroundImage = "url('images/down-arrow.png')";
        }

        advanced = !advanced;
    });

    reset.addEventListener("click", () => {
        count = resetValue;
        countSpan.innerText = count;
    });

    edit.addEventListener("click", call_modal);

    delet.addEventListener("click", () => {
        deleteModalObj.delete_element(name, thingMarkup, thingsCounterObj.things, arrayOfThings);
    });

    function call_modal() {
        creatorObj.edit_modal(thingObj);
    }

    function update(newName, newStart, newReset, newPlus, newMinus, newMainColor, newTextBgColor) {
        name = newName;
        startValue = Number(newStart);
        resetValue = Number(newReset);
        stepPlus = Number(newPlus);
        stepMinus = Number(newMinus);
        mainColor = newMainColor;
        textBgColor = newTextBgColor;

        change_title(newName);
        countSpan.innerText = newStart;
        count = Number(newStart);
        thingMarkup.style.background = mainColor;
        titleContent.style.background = textBgColor;
        modifyContent.style.background = textBgColor;
    }

    function change_title(newName) {
        title.innerText = newName ? newName : `Ux_z${Math.floor(Math.random() * 1e7) + 1e6}e`;
        name = title.innerText;
    }

    function get_count() {
        return count;
    }

    function get_name() {
        return name;
    }

    function get_start() {
        return startValue;
    }

    function get_reset() {
        return resetValue;
    }

    function get_inc() {
        return stepPlus;
    }

    function get_dec() {
        return stepMinus;
    }

    function get_main_color() {
        return mainColor
    }

    function get_text_bg_color() {
        return textBgColor;
    }

    thingObj = { thingMarkup, update, get_count, get_name, get_start, get_reset, get_inc, get_dec, get_main_color, get_text_bg_color }

    return thingObj;
}

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
        let advancedShown, container, thingsContainer, things, edibleThing;

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

        closeButton.addEventListener("click", close_modal);

        save.addEventListener("click", () => { 
            if (!edibleThing) {
                const thing = create_thing(labelInput.value, startInput.value, resetInput.value, incrementInput.value, decrementInput.value, mainColorInput.value, bgColorInput.value, things);
                things.push(thing);
                thingsContainer.append(thing.thingMarkup);
            }
            else {
                edibleThing.update(labelInput.value, startInput.value, resetInput.value, incrementInput.value, decrementInput.value, mainColorInput.value, bgColorInput.value);
                edibleThing = '';
            }

            close_modal(); 
        });

        function close_modal() {
            container.removeChild(modal);
            close_advanced_options();
            advancedShown = false;
            edibleThing = '';
        }

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

        function load_modal(modalParent, thingsParent, thingsArray) {
            labelInput.value = '';
            startInput.value = 0;
            resetInput.value = 0;
            decrementInput.value = 1;
            incrementInput.value = 1;
            mainColorInput.value = "#facb8d";
            bgColorInput.value = "#e2eeb9";
            change_color();
            
            container = modalParent;
            container.append(modal);
            thingsContainer = thingsParent;
            things = thingsArray;
            labelInput.focus();
        }

        function edit_modal(thing) {
            container.append(modal);
            edibleThing = thing;

            labelInput.value = edibleThing.get_name();
            startInput.value = edibleThing.get_count();
            resetInput.value = edibleThing.get_reset();
            decrementInput.value = edibleThing.get_dec();
            incrementInput.value = edibleThing.get_inc();
            mainColorInput.value = edibleThing.get_main_color();
            bgColorInput.value = edibleThing.get_text_bg_color();
            change_color();
        }

        return { load_modal, edit_modal };
    }
)();