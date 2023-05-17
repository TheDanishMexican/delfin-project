import { createMember } from "/main.js";
import { updateSwimResults } from "/main.js";
import {deleteMember} from "/main.js";
import { memberPayed } from "../main.js";
import { closePaidDialog } from "./display.js";

export function CreateSubmitClicked(event) {
    event.preventDefault();

    const form = event.target;

    const fullName = form.name.value;
    const age = form.age.value;
    const address = form.address.value;
    const phoneNumber = form.phone.value;
    const email = form.email.value;
    const swimmerType = form['swimmer-type'].value;
    const membershipType = form['membership-type'].value;
    const competitionSwimmer = form['competition-swimmer'].checked;
    const amountOwed = form['amount-owed'].value;
    const owesMoney = form['owes-money'].checked;

    const disciplinesChecked = form.querySelectorAll('input[name="disciplines[]"]');
    const disciplines = [];
    disciplinesChecked.forEach(checkbox => {
        if (checkbox.checked) {
            disciplines.push(checkbox.value);
            };
        }
    )

    createMember(fullName, age, address, phoneNumber, email, swimmerType,
        membershipType, competitionSwimmer, disciplines, amountOwed, owesMoney);
    
    closeNewMemberDialog();

    
}

export function submitResultDisciplineClicked(event) {
  event.preventDefault();
  const form = event.target;
  const date = form.resultDate.value;
  const discipline = form.resultDiscipline.value;
  const time = form.resultTime.value;
  const id = form.getAttribute("swimmer-id");

  updateSwimResults(id, date, discipline, time);
}

export function deleteMemberClicked(event) {
const id = event.target.getAttribute("data-id"); // event.target is the delete form
console.log(id)
deleteMember(id); // call deletePost with id
}



export function SubmitMemberPaidBill(obj) {

obj.amountOwed = "0";

obj.owesMoney = false;

const id = obj.id;

memberPayed(obj, id);

closePaidDialog(id);

}


