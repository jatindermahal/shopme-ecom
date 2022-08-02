export const initialState = {
  cart: [],
  user: null
};

export const reducer = (state, action) => {
  // console.log(action);
  switch (action.type) {
    case "ADD_TO_CART":
      return {
        ...state,
        cart: [...state.cart, action.item],
        //return current state plus what we already had in cart plus new item
      };
    case "REMOVE_FROM_CART":
      let tempCart = [...state.cart];
      const index = tempCart.findIndex((item) => item.id === action.id);
      if (index >= 0) 
        tempCart.splice(index,1);

      return { ...state, cart: tempCart };

    case "SET_USER":
      return {
        ...state,
        user: action.user
      }
    default:
      return state;
  }
};
