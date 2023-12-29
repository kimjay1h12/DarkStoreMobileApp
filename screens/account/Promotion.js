import React from "react";
import { Image, ScrollView, TouchableOpacity, View } from "react-native";
import {
  Avatar,
  Button,
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
function Promotion({ navigation }) {
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
              Promotion
            </Typography>
          }
        />
        <Divider />
        <View style={styles.root}>
          <Image
            source={require("../../assets/img/promotion.png")}
            style={styles.Image}
          />
          <Divider />
          <Typography variant="h5" gutterBottom={5} fontWeight={600}>
            No Promotion Yet
          </Typography>
          <Typography gutterBottom={25} align="center">
            If you’d like, we can send you an email on new and exciting
            promotions.
          </Typography>
          <View>
            <Button title="Email Me" style={{ paddingHorizontal: 70 }} />
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
export default Promotion;
