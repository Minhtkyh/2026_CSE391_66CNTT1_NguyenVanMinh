let students = []

const nameInput = document.getElementById("name")
const scoreInput = document.getElementById("score")
const tableBody = document.getElementById("tableBody")
const stats = document.getElementById("stats")

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
        alert("Điểm phải từ 0 đến 10")
        return
    }

    students.push({
        name,
        score
    })

    renderTable()

    nameInput.value = ""
    scoreInput.value = ""
    nameInput.focus()
}

function renderTable(){

    tableBody.innerHTML = ""

    students.forEach((s, index)=>{

        const rank = getRank(s.score)

        const tr = document.createElement("tr")

        if(s.score < 5){
            tr.classList.add("low-score")
        }

        tr.innerHTML = `
            <td>${index+1}</td>
            <td>${s.name}</td>
            <td>${s.score}</td>
            <td>${rank}</td>
            <td>
                <button data-index="${index}" class="deleteBtn">Xóa</button>
            </td>
        `

        tableBody.appendChild(tr)
    })

    updateStats()
}

function updateStats(){

    const total = students.length

    let avg = 0

    if(total > 0){
        const sum = students.reduce((a,b)=> a + b.score ,0)
        avg = (sum/total).toFixed(2)
    }

    stats.textContent = `Tổng SV: ${total} | Điểm TB: ${avg}`
}

document.getElementById("addBtn").addEventListener("click", addStudent)

scoreInput.addEventListener("keypress", function(e){
    if(e.key === "Enter"){
        addStudent()
    }
})

tableBody.addEventListener("click", function(e){

    if(e.target.classList.contains("deleteBtn")){

        const index = e.target.dataset.index

        students.splice(index,1)

        renderTable()
    }

})