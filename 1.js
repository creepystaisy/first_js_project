
const stock = [
    {
        id: 1,
        name: 'Ручка',
        q: 12,
        cost: 18
    },
    {
        id: 2,
        name: 'Портфель',
        q: 3,
        cost: 1800
    }
]

const cart = []


function render () {
    let $stock_table_body = document.querySelector('#stock table tbody')
    let $cart_table_body = document.querySelector('#cart table tbody')

    $stock_table_body.innerHTML = ''
    $cart_table_body.innerHTML = ''

    // Отрисовываем склад
    stock.forEach((item) => {
        let $new_table_row = document.createElement('tr')
        $new_table_row.dataset.id = item.id

        let $new_table_row_name = document.createElement('td')
        $new_table_row_name.innerText = item.name

        let $new_table_row_q = document.createElement('td')
        $new_table_row_q.innerText = item.q

        let $new_table_row_cost = document.createElement('td')
        $new_table_row_cost.innerText = item.cost

        $new_table_row.append($new_table_row_name)
        $new_table_row.append($new_table_row_q)
        $new_table_row.append($new_table_row_cost)

        $stock_table_body.append($new_table_row)
    })

    // Отрисовываем корзину
    cart.forEach((item) => {
        let $new_table_row = document.createElement('tr')
        $new_table_row.dataset.id = item.id

        let $new_table_row_name = document.createElement('td')
        $new_table_row_name.innerText = item.name

        let $new_table_row_q = document.createElement('td')
        $new_table_row_q.innerText = item.q

        let $new_table_row_cost = document.createElement('td')
        $new_table_row_cost.innerText = item.cost

        $new_table_row.append($new_table_row_name)
        $new_table_row.append($new_table_row_q)
        $new_table_row.append($new_table_row_cost)

        $cart_table_body.append($new_table_row)
    })
}

document.querySelector('body').onload = function () {
    render()

    const $full_q = document.querySelector('#q')
    const $full_price = document.querySelector('#price')

    let table=document.querySelector('#stock table tbody')
        table.onclick = function (event) {
            const indexStock = stock.findIndex(function (item) {
                return item.id === +event.target.parentNode.dataset.id
            })
            const indexCart = cart.findIndex(function (item) {
                return item.id === +event.target.parentNode.dataset.id
            })

            if (indexCart > -1) {
                cart[indexCart].q++
            } else {
                cart.push({ ...stock[indexStock], q: 1})
            }

            $full_price.innerText = +$full_price.innerText + stock[indexStock].cost
            $full_q.innerText = +$full_q.innerText + 1

            stock[indexStock].q--

            if (stock[indexStock].q <= 0) {
                stock.splice(indexStock, 1)
            }

            render()
        }
    

    let table1 = document.querySelector('#cart table tbody')
        table1.onclick = function (event) {
            const indexStock = stock.findIndex(function (item) {
                return item.id === +event.target.parentNode.dataset.id
            })
            const indexCart = cart.findIndex(function (item) {
                return item.id === +event.target.parentNode.dataset.id
            })
            if (indexStock > -1) {
                stock[indexStock].q++
            } else {
                stock.push({ ...cart[indexCart], q: 1})
            }

            $full_price.innerText = +$full_price.innerText - cart[indexCart].cost
            $full_q.innerText = +$full_q.innerText - 1

            cart[indexCart].q--

            if (cart[indexCart].q <= 0) {
                cart.splice(indexCart, 1)
            }

            render()
        }
    
}