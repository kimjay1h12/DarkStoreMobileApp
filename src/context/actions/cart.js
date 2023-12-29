import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';


export const getCart = async (dispatch) => {
  try {
    const res = await AsyncStorage.getItem('cartData');
    const cartData = JSON.parse(res) || []; // Default to an empty array if 'cartData' is not present
    const totalPrice = calculateTotalPrice(cartData);
    dispatch({
      type: "FETCHED_DATA",
      payload: {cartData: cartData, total: totalPrice},
    });


    return {cartData, totalPrice};
  } catch (error) {
    // dispatch(ERRORFETCHINGCARTDATA(error));
    console.log('error fetching user cart', error);

    // If there's an error, you might want to return a default value or handle it accordingly
    return {cartData: [], totalPrice: 0};
  }
};
const calculateTotalPrice = (cartData) => {
  // Implement your logic to calculate the total price from the cart data
  // For example, you might iterate through the items and sum their prices
  let totalPrice = 0;
  for (const item of cartData) {
    totalPrice += item.price * item.qunatityRequested || 0; // Assuming each item has a 'price' property
  }
  return totalPrice;
};
const updateFieldInArray = (
  arr,
  obj,
  numberToAdd,
  type = 'update',
) => {
  const updatedArray = arr.map(item => {
    if (item._id === obj._id) {
      // Update the specified field by adding the provided number
      return {
        ...item,
        qunatityRequested:
          type === 'update'
            ? item.qunatityRequested + numberToAdd
            : numberToAdd,
      };
    }
    return item;
  });

  return updatedArray;
};
export const DeleteAllItemsFromCart = async (dispatch) => {
  await AsyncStorage.removeItem('cartData');
  getCart(dispatch);
};
export const deleteItemFromCart = async (id, dispatch) => {
  const res = await AsyncStorage.getItem('cartData');
  const cartData = JSON.parse(res) || [];
  const index = cartData.findIndex((item) => item._id === id);
  if (index !== -1) {
    // If the item with the specified ID is found, remove it from the array

    cartData.splice(index, 1);
    await AsyncStorage.setItem('cartData', JSON.stringify(cartData));
    getCart(dispatch);
  } else {
   Alert.alert( 'Error Deleting Item From Cart')
    

  }

  console.log('arror deleting item from cart');
};
export const addToCart = async (data, dispatch) => {
  try {
    const res = await AsyncStorage?.getItem('cartData');
    const cartData = JSON.parse(res) || []; // Parse the existing data or initialize an empty array

    const existingObject = cartData.find((item) => item._id === data._id);

    if (existingObject) {
      const updatedCart = updateFieldInArray(
        cartData,
        existingObject,
        data?.qunatityRequested,
      );
      await AsyncStorage.setItem('cartData', JSON.stringify(updatedCart));
    Alert.alert(
       'Item Already Exist But Quantity has been Updated',
    )
    } else {
      // data.quantity = 1;
      cartData.push(data);
      await AsyncStorage.setItem('cartData', JSON.stringify(cartData));
     
      Alert.alert('Item has been added To Cart successfully',)

    }
    getCart(dispatch);
  } catch (error) {
    console.log('Error updating cart data', error);
  }
};
export const updateCartQuantity = async (
  id,
  newquantity,
  dispatch
) => {
  const res = await AsyncStorage.getItem('cartData');
  const cartData = JSON.parse(res) || []; // Parse the existing data or initialize an empty array

  const existingObject = cartData.find((item) => item._id === id);
  const updatedCart = updateFieldInArray(
    cartData,
    existingObject,
    newquantity,
    'override',
  );
  await AsyncStorage.setItem('cartData', JSON.stringify(updatedCart));
  getCart(dispatch);
};
