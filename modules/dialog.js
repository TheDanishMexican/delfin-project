
import { submitResultDisciplineClicked } from "./submit.js";
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

export function showEditMemberDialog(){
    document.querySelector("#edit-dialog").showModal()
console.log("Åh min ven, du gjorde det med EDIT");  
}

export function showAddResultDialog(obj) {
  
  const dialog = document.querySelector("#dialog-add-swim-results");
  const form = document.querySelector("#form-add-svim-results");
  form.setAttribute("swimmer-id", obj.id)
  form.name.value = obj.name;
  
 if (!obj.competitionResults) { 
  obj.competitionResults = [{ 
    date:"",
    discipline:"",                  
    result:"" 
  } ]
}

  dialog.showModal();

  document.querySelector("#form-add-svim-results")
    .addEventListener("submit", submitResultDisciplineClicked);

}

