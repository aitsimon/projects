var impUrl = undefined;
var btnSubmit = undefined;

import scrapeIt from './package-lock.json';

window.onload = () => {
    btnSubmit = document.querySelector('#btnsub');
    impUrl = document.getElementsByName('url')[0];
    btnSubmit.addEventListener('click', ()=>{
        process();
    });
}
async function scrapeIts(url) {
    const scrapeResult = await scrapeIt(url, {
        presentations: {
            listItem: 'body',
            data: {
                title: 'h1',
                description: 'p',
                link: {
                    selector: 'a',
                    attr: 'href'
                }
            }
        }
    });
    console.log(scrapeResult);
}
function process(){
    var element = event.target;
    var url= element.previousElementSibling.children[0].value;
    scrapeIts(url);
}