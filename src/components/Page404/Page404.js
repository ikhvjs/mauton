import React  from 'react';

import {Card,Container} from "react-bootstrap";


function Page404 (){

		return(
			<Container>
				<Card className="text-center ">
				  <Card.Header>Page not Found</Card.Header>
				  <Card.Body>
				    <Card.Title>No worry, it is normal to get lost</Card.Title>
				    <Card.Text>
				      Please try again
				    </Card.Text>
				  </Card.Body>
				</Card>
			</Container>
		);
	
}

export default Page404;