"use strict"


export async function updateMemberClicked(){
    console.log("Medlem opdateret!");
    
    const member= "hello"
    
}

/*---------------UPDATE------------*/
// Patch request with member object to endpoint
export async function updateMember(member, key, endpoint){
const submitEditForm = document.querySelector("#edit-member-form")

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