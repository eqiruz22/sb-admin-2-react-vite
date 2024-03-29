export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...action.payload };
    case "LOGOUT":
      return { user: null };
    default:
      return state;
  }
};
