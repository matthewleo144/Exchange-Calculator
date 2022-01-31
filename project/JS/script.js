let from =  document.getElementById("from");
let to =  document.getElementById("to");
let input = document.getElementById("input");
let result = document.getElementById("result");
let historyList = document.getElementById("historyList");
let history = document.querySelector("history");
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
function createTr(x){
    let rowSpacer = document.getElementById("rowSpacer");
    if(rowSpacer){
        rowSpacer.remove();
    }
    let tr = document.createElement("tr");
    x.map(function(el){
        let td = document.createElement("td");
        let text = document.createTextNode(el);
        let trashContainer = document.createElement("td");
        let trashIcon = document.createElement("i");
        trashIcon.classList.add("fas", "fa-trash");
        trashIcon.addEventListener("click", (event) => {
            tr.remove();
            localStorage.clear();
        });
        trashContainer.append(trashIcon);
        td.append(text);
        tr.append(td,trashContainer);
    })
    historyList.append(tr);
}

//for test
// function showlist(text){
//     list.innerHTML += `
//     <li class="list-Item container add-box animate" id="list${i}">
//         <div id="listText${i}" class="text">${text}</div>
//         <div class="controls">
//             <button class="ho1"><i class="fas fa-edit con1" onclick="editlist(${i})"></i></button>
//             <button class="ho2"><i class="fas fa-window-close con2" onclick="deletelist(${i})"></i></button>
//         </div>
//     </li>`;
//     i++;
// }




function store(){
    localStorage.setItem("record",historyList.innerHTML);
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
        let date = new Date().toLocaleDateString();
        let arr = [date,fromText,toText,resultNum];
        createTr(arr);
        store();

        //set state
        result.innerHTML = resultNum;
        input.value = "";
        input.focus();
        from.value = "";
        to.value = "1";
});

(function(){
    if(localStorage.getItem("record")){
        historyList.innerHTML =localStorage.getItem("record");
    }else{
        historyList.innerHTML = `<tr id="rowSpacer"><td colspan="5">There is no record</td></tr>`
    }
})();


function changeMode(){
        document.body.classList.toggle("night-mode");
        document.getElementById("mode-icon").classList.toggle("fa-sun");
    }
