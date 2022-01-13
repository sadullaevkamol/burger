const product = {
    plainBurger: {
        name: 'Гамбургер простой',
        price: 10000,
        kcall: 200,
        amount: 0,
        get Sum() {
            return this.price * this.amount
        },
        get Kcall() {
            return this.kcall * this.amount
        }
    },
    freshBurger: {
        name: 'Гамбургер FRESH',
        price: 20500,
        kcall: 300,
        amount: 0,
        get Sum() {
            return this.price * this.amount
        },
        get Kcall() {
            return this.kcall * this.amount
        }
    },
    freshCombo: {
        name: 'FRESH COMBO',
        price: 31900,
        kcall: 400,
        amount: 0,
        get Sum() {
            return this.price * this.amount
        },
        get Kcall() {
            return this.kcall * this.amount
        }
    }
}

const extraProduct = {
    doubleMayonnaise: {
        name: 'Двойной майонез',
        price: 1000,
        kcall: 50
    },
    lettuce: {
        name: 'Салатный лист',
        price: 500,
        kcall: 5
    },
    cheese: {
        name: 'Сыр',
        price: 800,
        kcall: 30
    }
}




const btnPlusOrMinus = document.querySelectorAll('.main__product-btn');

btnPlusOrMinus.forEach(btn => {
    btn.addEventListener('click', function () {
        plusOrMinus(this);
    })
})

function plusOrMinus(element) {
    /* 
        closest() - метод объекта. Который подключается и получает родителя того элемента который указали
        getAttribute() - получает аттрибут с HTML
    */

    const parent = element.closest('.main__product'),
        parentId = parent.getAttribute('id'),
        productAmount = parent.querySelector('.main__product-num'),
        price = parent.querySelector('.main__product-price span'),
        kcall = parent.querySelector('.main__product-kcall span'),
        elementSymbol = element.getAttribute('data-symbol');

    if (elementSymbol == '+') {
        product[parentId].amount++
    } else if (elementSymbol == '-' && product[parentId].amount > 0) {
        product[parentId].amount--
    }

    productAmount.innerHTML = product[parentId].amount;
    price.innerHTML = product[parentId].Sum;
    kcall.innerHTML = product[parentId].Kcall;
}

const checkExtraProduct = document.querySelectorAll('.main__product-checkbox');

checkExtraProduct.forEach(checkbox => {
    checkbox.addEventListener('click', () => {
        addExtraProduct(checkbox);
    })
})


function addExtraProduct(element) {
    const parent = element.closest('.main__product'),
        parentId = parent.getAttribute('id'),
        price = parent.querySelector('.main__product-price span'),
        kcall = parent.querySelector('.main__product-kcall span'),
        elAttr = element.getAttribute('data-extra');

    product[parentId][elAttr] = element.checked

    if (product[parentId][elAttr]) {
        product[parentId].price += extraProduct[elAttr].price
        product[parentId].kcall += extraProduct[elAttr].kcall
    } else {
        product[parentId].price -= extraProduct[elAttr].price
        product[parentId].kcall -= extraProduct[elAttr].kcall
    }

    price.innerHTML = product[parentId].Sum;
    kcall.innerHTML = product[parentId].Kcall;
}


const addCart = document.querySelector('.addCart'),
    receipt = document.querySelector('.receipt'),
    receiptWindow = document.querySelector('.receipt__window'),
    receiptOut = document.querySelector('.receipt__window-out');

let arrProduct = [],
    totalPrice = 0,
    totalKcall = 0,
    totalName = '';

addCart.addEventListener('click', function () {
    for (const key in product) {
        if (product[key].amount > 0) {
            arrProduct.push(product[key]);
            for (const newKey in product[key]) {
                if (product[key][newKey] === true) {
                    product[key].name += '\n' + extraProduct[newKey].name
                }
            }
        }
    }

    arrProduct.forEach(product => {
        totalPrice += product.price * product.amount;
        totalKcall += product.kcall * product.amount;
        totalName += '\n' + product.name + ' ' + product.amount + ' шт. ';
    })

    receiptOut.innerHTML = `Вы заказали: \n ${totalName} \n Каллорийность ${totalKcall} \n Общая сумма ${totalPrice} сумм` /* \n - экранирование. Перенос на следующую строку */

    receipt.style.display = 'flex';


    setTimeout(function () {
        receipt.style.opacity = '1';
    }, 200);

    setTimeout(function () {
        receiptWindow.style.top = '25%';
    }, 300);

    document.body.style.overflow = 'hidden';
})


const receiptWindowBtn = document.querySelector('.receipt__window-btn');

receiptWindowBtn.addEventListener('click', () => {
    location.reload();
})


const mainInfo = document.querySelectorAll('.main__product-info'),
    // img = document.querySelector('.main__product-img'),
    img = document.querySelectorAll('.main__product-img'),
    view = document.querySelector('.view'),
    closeBtn = document.querySelector('.view__close'),
    viewImg = document.querySelector('.view__img');


img.forEach(singleImg => {
    mainInfo.forEach(info => {
        info.addEventListener('dblclick', () => {
            let attr = singleImg.getAttribute('src')
            viewImg.setAttribute('src', attr)
            console.log(attr);
            view.classList.add('active')
        })
    })
})



// mainInfo.forEach(info => {
//     info.addEventListener('dblclick', () => {
//         viewer()
//         view.classList.add('active')
//     })
// })

// function viewer() { 
//     let attr = img.getAttribute('src')
//     viewImg.setAttribute('src', attr)
//     console.log(attr);
// }

closeBtn.addEventListener('click', () => {
    view.classList.remove('active')
})

