// @ts-nocheck
import styled from 'styled-components';

const Container = styled.div``;

const Alert = ({ msg, typeout }: { msg: string; timeout?: number }) => {
  return <Container>{msg}</Container>;
};

export default Alert;

// export const setAlert = (msg, alertType, timeout = 5000) => (dispatch) => {
//   const id = uuidv4();
//   dispatch({
//     type: SET_ALERT,
//     payload: { msg, alertType, id },
//   });

//   setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
// };
