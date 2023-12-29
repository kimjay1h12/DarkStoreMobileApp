import React from "react";
import { TouchableOpacity, View } from "react-native";
import {
  Button,
  SafeAreaView,
  TextField2,
  Typography,
  useColors,
} from "../../src/Hoddy-ui";

import Header from "../../components/custom/Header";

import { Feather, MaterialIcons } from "@expo/vector-icons";
import { ScaledSheet } from "react-native-size-matters";
import Divider from "../../components/custom/Divider";
function Changepassword({ navigation }) {
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
              Change Password
            </Typography>
          }
        />
        <Divider />
        <View style={styles.root}>
          <TextField2 label="Old Password" placeholder="kim jay112" />
          <TextField2
            label="New Password"
            placeholder="kim jay112"
            end={<Feather name="eye-off" size={24} color={colors.dark.main} />}
          />
          <TextField2
            label="Confirm Password"
            placeholder="kim jay112"
            end={<Feather name="eye-off" size={24} color={colors.dark.main} />}
          />
        </View>
      </SafeAreaView>
      <View style={styles.action}>
        <Button title="Change Password" fullWidth disabled />
      </View>
    </View>
  );
}

const styles = ScaledSheet.create({
  root: {
    padding: "15@s",
  },
  action: {
    position: "absolute",
    bottom: 0,
    padding: "30@s",
    width: "100%",
  },
});
export default Changepassword;
