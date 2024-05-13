const initialState = {
    user:null,
    success:false,
    passwordChangeSuccess:false
}

const signupReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SIGNUP_SUCCESS':
        return {
          ...state,
          user: action.payload,
          success: true
        };
        case 'LOGIN_SUCCESS':
            return{
                ...state,
                user:action.payload,
                success:true
            };
        case 'PASSWORD_CHANGE_SUCCESS':
            return{
                ...state,
                success:true,
                passwordChangeSuccess:true
            }
      default:
        return state;
    }
  };
  
  export default signupReducer;