const SET_LOADER = "SET_LOADER";
const UPDATE_USER = "UPDATE_USER";

export function setLoader(data) {
  return {
    type: SET_LOADER,
    data
  };
}

export function updateUserData(data) {
  return {
    type: UPDATE_USER,
    data
  };
}

const initialState = {
  isLoading: false,
  user: false
};

export const app = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADER:
      return {
        ...state,
        isLoading: action.data
      };
    case UPDATE_USER:
      return {
        ...state,
        user: action.data
      };

    default:
      return state;
  }
};
