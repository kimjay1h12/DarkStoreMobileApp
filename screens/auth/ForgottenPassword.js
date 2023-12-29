import React, { useState, useEffect } from "react";
import {
  Alert,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import Header from "../../components/custom/Header";
import {
  Button,
  FormWrapper,
  SafeAreaView,
  TextField2,
  Typography,
  useColors,
} from "../../src/Hoddy-ui";
import OTPTextInput from "react-native-otp-textinput";

import Divider from "../../components/custom/Divider";
import { MaterialIcons } from "@expo/vector-icons";
import { ScaledSheet } from "react-native-size-matters";
import Row from "../../components/custom/Row";
import { LOGIN_SCREEN } from "../../src/navigation/routes";
import {
  GetResetPasswordOtp,
  ResetPassword,
  verifyResetPasswodOTP,
} from "../../src/context/actions/authAction";

function ForgottenPassword({ navigation }) {
  const scrollViewRef = React.useRef(null);
  const [pages, setPages] = useState(0);

  const scrollToPage = (pageIndex) => {
    setPages(pageIndex);
    const { width } = Dimensions.get("screen");
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        x: pageIndex * width,
        animated: true,
      });
    }
  };
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [otpData, setOtpData] = React.useState({
    email: "",
    OTP: "",
  });
  const colors = useColors();
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [loading3, setLoading3] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const HandleResetOtp = async () => {
    setLoading1(true);
    const res = await GetResetPasswordOtp({
      email: formData.email,
    });
    if (res) {
      scrollToPage(1);
    }
    setLoading1(false);
  };
  useEffect(() => {
    setOtpData({ ...otpData, email: formData.email });
  }, [formData.email]);
  const HandleVerifyOtp = async () => {
    setLoading2(true);
    const res = await verifyResetPasswodOTP(otpData);
    if (res) {
      scrollToPage(2);
    }
    setLoading2(false);
  };
  const HandleResetPassword = async () => {
    setLoading3(true);
    const res = await ResetPassword(formData);
    if (res) {
      navigation.navigate(LOGIN_SCREEN);
    }
    setLoading3(false);
  };
  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView>
        <Header
          left={
            <TouchableOpacity
              onPress={() => {
                if (pages === 0) {
                  navigation.goBack();
                } else {
                  setPages(pages - 1);
                  scrollToPage(pages - 1);
                }
              }}
            >
              <MaterialIcons name="arrow-back" size={28} color="#000" />
            </TouchableOpacity>
          }
          center={
            <Typography variant="h6" fontWeight={600} align="center">
              OTP Verification
            </Typography>
          }
        />
        <Divider />
        <ScrollView
          scrollEnabled={false}
          disableScrollViewPanResponder
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          ref={scrollViewRef}
        >
          <View style={styles.root}>
            <FormWrapper>
              <Typography
                gutterBottom={10}
                variant="h4"
                color="primary"
                fontWeight={700}
              >
                Forgot your password?
              </Typography>
              <Typography variant="h6" gutterBottom={20}>
                Enter the email associated with your account and we’ll send you
                your reset code
              </Typography>
              <TextField2
                value={formData.email}
                onChangeText={(e) => {
                  setFormData({
                    ...formData,
                    email: e,
                  });
                }}
                placeholder="Email"
              />
            </FormWrapper>
            <View style={styles.bottom}>
              <Button
                fullWidth
                loading={loading1}
                title="Submit"
                onPress={() => {
                  HandleResetOtp();
                }}
              />
              <Row align="center" justifyContent={"center"} mt={10}>
                <Typography align="center">Remember your password?</Typography>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate(LOGIN_SCREEN);
                  }}
                >
                  <Typography color="blue"> Sign In</Typography>
                </TouchableOpacity>
              </Row>
            </View>
          </View>
          <View style={styles.root}>
            <FormWrapper>
              <Typography
                gutterBottom={10}
                variant="h4"
                color="primary"
                fontWeight={700}
              >
                Enter your 4-digit code
              </Typography>
              <Typography variant="h6" gutterBottom={50}>
                We sent a 6-digit code to your email
              </Typography>
              <View style={{ marginBottom: 40 }}>
                <OTPTextInput
                  offTintColor={colors.dark.main}
                  textInputStyle={{
                    color: colors.dark.main,
                  }}
                  handleTextChange={(e) => {
                    setOtpData({ ...otpData, OTP: +e });
                  }}
                  inputCount={6}
                  tintColor={colors.dark.main}
                />
              </View>
            </FormWrapper>
            <View style={styles.bottom}>
              <Row align="center" justifyContent={"center"} mb={15}>
                <TouchableOpacity
                  onPress={() => {
                    HandleResetOtp();
                  }}
                >
                  <Typography color="blue"> Resend Code</Typography>
                </TouchableOpacity>
              </Row>
              <Button
                loading={loading2}
                fullWidth
                title="Submit"
                onPress={() => {
                  HandleVerifyOtp();
                }}
              />
            </View>
          </View>
          <View style={styles.root}>
            <FormWrapper>
              <Typography
                gutterBottom={10}
                variant="h4"
                color="primary"
                fontWeight={700}
              >
                Reset your password
              </Typography>
              <Typography variant="h6" gutterBottom={20}>
                Almost done! Set your new password and you’re all ready to go.
              </Typography>
              <TextField2
                type="password"
                value={formData.password}
                placeholder="Password"
                onChangeText={(e) => {
                  setFormData({ ...formData, password: e });
                }}
              />
              <TextField2
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChangeText={(e) => {
                  setConfirmPassword(e);
                }}
              />
            </FormWrapper>
            <View style={styles.bottom}>
              <Button
                loading={loading3}
                fullWidth
                disabled={formData.password === "" || confirmPassword === ""}
                title="Change Password"
                onPress={() => {
                  if (formData.password != confirmPassword) {
                    Alert.alert(
                      "Password Mismatch",
                      "Your Confirm Password Must be the same as your password"
                    );
                  } else {
                    HandleResetPassword();
                  }
                }}
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
const styles = ScaledSheet.create({
  root: {
    width: Dimensions.get("screen").width,
    padding: 15,
  },
  bottom: {
    position: "absolute",
    bottom: 10,
    padding: 15,
    left: 0,
    right: 0,
  },
});
export default ForgottenPassword;
