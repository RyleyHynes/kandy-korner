import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import "./Products.css"

export const ProductList = () => {
    //defining new state variable for products and defining the function that will change the state
    const [products, setProducts] = useState([])
    //defining new state variable for filtered products and defining the function that will change the state
    const [filteredProducts, setFiltered] = useState([]) 
    //defining new state variable for items that cost 2 dollars or more and defining the function that will change the state
    const [topPricedProducts, setTopPriced] = useState([false])
    //getting the logged in user
    const localKandyUser = localStorage.getItem("kandy_user")
    //converting the kandy_user string into an object 
    const kandyUserObject = JSON.parse(localKandyUser)
    //invoking useNavigate() and assigning its return value to the navigate variable
    const navigate = useNavigate()


    //useEffect to fetch products from API. use _expand to get the types associated with the products, once received it will be stored in the productArray and then set to a new state variable
    useEffect(
        () => {
            fetch(`http://localhost:8088/products?_sort=name&_expand=productType`) //go get all the products
                //get that response back, parse the json, convert it back to an actual javascript array
                .then(response => response.json())
                .then((productsArray) => {
                    setProducts(productsArray)
                })
        },
        [] // When this array is empty, you are observing initial component state
    )

    //useEffect to sort products by name and then store that sorted array in filtered products
    useEffect(
        () => {
            if (kandyUserObject.staff) {
                setFiltered(products)
            } else {
                setFiltered(products)
            }
        },
        [products]
    )


    //useEffect to find items that cost 2 dollars or more and then store that array in filtered products
    useEffect(
        () => {
            if (topPricedProducts) {
                const highPriced = products.filter(product => {
                    return product.pricePerUnit >= 2.00
                })
                setFiltered(highPriced)
            } else {
                setFiltered(products)
            }
        },
        [topPricedProducts]
    )



    return <>
        <h2 className="productsHeader">Products</h2>
        {
            kandyUserObject.staff
                ? <>
                    <button className="productButton" onClick={() => setTopPriced(true)}>Top Priced</button>
                    <button className="productButton" onClick={() => setTopPriced(false)}>Show All</button>
                </>
                : ""
        }
        <article className="products">
            {
                filteredProducts.map(
                    (product) => {
                        return <section className="product" key={product.id}>
                            <header>{product.name}</header>
                            <div>Price:{product.pricePerUnit.toLocaleString("en-US", { style: "currency", currency: "USD" })}</div>
                            <div>Product Type: {product?.productType?.type}</div>
                        </section>
                    }
                )
            }
        </article>
    </>
}