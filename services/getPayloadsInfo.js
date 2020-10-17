export default async function getPayloadsInfo(ID) {
    let result = null;
    await fetch('https://api.spacexdata.com/v4/payloads/' + ID)
        .then(response => response.json())
        .then((json) => result = json)
        .catch((errors) => console.log(errors));
    return result;
}