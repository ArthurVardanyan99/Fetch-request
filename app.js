let buttonAdd = document.getElementById("add");
let dataTable = document.getElementById("dataTable");
let tableFill = document.getElementById("tableFill");
//////////////////////////////////////////////////////
let newTab = document.getElementById("newTab");
let nName = document.getElementById("nName");
let nEmail = document.getElementById("nEmail");
let nCity = document.getElementById("nCity");
let nPhone = document.getElementById("nPhone");
let save = document.getElementById("save");
let cancel = document.getElementById("cancel");
let reset = document.getElementById("reset");
///////////////////////////////////////////////////////
function cCancel () {
    cancel.addEventListener("click", () => {newTab.style.visibility = "hidden";});  
};
function rReset () {
    reset.style.visibility = "visible";
    reset.addEventListener("click", () => {location.reload();});
        
};
/////////////////////////////////////////////////////////////////

function delete_element () {


    
}

/////////////////////////////////////////////////////////////////
let count = 0;
tableFill.addEventListener("click", () => {
    count++;
let userArray = [];
    if (count === 1) {
    const getUsers = async () => {
        const response = await fetch("https://jsonplaceholder.typicode.com/users")
        const jsoned = await response.json(); 
        userArray = await jsoned;
        userArray.map((value) =>  {
            let tr = document.createElement("tr");          
            for(key in value){
                let td = document.createElement("td");
                
                if (key === "id" || key === "name" || key === "email" ||  key === "address"|| key === "phone"  ){
                    
                    td.innerText = `${value[key]}`;
                    if (key === "address") {
                        for(nKey in value[key]) {
                            if (nKey ==="city"){
                                td.innerText = `${value[key][nKey]}`;
                            }
                        }
                    } 
                    tr.appendChild(td);
                }
                else if(key === "website"){
                    let edit = document.createElement("button");
                    edit.innerText = "Edit";
                    edit.className = "buttonEdit"
                    td.appendChild(edit);
                    tr.appendChild(td);
                    edit.addEventListener("click", () =>  {
                        newTab.style.visibility = "visible";
                        cCancel();
                        let el = edit.parentElement.parentElement.childNodes;
                        save.addEventListener('click', () => {
                            if (nName.value !== "" && nEmail.value !== "" && nCity.value !== "" && nPhone.value !== "") {
                                el[1].innerText = nName.value;
                                el[2].innerText = nEmail.value;
                                el[3].innerText = nCity.value;
                                el[4].innerText = nPhone.value;
                            };
                            newTab.style.visibility = "hidden";
                        });

                    });
                }
                else if(key === "company"){
                    let del = document.createElement("button");
                    del.className = "buttonDel"
                    del.innerText = "Delete";
                    td.appendChild(del);
                    tr.appendChild(td);
                    del.addEventListener("click", () => {
                        del.parentElement.parentElement.remove();
                    })
                }
                
            }
            dataTable.appendChild(tr) 
        })  
    }
    getUsers();
    } else {
        alert("You alredy filled table")
    }
    rReset();
})






buttonAdd.addEventListener("click", () => {
    newTab.style.visibility = "visible";
    save.addEventListener('click', () => {
        if (nName.value && nEmail && nCity && nPhone) {
            let userArray = [];
            let getUsers = async () => {
            let response = await fetch("https://jsonplaceholder.typicode.com/users")
            let jsoned = await response.json(); 
            userArray = await jsoned;
            let newObj =
            {
                id : userArray.length+1,
                name: nName.value,
                email: nEmail.value,
                address: {
                    city: nCity.value,
                },
                phone:nPhone.value,
                website: '',
                company: '',
            };
            // jsoned = JSON.stringify(newObj);
            userArray.push(newObj);
            console.log(userArray);
            userArray.map((value,index) =>  {
                if(index > 9) {
                    let tr = document.createElement("tr");          
                    for(key in value){
                        let td = document.createElement("td");
                        
                        if (key === "id" || key === "name" || key === "email" ||  key === "address"|| key === "phone"  ){
                            
                            td.innerText = `${value[key]}`;
                            if (key === "address") {
                                for(nKey in value[key]) {
                                    if (nKey ==="city"){
                                        td.innerText = `${value[key][nKey]}`;
                                    }
                                }
                            } 
                            tr.appendChild(td);
                        }
                        else if(key === "website"){
                            let edit = document.createElement("button");
                            edit.innerText = "Edit";
                            edit.className = "buttonEdit"
                            td.appendChild(edit);
                            tr.appendChild(td);
                            edit.addEventListener("click", () =>  {
                                newTab.style.visibility = "visible";
                                let el = edit.parentElement.parentElement.childNodes;
                                save.addEventListener('click', () => {
                                    if (nName.value !== "" && nEmail.value !== "" && nCity.value !== "" && nPhone.value !== "") {
                                        el[1].innerText = nName.value;
                                        el[2].innerText = nEmail.value;
                                        el[3].innerText = nCity.value;
                                        el[4].innerText = nPhone.value;
                                    }
                                    newTab.style.visibility = "hidden";
                                });
                            });
                        }
                        else if(key === "company"){
                            let del = document.createElement("button");
                            del.className = "buttonDel"
                            del.innerText = "Delete";
                            td.appendChild(del);
                            tr.appendChild(td);
                            del.addEventListener("click", () => {
                                del.parentElement.parentElement.remove();
                            })
                        }
                        
                    }
                    dataTable.appendChild(tr) 
                }
            })
            }
            getUsers();
        }
        newTab.style.visibility = "hidden";
    })
    cCancel();

})