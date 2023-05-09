import { CreateSubmitClicked } from "./submit.js";

export function showNewMemberDialog() {
    const cancelBtn = document.querySelector("#cancel-button");
    const dialog = document.querySelector("#create-new-member-dialog");
    const form = document.querySelector("#create-new-member-form");

    form.addEventListener("submit", CreateSubmitClicked);
    cancelBtn.addEventListener("click", closeNewMemberDialog);

    dialog.showModal();
}

export function closeNewMemberDialog() {
    const dialog = document.querySelector("#create-new-member-dialog");
    const form = document.querySelector("#create-new-member-form");

    dialog.close();
    form.reset();
}