import { showCashier, showOne } from "./display.js";

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

export function filterByPaymentStatus(array, event) {
    if (document.querySelector("#cashier-members-container")){
        document.querySelector("#cashier-members-container").innerHTML =""
    }

    if(event.target.value === "betalt") {

        const filteredHasPaid = array
        .filter(swimmer => swimmer.amountOwed <= 0 )

        for (const swimmer of filteredHasPaid) {
            showCashier(swimmer);
        }

    } else if (event.target.value === "skylder") {

        const filteredHasNotPaid = array
        .filter(swimmer => swimmer.amountOwed > 0 )

        for (const swimmer of filteredHasNotPaid) {
            showCashier(swimmer);
        }

    } else {
        for (const swimmer of array) {
            showCashier(swimmer);
    } }   
}

export function filterSwimmerType(array, event) {
    document.querySelector("#swimmer-select-sort").value = "alle";
    const value = event.target.value;
    
    if(value === "junior") {
        const filterJunior = array.filter(swimmer => swimmer.swimmerType === "junior");
        return filterJunior;
    } else if (value === "senior") {
        const filterSenior = array.filter(swimmer => swimmer.swimmerType === "senior");
        return filterSenior;
    } else return array;
}

