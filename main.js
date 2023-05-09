import { showAll } from "./display.js";

window.addEventListener("load", start);

const endpoint = "https://database-4c47b-default-rtdb.europe-west1.firebasedatabase.app/"

export async function start() {
    const memberData = await getData();
    const preparedArray = prepareData(memberData);
    showAll(preparedArray);
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

