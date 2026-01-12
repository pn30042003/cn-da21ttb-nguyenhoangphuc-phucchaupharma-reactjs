import { legacy_createStore as createStore } from 'redux';

// Action Type
const UPDATE_CART_ITEMS = 'UPDATE_CART_ITEMS';

// Action Creator
export const updateCartItems = (cartCount) => ({
  type: UPDATE_CART_ITEMS,
  payload: cartCount,
});

// Reducer
const initialState = {
  cartItems: 0,
};


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_CART_ITEMS':
      return {
        ...state,
        cartItems: action.payload,
      };
    default:
      return state;
  }
};
const store = createStore(reducer);
 
export default store;

