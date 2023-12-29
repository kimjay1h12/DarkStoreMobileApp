import React, { useEffect, useRef, useState } from "react";
import { Image, StyleSheet, View } from "react-native";

import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import mapStyles from "./mapStyles.json";

// Styles, colors

import { ScaledSheet } from "react-native-size-matters";
import { GOOGLE_API_KEY } from "../../api/config";
import { useColors, useTheme } from "../../src/Hoddy-ui";

const MapPreview = ({
  destination,
  origin,
  currentLocation,
  onDirectionReady,
}) => {
  const theme = useTheme();
  const colors = useColors();
  const mapRef = useRef(null);
  const [preview, setPreview] = useState();
  const [fitted, setFitted] = useState(false);
  const [angle, setAngle] = useState(0);

  const fitTopMap = async () => {
    if (origin && destination && mapRef?.current && !fitted) {
      // console.log("Fitting");

      await mapRef.current.fitToSuppliedMarkers(["origin", "destination"], {
        animated: true,
        edgePadding: {
          right: 70,
          bottom: 150,
          left: 70,
          top: 150,
        },
      });
      setFitted(true);
    }
  };

  useEffect(() => {
    fitTopMap();
  }, [origin, destination, mapRef.current, fitted]);

  const styles = ScaledSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      zIndex: 0,
    },
    map: {
      height: "100%",
      width: "100%",
    },
    origin: {
      width: 50,
    },
    user: {},
  });

  const calculateCarAngle = (coords) => {
    const startLat = coords[0].latitude;
    const startLng = coords[0].longitude;
    const endLat = coords[1].latitude;
    const endLng = coords[1].longitude;
    const dy = startLng - endLng;
    const dx = startLat - endLat;
    return (Math.atan2(dy, dx) * 180) / Math.PI + 90;
  };
  // return <></>;
  return (
    <View style={styles.container}>
      <MapView
        initialRegion={currentLocation}
        followsUserLocation={true}
        provider={PROVIDER_GOOGLE}
        showsBuildings={true}
        showsIndoorLevelPicker={true}
        ref={mapRef}
        showsIndoors={true}
        showsScale={true}
        showsMyLocationButton={false}
        customMapStyle={mapStyles[theme]}
        // onRegionChangeComplete={(r) => "changed", console.log(r)}
        zoomEnabled
        style={styles.map}
      >
        {origin && (
          <Marker
            coordinate={origin}
            identifier="origin"
            anchor={{
              x: 0.5,
              y: 0.5,
            }}
            // rotation={angle}
          >
            {/* <Ionicons name="location" size={24} /> */}
            <Image
              style={{ height: 60, width: 60 }}
              resizeMode="contain"
              source={require("../../assets/rider.png")}
            />
          </Marker>
        )}
        {destination && (
          <Marker coordinate={destination} identifier="destination">
            {/* <DestinationSvg /> */}
          </Marker>
        )}
        {destination && (
          <MapViewDirections
            origin={origin}
            destination={destination}
            apikey={GOOGLE_API_KEY}
            strokeColor={colors.primary.main}
            strokeWidth={5}
            mode="DRIVING"
            resetOnChange={false}
            // waypoints={[origin]}
            optimizeWaypoints={true}
            onReady={(result) => {
              // console.log("Recalculated", formatDuration(result.duration));
              if (result.coordinates.length > 1) {
                setAngle(calculateCarAngle(result.coordinates));

                // console.log("Angle", angle);
              }
              if (onDirectionReady)
                onDirectionReady({
                  duration: result.duration,
                  distance: result.distance,
                  start_address: result.legs[0].start_address,
                });
            }}
          />
        )}
      </MapView>
    </View>
  );
};

export default MapPreview;
