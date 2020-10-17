const months = ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'];

export default function formatData(date_unix) {
    if(date_unix == null) {
        return 'n.d.';
    }
    else {
        let data = new Date(date_unix*1000);
        let day = data.getDate();
        let month = data.getMonth();
        let year = data.getFullYear();
        let hour = data.getHours();
        let minute = data.getMinutes();
        if(hour < 10)
        hour = '0'+hour;
        if(minute < 10)
        minute = '0'+minute;
        let formattedData = day+' '+months[month]+' '+year+'  '+hour+':'+minute;
        return formattedData;
    }
}