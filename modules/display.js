import { closeDialog, showAddResultDialog, showEditResultDialog } from "./dialog.js";
import { getData, prepareData } from "../main.js";
import { showEditMemberDialog } from "./dialog.js";
import { dialogPaidBill } from "./dialog.js";
import { calculateTotalAmountOwed, totalIncome } from "../main.js";
import { filterByMembershipStatus, filterByPaymentStatus } from "./filter.js";
import { sortSwimmers } from "./sort.js";


const endpoints = "https://database-4c47b-default-rtdb.europe-west1.firebasedatabase.app/"


export function showAll(array) {
  if(document.querySelector("#member-object-container")){
  document.querySelector("#member-object-container").innerHTML ="";
  }
  if (document.querySelector("#cashier-members-container")){
    document.querySelector("#cashier-members-container").innerHTML ="";
  }
  if(document.querySelector("#payment-select")) {  
    document.querySelector("#payment-select").addEventListener("change", () => filterByPaymentStatus(array, event))
   }
  if(document.querySelector("#active-status-select")) {  
    document.querySelector("#active-status-select").addEventListener("change", () => filterByMembershipStatus(array, event))
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
        <br>
        <p>${obj.age} år</p>
      </div>
      <div class="swim-information">
       <p><strong>Adresse:</strong> <br> ${obj.address}</p> 
        <p><strong>E-mail:</strong> <br> ${obj.email}</p>
        <p><strong>Telefonnummer:</strong> <br> ${obj.phoneNumber}</p>
        </div> 
      <div class="object-btns">
        <button class="delete-btn">Slet</button>
        <button class="edit-btn">Rediger</button>
      </div> 
    </div>
  </section>  
  `
  if(document.querySelector("#member-object-container")) {

    document.querySelector("#member-object-container")
      .insertAdjacentHTML("beforeend", html);

    document.querySelector("#member-object-container section:last-child .delete-btn")
      .addEventListener("click", () => showDeleteDialog(obj));
    
    document.querySelector("#member-object-container section:last-child .edit-btn").addEventListener("click", () => showEditMemberDialog(obj));
    
    document.querySelector("#member-object-container section:last-child .swim-information")
    .addEventListener("click", () => showDetailDialog(obj));

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
        <div class="swimmer-btns-container">
        <div>
          <button id="edit-result-button" class="swimmer-btns">Ændr resultat</button>
        </div>
        <div>
          <button id="add-result-button" class="swimmer-btns">Tilføj resultat</button>
        </div>
        </div>
    </div> 
    </section>   
    `
    if(document.querySelector("#elite-swimmers-container")) {
      document.querySelector("#elite-swimmers-container")
        .insertAdjacentHTML("beforeend", html);
      
      document.querySelector("#swimmer-select-sort").addEventListener("change",
      () => sortSwimmers(obj));

      document.querySelector("#elite-swimmers-container section:last-child #add-result-button")
      .addEventListener("click", () => showAddResultDialog(obj));
      document.querySelector("#elite-swimmers-container section:last-child #edit-result-button")
      .addEventListener("click", () => showEditResultDialog(obj));
      

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
<p>${obj.name}</p>
<p>${obj.age} år</p>
<br>
</div>
<div class="cashier-information">
<p>Restance beløb: ${obj.amountOwed} kr</p>
</div>
<div class="bttn">
<button class="pay-btn">Fjern restance</button>
</div>
</div>
</section>
`;


if (document.querySelector("#cashier-members-container")) {
    document.querySelector("#cashier-members-container").insertAdjacentHTML("beforeend", html);

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
document.querySelector("#cashier-members-container section:last-child .pay-btn")
.classList.add("displaynone")
}
}

export function closePaidDialog(){
 const dialog = document.querySelector("#paid-dialog");
  dialog.close();
}

export async function updateTotalIncome() {
  const memberData = await getData(endpoints);
  const memberArray = prepareData(memberData);
  const total = totalIncome(memberArray);
  const totalAmountOwed = calculateTotalAmountOwed(memberArray);
  const realIncome=total-totalAmountOwed;

  const totalIncomeElement = document.querySelector("#total-income");
  const realIncomeElement = document.querySelector("#real-income");

  if (totalIncomeElement) {
    totalIncomeElement.innerHTML = total.toFixed(2);
    // toFixed sætter decimaler på (2) = 2 decimaler
  }

  if (realIncomeElement) {
    realIncomeElement.innerHTML = realIncome.toFixed(2);
  }
}

export function showDetailDialog(obj){
  document.querySelector(".x-button").addEventListener("click", closeDialog);
  const dialog = document.querySelector("#detail-dialog");
  showDetailObject(obj);
  dialog.showModal();
}

export function showDetailObject(obj){
  document.querySelector("#obj-table").innerHTML = "";
const html = /*html*/ `
<div  class="detailed-obj">
<table class="detailed-obj-table">
    <h3>
        Medlemsinformation: <p class="obj-name">${obj.name}</p>
    </h3>
  <tr>
    <th>Type af medlem</th>
    <th>Alder</th>
    <th>Email</th>
    <th>Adresse</th>
  </tr>
  <tr>
    <td>${obj.swimmerType}</td>
    <td>${obj.age} år</td>
    <td>${obj.email}</td>
    <td>${obj.address}</td>
  </tr>
  <tr>
    <th>Konkurrence svømmer</th>
    <th>Medlemsskab status</th>
    <th>Kontingent status</th>
    <th>Telefon nummer</th>
  </tr>
  <tr>
    <td>${obj.isCompetitionSwimmer}</td>
    <td>${obj.membershipType}</td>
    <td>Skylder ${obj.amountOwed}kr</td>
    <td>${obj.phoneNumber}</td>
  </tr>
</table>
    </div>
` 
document.querySelector("#obj-table").insertAdjacentHTML("beforeend", html);
}

export function resetSelect() {
  document.querySelector(".close-select").selectedIndex = 0; 
}








