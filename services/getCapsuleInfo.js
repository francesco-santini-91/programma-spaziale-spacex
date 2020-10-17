export default async function getCapsuleInfo(ID) {
    let result = null;
    await fetch('https://api.spacexdata.com/v4/capsules/' + ID)
        .then(response => response.json())
        .then((json) => result = json)
        .catch((errors) => console.log(errors));
    return result;
}