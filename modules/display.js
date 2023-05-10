import { getData, prepareData } from "/main.js";

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
        </div>
        <div class="swim-information">
            <p>Membership type: ${obj.membershipType}</p>
            <p>Email: ${obj.email}</p>
            <p>Phone number: ${obj.phoneNumber}</p>
        </div>    
    </div>
    `
    if (document.querySelector("#member-object-container")) {
    document.querySelector("#member-object-container")
    .insertAdjacentHTML("beforeend", html);
    }  
}

export async function showForCoach() {
    const memberData = await getData();
    const preparedArray = prepareData(memberData);
    const filtered = preparedArray.filter(swimmer => swimmer.isCompetitionSwimmer === true);
    return filtered;
}

export async function showFilteredSwimmers() {
    const array = await showForCoach();
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
        <p>Disciplines:</p>
        <ul>
            ${obj.discipline ? obj.discipline.
                map(discipline => `<li>${discipline}</li>`).join('') : 'None'}
        </ul>
        <p>Competition results:</p>
        <ul>
            ${obj.competitionResults ? obj.competitionResults.
                map(result => `<li>Date: ${result.date}</li> <li>Discipline: 
                ${result.discipline}</li> <li>Time: ${result.result} seconds</li>`)
                .join('') : 'None'}
        </ul>
    </div>    
    `
    if(document.querySelector("#elite-swimmers-container")) {
        document.querySelector("#elite-swimmers-container")
        .insertAdjacentHTML("beforeend", html);
    };
}








