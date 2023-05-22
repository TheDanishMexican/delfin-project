"use strict"


export async function updateMemberClicked(event){
    event.preventDefault();
    
    const form = event.target
    const memberID= form.memberID.value
    console.log(form)
    const member = {
        name: form.name.value,
        address: form.address.value,
        age: form.age.value,
        amountOwed: form.amountOwed.value,
        competitionResults:{
            date: form.date.value,
            discipline: form.discipline.value,
            result: form.result.value,
        } ,
        discipline:{

            // ved ikke
        },
        email: form.email.value,
        // isComptSwimmer: form.isCompetitionSwimmer.boolean,?
        membershipType: form.membershipType.value,
        // owesMoney: form.owesMoney.boolean,?
        phoneNumber: form.phoneNumber.value,
        swimmerType: form.swimmerType.value,
    }
    
    submitUpdateMember(memberID, key, endpoint);
}

/*---------------UPDATE------------*/
// Patch request with member object to endpoint
export async function submitUpdateMember(member, key, endpoint){
    // fillUpdateForm(memberObj); <------------------------------ skal laves inden aflevering
        const form = document.querySelector("#edit-member-form")
        


const response = await fetch(`${endpoint}members/${key}.json`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({member}),
})
if (response.ok){
    console.log("your member was updated");
showToastMessage("Medlemmet er opdateret :-)");
} else{
    console.log("Error: member not updated");
    showToastMessage("Hovsa sovsa, noget gik galt." <br> "Er det hele korrekt indtastet? ");
}
}