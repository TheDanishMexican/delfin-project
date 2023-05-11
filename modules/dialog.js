import { CreateSubmitClicked } from "/modules/submit.js";

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

export function deleteClicked(obj) {
    console.log("delete button clicked");
    console.log(obj);
    // to do
    document.querySelector("#dialog-delete-member-title").textContent =
      obj.name;

    document
      .querySelector("#form-delete-member")
      .setAttribute("data-id", obj.id);

    document.querySelector("#dialog-delete-member").showModal();
  }