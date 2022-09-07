import React, { useEffect, useState } from 'react'
import './index.css'
export default function CartScreen() {
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')))
  const [emptyCart, setEmptyCart] = useState(false)

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))
    if (cart.length == 0) {
      setEmptyCart(true)
    }
  }, [cart])

  function removeCart(item) {

    let newDat = cart
    setCart(newDat.filter(function (e) { return (e.id !== item.id) }))
    console.log(newDat)

  }
  return (
    <div>
      <div className='p-2 mb-5 bg-secondary text-white text-center'>
        <h1 >Cart Screen</h1>
      </div>
      {emptyCart ? (
        <div className='text-dark text-center align-content-center'><h1>No items were added &#128531;</h1></div>
      ) : (
        <div className='tableMain'>
          <div className='customTable bg-warning'>
            {/*  */}
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Image</th>
                  <th scope="col">Product</th>
                  <th scope="col">Price</th>
                  <th scope="col">Remove</th>

                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => {
                  return (
                    <tr>
                      <th scope="row"><img width={140} height={100} src={item.thumbnail} ></img></th>
                      <td>{item.title}</td>
                      <td>{item.price}</td>
                      <td><button className='btn btn-danger' onClick={() => removeCart(item)} >Remove</button></td>
                    </tr>
                  )
                })}

              </tbody>
            </table>

          </div>
        </div>
      )}
    </div>
  )
}



