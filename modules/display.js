import { showAddResultDialog } from "./dialog.js";
import { getData, prepareData } from "/main.js";
import { showEditMemberDialog } from "/modules/dialog.js";
import { dialogPaidBill } from "./dialog.js";

const endpoints = "https://database-4c47b-default-rtdb.europe-west1.firebasedatabase.app/"


export function showAll(array) {
  if(document.querySelector("#member-object-container")){
  document.querySelector("#member-object-container").innerHTML ="";
  }
  if (document.querySelector("#cashier-members-container")){
    document.querySelector("#cashier-members-container").innerHTML ="";
  }

    for (const member of array) {
        showCashier(member);
        showOne(member);
    };
}

export function showOne(obj) {
  const html = /*html*/ `
  <section>
    <div class="member-object">
      <div class="personal-information">
        <p>${obj.name}</p>
        <p>${obj.age} år</p>
        <p>Medlemskabstype: ${obj.membershipType}</p>
      </div>
      <div class="swim-information">
       <p><strong>Adresse:</strong> ${obj.address}</p> 
        <p><strong>E-mail:</strong> ${obj.email}</p>
        <p><strong>Telefonnummer:</strong> ${obj.phoneNumber}</p>
        </div> 
      <div class="object-btns">
        <button class="delete-btn">Slet</button>
        <button class="edit-btn">Ret oplysninger</button>
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
      if (document.querySelector("#elite-swimmers-container")){
    document.querySelector("#elite-swimmers-container").innerHTML="";
  }
    for (const swimmer of array) {
        showSwimmer(swimmer);
    };
}

export function showSwimmer(obj) {
    const html = /*html*/ `
    <section>
    <div class="elite-swimmer-item">
    <div class="swimmer-info">
        <p>${obj.name}</p>
        <p>Svømmertype: ${obj.swimmerType}</p>
        <p>Medlemskabstype: ${obj.membershipType}</p>
        </div>
        <div class="swimmer-discipline">
        <p>Discipliner:</p>
        <ul>
            ${obj.discipline ? obj.discipline.
                map(discipline => `<li>${discipline}</li>`).join('') : 'Ingen'}
        </ul>
        </div>
        <div class="swimmer-comp-results">
        <p>Konkurrenceresultater:</p>
        <ul>
            ${obj.competitionResults ? obj.competitionResults.
                map(result => `<li>Dato: ${result.date}</li> <li>Disciplin: 
                ${result.discipline}</li> <li>Tid: ${result.result} sekunder</li>`)
                .join('') : 'Har ikke deltaget i konkurrencer endnu'}
        </ul>
        </div>
        <div class="swimmer-btns">
        <div>
          <button class="add-result-button">Ændr resultat</button>
        </div>
        <div>
          <button class="edit-result-button">Tilføj resultat</button>
        </div>
        </div>
    </div> 
    </section>   
    `
    if(document.querySelector("#elite-swimmers-container")) {
      document.querySelector("#elite-swimmers-container")
        .insertAdjacentHTML("beforeend", html);

      document.querySelector("#elite-swimmers-container section:last-child .add-result-button")
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

export function showTop5JuniorDialog() {
  const dialog = document.querySelector("#top-five-dialog-junior");
  dialog.showModal();
}
export function CloseTop5JuniorDialog() {
  const dialog = document.querySelector("#top-five-dialog-junior");
  dialog.close();
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
document.querySelector("#dialog-delete-title").textContent=obj.name;
document.querySelector("#form-delete").setAttribute("data-id",obj.id);
document.querySelector("#delete-dialog").showModal();
}

export function closeDeleteDialog(){
document.querySelector("#delete-dialog").close();
}

export function showCashier(obj) {

const html = /*html*/`
<section>
<div class="cashier-members-item" id="member-${obj.id}">
<div class="personal-information">
<p>Navn: ${obj.name}</p>
<p>Alder: ${obj.age}</p>
<p>Adresse: ${obj.address}</p>
</div>
<div class="swim-information">
<p>Medlemskabstype: ${obj.membershipType}</p>
<p>E-mail: ${obj.email}</p>
<p>Telefonnummer: ${obj.phoneNumber}</p>
<p>Skyldigt beløb: ${obj.amountOwed}</p>
<button class="pay-btn">Betalt</button>
</div>
</div>
</section>
`;

if(document.querySelector("#cashier-members-container")) {

document.querySelector("#cashier-members-container")
.insertAdjacentHTML("beforeend", html);

setBackgroundColor(obj);

document.querySelector("#cashier-members-container section:last-child .pay-btn")
.addEventListener("click", () => dialogPaidBill(obj));
}
}

function setBackgroundColor(obj) {
if (obj.amountOwed > 0) {
document.querySelector("#cashier-members-container section:last-child").classList.add("amount-owned-red");
} else {
document.querySelector("#cashier-members-container section:last-child").classList.add("amount-owned-green");
}
}

export function closePaidDialog(){
 const dialog = document.querySelector("#paid-dialog");
  dialog.close();
}















