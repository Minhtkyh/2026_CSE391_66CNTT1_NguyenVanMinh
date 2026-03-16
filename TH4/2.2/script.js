const prices = {
ao:150000,
quan:200000,
giay:500000
}

const product = document.getElementById("product")
const quantity = document.getElementById("quantity")
const totalPrice = document.getElementById("totalPrice")
const note = document.getElementById("note")
const noteCount = document.getElementById("noteCount")

function showError(id,msg){
document.getElementById(id).textContent = msg
}

function clearError(id){
document.getElementById(id).textContent = ""
}

function updateTotal(){

let p = product.value
let q = Number(quantity.value)

if(prices[p] && q>0){

let total = prices[p]*q

totalPrice.textContent = total.toLocaleString("vi-VN")

}else{

totalPrice.textContent = "0"

}
}

product.addEventListener("change",updateTotal)
quantity.addEventListener("input",updateTotal)

note.addEventListener("input",function(){

let len = note.value.length

noteCount.textContent = len + "/200"

if(len>200){
noteCount.style.color="red"
showError("noteError","Ghi chú tối đa 200 ký tự")
}else{
noteCount.style.color="black"
clearError("noteError")
}

})

function validateProduct(){
if(product.value===""){
showError("productError","Chọn sản phẩm")
return false
}
clearError("productError")
return true
}

function validateQuantity(){

let q = Number(quantity.value)

if(!Number.isInteger(q) || q<1 || q>99){
showError("quantityError","Số lượng 1-99")
return false
}

clearError("quantityError")
return true
}

function validateDate(){

let date = new Date(document.getElementById("deliveryDate").value)
let today = new Date()

let max = new Date()
max.setDate(today.getDate()+30)

if(date<today){
showError("dateError","Không chọn ngày quá khứ")
return false
}

if(date>max){
showError("dateError","Không quá 30 ngày")
return false
}

clearError("dateError")
return true
}

function validateAddress(){

let address = document.getElementById("address").value.trim()

if(address.length<10){
showError("addressError","Địa chỉ ≥10 ký tự")
return false
}

clearError("addressError")
return true
}

function validatePayment(){

let pay = document.querySelector('input[name="payment"]:checked')

if(!pay){
showError("paymentError","Chọn phương thức thanh toán")
return false
}

clearError("paymentError")
return true
}

const form = document.getElementById("orderForm")

form.addEventListener("submit",function(e){

e.preventDefault()

let valid =
validateProduct() &
validateQuantity() &
validateDate() &
validateAddress() &
validatePayment()

if(valid){

let pName = product.options[product.selectedIndex].text
let q = quantity.value
let total = totalPrice.textContent
let date = document.getElementById("deliveryDate").value

let box = document.getElementById("confirmBox")

box.style.display="block"

box.innerHTML = `
<h3>Xác nhận đặt hàng?</h3>
<p>Sản phẩm: ${pName}</p>
<p>Số lượng: ${q}</p>
<p>Tổng tiền: ${total} VNĐ</p>
<p>Ngày giao: ${date}</p>

<button id="confirmBtn">Xác nhận</button>
<button id="cancelBtn">Hủy</button>
`

document.getElementById("confirmBtn").onclick=function(){

form.style.display="none"

box.style.display="none"

document.getElementById("successMessage").textContent =
"Đặt hàng thành công! 🎉"

}

document.getElementById("cancelBtn").onclick=function(){

box.style.display="none"

}

}

})