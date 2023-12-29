import {
  AntDesign,
  Entypo,
  Feather,
  MaterialIcons,
  FontAwesome,
} from "@expo/vector-icons";
import axios from "axios";
import * as Linking from "expo-linking";
import { doc, onSnapshot } from "firebase/firestore";
import React, { useEffect } from "react";
import { TouchableOpacity, View } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import MapPreview from "../../components/MapPreview";
import Row from "../../components/custom/Row";
import { db } from "../../firebase";
import { Avatar, Typography, useColors } from "../../src/Hoddy-ui";
import { GLobalContext } from "../../src/context";
import useLocation from "../../src/hooks/useLocation";
function OrderTracking({ navigation, route }) {
  const { order } = route.params;
  const [origin, setOrigin] = React.useState(null);
  const [destination, setDestination] = React.useState(null);
  const { location } = useLocation();
  const colors = useColors();
  const [steps, setSteps] = React.useState(1);
  const {
    authState: { data },
    riderState: { activeTrip, active },
  } = React.useContext(GLobalContext);
  const riderId = activeTrip?.riderId;
  const [pickUp, setPickUp] = React.useState(null);
  const [dropOff, setDropOff] = React.useState();

  useEffect(() => {
    setDropOff({
      latitude: order?.data?.addressCoordinates?.coordinates[0],
      longitude: order?.data?.addressCoordinates?.coordinates[1],
    });
  }, [order]);
  console.log(activeTrip, "active");

  const [pickUpDescription, setPickUpDescription] = React.useState("");
  const data1 = {
    dropOff,
    order,
    pickUp: pickUp,
    businessId: data?._id,
    riderId: riderId,
    pickUpDescription: pickUpDescription,
  };
  const [loading, setLoading] = React.useState(false);
  const [cancelLoading, setCancelLoading] = React.useState(false);

  const [rider, setRider] = React.useState();
  useEffect(() => {
    const unsub = onSnapshot(doc(db, "riders/" + riderId), (s) => {
      setRider(s.data());
    });
    return () => unsub();
  }, [riderId]);

  // useEffect(() => {
  //   if (rider?.acceptTrip === false) {
  //     setTimeout(() => {
  //       CancelOrderTrip();
  //     }, 10000);
  //   } else {
  //   }
  // }, [steps === 2]);
  const riderStatus = rider?.acceptTrip;

  React.useEffect(() => {
    if (active && rider?.acceptTrip) {
      setOrigin(rider?.currentLocation);
    }
    setDestination(activeTrip?.pickUp);
  }, [active, rider?.acceptTrip, rider, rider?.currentLocation]);
  const [duration, setDuration] = React.useState("");
  const [distance, setDistance] = React.useState("");
  const getDirections = async (origin, destination) => {
    const matrix = (
      await axios.get(
        `https://ndali.app/api/calculateDistance?destination=${origin}&origin=${destination}`
      )
    )?.data;
    // console.log("m", matrix, destination, origin);
    const d = matrix.rows[0].elements[0];
    if (d.status === "OK") {
      d.distance.value = d.distance.value / 0.621371;
      setDistance(d.distance.text);
      setDuration(d.duration.text);
    } else {
    }
  };

  // const getDirections = async (origin, destination) => {
  //   try {
  //     const response = await axios.get(
  //       `https://maps.googleapis.com/maps/api/directions/json?origin=${destination}&destination=${origin}&key=${GOOGLE_API_KEY}`
  //     );

  //     if (response.data.status === "OK") {
  //       const route = response.data.routes[0];
  //       const legs = route.legs[0];

  //       const durationText = legs.duration.text;
  //       const distanceText = legs.distance.text;

  //       setDuration(durationText);
  //       setDistance(distanceText);
  //       console.log("ghjk", duration, distance);
  //     } else {
  //       // Handle error response here
  //       console.error("Error getting directions:", response.data.status);
  //     }
  //   } catch (error) {
  //     // Handle network or other errors here
  //     console.error("Error:", error);
  //   }
  // };

  useEffect(() => {
    if (rider?.arriveAtPickup) setDestination(activeTrip?.dropOff);
    setOrigin(rider?.currentLocation);
  }, [rider]);
  console.log();
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <MapPreview
          currentLocation={location}
          origin={origin}
          destination={destination}
        />
      </View>

      <View
        style={{
          position: "absolute",
          top: 50,
          left: 0,
          right: 0,
          padding: 15,
        }}
      >
        <Row justifyContent={"space-between"}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
            style={{ backgroundColor: "#fff", padding: 15, borderRadius: 30 }}
          >
            <AntDesign name="arrowleft" size={24} color="black" />
          </TouchableOpacity>
          <Avatar size={50} source={{ uri: data?.profileImage }} />
        </Row>
      </View>

      <View
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,

          backgroundColor: "#fff",
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
        }}
      >
        <View
          style={{
            padding: 20,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            backgroundColor: colors.primary.main,
          }}
        >
          <Row justifyContent={"space-between"}>
            <Row gap={10}>
              {rider?.data?.profileImage === "" ? (
                <Avatar size={60} />
              ) : (
                <Avatar size={60} source={{ uri: rider?.data?.profileImage }} />
              )}

              <View>
                <Typography
                  style={{ color: "#fff" }}
                  gutterBottom={2}
                  variant="h5"
                  fontWeight={600}
                >
                  {rider?.data?.firstName} {rider?.data?.lastName}
                </Typography>
                <Typography gutterBottom={3} style={{ color: "#fff" }}>
                  + {rider?.data?.addressInformation?.mainPhoneNumber}
                </Typography>
                <Typography style={{ color: "#fff" }}>
                  {rider?.data?.rating}{" "}
                  <Entypo name="star" size={24} color="#ffff" />
                </Typography>
              </View>
            </Row>
            <TouchableOpacity
              onPress={() => {
                Linking.openURL(
                  `tel:+${rider?.data?.addressInformation?.mainPhoneNumber}`
                );
              }}
            >
              <Feather name="phone-call" size={30} color={"#fff"} />
            </TouchableOpacity>
          </Row>
        </View>
        <View style={{ paddingHorizontal: 20, marginTop: 10 }}>
          <Typography
            gutterBottom={15}
            variant="h6"
            fontWeight={600}
            color="grey"
          >
            Package Status
          </Typography>
          <Row justifyContent={"space-between"} align="flex-start">
            <Row gap={10}>
              <TouchableOpacity
                style={{
                  borderRadius: 30,
                  padding: 10,
                  backgroundColor: "#461257",
                }}
              >
                <FontAwesome name="credit-card" size={24} color="#fff" />
              </TouchableOpacity>
              <View>
                <Typography variant="h6" fontWeight={600} color="grey">
                  Payment Method
                </Typography>
                <Typography variant="h6" fontWeight={600}>
                  Card
                </Typography>
              </View>
            </Row>
            <Typography>13 may 3:30PM</Typography>
          </Row>
          <View style={styles.divider} />
          <Row justifyContent={"space-between"} align="flex-start">
            <Row gap={10}>
              <TouchableOpacity
                style={{
                  borderRadius: 30,
                  padding: 10,
                  backgroundColor: "#461257",
                }}
              >
                <MaterialIcons name="delivery-dining" size={24} color="#fff" />
              </TouchableOpacity>
              <View>
                <Typography variant="h6" fontWeight={600} color="grey">
                  Picked Up
                </Typography>
                <Typography variant="h6" fontWeight={600}>
                  30 Minutes Ago
                </Typography>
              </View>
            </Row>
            <Typography>13 may 3:30PM</Typography>
          </Row>
          <View style={styles.divider} />
          <Row mb={30} justifyContent={"space-between"} align="flex-start">
            <Row gap={10}>
              <TouchableOpacity
                style={{
                  borderRadius: 30,
                  padding: 10,
                  backgroundColor: "#461257",
                }}
              >
                <Feather name="send" size={24} color="#fff" />
              </TouchableOpacity>
              <View>
                <Typography variant="h6" fontWeight={600} color="grey">
                  Delivery On
                </Typography>
                <Typography variant="h6" fontWeight={600}>
                  13, Majasan close
                </Typography>
              </View>
            </Row>
            <Typography>13 may 3:30PM</Typography>
          </Row>
        </View>
      </View>
    </View>
  );
}
const styles = ScaledSheet.create({
  locator: {
    paddingHorizontal: 15,
    backgroundColor: "#fff",
    borderRadius: "15@s",
  },
  loading: {
    minHeight: "90@s",
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: "15@s",
  },
  activedivider: {
    height: 40,
    width: 1,

    borderLeftWidth: 2,
    borderStyle: "solid",
    borderColor: "#461257",
    marginLeft: 22,
  },
  divider: {
    height: 40,
    width: 1,

    borderLeftWidth: 2,
    borderStyle: "solid",
    borderColor: "#aaa",
    marginLeft: 22,
  },
});
export default OrderTracking;
