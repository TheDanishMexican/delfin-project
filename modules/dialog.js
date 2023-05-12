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
console.log("gør det");

dialog.forEach(dialog => {
    dialog.close();
    form.reset();
    
});
};

