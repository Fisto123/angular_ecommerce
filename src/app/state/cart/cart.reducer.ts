import { createReducer, on } from '@ngrx/store';
import { INITIAL_STATE } from './cart.state';
import {
  ClearCart,
  DecrementCart,
  DeleteItem,
  GetTotal,
  IncrementCart,
  addToCart,
} from './cart.action';
import { ProductModel } from 'src/app/model/product';

export const _cartReducer = createReducer(
  INITIAL_STATE,
  on(addToCart, (state: any, action: any) => {
    const isItemInCart = state.carts.findIndex(
      (item: ProductModel) => item._id === action.products._id
    );
    if (isItemInCart >= 0) {
      const updatedCart = state.carts.map(
        (item: ProductModel, index: number) => {
          if (index === isItemInCart) {
            return {
              ...item,
              cartQuantity: action.cartQuantity + item.cartQuantity,
            };
          }
          return item;
        }
      );
      return { ...state, carts: updatedCart };
    } else {
      const tempProduct = {
        ...action.products,
        cartQuantity: action.cartQuantity,
      };
      return {
        ...state,
        carts: [...state.carts, tempProduct],
      };
    }
  }),
  on(DecrementCart, (state: any, action) => {
    const isItemInCart = state.carts.findIndex(
      (item: ProductModel) => item._id === action.id
    );

    if (isItemInCart >= 0) {
      if (state.carts[isItemInCart].cartQuantity > 0) {
        const updatedCart = state.carts.map(
          (item: ProductModel, index: number) => {
            if (index === isItemInCart) {
              const updatedQuantity = item.cartQuantity - 1;
              if (updatedQuantity === 0) {
                return null; // Remove the item from the cart by returning null
              }
              return {
                ...item,
                cartQuantity: updatedQuantity,
              };
            }
            return item;
          }
        );

        const newCartItems = updatedCart.filter(
          (item: ProductModel) => item !== null
        ); // Filter out the null items

        return {
          ...state,
          carts: newCartItems,
        };
      }
    }

    return state;
  }),
  on(IncrementCart, (state, action) => {
    const isItemInCart = state.carts.findIndex(
      (item: ProductModel) => item._id === action.id
    );

    if (isItemInCart >= 0) {
      const updatedCart = state.carts.map(
        (item: ProductModel, index: number) => {
          if (index === isItemInCart) {
            return {
              ...item,
              cartQuantity: item.cartQuantity + 1,
            };
          }
          return item;
        }
      );

      return {
        ...state,
        carts: updatedCart,
      };
    }

    return state;
  }),
  on(ClearCart, (state, action) => {
    const updatedState = {
      ...state,
      carts: [],
    };
    return updatedState;
  }),
  on(DeleteItem, (state, action) => {
    const updatedItem = state.carts.filter((cart) => cart._id !== action.id);
    return {
      ...state,
      carts: updatedItem,
    };
  }),
  on(GetTotal, (state, action) => {
    const sum = state.carts.reduce((accumulator: number, curValue) => {
      return accumulator + curValue.cartQuantity * curValue.price;
    }, 0);

    const updatedState = {
      ...state,
      cartTotalAmount: sum + 20,
    };

    return updatedState;
  })
);

export const cartReducer = (state: any, action: any) => {
  return _cartReducer(state, action);
};
