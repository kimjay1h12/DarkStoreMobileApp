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
    <View style={{ flex: 1,backgroundColor:"#000" }}>

        
          <View style={{ flex: 1 }}>
            <Header
              left={
                <TouchableOpacity
                  style={styles.icon}
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
                  Change Address
                </Typography>
              }
            />
           
            <View style={styles.content}>
            
          
                <Typography gutterBottom={10} fontWeight={600} variant="h6" >Change Address</Typography>
             

              <Locator
              background
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
         
            
                    {address != null && (
          <View style={styles.action}>
            <Button
              title="Change address"
              loading={loading}
              onPress={() => {
                HandleAddressUpdate();
              }}
              fullWidth
            />
          </View>
        )}
        
          </View>
       


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
  content: {
    flex: 1,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: "#fff",
    marginTop: 10,
    paddingTop: 30,
    padding: "15@s",
    minHeight: "100%",
  },
  icon: {
    padding: 10,
    backgroundColor: "#e7e7e7",
    borderRadius: 100,
    paddingLeft: 15,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: "100@s",
    width: "100@s",
    resizeMode: "contain",
    marginBottom: 10,
  },
});
export default Add;
