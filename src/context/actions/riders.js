import { Alert } from "react-native";

import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";

import client from "../../../api/client";
import { db } from "../../../firebase";
import { errorMessage } from "../../../utility";

const getDistance = (lat1, lon1, lat2, lon2, unit = "K") => {
  var radlat1 = (Math.PI * lat1) / 180;
  var radlat2 = (Math.PI * lat2) / 180;
  var theta = lon1 - lon2;
  var radtheta = (Math.PI * theta) / 180;
  var dist =
    Math.sin(radlat1) * Math.sin(radlat2) +
    Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
  if (dist > 1) {
    dist = 1;
  }
  dist = Math.acos(dist);
  dist = (dist * 180) / Math.PI;
  dist = dist * 60 * 1.1515;
  if (unit == "K") {
    dist = dist * 1.609344;
  }
  if (unit == "N") {
    dist = dist * 0.8684;
  }
  return dist;
};

export const getPricing = (duration, tripClass) => {
  if (!duration) return 0;
  if (!tripClass) tripClass = 1;
  return Math.max(Math.round(duration * 50), 500) * (0.5 + 0.5 * tripClass);
};

export const getOnlineDrivers = async (onTrip = false) => {
  const d = await getDocs(
    query(
      collection(db, "driver"),
      where("status", "==", true)
      // where("onTrip", "!=", true)
    )
  );

  const drivers = [];
  d.forEach((doc) => drivers.push(doc.data()));

  return onTrip
    ? drivers
        .filter((item) => Boolean(item.currentLocation?.latitude))
        .filter((item) => item.onTrip !== true)
    : drivers.filter((item) => Boolean(item.currentLocation?.latitude));
};

export const getClosestDrivers = (drivers, rootCoord) => {
  // console.log("online", drivers);
  const d = drivers
    .map((cur, i) => ({
      index: i,
      distance: getDistance(
        rootCoord.latitude,
        rootCoord.longitude,
        cur.currentLocation?.latitude,
        cur.currentLocation?.longitude,
        "K"
      ),
      driverID: cur?.profile?.driverID,
      fullName: cur?.fullName,
    }))
    .filter((cur) => cur.distance < 10000)
    .sort((a, b) => a.distance - b.distance);

  if (d.length === 0) return null;
  return d.map((cur) => drivers[cur.index]);
};

export const createTripRequest = async (id, data, orderId) => {
  try {
    // const res = (await client.post("user/trip/request/" + driver._id, data))
    //   .data.data;
    // console.log("trip ", res);
    const ref = doc(db, "trips", orderId);
    await setDoc(ref, data);
    await updateDoc(doc(db, "riders", id), { onTrip: true });
    return true;
  } catch (error) {
    console.log("Couldn't create trip request", errorMessage(error));

    return false;
  }
};
export const cancelTripRequest = async (id, data, orderId) => {
  try {
    // const res = (await client.post("user/trip/request/" + driver._id, data))
    //   .data.data;
    // console.log("trip ", res);
    const ref = doc(db, "trips", orderId);
    await deleteDoc(ref, data);
    await updateDoc(doc(db, "riders", id), {
      onTrip: false,
      acceptTrip: false,
    });

    return true;
  } catch (error) {
    console.log("Couldn't create trip request", errorMessage(error));

    return false;
  }
};

export const watchActiveTrip = async (dispatch, orderid) => {
  dispatch({
    type: "LOADING",
  });

  const docRef = doc(db, "trips", orderid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    // console.log("Document data:", docSnap.data());
    dispatch({
      type: "ACTIVE_TRIP",
      payload: docSnap.data(),
    });
  } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
    return dispatch({
      type: "LOADING",
      payload: null,
    });
  }
  // const unsub = onSnapshot(
  //   query(collection(db, "trips"), where("Document ID", "==", orderid)),
  //   (s) => {
  //     // dispatch(setTripLoading(false));

  //     if (s.empty)
  //       return dispatch({
  //         type: "LOADING",
  //         payload: null,
  //       });
  //     s.forEach((doc) => {
  //       dispatch({
  //         type: "ACTIVE_TRIP",
  //         payload: doc.data(),
  //       });
  //     });
  //   }
  // // );
  // return unsub;
};

export const riderEngine = async (onTrip = false) => {
  const d = await getDocs(
    query(
      collection(db, "riders"),
      where("status", "==", true)
      // where("onTrip", "!=", true)
    )
  );

  const riders = [];
  d.forEach((doc) => riders.push(doc.data()));

  return onTrip
    ? riders
        .filter((item) => Boolean(item.currentLocation?.latitude))
        .filter((item) => item.onTrip !== true)
    : riders;
};
// export const getOnlineDrivers = async (onTrip = false) => {
//   const d = await getDocs(
//     query(
//       collection(db, "driver"),
//       where("status", "==", true)
//       // where("onTrip", "!=", true)
//     )
//   );

//   const drivers = [];
//   d.forEach((doc) => drivers.push(doc.data()));

//   return onTrip
//     ? drivers
//         .filter((item) => Boolean(item.currentLocation?.latitude))
//         .filter((item) => item.onTrip !== true)
//     : drivers.filter((item) => Boolean(item.currentLocation?.latitude));
// };
//  const d = await getDocs(
//    query(
//      collection(db, "driver"),
//      where("status", "==", true)
//      // where("onTrip", "!=", true)
//    )
//  );

//  const riders: DriverProps[] = [];
//  d.forEach((doc) => riders.push(doc.data()));

//  return onTrip
//    ? riders
//        .filter((item) => Boolean(item.currentLocation?.latitude))
//        .filter((item) => item.onTrip !== true)
//    : riders.filter((item) => Boolean(item.currentLocation?.latitude));
