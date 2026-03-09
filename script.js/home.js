const issuesContent = document.getElementById('content');

async function loadIssues() {
    
    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
    const data = await res.json();

    
    displayIssues(data.data); 
}


function toggleBtn(btnId) {
    removeActive();
    const btn = document.getElementById(btnId);
    if(btn){
        btn.classList.add('active');
    }
}

function removeActive(){
const toggleBttn = document.querySelectorAll(".toggleBt"); 
toggleBttn.forEach((btn) => btn.classList.remove("active"));
}
window.addEventListener('DOMContentLoaded', () => {
    document.getElementById('allBtn').classList.add('active');
});




function displayIssues(issues){

    issues.forEach(issues => {
        console.log(issues);
        const newDiv = document.createElement("div")

             if(issues.status === 'open'){
                        newDiv.className = " space-y-4 shadow-[0_5px_10px_rgba(0,0,0,0.1)] p-5 rounded-md border-t-4 border-green-500 ";
            }
            else{
                        newDiv.className = " space-y-4 shadow-[0_5px_10px_rgba(0,0,0,0.1)] p-5 rounded-md border-t-4 border-purple-500 ";
            }

            let labelsHTML = "";

        if (issues.labels && issues.labels.length > 0) {
        issues.labels.forEach(label => {


             if(label.toLowerCase() !== "good first issue"){

                if(label.toLowerCase() === 'bug'){
                labelsHTML += `
             <div class="badge text-[12px] font-medium badge-soft bg-red-200 mb-2">
             <i class="fa-solid fa-bug"></i>
            ${label.toUpperCase()}
            </div>
        `;
                }
                else if(label.toLowerCase() === 'documentation'){
                labelsHTML += `
             <div class="badge text-[10px] bg-blue-100 font-medium badge-soft  mb-2">
             <i class="fa-solid fa-book"></i>
            ${label.toUpperCase()}
            </div>
        `;
                }
                else if(label.toLowerCase() === 'enhancement'){
                labelsHTML += `
             <div class="badge text-[11px] font-medium badge-soft bg-green-200 mb-2">   
                <img src="./assets/Sparkle.png" alt="">
            ${label.toUpperCase()}
            </div>
        `;
                }
                else if(label.toLowerCase() === 'help wanted'){
                labelsHTML += `
             <div class="badge gap-2 text-[10px] font-medium badge-soft bg-yellow-100 mb-2">
             <img src="./assets/Lifebuoy.png" alt="">
            ${label.toUpperCase()}
            </div>
        `;
                }

             }

         });
         }


        if(issues.priority === 'high'){
            newDiv.innerHTML = `
     <div onclick="loadDetail(${issues.id})" class="space-y-4" >
            <div  class="badge badge-soft font-medium badge-secondary">${issues.priority.toUpperCase()}</div>
        

             <h2 class="font-semibold">${issues.title}</h2>
            <p class="text-[#64748B] line-clamp-2 text-[14px]"> ${issues.description} </p>

            <div class="border-b border-gray-300 ">
            
        <div class="flex gap-2 mb-4">
        
        ${labelsHTML}</div>

            </div>

            <div class="text-[#64748B] text-[14px]" >
                <p>#${issues.id} by ${issues.author}</p>
                <p> ${new Date(issues.createdAt).toLocaleDateString()} </p>
            </div>
        </div>

     </div>
           `
           
        }

        else if(issues.priority === 'medium'){
            newDiv.innerHTML = `
        <div onclick="loadDetail(${issues.id})" class="space-y-4" >
            <div class="badge badge-soft font-medium badge-warning">${issues.priority.toUpperCase()}</div>
            

             <h2 class="font-semibold">${issues.title}</h2>
            <p class="text-[#64748B] line-clamp-2 text-[14px]"> ${issues.description} </p>

            <div class="border-b border-gray-300 ">

            <div class="flex gap-2 mb-4">${labelsHTML}</div>

            </div>

            <div class="text-[#64748B] text-[14px]" >
                <p>#${issues.id} by ${issues.author}</p>
                <p> ${new Date(issues.createdAt).toLocaleDateString()} </p>
            </div>
            </div>
        </div>
            `
        }

        else{
             newDiv.innerHTML = `
        <div onclick="loadDetail(${issues.id})" class="space-y-4" >
            <div class="badge badge-soft font-medium text-[gray] ">${issues.priority.toUpperCase()}</div>
            

             <h2 class="font-semibold">${issues.title}</h2>
            <p class="text-[#64748B] line-clamp-2 text-[14px]"> ${issues.description} </p>

            <div class="border-b border-gray-300 ">

            <div class="flex gap-2 mb-4">${labelsHTML}</div>

            </div>

            <div class="text-[#64748B] text-[14px]" >
                <p>#${issues.id} by ${issues.author}</p>
                <p> ${new Date(issues.createdAt).toLocaleDateString()} </p>
            </div>
            </div>
        </div>
        `
        }



        issuesContent.appendChild(newDiv);
    });
    
}
    
loadIssues();



const loadDetail = async(id) =>{
    const url =`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`;
    const res = await fetch(url);
    const details = await res.json();
    displayLoadDetails(details.data); 
}


const displayLoadDetails = (issue) => {
    const details = document.getElementById('details-container');
    details.innerHTML = `

        <h2 class="font-semibold text-lg mb-2">${issue.title}</h2>
        <div class="mb-2">
            <div class="badge ${issue.status === 'open' ? 'badge-success' : 'badge-error'}">${issue.status.charAt(0).toUpperCase() + issue.status.slice(1)}</div>
            <p>Opened by ${issue.author}</p>
            <p>${new Date(issue.createdAt).toLocaleDateString()}</p>
        </div>
        
        <div class="mb-2">
            <div class="badge badge-soft bg-red-200">${issue.priority ? issue.priority.charAt(0).toUpperCase() + issue.priority.slice(1) : ''}</div>
            ${issue.labels && issue.labels.length > 0 ? issue.labels.map(label => `<div class='badge badge-soft bg-blue-200 ml-1'>${label.toUpperCase()}</div>`).join('') : ''}
        </div>

        <div class="mb-2">
            <p>${issue.description}</p>
        </div>

        <div class="flex gap-30 bg-[#F8FAFC] p-6 rounded-lg">
            <div>
                <h4 class="font-semibold">Assignee:</h4>
                <p>${issue.assignee ? issue.assignee : 'Unassigned'}</p>
            </div>

            <div>
                <h4 class="font-semibold">Priority:</h4>
                <div class="badge ${issue.priority === 'high' ? 'badge-error' : issue.priority === 'medium' ? 'badge-warning' : 'badge-secondary'}">${issue.priority ? issue.priority.charAt(0).toUpperCase() + issue.priority.slice(1) : 'None'}</div>
            </div>
        </div>
    `;
    document.getElementById("issues_modal").showModal();
}



function loading(isLoading) {
    const spinner = document.getElementById('spinner');
    const content = document.getElementById('content');
    if (isLoading) {
        spinner.style.display = 'flex';
        content.style.display = 'none';
    } else {
        spinner.style.display = 'none';
        content.style.display = 'grid';
    }
}






let allIssuesCache = [];

async function loadIssuesWithCache() {
    loading(true);
    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
    const data = await res.json();
    allIssuesCache = data.data;
    displayIssues(allIssuesCache);
    loading(false);
}


window.addEventListener('DOMContentLoaded', () => {
    document.getElementById('allBtn').classList.add('active');
    loadIssuesWithCache();
});


function updateIssueCount(count) {
    const countElem = document.querySelector('.count');
    if (countElem) {
        countElem.innerHTML = `${count} Issues`;
    }
}

document.getElementById('openBtn').addEventListener('click', function() {
    loading(true);
    toggleBtn('openBtn');
    setTimeout(() => {
        const openIssues = allIssuesCache.filter(issue => issue.status === 'open');
        issuesContent.innerHTML = '';
        displayIssues(openIssues);
        updateIssueCount(openIssues.length);
        loading(false);
    }, 200);
});

document.getElementById('closedBtn').addEventListener('click', function() {
    loading(true);
    toggleBtn('closedBtn');
    setTimeout(() => {
        const closedIssues = allIssuesCache.filter(issue => issue.status === 'closed');
        issuesContent.innerHTML = '';
        displayIssues(closedIssues);
        updateIssueCount(closedIssues.length);
        loading(false);
    }, 200);
});

document.getElementById('allBtn').addEventListener('click', function() {
    loading(true);
    toggleBtn('allBtn');
    setTimeout(() => {
        issuesContent.innerHTML = '';
        displayIssues(allIssuesCache);
        updateIssueCount(allIssuesCache.length);
        loading(false);
    }, 200);
});
                        

document.getElementById('search-btn').addEventListener("click", () => {
    const input = document.getElementById('input-search');
    const searchValue = input.value.trim().toLowerCase();
    const filterIssue = allIssuesCache.filter(issue =>
        issue.title.toLowerCase().includes(searchValue) ||
        issue.description.toLowerCase().includes(searchValue) ||
        (issue.author && issue.author.toLowerCase().includes(searchValue))
    );
    issuesContent.innerHTML = '';
    displayIssues(filterIssue);
    updateIssueCount(filterIssue.length);
});