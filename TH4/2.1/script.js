const form = document.getElementById("registerForm")

function showError(field,message){
document.getElementById(field+"Error").textContent = message
}

function clearError(field){
document.getElementById(field+"Error").textContent = ""
}

function validateFullname(){

let name = document.getElementById("fullname").value.trim()
let regex = /^[A-Za-zÀ-ỹ\s]{3,}$/

if(name===""){
showError("fullname","Không được để trống")
return false
}

if(!regex.test(name)){
showError("fullname","Tên ≥3 ký tự và chỉ chứa chữ")
return false
}

clearError("fullname")
return true
}

function validateEmail(){

let email = document.getElementById("email").value.trim()
let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

if(email===""){
showError("email","Email không được trống")
return false
}

if(!regex.test(email)){
showError("email","Email không đúng định dạng")
return false
}

clearError("email")
return true
}

function validatePhone(){

let phone = document.getElementById("phone").value.trim()
let regex = /^0\d{9}$/

if(!regex.test(phone)){
showError("phone","SĐT phải 10 số và bắt đầu bằng 0")
return false
}

clearError("phone")
return true
}

function validatePassword(){

let pass = document.getElementById("password").value
let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/

if(!regex.test(pass)){
showError("password","≥8 ký tự, có hoa, thường, số")
return false
}

clearError("password")
return true
}

function validateConfirmPassword(){

let pass = document.getElementById("password").value
let confirm = document.getElementById("confirmPassword").value

if(confirm !== pass){
showError("confirmPassword","Mật khẩu không khớp")
return false
}

clearError("confirmPassword")
return true
}

function validateGender(){

let gender = document.querySelector('input[name="gender"]:checked')

if(!gender){
showError("gender","Vui lòng chọn giới tính")
return false
}

clearError("gender")
return true
}

function validateTerms(){

let terms = document.getElementById("terms").checked

if(!terms){
showError("terms","Bạn phải đồng ý điều khoản")
return false
}

clearError("terms")
return true
}

form.addEventListener("submit",function(e){

e.preventDefault()

let valid =
validateFullname() &
validateEmail() &
validatePhone() &
validatePassword() &
validateConfirmPassword() &
validateGender() &
validateTerms()

if(valid){

let name = document.getElementById("fullname").value

form.style.display="none"

document.getElementById("successMessage").textContent =
`Đăng ký thành công! 🎉 Chào mừng ${name}`

}

})

document.querySelectorAll("input").forEach(input=>{

input.addEventListener("blur",function(){
switch(this.id){
case "fullname": validateFullname(); break
case "email": validateEmail(); break
case "phone": validatePhone(); break
case "password": validatePassword(); break
case "confirmPassword": validateConfirmPassword(); break
}
})

input.addEventListener("input",function(){
let id = this.id
if(id) clearError(id)
})

})