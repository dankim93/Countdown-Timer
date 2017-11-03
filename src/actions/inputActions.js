const ADD_INPUTS = 'ADD_INPUTS';
export const addInputs = (data) => dispatch => {
  dispatch({type: ADD_INPUTS, data: data});
}

export default ADD_INPUTS;
