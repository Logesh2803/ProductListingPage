import React, { useState, useEffect } from 'react'
//rating component
import ReactStars from "react-rating-stars-component";
//toast
import 'react-notifications/lib/notifications.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import './index.css'
const ProductList = () => {
  const [filteredData, setFilteredData] = useState([]);
  const [fetchedData, setFetchedData] = useState([]);
  const [sortBy, setSortBy] = useState("id");
  
  let cartObj = []

  const [add,setAdd] = useState(cartObj.length)

  const handleSortBy = (flag) => {
    setSortBy(flag);
  }

  const filterResult = (catItem) => {
    const filtered = fetchedData.filter((curData) => curData.category === catItem)
    setFilteredData(filtered)
  }

  useEffect(() => {
    async function fetchData() {
      let result = await fetch('https://dummyjson.com/products?limit=100');
      result = await result.json()
      setFetchedData(result.products)
      setFilteredData(result.products)
      cartLength()
    }
    fetchData()
  }, [])
  // useEffect(()=>{
  //   console.log('hi',cartObj.length)
  //    setAdd(cartObj.length)
  // },[cartObj])

  function buyNow(data) {
    if (data < 50) {
      console.log('low stock')
      NotificationManager.info('hurry! only a few items left');
    }
  }
  const cartLength = () => {
    cartObj = JSON.parse(localStorage.getItem('cart'))
    setAdd(cartObj.length)

  }
  function atc(item) {
    if (localStorage.getItem('cart') != null) {
      cartObj = JSON.parse(localStorage.getItem('cart'))
      cartObj.push(item)
      setAdd(cartObj.length)
      console.log('cartItem',cartObj.length)

      
      localStorage.setItem("cart", JSON.stringify(cartObj))
    } else {
      cartObj.push(item)
      localStorage.setItem("cart", JSON.stringify(cartObj))
    }
  }

  console.log("result", filteredData)
  const categories = ["Smartphones", "Laptops", "Fragrances", "Skincare", "Groceries", "Home-Decoration",
    "Furniture", "Tops", "Womens-Dresses", "Womens-Shoes", "Mens-Shirts", "Mens-Shoes",
    "Mens-Watches", "Womens-Watches", "Womens-Bags", "Womens-Jewellery", "Sunglasses",
    "Automotive", "Motorcycle", "Lighting"
  ]
  return (
    <div >
      <NotificationContainer />
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: 100, zIndex: 1 }}>
        <div className='d-flex align-content-center justify-content-between p-2 mb-5 bg-secondary text-white text-center'>
          <h1></h1>
          <h1 >Product Listing Page</h1>
          <button type='button' onClick={() => window.open('/cart', '_self')} className='icon-buttton w-10' style={{ position: 'relative', display: 'flex', color: '#333333', backgroundColor: '#dddddd', border: 'none', outline: 'none', borderRadius: '70%' }}>
            <span className="material-symbols-outlined mt-3">shopping_cart </span>
            <span className="icon-button_badge" style={{ background: 'red', borderRadius: '70%', height: 30, width: 20, position: 'absolute', top: -5, right: -7, color: '#ffffff', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>{add}</span>
          </button>
        </div>
      </div>
      <div className="container-fluid mx-2 " style={{ marginTop: 100 }}>
        <div className="row mt-5 mx-2" >
          <div className="col-md-3" >
            <h1 className="text-secondary mx-2 mb-4">Categories</h1>
            <button className="btn btn-success w-75 mb-4" onClick={() => (setFilteredData(fetchedData), setSortBy("id"))}>All</button>
            {
              categories.map(category =>
                <button className="btn btn-success w-75 mb-4" onClick={() => (filterResult(category.toLowerCase()), setSortBy("id"))}>{category}</button>
              )
            }
          </div>
          <div className="col-md-9">
            <div className='d-flex justify-content-around'>
              <button className="btn btn-success" onClick={() => handleSortBy("price")}>Sort by Price</button>
              <button className="btn btn-success" onClick={() => handleSortBy("discountPercentage")}>Sort by Discount</button>
              <button className="btn btn-success" onClick={() => handleSortBy("rating")}>Sort by Rating</button>
            </div>
            <div className="row">
              {
                filteredData.sort((a, b) => a[sortBy] - b[sortBy]).map((item, index) => {
                  const { id, title, price, thumbnail, discountPercentage, rating, stock } = item;
                  return (
                    <>
                      <div className="col-md-4 mb-4 mt-4" key={id + index}>
                        <div className="card">
                          <img className="card-img-top" src={thumbnail} alt="Card image cap" />
                          <div className="card-body">
                            <h5 className="card-title">{title}</h5>
                            <div className='d-flex justify-content-start'>
                              <p className="card-text mr-2 text-success">{Math.round(discountPercentage)}%off</p>
                              <p className="card-text">&#8377;{price}</p>
                            </div>
                            <ReactStars
                              count={5}
                              value={rating}
                              isHalf={true}
                              size={24}
                              activeColor="#ffd700"
                            />
                            <button className="btn btn-primary mt-2 mr-3" onClick={() => buyNow(stock)} >Buy Now</button>
                            <button className="btn btn-primary mt-2" onClick={() => atc(item)} >Add To Cart</button>
                          </div>
                        </div>
                      </div>
                    </>
                  )
                }
                )
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default ProductList