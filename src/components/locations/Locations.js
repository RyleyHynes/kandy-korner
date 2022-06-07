import { useState, useEffect } from "react"
import "./Locations.css"

export const Locations = () => {
    const [locations, setLocations] = useState([])

    useEffect(
        () => {
            fetch(`http://localhost:8088/locations`) //go get all the locations
                //get that response back, parse the json, convert it back to an actual javascript array
                .then(response => response.json())
                .then((locationArray) => {
                    setLocations(locationArray)
                })
        },
        [] // When this array is empty, you are observing initial component state
    )
    return <>
    <h2 className="locationsHeader">Locations</h2>
    <article className="locations">
        {
            locations.map(
                (location) => {
                    return <section className="locations">
                        <p>{location.name} is located at {location.address} </p>
                        <p>Store Size: {location.squareFootage} sqft </p>
                        
                    </section>
                }
            )
        }
    </article>
    </>
}