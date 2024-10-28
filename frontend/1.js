let tabs = document.querySelector(".tabs");
let input = document.querySelector("input");
let textarea = document.querySelector("textarea");
let tabInstances = [];

function addTab() {
    if (input.value == "" || textarea.value == "") {
        alert("Enter valid data");
    } else if (tabInstances.some((instance) => instance.name == input.value)) {
        alert("Tab with this name already exists");
    } else {
        let tab = document.createElement("div");
        let tabName = document.createElement("h1");
        let tabContent = document.createElement("p");

        tab.className = "tab";
        tabName.textContent = input.value;
        tabContent.textContent = textarea.value;

        tab.appendChild(tabName);
        tab.appendChild(tabContent);

        tabs.appendChild(tab);

        tabInstances.push({name:tabName.textContent, content:tabContent.textContent});
    }
}

function saveTabs(){
    console.log(JSON.stringify({
        tabs: tabInstances
    }));

    fetch("http://54.198.215.250:8000/save-tabs", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            tabs: tabInstances
        })
    }).then(() => {
        alert("Saved");
    })
}