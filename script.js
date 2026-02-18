async function loadProblems(){

    const res = await fetch("http://localhost:3000/problems");
    const problems = await res.json();

    const list = document.getElementById("problemList");

    problems.forEach(p=>{
        const div=document.createElement("div");
        div.className="problem-item";
        div.innerText=p.title;
        div.onclick=()=>selectProblem(p);
        list.appendChild(div);
    });
}

let currentProblem=null;

function selectProblem(p){
    currentProblem=p;

    document.getElementById("desc").innerHTML=
    `<h2>${p.title}</h2>
     <p>${p.description}</p>
     <b>Sample Input:</b><pre>${p.sampleInput}</pre>
     <b>Sample Output:</b><pre>${p.sampleOutput}</pre>`;
}

async function submitCode(){

    if(!currentProblem){
        alert("Select problem first");
        return;
    }

    document.getElementById("verdict").innerText="Running...";

    const code=document.getElementById("code").value;

    const res = await fetch("http://localhost:3000/submit",{
        method:"POST",
        headers:{ "Content-Type":"application/json"},
        body:JSON.stringify({
            code:code,
            problemId:currentProblem.id
        })
    });

    const data=await res.json();

    document.getElementById("verdict").innerText=
        "Verdict: "+data.verdict;
}

loadProblems();