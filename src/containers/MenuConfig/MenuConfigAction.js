import {
  SELECT_MENU_LEVEL
 } from '../../constants';


export const selectMenuLevelAct = (key) => {
  return ({ type: SELECT_MENU_LEVEL, payload:key });
}