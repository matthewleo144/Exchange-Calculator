const input = document.querySelector("#input");
const from = document.querySelector("#from");
const to = document.querySelector("#to");
const calculate = document.querySelector("#calc");
const result = document.querySelector(".result");
const tbody = document.querySelector("tbody");
const clearBtn = document.querySelector(".clearBtn");
const table = document.querySelector("table");
const darkModebtn = document.querySelector(".switch");

let toNum = (x)=>{
    let tonum =  x.replace(",","");
    return tonum = Number(tonum);
}

let createOption = (y,x)=>{
    const optionTag = document.createElement("option");
    optionTag.classList.add("optionTag");
    optionTag.textContent = x;
    let value = data.rates[x];
    value = toNum(value);
    optionTag.value = value;
    y.append(optionTag);
}

for(x in data.rates){
    createOption(from,x);
    createOption(to,x);
}
let toRecordFrom;
let toRecordTo;

let calculateFunction = ()=>{
    const getFromInput = input.value;
    const getFromFrom = from.value;
    const getFromTo = to.value;
    const valueAfterCalculate = getFromInput * getFromFrom;
    const valueAfterCalculate2 = valueAfterCalculate / getFromTo;
    result.textContent = valueAfterCalculate2.toFixed(2);
    let str1 = input.value;
    let str2 = from.options[from.selectedIndex].text;
    toRecordFrom = str1+" "+ str2;
    toRecordTo = to.options[to.selectedIndex].text;
    input.value = "";
    input.focus();
    from.value = "";
    to.value = "1";
}


let date = new Date();
const toRecordDate = date.toLocaleDateString()+" "+ date.toLocaleTimeString();//let x = toRecordDate+" "+ date.toLocaleTimeString();
calculate.addEventListener("submit",(e)=>{
    e.preventDefault();
    calculateFunction();
    const toRecordResult = result.textContent;
    toRecordFunction(toRecordDate,toRecordFrom,toRecordTo,toRecordResult);
});
let toSeriesId = ()=>{
    let trs = document.querySelectorAll("tr");
    for(let i=1; i<trs.length; i++){
        trs[i].id = i;
    }
}

let toRecordFunction =(a,b,c,d)=>{
    if(document.querySelector("#noRecordTr")){
        tbody.firstChild.remove();
    }
    const createDeleteBtn = `<i class="fas fa-trash-alt delete"</i>`;
    const tr = document.createElement("tr");
    let test = [a,b,c,d,createDeleteBtn]
    for(let i=0; i<test.length; i++){
        const td = document.createElement("td");
        td.innerHTML = test[i];
        tr.append(td);
    }
    let toclassListadd = tr.children[3];
    toclassListadd.classList.add("recordedResult");
    tbody.append(tr);
    toSeriesId();
    store();
    deleteFunction();
}
let value;
let store = ()=>{
    let trArray = document.querySelectorAll("tr");
    for(let i=1; i<trArray.length; i++){
        let tdArray = trArray[i].children;
        let key = trArray[i].id;
        let testArray =[];
        for(let i=0; i<tdArray.length-1; i++){
            value = tdArray[i].textContent;
            testArray.push(value);
            localStorage.setItem(key,JSON.stringify(testArray));
        }
    }

}

const createNoRecord = ()=>{
    tbody.innerHTML = `<tr id="noRecordTr">
        <td class="noRecord" colspan="5">There is no record.....</td>
    </tr>`;
}
window.addEventListener("load",()=>{
    if(localStorage.length != 0){
        let keys = Object.keys(localStorage).sort();
        keys.map((e)=>{
            let dataFromLocalStorage = JSON.parse(localStorage.getItem(e));
            const dateFromLocalStorage = dataFromLocalStorage[0];
            const fromFromLocalStorage = dataFromLocalStorage[1];
            const toFromLocalStorage = dataFromLocalStorage[2];
            const resultFromLocalStorage = dataFromLocalStorage[3];
            toRecordFunction(dateFromLocalStorage,fromFromLocalStorage,toFromLocalStorage,resultFromLocalStorage);
        })
    deleteFunction();
}else{
    createNoRecord();
}
})

clearBtn.addEventListener("click",()=>{
    localStorage.clear();
    tbody.innerHTML = "";
    createNoRecord();
    result.innerHTML = "00.0";
})

let deleteFunction =()=>{
    let testing = document.querySelectorAll("i");
    for(let i=0; i<testing.length; i++){
        testing[i].addEventListener("click",(event)=>{
            const clickedTrash = event.target;
            clickedTrash.parentElement.parentElement.remove();
            localStorage.removeItem(clickedTrash.parentElement.parentElement.id);
            if(tbody.children.length === 0){
                createNoRecord();
            }
            toSeriesId();
            let keyTest = Object.keys(localStorage).sort();
            for(let i=0; i<keyTest.length;i++){
                const recreate = JSON.parse(localStorage.getItem(keyTest[i]));
                const recreateDate = recreate[0];
                const recreateFrom = recreate[1];
                const recreateTo = recreate[2];
                const recreateResult = recreate[3];
                const createDeleteBtn = `<i class="fas fa-trash-alt delete"</i>`;
                const tr = document.createElement("tr");
                let a = [recreateDate,recreateFrom,recreateTo,recreateResult,createDeleteBtn];
                for(let i=0; i<a.length; i++){
                    const td = document.createElement("td");
                    td.innerHTML = a[i];
                    tr.append(td);
                }
                console.log(tr);
            }
            localStorage.clear();
            store();
        })
        
    }
}
darkModebtn.addEventListener("change",()=>{
    if(document.body.classList.contains("nightMode")){
        document.body.classList.remove("nightMode");
    }else{
    document.body.classList.add("nightMode");
    console.log(localStorage);
}
})
