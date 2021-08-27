export default value=>{
    var date = new Date(value);
    return date.toLocaleString(['en-US'],{
        month:'short',
        day:'2-digit',
        year:'numeric'
    })
}