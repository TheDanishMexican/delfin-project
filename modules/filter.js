import { showOne } from "./display.js";

export function filterByMembershipStatus(array, event) {
    if(document.querySelector("#member-object-container")){
            document.querySelector("#member-object-container").innerHTML ="";
        }

    if(event.target.value === "Inaktiv") {

        const filteredInactive = array
        .filter(swimmer => swimmer.membershipType === "inactive" )

        for (const swimmer of filteredInactive) {
            showOne(swimmer);
        }

    } else if (event.target.value === "Aktiv") {

        const filteredActive = array
        .filter(swimmer => swimmer.membershipType === "active" )

        for (const swimmer of filteredActive) {
            showOne(swimmer);
        }

    } else {
        for (const swimmer of array) {
            showOne(swimmer);
    } }
    
    
}

