import { deleteMemberClicked } from "./submit.js";

import { submitResultDisciplineClicked } from "./submit.js";
import { CreateSubmitClicked } from "/modules/submit.js";

export function showNewMemberDialog() {
    const dialog = document.querySelector("#create-new-member-dialog");
    const form = document.querySelector("#create-new-member-form");

    form.addEventListener("submit", CreateSubmitClicked);

    dialog.showModal();
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
export function showEditMemberDialog(){
   
    document.querySelector("#edit-member-dialog").showModal()
  
}

export function closeDialog(){
const dialog = document.querySelectorAll(".dialogs")
const form = document.querySelector(".forms")
console.log("gør det");

dialog.forEach(dialog => {
    dialog.close();
    form.reset();
    
});
};
export function showAddResultDialog(obj) {
    document.querySelector("#close-swim-results-btn")
    .addEventListener("click", closeResultDialog);
  
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

export function closeResultDialog() {
    const dialog = document.querySelector("#dialog-add-swim-results");
    dialog.close(); 
}
