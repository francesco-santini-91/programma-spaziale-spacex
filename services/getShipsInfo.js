export default async function getShipsInfo(ID) {
    let result = null;
    await fetch('https://api.spacexdata.com/v4/ships/' + ID)
        .then(response => response.json())
        .then((json) => result = json)
        .catch((errors) => console.log(errors));
    return result;
}