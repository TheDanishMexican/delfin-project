export function sortSwimmers(array, event) {
    document.querySelector("#swimmer-select-filter").value = "alle";
    const value = event.target.value;
    if(value === "navn") {
        const sortedByName = array.toSorted((a,b) => a.name.localeCompare(b.name));
        return sortedByName;
    } else if(value === "alle") {
        return array;
    } else if (value === "tid") {
        const sortedByTime =
        array.toSorted((a,b) => {
            const resultA = a.competitionResults[0].result;
            const resultB = b.competitionResults[0].result;
            return resultA - resultB;
        });
        return sortedByTime;
    }
}

