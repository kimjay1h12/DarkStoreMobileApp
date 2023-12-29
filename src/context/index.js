import { createContext, ReactNode, useEffect, useReducer } from "react";

import authReducer, { defaultAuth } from "./reducers/auth";
import genericReducer, { defaultData } from "./reducers/genericReducer";
import { GetAllProducts } from "./actions/products";
import cartReducer, { defaultCart } from "./reducers/cartReducer";
import client from "../../api/client";
import riderReducer, { defaultTrip } from "./reducers/riderReducer";
export const GLobalContext = createContext({
  authState: defaultAuth,
  authDispatch: () => {},
  productState: defaultData,
  productDispatch: () => {},
  promotionState: defaultData,
  promotionDispatch: () => {},
  cartState: defaultCart,
  cartDispatch: () => {},
  categoryDispatch: () => {},
  categoryState: defaultData,
  ordersState: defaultData,
  ordersDispatch: () => {},
  favouriteState: defaultData,
  favouriteDispatch: () => {},
brandState: defaultTrip,
  brandDispatch: () => {},
});

const GlobalProvider = ({ children }) => {
  const [authState, authDispatch] = useReducer(authReducer, defaultAuth);
  const [productState, productDispatch] = useReducer(
    genericReducer,
    defaultData
  );
  const [ordersState, ordersDispatch] = useReducer(genericReducer, defaultData);
  const [favouriteState, favouriteDispatch] = useReducer(
    genericReducer,
    defaultData
  );
  const [cartState, cartDispatch] = useReducer(cartReducer, defaultCart);
  const [categoryState, categoryDispatch] = useReducer(
    genericReducer,
    defaultData
  );
  const [promotionState, promotionDispatch] = useReducer(
    genericReducer,
    defaultData
  );
  const [brandState, brandDispatch] = useReducer(genericReducer, defaultData);

  useEffect(() => {
    (async () => {
      const success = (await client.get("/category")).data;
const brands =(await client.get("/brands")).data
      categoryDispatch({
        type: "FETCHED_DATA",
        payload: success.data,
      });
      brandDispatch({
        type: "FETCHED_DATA",
        payload: brands.data,
      })
      GetAllProducts(productDispatch)
    })();
  }, []);
  return (
    <GLobalContext.Provider
      value={{
        authState,
        authDispatch,
        productState,
        productDispatch,
        promotionDispatch,
        promotionState,
        cartState,
        cartDispatch,
        categoryState,
        categoryDispatch,
        ordersState,
        ordersDispatch,
        favouriteDispatch,
        favouriteState,
        brandDispatch,
      brandState,
      }}
    >
      {children}
    </GLobalContext.Provider>
  );
};

export default GlobalProvider;
