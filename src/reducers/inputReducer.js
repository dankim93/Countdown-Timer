import ADD_INPUTS from "../actions/inputActions";

const INITIAL_STATE = {
  startTime: "",
  endTime: "",
  isActivate: false,
  error: ""
};

export default function(state = INITIAL_STATE, action) {
  // console.log('state',state);
  // console.log('action', action);
  switch(action.type) {
    case ADD_INPUTS:
      return {...state,
        startTime: action.data.startTime,
        endTime: action.data.endTime,
        error: action.data.error
      };
    default:
      return state;
  }
}
