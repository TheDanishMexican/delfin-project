export function sortSwimmers(array, event) {
    const value = event.target.value;
    if(value === "navn") {
        const sortedByName = array.toSorted((a,b) => a.name.localeCompare(b.name));
        return sortedByName;
    } else if(value === "alle") {
        return array;
    } else if(value === "disciplin") {
        const sortedByDiscipline = 
            array.toSorted((a,b) => {
                const disciplinA = a.discipline[0];
                const disciplineB = b.discipline[0];
                return disciplinA.localeCompare(disciplineB);
            });
            return sortedByDiscipline;
    }
}