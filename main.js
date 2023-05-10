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

export function prepareData(obj) {
    const memberArray = [];
    for (const key in obj) {
        const member = obj[key];
        member["id"] = key;
        memberArray.push(member);
    }
        return memberArray;
}

