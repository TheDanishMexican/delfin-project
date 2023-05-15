import { validatePassword } from "/modules/validate.js";
import { showNewMemberDialog, closeDialog } from "/modules/dialog.js";
import { showAll, showFilteredSwimmers } from "/modules/display.js";
import { showValidatePasswordDialog } from "/modules/display.js";
import { showTop5Dialog, closeTop5Dialog, showTop5Swimmers } from "/modules/display.js";
import { showEditMemberDialog } from "./modules/dialog.js";

import {deleteMemberClicked} from "/modules/submit.js";
import{closeDeleteDialog} from"/modules/display.js"

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
    const Delete = document.querySelector("#form-delete");
    const deleteCancel=document.querySelector(".btn-cancel");
    
    const editBtn = document.querySelector(".edit-btn");
    const exitBtns = document.querySelectorAll(`button[id^=close]`);
    
    if (loginBtn) {
        loginBtn.addEventListener("click", showValidatePasswordDialog)
    };

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
            console.log("evtlstn tilføjet");
        });
        
    };
    

    if (Delete) {
        Delete.addEventListener("submit", deleteMemberClicked); 
    }

    if(deleteCancel){
        deleteCancel.addEventListener("click",closeDeleteDialog);
    }

    showAll(preparedArray);
    showFilteredSwimmers();
    
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
        const member = obj[key];
        if(member!== null){
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

// DELETE
export async function deleteMember(id){
     const response = await fetch(`${endpoint}/members/${id}.json`, {
    method: "DELETE",
  });

  // check if response is ok - if the response is successful
  if (response.ok) {
    console.log("Nice deleted");
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
  const form = document.querySelector("#dialog-add-swim-results");
  const stringified = JSON.stringify(updatedSwimmer);
  const response = await fetch(`${endpoint}/members/${id}.json`, {
    method: "PATCH",
    body: stringified
  });

  if (response.ok) {
    console.log("Results added");
    form.close();

  } else (console.log("Error in results added"));

}


