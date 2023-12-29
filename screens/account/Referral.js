import React from "react";
import { Image, TouchableOpacity, View } from "react-native";
import {
  Button,
  SafeAreaView,
  Typography,
  useColors,
} from "../../src/Hoddy-ui";

import Header from "../../components/custom/Header";

import { Feather, FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { ScaledSheet } from "react-native-size-matters";
import Divider from "../../components/custom/Divider";
function Referral({ navigation }) {
  const colors = useColors();
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
              Referrals
            </Typography>
          }
        />
        <Divider />
        <View style={styles.root}>
          <Image
            source={require("../../assets/img/referral.png")}
            style={styles.Image}
          />
          <Divider />
          <Typography variant="h5" gutterBottom={10} fontWeight={600}>
            Invite a friend and earn
          </Typography>
          <Typography gutterBottom={25}>
            Invite your friends and earn ₦1,000 for every friend who makes their
            first order
          </Typography>
          <View>
            <Button
              title="Copy Link"
              style={{ paddingHorizontal: 70 }}
              variant="outlined"
              start={
                <FontAwesome5
                  name="copy"
                  size={20}
                  color={colors.dark.main}
                  style={{ marginRight: 10 }}
                />
              }
            />
            <Button
              start={
                <Feather
                  name="share-2"
                  size={20}
                  color={colors.light.main}
                  style={{ marginRight: 10 }}
                />
              }
              title="Copy Link"
              style={{ paddingHorizontal: 75, marginTop: 15 }}
            />
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}
const styles = ScaledSheet.create({
  root: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: "40@s",
  },
  Image: {
    width: "200@s",
    height: "200@s",
    resizeMode: "contain",
  },
});
export default Referral;
