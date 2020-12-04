import {
    CLOSE_VALIDATION_ERROR_ALERT
   } from '../../constants';
  
export const closeValidationErrorAlertAct = () => {
    return ({type:CLOSE_VALIDATION_ERROR_ALERT})
}