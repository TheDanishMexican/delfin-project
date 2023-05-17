import { SubmitMemberPaidBill } from "./submit.js";
import { submitResultDisciplineClicked } from "./submit.js";
import { CreateSubmitClicked } from "/modules/submit.js";

export function showNewMemberDialog() {
    const dialog = document.querySelector("#create-new-member-dialog");
    const form = document.querySelector("#create-new-member-form");

    form.addEventListener("submit", CreateSubmitClicked);

    dialog.showModal();
}


export function showEditMemberDialog(){
   
    document.querySelector("#edit-member-dialog").showModal()
  
}

export function closeDialog(){
const dialog = document.querySelectorAll(".dialogs")
const form = document.querySelector(".forms")

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

export function deleteClicked(obj) {
document.querySelector("#dialog-delete-member-title").textContent =obj.name;
document.querySelector("#form-delete-member").setAttribute("data-id", obj.id);
document.querySelector("#dialog-delete-member").showModal();
}

export function dialogPaidBill(obj) {
const submitBtn = document.querySelector("#confirm-pay-btn");
const dialog = document.querySelector("#paid-dialog");
submitBtn.addEventListener("click", () => SubmitMemberPaidBill(obj));
dialog.showModal();
}

