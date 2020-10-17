export default function preventNull(data) {
    if(data === null || data === undefined || data === "") {
        return 'n.d.';
    }
    else {
        return data;
    }
}