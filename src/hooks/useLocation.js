import React, { useState, useEffect, useContext } from "react";

import * as Location from "expo-location";
import { Alert } from "react-native";
import { doc, updateDoc } from "firebase/firestore";
// import { db } from "../../firebase";

import { GLobalContext } from "../context";

const useLocation = () => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const {
    authState: { data: userData },
  } = useContext(GLobalContext);

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      setError("Permission to access location was denied");
      return;
    }

    Location.watchPositionAsync(
      {
        accuracy: 3,
        distanceInterval: 0.5,
        timeInterval: 10000,
        mayShowUserSettingsDialog: true,
      },
      (loc) => {
        // if (userData)
        //   updateDoc(doc(db, "rider", userData.profile.riderID), {
        //     currentLocation: {
        //       longitude: loc.coords.longitude,
        //       latitude: loc.coords.latitude,
        //     },
        //   });
        setLocation({
          longitude: loc.coords.longitude,
          latitude: loc.coords.latitude,
          latitudeDelta: 0.009,
          longitudeDelta: 0.009,
        });
      }
    );
  };

  useEffect(() => {
    getLocation();
  }, []);

  return { location, error };
};

export default useLocation;
