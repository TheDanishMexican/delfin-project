import { showAddResultDialog } from "./dialog.js";
import { getData, prepareData } from "/main.js";
import { showEditMemberDialog } from "/modules/dialog.js";

const endpoints = "https://database-4c47b-default-rtdb.europe-west1.firebasedatabase.app/"


export function showAll(array) {
    for (const member of array) {
        showOne(member);
    };
}

export function showOne(obj) {
  const html = /*html*/ `
  <section>
    <div class="member-object">
      <div class="personal-information">
        <p>Navn: ${obj.name}</p>
        <p>Alder: ${obj.age}</p>
        <p>Adresse: ${obj.address}</p>
      </div>
      <div class="swim-information">
        <p>Medlemskabstype: ${obj.membershipType}</p>
        <p>E-mail: ${obj.email}</p>
        <p>Telefonnummer: ${obj.phoneNumber}</p>
        <button class="delete-btn">Slet</button>
      <button class="edit-btn">Ret oplysninger, min ven?</button>
        </div>  
    </div>
  </section>  
  `
  if(document.querySelector("#member-object-container")) {

    document.querySelector("#member-object-container")
      .insertAdjacentHTML("beforeend", html);

    document.querySelector("#member-object-container section:last-child .delete-btn")
      .addEventListener("click", () => showDeleteDialog(obj));
    
    document.querySelector("#member-object-container section:last-child .edit-btn").addEventListener("click", () => showEditMemberDialog());
    
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
        <div>
          <button class="add-result-button">Rediger resultat</button>
        </div>
        <div>
          <button class="edit-result-button">Tilføj resultat</button>
        </div>
        <p>Navn: ${obj.name}</p>
        <p>Svømmertype: ${obj.swimmerType}</p>
        <p>Medlemskabstype: ${obj.membershipType}</p>
        <p>Discipliner:</p>
        <ul>
            ${obj.discipline ? obj.discipline.
                map(discipline => `<li>${discipline}</li>`).join('') : 'Ingen'}
        </ul>
        <p>Konkurrenceresultater:</p>
        <ul>
            ${obj.competitionResults ? obj.competitionResults.
                map(result => `<li>Dato: ${result.date}</li> <li>Disciplin: 
                ${result.discipline}</li> <li>Tid: ${result.result} sekunder</li>`)
                .join('') : 'Har ikke deltaget i konkurrencer endnu'}
        </ul>
    </div>    
    `
    if(document.querySelector("#elite-swimmers-container")) {
      document.querySelector("#elite-swimmers-container")
        .insertAdjacentHTML("beforeend", html);

      document.querySelector("#elite-swimmers-container div:last-child .add-result-button")
      .addEventListener("click", () => showAddResultDialog(obj));

    };
}

export function showValidatePasswordDialog() {
  const dialog = document.querySelector("#login-dialog");
  dialog.showModal();

}

export function showTop5Dialog() {
  const dialog = document.querySelector("#top-five-dialog");
  dialog.showModal();
}

export function closeTop5Dialog() {
  const dialog = document.querySelector("#top-five-dialog");
  dialog.close();
}

export function showTop5Swimmers(event) {
  event.preventDefault()
  const discipline = event.target.discipline;

  console.log(discipline.value);
}

export function showDeleteDialog(obj) {
  console.log(obj);
  document.querySelector("#delete-dialog").showModal();
}














