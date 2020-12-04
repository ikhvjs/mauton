import React , { Component } from 'react';
import { connect } from 'react-redux';
import { 
	closeValidationErrorAlertAct
} from './ValidationErrorAlertAction';

import {Alert} from "react-bootstrap";


const mapStateToProps = (state) => {
  return {
      isShowValidationErrAlert:state.alertRdc.isShowValidationErrAlert,
      ValidationErrMsg:state.alertRdc.ValidationErrMsg
  }
}

const mapDispatchToProps = (dispatch) => {
	return {
		onCloseAlert:()=>
			dispatch(closeValidationErrorAlertAct())
	}	
}

class ValidationAlert extends Component  {

	render() {
		const { 
            isShowValidationErrAlert,
            ValidationErrMsg,
            onCloseAlert
			} = this.props;

		return (
			
				(<Alert variant="danger" show={isShowValidationErrAlert} 
					onClose={onCloseAlert} dismissible transition
                >
                    <Alert.Heading>Ops! You got an error!</Alert.Heading>
			        <p>{ValidationErrMsg}</p>
			    </Alert>)
		)


	}

}


export default connect(mapStateToProps, mapDispatchToProps)(ValidationAlert)