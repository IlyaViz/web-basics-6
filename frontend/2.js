let tabsDiv = document.querySelector(".tabs");
let tabContent = document.querySelector('.tab-content');
let lastTabInstances;
let tabInstances;

function updateTabs(){
    fetch("http://54.198.215.250:8000/get-tabs", {
        method: "GET",
    }).then((response) => {
        return response.json();
    }).then((result) => {
        lastTabInstances = tabInstances
        tabInstances = result

        if (areTabInstancesNew()){
            drawTabs(result)
        }
    })
}

function areTabInstancesNew() {
    if (!lastTabInstances || !tabInstances){
        return true;
    }

    if (lastTabInstances.length != tabInstances.length) {
        return true;
    }

    for (let index = 0; index < tabInstances.length; index++) {
        if (tabInstances[index].name != lastTabInstances[index].name || tabInstances[index].content != lastTabInstances[index].content)
            return true;
    }

    return false;
}

function drawTabs(){
    tabsDiv.innerHTML = "";
    let tabs = []

    tabInstances.forEach(tabInstance => {
        let tab = document.createElement("button");

        tab.className = "tab";
        
        tab.textContent = tabInstance.name;

        tab.style.backgroundColor = "white"

        tab.addEventListener("click", () => {
            tabs.forEach(tab => {
                tab.style.backgroundColor = "white";
            });

            tab.style.backgroundColor = "blue";

            tabContent.textContent = tabInstance.content;
        });

        tabs.push(tab);
        tabsDiv.appendChild(tab);
    });
}

updateTabs();
setInterval(updateTabs, 2000);