var mod_text = document.getElementById('number-days');
var date = document.getElementById('date');
let counter = 0;
let dBase = new Date(2022,9,16);
function dateDiffInDays(a, b) {
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
    return Math.floor(Math.abs((utc2 - utc1) / _MS_PER_DAY));
  }
setInterval(() => {
    let d = new Date();  
    let dif=dateDiffInDays(d,dBase);
    if(dif>counter){
        let mod = 'días';
        if(dif<=1){
            mod='día';
        }
        mod_text.innerText = '';
        mod_text.innerText = `Lleva ${dif} ${mod}`;
        date.innerText='';
        date.innerText = `${d.getDate()} / ${d.getMonth()}\t / ${d.getFullYear()}`
        counter++;
    }
}, 1000);