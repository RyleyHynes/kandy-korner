import { Outlet, Route, Routes } from "react-router-dom"
import { Locations } from "../locations/Locations"
import { ProductList} from "../Products/Products"

export const ApplicationViews = () => {
	return (
		<Routes>
			<Route path="/" elements={
				<>
					<h1>Kandy Korner</h1>
					<div>Cavities Encouraged</div>
					<Outlet />
				</>
			}>

				<Route path="locations" element={<Locations />} />
				<Route path="products" element={<ProductList />} />
			</Route>
		</Routes>
	)
}
