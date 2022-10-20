import { UI } from "../../actions";

const modalReducer = (state = {data: undefined}, action) => {
  switch (action.type) {
    case UI.OPEN_MODAL:
      return {
        ...state,
        [action.modal]: true
      };
    case UI.CLOSE_MODAL:
      return {
        ...state,
        [action.modal]: false
      };
    case UI.MODAL_DATA : 
     return {
       ...state,
       data: action.data
     }
    default:
      return state;
  }
};

export default modalReducer;
