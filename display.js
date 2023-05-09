import { getData, prepareData } from "./main.js";

export function showAll(array) {
    for (const member of array) {
        showOne(member);
    };
}

export function showOne(obj) {
    const html = /*html*/ `
    <div class="member-object">
        <div class="personal-information">
            <p>Name: ${obj.name}</p>
            <p>Age: ${obj.age}</p>
            <p>Address: ${obj.address}</p>
            <p>Email: ${obj.email}</p>
            <p>Phone number: ${obj.phoneNumber}</p>
            <p>Owes money: ${obj.owesMoney}</p>
            <p>Amount owed: ${obj.amountOwed}</p>
        </div>
        <div class="swim-information">
            <p>Swimmer type: ${obj.swimmerType}</p>
            <p>Membership type: ${obj.membershipType}</p>
            <ul>
                Best results:
                ${obj.bestResults ? obj.bestResults.map(result => `<li>Date: ${result.date}, 
                Discipline: ${result.discipline}, Result: ${result.result}</li>`).join('') : 'No results'}
            </ul>
            <ul>
                Disciplines:
                ${obj.discipline ? obj.discipline.map(discipline => `<li>${discipline}</li>`).join('') : 'None'}
            </ul>
        </div>    
    </div>
    `
    if (document.querySelector("#member-object-container")) {
    document.querySelector("#member-object-container")
    .insertAdjacentHTML("beforeend", html);
    }  
}

export async function showCompetitionSwimmers() {
    const memberData = await getData();
    const preparedArray = prepareData(memberData);
    const filtered = preparedArray.filter(swimmer => swimmer.isCompetitionSwimmer === true);
    return filtered;
}

export async function showFilteredSwimmers() {
    const array = await showCompetitionSwimmers();
    for (const swimmer of array) {
        showSwimmer(swimmer);
    };
}

export function showSwimmer(obj) {
    const html = /*html*/ `
    <div class="elite-swimmer-item">
        <p>Name: ${obj.name}</p>
        <p>Swimmer type: ${obj.swimmerType}</p>
        <p>Membership type: ${obj.membershipType}</p>
        <ul>
            Best results:
            ${obj.bestResults ? obj.bestResults.map(result => `<li>Date: ${result.date}, 
            Discipline: ${result.discipline}, Result: ${result.result}</li>`).join('') : 'No results'}
        </ul>
        <ul>
            Disciplines:
            ${obj.discipline ? obj.discipline.map(discipline => `<li>${discipline}</li>`).join('') : 'None'}
        </ul>
    </div>    
    `
    if(document.querySelector("#elite-swimmers-container")) {
        document.querySelector("#elite-swimmers-container")
        .insertAdjacentHTML("beforeend", html);
    };
}








