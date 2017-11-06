import ADD_INPUTS from "../actions/inputActions";

const INITIAL_STATE = {
  startTime: "",
  endTime: ""
};

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case ADD_INPUTS:
      return {...state,
        startTime: action.data.startTime,
        endTime: action.data.endTime,
      };
    default:
      return state;
  }
}
