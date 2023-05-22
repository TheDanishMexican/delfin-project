"use strict"


export async function updateMemberClicked(event){
    event.preventDefault();
    const form = event.target;
    const memberID=form.getAttribute("data-id")
    const name= form.name.value
    const age = form.age.value
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

    console.log(memberID);
    console.log(memberToUpdate);


const response = await fetch(`${endpoint}members/${memberID}.json`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({memberToUpdate}),
})
if (response.ok){
    console.log("your member was updated");
showToastMessage("Medlemmet er opdateret :-)");
} else{
    console.log("Error: member not updated");
    showToastMessage("Hovsa sovsa, noget gik galt." <br> "Er det hele korrekt indtastet? ");
}
}