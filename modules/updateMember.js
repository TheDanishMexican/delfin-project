"use strict"

import { endpoint, updateMembersGrid } from "../main.js";
import { closeDialog } from "./dialog.js";


export async function updateMemberClicked(event){
    event.preventDefault();
    const form = event.target;

    const dateOfBirth = new Date(form.age.value);
    const todayDate = new Date();

    const calculatedAge = todayDate.getFullYear() - dateOfBirth.getFullYear();

    const memberID=form.getAttribute("data-id")
    const name= form.name.value
    const age = calculatedAge
    const address = form.address.value
    const phone = form.phone.value
    const email = form.email.value
    const amountOwed = form.amountOwed.value
    const owesMoney = form.owesMoney.checked
    const type = form.membershipType.value
    const swimmerType = form.swimmerType.value
    const isCompSwimmer = form.competitionSwimmer.checked
    const memberToUpdate = {
     address: address,
     age: age,
     amountOwed: amountOwed,
     email: email,
     isCompetitionSwimmer: isCompSwimmer,
     membershipType: type,
     name: name,
     owesMoney: owesMoney,
     phoneNumber: phone,
     swimmerType: swimmerType
    }
    updateMemberData(memberID, memberToUpdate);
   


}

/*---------------UPDATE------------*/
// Patch request with member object to endpoint
export async function updateMemberData(memberID, memberToUpdate){

const response = await fetch(`${endpoint}members/${memberID}.json`, {
    method: "PATCH",
    body: JSON.stringify(memberToUpdate),
})
if (response.ok){
    console.log("your member was updated");
    closeDialog();
    updateMembersGrid();
        
} else{
    console.log("Error: member not updated");

}
}