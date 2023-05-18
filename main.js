import { validatePassword } from "/modules/validate.js";
import { showNewMemberDialog, closeDialog } from "/modules/dialog.js";
import { showAll, showFilteredSwimmers } from "/modules/display.js";
import { showValidatePasswordDialog } from "/modules/display.js";
import { showTop5Dialog, closeTop5Dialog, showTop5Swimmers } from "/modules/display.js";
import { showEditMemberDialog } from "./modules/dialog.js";
import { CloseTop5JuniorDialog, showTop5JuniorDialog } from "./modules/display.js";
import {deleteMemberClicked} from "/modules/submit.js";
import{closeDeleteDialog} from"/modules/display.js"
import { closePaidDialog } from "./modules/display.js";


window.addEventListener("load", start);

const endpoint = "https://database-4c47b-default-rtdb.europe-west1.firebasedatabase.app/"

export async function start() {
    const addButton = document.querySelector("#new-member-button");
    const memberData = await getData();
    const preparedArray = prepareData(memberData);
    const form = document.querySelector("#login-form");
    const loginBtn = document.querySelector("#log-but");
    const buttonTop5 = document.querySelector("#top-five-button");
    const closeBtnInTop5 = document.querySelector("#close-top-5-btn");
    const FormInTop5 = document.querySelector("#top-five-form");
    const editBtn = document.querySelector(".edit-btn");
    const exitBtns = document.querySelectorAll(`button[id^=close]`);
    const showTop5JuniorBtn = document.querySelector("#top-five-junior-button");
    const closeTop5JuniorBtn = document.querySelector("#close-top-5-btn-junior");
    const Delete = document.querySelector("#form-delete");
    const deleteCancel = document.querySelector(".btn-cancel");
    const paidCancel = document.querySelector(".btn-cncl");
    
    if (loginBtn) {
        loginBtn.addEventListener("click", showValidatePasswordDialog)
    };

    if (showTop5JuniorBtn) {
        showTop5JuniorBtn.addEventListener("click", showTop5JuniorDialog);
    }

    if (closeTop5JuniorBtn) {
        closeTop5JuniorBtn.addEventListener("click", CloseTop5JuniorDialog);
    }

    if (form) {
        form.addEventListener("submit", validatePassword);
    };
    
    if(addButton) {
        addButton.addEventListener("click", showNewMemberDialog)
        
    };

    if (buttonTop5) {
        buttonTop5.addEventListener("click", showTop5Dialog);
    };

    if(closeBtnInTop5) {
        closeBtnInTop5.addEventListener("click", closeTop5Dialog);
    };

    if(FormInTop5) {
        FormInTop5.addEventListener("submit", showTop5Swimmers);
    };
    if(editBtn) {
        editBtn.addEventListener("click", showEditMemberDialog);
    };
    if (exitBtns) {
        exitBtns.forEach(exitBtn => {
            exitBtn.addEventListener("click", closeDialog);
        });
        
    };
    if (Delete) {
    Delete.addEventListener("submit", deleteMemberClicked);}

    if(deleteCancel){
    deleteCancel.addEventListener("click",closeDeleteDialog);
    }

    if(paidCancel){
    paidCancel.addEventListener("click",closePaidDialog);
    }

    showAll(preparedArray);
    showFilteredSwimmers();
    updateTotalIncome();
}

//*----CREATE----*//
// create new member
export async function getData() {
    const response = await fetch(`${endpoint}/members.json`)
    if(response.ok) {
        const data = await response.json();
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
        if(obj[key] === null) {
            continue;
        } else {
        const member = obj[key];
        member["id"] = key;
        memberArray.push(member);
        }
    }
        return memberArray;
}

export async function createMember(fullName, age, address, phoneNumber, email, swimmerType,
    membershipType, competitionSwimmer, discipline, amountOwed, owesMoney) {
    const newMemberObj = {
        address: address,
        age: age,
        amountOwed: amountOwed,
        discipline: discipline,
        email: email,
        isCompetitionSwimmer: competitionSwimmer,
        membershipType: membershipType,
        name: fullName,
        owesMoney: owesMoney,
        phoneNumber: phoneNumber,
        swimmerType: swimmerType,
    };
    const json = JSON.stringify(newMemberObj);
    const response = await fetch(`${endpoint}/members.json`, 
        {
            method: "POST",
            body: json
        }
    );
    if (response.ok) {
        console.log("New member created")
    };
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

export async function updateSwimResults(id, date, discipline, time) {
  const updatedSwimmer = {
        competitionResults: [
        {
        date: date,
        discipline: discipline,
        result: time
        }]
  };
  const dialog = document.querySelector("#dialog-add-swim-results");
  const form = document.querySelector("#form-add-svim-results");
  const stringified = JSON.stringify(updatedSwimmer);
  const response = await fetch(`${endpoint}/members/${id}.json`, {
    method: "PATCH",
    body: stringified
  });

  if (response.ok) {
    showFilteredSwimmers();
    form.reset();
    dialog.close();

  } else (console.log("Error in results added"));

}

// DELETE
export async function deleteMember(id){
const response = await fetch(`${endpoint}/members/${id}.json`, {
method: "DELETE",
});
// check if response is ok - if the response is successful
if (response.ok) {
console.log("Nice deleted");
updateMembersGrid();
}
}

export async function memberPayed(obj, id){
 const updatedPayment = {
amountOwed: obj.amountOwed,
owesMoney: obj.owesMoney,
}
 const stringified = JSON.stringify(updatedPayment);
 const response = await fetch(`${endpoint}/members/${id}.json`, {
 method: "PATCH",
body: stringified,
})
 if (response.ok) {
console.log("Member paid");
updateMembersGrid();
 } else (console.log("Member did not pay"));
}

export async function updateMembersGrid() {
    const memberData = await getData();
    const memberArray = prepareData(memberData);
    showAll(memberArray);
     totalIncome(memberArray);
    
}

export function totalIncome(memberArray) {
  let totalIncome = 0;

  for (const member of memberArray) {
    const membershipType = member.membershipType;
    const swimmerType = member.swimmerType;

    if (membershipType === "active") {
      if (swimmerType === "senior") {
        if (member.age >= 60) {
          totalIncome += 1200; // Senior (over 60 år) med rabat: 1200 kr. årligt
        } else {
          totalIncome += 1600; // Senior (18 år og over): 1600 kr. årligt
        }
      } else if (swimmerType === "junior") {
        totalIncome += 1000; // Ungdomssvømmere (under 18 år): 1000 kr. årligt
      }
    } else if (membershipType === "passive") {
      totalIncome += 500; // Passivt medlemskab: 500 kr. årligt
    }
  }

  return totalIncome;
}

export async function updateTotalIncome() {
  const memberData = await getData(endpoint);
  const memberArray = prepareData(memberData);
  const total = totalIncome(memberArray);

  const totalIncomeElement = document.querySelector("#total-income");
  if (totalIncomeElement) {
    totalIncomeElement.innerHTML = total.toFixed(2);
  }
}







