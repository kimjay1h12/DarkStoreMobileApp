import React from "react";
import { Image, ScrollView, TouchableOpacity, View } from "react-native";
import { SafeAreaView, Typography, useColors } from "../../src/Hoddy-ui";

import Header from "../../components/custom/Header";

import { MaterialIcons } from "@expo/vector-icons";
import { ScaledSheet } from "react-native-size-matters";
import Divider from "../../components/custom/Divider";
import { ORDERHELP } from "../../src/navigation/routes";
function Help({ navigation }) {
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
              Get Help
            </Typography>
          }
        />
        <Divider />
        <ScrollView style={styles.root} showsVerticalScrollIndicator={false}>
          <Typography
            align="center"
            variant="h6"
            fontWeight={600}
            gutterBottom={40}
            style={{ marginTop: 13 }}
          >
            What do you need help with?
          </Typography>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(ORDERHELP);
            }}
            style={[
              styles.container,
              {
                borderColor: colors.dark.main,
              },
            ]}
          >
            <Image
              source={require("../../assets/img/cart.png")}
              style={styles.image}
            />
            <Typography gutterBottom={20} variant="h6" fontWeight={600}>
              Help with an order
            </Typography>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.container,
              {
                borderColor: colors.dark.main,
              },
            ]}
          >
            <Image
              source={require("../../assets/img/option.png")}
              style={styles.image}
            />
            <Typography gutterBottom={20} variant="h6" fontWeight={600}>
              Other issues
            </Typography>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
const styles = ScaledSheet.create({
  root: {
    padding: "15@s",
  },
  container: {
    borderWidth: 1,
    padding: "10@s",
    borderRadius: 10,
    flex: 0,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 25,
  },
  image: {
    height: "100@s",
    width: "100@s",
    resizeMode: "contain",
  },
});
export default Help;
