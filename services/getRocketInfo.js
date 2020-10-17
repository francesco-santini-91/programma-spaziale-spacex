export default async function getRocketInfo(ID) {
    let result = null;
    await fetch('https://api.spacexdata.com/v4/rockets/' + ID)
        .then(response => response.json())
        .then((json) => result = json)
        .catch((errors) => console.log(errors));
    return result;
}