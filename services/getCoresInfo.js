export default async function getCoresInfo(ID) {
    let result = null;
    await fetch('https://api.spacexdata.com/v4/cores/' + ID)
        .then(response => response.json())
        .then((json) => result = json)
        .catch((errors) => console.log(errors));
    return result;
}