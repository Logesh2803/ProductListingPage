import React, { useState, useEffect } from 'react'
import { Table } from 'react-bootstrap'
const ProductList = () => {
  const [filteredData, setFilteredData] = useState([]);
  const [fetchedData, setFetchedData] = useState([]);

  const sortByPrice = () => {
    console.log(filteredData)
    const sortedData = filteredData.sort((a,b)=>a.price-b.price)
    console.log(sortedData)
    setFilteredData(sortedData)
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

  return (
    <div >
      <h1 className='text-center bg-secondary text-white mt-2'>Product Listing Page</h1>
      <div className="container-fluid mx-2">
        <div className="row mt-5 mx-2">
          <div className="col-md-3">
            <h1 className="text-secondary mx-2 mb-4">Categories</h1>
            <button className="btn btn-success w-75 mb-4" onClick={() => setFilteredData(fetchedData)}>All</button>
            <button className="btn btn-success w-75 mb-4" onClick={() => filterResult("smartphones")}>Smartphones</button>
            <button className="btn btn-success w-75 mb-4" onClick={() => filterResult("laptops")}>Laptops</button>
            <button className="btn btn-success w-75 mb-4" onClick={() => filterResult("fragrances")}>Fragrances</button>
            <button className="btn btn-success w-75 mb-4" onClick={() => filterResult("skincare")}>Skincare</button>
            <button className="btn btn-success w-75 mb-4" onClick={() => filterResult("groceries")}>Groceries</button>
            <button className="btn btn-success w-75 mb-4" onClick={() => filterResult("home-decoration")}>Home-Decoration</button>
            <button className="btn btn-success w-75 mb-4" onClick={() => filterResult("furniture")}>Furniture</button>
            <button className="btn btn-success w-75 mb-4" onClick={() => filterResult("tops")}>Tops</button>
            <button className="btn btn-success w-75 mb-4" onClick={() => filterResult("womens-dresses")}>Womens-Dresses</button>
            <button className="btn btn-success w-75 mb-4" onClick={() => filterResult("womens-shoes")}>Womens-Shoes</button>
            <button className="btn btn-success w-75 mb-4" onClick={() => filterResult("mens-shirts")}>Mens-Shirts</button>
            <button className="btn btn-success w-75 mb-4" onClick={() => filterResult("mens-shoes")}>Mens-Shoes</button>
            <button className="btn btn-success w-75 mb-4" onClick={() => filterResult("mens-watches")}>Mens-Watches</button>
            <button className="btn btn-success w-75 mb-4" onClick={() => filterResult("womens-watches")}>Womens-Watches</button>
            <button className="btn btn-success w-75 mb-4" onClick={() => filterResult("womens-bags")}>Womens-Bags</button>
            <button className="btn btn-success w-75 mb-4" onClick={() => filterResult("womens-jewellery")}>Womens-Jewellery</button>
            <button className="btn btn-success w-75 mb-4" onClick={() => filterResult("sunglasses")}>Sunglasses</button>
            <button className="btn btn-success w-75 mb-4" onClick={() => filterResult("automotive")}>Automotive</button>
            <button className="btn btn-success w-75 mb-4" onClick={() => filterResult("motorcycle")}>Motorcycle</button>
            <button className="btn btn-success w-75 mb-4" onClick={() => filterResult("lighting")}>Lighting</button>
          </div>
          <div className="col-md-9">
   <button className="btn btn-primary" onClick = {sortByPrice}>Sort by Price</button>
            <div className="row">
              {
                console.log(filteredData)}{
                filteredData.map((item,index) => {
                  const { id, title, price, thumbnail } = item;
                  return (
                    <>
                      <div className="col-md-4 mb-1" key={id+index}>
                        <div className="card">     
                          <img className="card-img-top" src={thumbnail} alt="Card image cap" />
                          <div className="card-body">
                            <h5 className="card-title">{title}</h5>
                            <p className="card-text">{price}</p>
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