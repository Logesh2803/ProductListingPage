import React, { useState, useEffect } from 'react'
import { Table } from 'react-bootstrap'
const ProductList = () => {
  const [filteredData, setFilteredData] = useState([]);
  const [fetchedData, setFetchedData] = useState([]);
  const [sortBy, setSortBy] = useState("id");

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
    }
    fetchData()
  }, [])

  console.log("result", filteredData)
  const categories = ["Smartphones", "Laptops", "Fragrances", "Skincare", "Groceries", "Home-Decoration",
    "Furniture", "Tops", "Womens-Dresses", "Womens-Shoes", "Mens-Shirts", "Mens-Shoes",
    "Mens-Watches", "Womens-Watches", "Womens-Bags", "Womens-Jewellery", "Sunglasses",
    "Automotive", "Motorcycle", "Lighting"
  ]
  return (
    <div >
      <h1 className='text-center bg-secondary text-white mt-2'>Product Listing Page</h1>
      <div className="container-fluid mx-2">
        <div className="row mt-5 mx-2">
          <div className="col-md-3">
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
   <button className="btn btn-success" onClick = {sortByPrice}>Sort by Price</button>
   <button className="btn btn-success" onClick = {sortByPrice}>Sort by Discount</button>
   <button className="btn btn-success" onClick = {sortByPrice}>Sort by Ratings</button>
   </div>

            <div className="row">
              {
                console.log(filteredData)}{
                filteredData.map((item,index) => {
                  const { id, title, price, thumbnail,discountPercentage} = item;
                  return (
                    <>
                      <div className="col-md-4 mb-4 mt-5" key={id+index}>
                        <div className="card">     
                          <img className="card-img-top" src={thumbnail} alt="Card image cap" />
                          <div className="card-body">
                            <h5 className="card-title">{title}</h5>
                            <div className='d-flex justify-content-start'>
                            <p className="card-text">{Math.round(discountPercentage)}</p>
                            <p className="card-text">&#8377;{price}</p>
                            </div>

                            <button className="btn btn-primary">Buy Now</button>
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