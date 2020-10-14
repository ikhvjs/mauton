import React from 'react';
import {
	Route,
	Redirect
} from "react-router-dom";

export function PrivateRoute({ children, isAuth }) {
	return (
		<Route
			render={({ location }) => isAuth 
			? (children) 
			: (<Redirect
					to={{
						pathname: "/login",
						state: { from: location }
					}} 
			/>)} 
		/>
	);
}
