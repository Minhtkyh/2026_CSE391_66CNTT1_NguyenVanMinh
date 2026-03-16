let students = []
let filteredStudents = []

let sortAsc = true

const nameInput = document.getElementById("name")
const scoreInput = document.getElementById("score")
const tableBody = document.getElementById("tableBody")
const stats = document.getElementById("stats")
const searchInput = document.getElementById("search")
const filterRank = document.getElementById("filterRank")
const scoreHeader = document.getElementById("scoreHeader")
const noResult = document.getElementById("noResult")

function getRank(score){
if(score >= 8.5) return "Giỏi"
if(score >= 7) return "Khá"
if(score >= 5) return "Trung bình"
return "Yếu"
}

function addStudent(){

const name = nameInput.value.trim()
const score = parseFloat(scoreInput.value)

if(name === ""){
alert("Họ tên không được để trống")
return
}

if(isNaN(score) || score < 0 || score > 10){
alert("Điểm phải từ 0-10")
return
}

students.push({name,score})

nameInput.value=""
scoreInput.value=""
nameInput.focus()

applyFilters()
}

function applyFilters(){

let keyword = searchInput.value.toLowerCase()
let rankFilter = filterRank.value

filteredStudents = students.filter(s => {

let nameMatch = s.name.toLowerCase().includes(keyword)

let rank = getRank(s.score)

let rankMatch = (rankFilter === "all" || rank === rankFilter)

return nameMatch && rankMatch
})

filteredStudents.sort((a,b)=>{
return sortAsc ? a.score - b.score : b.score - a.score
})

renderTable()
}

function renderTable(){

tableBody.innerHTML=""
noResult.textContent=""

if(filteredStudents.length === 0){
noResult.textContent="Không có kết quả"
}

filteredStudents.forEach((s,index)=>{

let tr = document.createElement("tr")

if(s.score < 5){
tr.classList.add("low-score")
}

tr.innerHTML = `
<td>${index+1}</td>
<td>${s.name}</td>
<td>${s.score}</td>
<td>${getRank(s.score)}</td>
<td>
<button data-index="${students.indexOf(s)}" class="deleteBtn">Xóa</button>
</td>
`

tableBody.appendChild(tr)
})

updateStats()
}

function updateStats(){

let total = students.length
let avg = 0

if(total>0){
let sum = students.reduce((a,b)=>a+b.score,0)
avg = (sum/total).toFixed(2)
}

stats.textContent = `Tổng SV: ${total} | Điểm TB: ${avg}`
}

document.getElementById("addBtn").addEventListener("click",addStudent)

scoreInput.addEventListener("keypress",function(e){
if(e.key==="Enter") addStudent()
})

searchInput.addEventListener("input",applyFilters)

filterRank.addEventListener("change",applyFilters)

scoreHeader.addEventListener("click",function(){

sortAsc = !sortAsc

scoreHeader.textContent = sortAsc ? "Điểm ▲" : "Điểm ▼"

applyFilters()
})

tableBody.addEventListener("click",function(e){

if(e.target.classList.contains("deleteBtn")){

let index = e.target.dataset.index

students.splice(index,1)

applyFilters()
}
})