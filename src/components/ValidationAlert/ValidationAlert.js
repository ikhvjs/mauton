import React , { Component } from 'react';
import { connect } from 'react-redux';
import { 
	closeAlertAct
} from './ValidationAlertAction';

import {Alert} from "react-bootstrap";


const mapStateToProps = (state) => {
  return {
      isShowAlert:state.authRdc.isShowAlert,
      alertMessage:state.authRdc.alertMessage
  }
}

const mapDispatchToProps = (dispatch) => {
	return {
		onCloseAlert:()=>
			dispatch(closeAlertAct())
	}	
}

class ValidationAlert extends Component  {

	render() {
		const { 
            isShowAlert,
            alertMessage,
            onCloseAlert
			} = this.props;

		return (
			
				(<Alert variant="danger" show={isShowAlert} 
					onClose={onCloseAlert} dismissible transition
                >
                    <Alert.Heading>Ops! You got an error!</Alert.Heading>
			        <p>{alertMessage}</p>
			    </Alert>)
		)


	}

}


export default connect(mapStateToProps, mapDispatchToProps)(ValidationAlert)