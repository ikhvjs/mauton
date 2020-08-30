import {
  SELECT_HOME_INDEX
 } from '../../constants';

 export const selectHomeIndexAct = (selectedIndex) =>{
  return ({type:SELECT_HOME_INDEX, payload:selectedIndex})
};
