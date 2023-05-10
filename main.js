import { showNewMemberDialog } from "./modules/dialog.js";
import { showAll, showFilteredSwimmers } from "./modules/display.js";

window.addEventListener("load", start);

const endpoint = "https://database-4c47b-default-rtdb.europe-west1.firebasedatabase.app/"

export async function start() {
    const button = document.querySelector("#new-member-button");
    const memberData = await getData();
    const preparedArray = prepareData(memberData);
    
    if(button) {
        button.addEventListener("click", showNewMemberDialog)
    };

    showAll(preparedArray);
    showFilteredSwimmers();
}

export async function getData() {
    const response = await fetch(`${endpoint}/members.json`)
    if(response.ok) {
        const data = response.json();
        return data;
    } else {
        console.log("Bad response")
    }
}
/*---------------PREPARE------------*/
// data prep for member data (getData)

export function prepareData(obj) {
    const memberArray = [];
    for (const key in obj) {
        const member = obj[key];
        member["id"] = key;
        memberArray.push(member);
    }
        return memberArray;
}

/*---------------UPDATE------------*/
// Put request with member object to endpoint
export async function updateMember(member, key, endpoint){
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