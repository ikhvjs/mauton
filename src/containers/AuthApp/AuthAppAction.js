import {
  USER_START_SESSION,
  USER_STOP_SESSION,
  USER_SESSION_TIMEOUT,
} from '../../constants';

let timer;

export const startSessionTimeOutAct = () => (dispatch, getState) => {
  dispatch({ type: USER_START_SESSION });
  const timerOut = getState().authRdc.expireTime * 1000 - (Date.parse(new Date()));
  // console.log({timerOut});
  timer = setTimeout(
    () => dispatch({ type: USER_SESSION_TIMEOUT }),
    timerOut
  );
}

export const stopSessionTimeOutAct = () => {
  clearTimeout(timer);
  return ({ type: USER_STOP_SESSION });
}


