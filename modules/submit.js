import { closeNewMemberDialog } from "/modules/dialog.js";
import { createMember } from "/main.js";

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

