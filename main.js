//Ảnh, tên đồ uống, giá đồ uống
let drinks = [
    [1, "assets/cacao-trung.jpg", "Cacao trứng", 45000],
    [2, "assets/cafe-muoi.jpg", "Cafe muối", 15000],
    [3, "assets/bac-siu.jpg", "Bạc sỉu", 25000],
    [4, "assets/hong-tra-sua.jpg", "Hồng trà sữa", 20000]
]

let orders = [];

let totalBill = 0;

let totalMoney = 0;

function displayAllDrink() {
    let str = "";
    for (let i = 0; i < drinks.length; i++) {
        str += `<div class="card">
                    <div id="img-border">
                        <img src="${drinks[i][1]}" alt="Denim Jeans" style="width:100%">
                    </div>
                    <h1>${drinks[i][2]}</h1>
                    <p class="price">${convertMoney(drinks[i][3])} VNĐ</p>
                    <p><button onclick="addToOrder(${i})">Order</button></p>
                </div>`;
    }
    document.getElementById("drink-list").innerHTML = str;
}

function displayOrder() {
    let str = `<tr>
                    <th>STT</th>
                    <th>Tên đồ uống</th>
                    <th>SL</th>
                    <th>Giá</th>
                </tr>`;
    for (let i = 0; i < orders.length; i++) {
        str += `<tr>
                    <td>${i + 1}</td>
                    <td>${orders[i][1]}</td>
                    <td>${orders[i][3]}</td>
                    <td>${convertMoney(orders[i][2] * orders[i][3])}</td>
                    <td><button onclick="removeItemFromOrder(${i})">x</button></td>
                </tr>`;
    }
    document.getElementById("order-list").innerHTML = str;
    totalOrder();
}

function addToOrder(index) {
    let indexed = -1;
    for (let i = 0; i < orders.length; i++) {
        if(orders[i][0] == drinks[index][0]){
            indexed = i;
        }
    }

    if(indexed == -1){
        let orderItem = [drinks[index][0], drinks[index][2], drinks[index][3], 1]
        orders.push(orderItem);
    }else{
        orders[indexed][3] ++;
    }
    
    displayOrder();
}

function totalOrder() {
    let total = 0;
    for (let i = 0; i < orders.length; i++) {
        total += orders[i][2] * orders[i][3];
    }
    totalBill = total;
    document.getElementById("total").innerText = convertMoney(total);
}

function removeItemFromOrder(index) {
    if(orders[index][3] > 1){
        orders[index][3]--
    }else{
        orders.splice(index, 1);
    }
    
    displayOrder();
}

function convertMoney(money) {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(money);
}

function payment() {
    showRevenue();
    alert("Thanh toán hoá đơn thành công: " + convertMoney(totalBill));
    orders = [];
    displayOrder();
}

function showRevenue() {
    totalMoney = loadRevenue();
    totalMoney += totalBill;
    saveRevenue();
    document.getElementById("revenue").innerText = convertMoney(totalMoney);
}

function saveRevenue() {
    localStorage.setItem("revenue", totalMoney)
}

function loadRevenue() {
    let money = localStorage.getItem("revenue") ?? 0;
    return +money;
}

displayAllDrink();
displayOrder();
showRevenue();