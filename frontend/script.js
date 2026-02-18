// ===============================
// MONACO EDITOR SETUP
// ===============================

let editor;
let currentProblem = null;

require.config({
    paths: {
        vs: "https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.44.0/min/vs"
    }
});

require(["vs/editor/editor.main"], function () {

    editor = monaco.editor.create(document.getElementById("editor"), {

        value: `#include <bits/stdc++.h>
using namespace std;

int main(){
    int a,b;
    cin>>a>>b;
    cout<<a+b;
}`,
        language: "cpp",
        theme: "vs-dark",
        automaticLayout: true

    });

});


// ===============================
// LOAD PROBLEMS
// ===============================

async function loadProblems() {

    const res = await fetch("http://localhost:3000/problems");
    const problems = await res.json();

    const list = document.getElementById("problemList");

    problems.forEach(p => {

        const div = document.createElement("div");
        div.className = "problem-item";
        div.textContent = p.title;

        div.addEventListener("click", () => selectProblem(p));

        list.appendChild(div);
    });
}


// ===============================
// SELECT PROBLEM
// ===============================

function selectProblem(p) {

    currentProblem = p;

    document.getElementById("desc").innerHTML = `
        <h2>${p.title}</h2>
        <p>${p.description}</p>
        <b>Sample Input:</b><pre>${p.sampleInput}</pre>
        <b>Sample Output:</b><pre>${p.sampleOutput}</pre>
    `;
}


// ===============================
// SUBMIT CODE
// ===============================

async function submitCode() {

    if (!currentProblem) {
        alert("Select a problem first!");
        return;
    }

    document.getElementById("verdict").innerText = "Running...";

    // 🔥 IMPORTANT: get code from Monaco editor
    const code = editor.getValue();

    const res = await fetch("http://localhost:3000/submit", {

        method: "POST",
        headers: { "Content-Type": "application/json" },

        body: JSON.stringify({
            code,
            problemId: currentProblem.id
        })

    });

    const data = await res.json();

    document.getElementById("verdict").innerText =
        "Verdict: " + data.verdict;
}


// ===============================

loadProblems();