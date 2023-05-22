"use strict"


export async function updateMemberClicked(event){
    console.log(event);
    const form = event.target
    const memberID=form.getAttribute("data-id")
    const name= form.name.value
    console.log(name);
    

    
    // updateMemberData(obj, key, endpoint);
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