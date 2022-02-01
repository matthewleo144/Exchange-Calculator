let from =  document.getElementById("from");
let to =  document.getElementById("to");
let input = document.getElementById("input");
let result = document.getElementById("result");
let historyList = document.getElementById("historyList");
let history = document.querySelector(".history");
let clearr = document.querySelector(".clearr");


clearr.addEventListener("click",()=>{
    localStorage.clear();
    historyList.innerHTML = "";
    creatingNORecord();
    result.innerHTML = "00.0"
})

function createOption(x,y,z){
    let o = document.createElement("option");
    let t = document.createTextNode(y);
    o.setAttribute("value",toNum(z));
    o.appendChild(t);
    x.appendChild(o);
}
    
function toNum(x){
    return Number(x.replace(",", ""));
}

for(x in data.rates){
    createOption(from,x,data.rates[x]);
    createOption(to,x,data.rates[x]);
}


let trashI = document.createElement("div");
let trashIcon = document.createElement("i");
    trashIcon.classList.add("fas", "fa-trash");
    trashI.addEventListener("click", (event) => {
        tr.remove();
        localStorage.clear();
        historyList.innerHTML = "";
        creatingNORecord();
    });
    trashI.append(trashIcon);

function createTr(x){
    let rowSpacer = document.getElementById("rowSpacer");
    if(rowSpacer){
        rowSpacer.remove();
    }
    let tr = document.createElement("tr");
    x.map(function(el){
        let td = document.createElement("td");
        let text = document.createTextNode(el);
        td.append(text);
        tr.append(td);
    })

    historyList.append(tr);
}


document.getElementById("calc").addEventListener("submit",function(e){
    e.preventDefault();
        // get state
        let x = input.value;
        let y = from.value;
        let z = to.value;
        //process
        let fromText = x+" "+from.options[from.selectedIndex].innerText;
        let toText =to.options[to.selectedIndex].innerText;
        let first = x*y;
        let second = first/z;
        let resultNum = second.toFixed(2);
        let date = new Date();
        const toRecordDate = date.toLocaleDateString()+" "+ date.toLocaleTimeString();//let x = toRecordDate+" "+ date.toLocaleTimeString();
        // let arr = [toRecordDate,fromText,toText,resultNum];
        toRecordFunction(toRecordDate,fromText,toText,resultNum);
        // createTr(arr);
        store();

        //set state
        result.innerHTML = resultNum;
        input.value = "";
        input.focus();
        from.value = "";
        to.value = "1";
});

let toRecordFunction =(a,b,c,d)=>{
    if(document.querySelector("#noRecordTr")){
        tbody.firstChild.remove();
    }
    let trashI = document.createElement("div");
    let trashIcon = document.createElement("i");
    trashIcon.classList.add("fas", "fa-trash");
    trashI.addEventListener("click", (event) => {
        tr.remove();
        localStorage.clear();
        historyList.innerHTML = "";
        creatingNORecord();
    });
    trashI.append(trashIcon);
    const tr = document.createElement("tr");
    let arr = [a,b,c,d,trashI]
    localStorage.setItem("record",JSON.stringify(arr));
    createTr(arr);
    // for(let i=0; i<test.length; i++){
    //     const td = document.createElement("td");
    //     td.innerHTML = test[i];
    //     tr.append(td);
}

const creatingNORecord = ()=>{
    historyList.innerHTML = `<tr id="rowSpacer"><td colspan="5">There is no record</td></tr>`;
}
function store(){
    localStorage.setItem("record",historyList.innerHTML);
    // localStorage.setItem("record",JSON.stringify(arr));
}
(function(){
    if(localStorage.getItem("record")){
        historyList.innerHTML =localStorage.getItem("record");
    }else{
        creatingNORecord();
    }
})();


function changeMode(){
        document.body.classList.toggle("night-mode");
        document.getElementById("mode-icon").classList.toggle("fa-sun");
    }



let lastchild = document.getElementsByClassName(".history tr td:last-child");
lastchild.addEventListener("click",()=>{
    console.log("last child activated!")
})
