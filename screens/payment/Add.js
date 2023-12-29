import React from "react";
import { Alert, Image, ScrollView, TouchableOpacity, View } from "react-native";
import {
  Avatar,
  Button,
  FormWrapper,
  SafeAreaView,
  TextField2,
  Typography,
  useColors,
} from "../../src/Hoddy-ui";

import Header from "../../components/custom/Header";

import Divider from "../../components/custom/Divider";
import { ScaledSheet } from "react-native-size-matters";
import Row from "../../components/custom/Row";
import {
  Entypo,
  Feather,
  Foundation,
  SimpleLineIcons,
  MaterialIcons,
  Ionicons,
  FontAwesome5,
  FontAwesome,
  AntDesign,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { ADDADDRESS } from "../../src/navigation/routes";
function AddPaymentdetails({ navigation }) {
  const colors = useColors();
  const [steps, setSteps] = React.useState(1);
  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
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
              Add a card
            </Typography>
          }
        />
        <Divider />
        <FormWrapper>
          <View style={styles.body}>
            <TextField2 label="Card name" placeholder="Kim jay" />
            <TextField2 label="Card Number" placeholder="0086 6556 4565 8756" />
            <TextField2 label="Expiration date" placeholder="Kim jay" />
            <TextField2 label="Cvv" placeholder="112" />
            <TextField2 label="Country" placeholder="Nigeria" />
            <Button
              start={
                <Entypo
                  name="plus"
                  size={24}
                  style={{ marginRight: 5 }}
                  color={colors.light.main}
                />
              }
              disabled
              style={{ marginTop: 20 }}
              title="Add a new Card"
              fullWidth
            />
          </View>
        </FormWrapper>
      </SafeAreaView>
    </View>
  );
}
const styles = ScaledSheet.create({
  root: {
    padding: "15@s",
  },
  body: {
    padding: "15@s",
  },
  action: {
    position: "absolute",
    width: "100%",
    bottom: 0,
    padding: 30,
  },
});
export default AddPaymentdetails;
