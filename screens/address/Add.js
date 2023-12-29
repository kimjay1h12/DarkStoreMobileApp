import React from "react";
import { Alert, Image, TouchableOpacity, View } from "react-native";
import {
  FontAwesome,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import {
  Button,
  FormWrapper,
  Locator,
  SafeAreaView,
  TextField2,
  Typography,
  useColors,
} from "../../src/Hoddy-ui";
import Header from "../../components/custom/Header";

import Divider from "../../components/custom/Divider";
import { ScaledSheet } from "react-native-size-matters";
import client from "../../api/client";
import { TABS_NAVIGATOR } from "../../src/navigation/routes";
import { getCurrentUser } from "../../src/context/actions/authAction";
import { GLobalContext } from "../../src/context";
function Add({ navigation, route }) {
  const [formData, setFormData] = React.useState({
    address: {
      label: "home",
      description: "",
      addressCoordinates: [],
    },
  });

  const [address, setAddress] = React.useState(null);
  const colors = useColors();
  const [tips, setTips] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const { authDispatch } = React.useContext(GLobalContext);

  const HandleAddressUpdate = async () => {
    setLoading(true);
    try {
      const res = (await client.post("/customer/address", formData)).data;

      Alert.alert("Address Added Successfully");
      // if (ischeckout) {
      //   navigation.goBack();
      // } else {
      navigation.navigate(TABS_NAVIGATOR);
      // }
      getCurrentUser(authDispatch);
    } catch (error) {
      console.log("error add address ", error.response);
    }
    setLoading(false);
  };
  React.useEffect(() => {
    if (address != null)
      setFormData({
        ...formData,
        address: {
          ...formData.address,

          description: address?.description,
          addressCoordinates: [address?.latitude, address?.longitude],
        },
      });
  }, [address]);

  const Category = [
    {
      label: "Home",
      value: "home",
    },
    {
      label: "Work",
      value: "work",
    },
  ];
  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <FormWrapper behavior="height">
          <View style={{ flex: 1 }}>
            <Header
              left={
                <TouchableOpacity
                  style={{ width: "33.3%" }}
                  onPress={() => {
                    navigation.goBack();
                  }}
                >
                  <MaterialIcons
                    name="arrow-back-ios"
                    size={24}
                    color={colors.primary.main}
                  />
                </TouchableOpacity>
              }
              center={
                <Typography variant="h6" fontWeight={600} align="center">
                  Add a new Address
                </Typography>
              }
            />
            <Divider />
            <View style={{ padding: 15 }}>
              {address != null && (
                <Typography gutterBottom={10}>Account Information</Typography>
              )}

              <Locator
                variant="contained"
                onLocationSelected={(loc) => {
                  setAddress(loc);
                }}
                location={address}
                address
                placeholder="Add a new address"
                gutterBottom={20}
              />
            </View>
            {address === null ? (
              <View style={styles.container}>
                <Image
                  source={require("../../assets/img/search.png")}
                  style={styles.image}
                />
                <View>
                  <Typography
                    align="center"
                    variant="h6"
                    fontWeight={700}
                    gutterBottom={7}
                  >
                    Search for your address
                  </Typography>
                  <Typography align="center" color="grey">
                    Enter a building number and street name
                  </Typography>
                </View>
              </View>
            ) : (
              <View style={styles.form}>
                <TextField2
                  gutterBottom={20}
                  label="Additional information(optional)"
                  placeholder="FlatNumber"
                />
                <TextField2
                  label="Address Category"
                  value={formData.address.label}
                  options={Category}
                  onChangeText={(e) => {
                    setFormData({
                      ...formData,
                      address: { ...formData.address, label: e },
                    });
                  }}
                />
              </View>
            )}
          </View>
        </FormWrapper>
        {address != null && (
          <View style={styles.action}>
            <Button
              title="Save address"
              loading={loading}
              onPress={() => {
                HandleAddressUpdate();
              }}
              fullWidth
            />
          </View>
        )}
      </SafeAreaView>
    </View>
  );
}
const styles = ScaledSheet.create({
  container: {
    flex: 1,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "100@vs",
  },
  form: {
    paddingHorizontal: "14@s",
    marginTop: "-10@s",
  },
  action: {
    position: "absolute",
    bottom: 20,
    flex: 1,
    right: 0,
    left: 0,
    padding: "15@s",
  },
  image: {
    height: "100@s",
    width: "100@s",
    resizeMode: "contain",
    marginBottom: 10,
  },
});
export default Add;
