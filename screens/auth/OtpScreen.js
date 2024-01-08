import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Image, TouchableOpacity, View, Keyboard } from "react-native";
import OTPTextInput from "react-native-otp-textinput";
import Divider from "../../components/custom/Divider";
import Header from "../../components/custom/Header";
import Row from "../../components/custom/Row";
import {
  Button,
  FormWrapper,
  SafeAreaView,
  Typography,
  useColors,
} from "../../src/Hoddy-ui";
import { ScaledSheet } from "react-native-size-matters";
import {
  resendOtpHandler,
  signoutHandler,
  verifyOTP,
} from "../../src/context/actions/authAction";
import { GLobalContext } from "../../src/context";
import { TABS_NAVIGATOR } from "../../src/navigation/routes";
function OtpScreen({navigation}) {
  const colors = useColors();
  const {
    authDispatch,
    authState: { data },
  } = React.useContext(GLobalContext);
  const [optloading, setOtpLoading] = React.useState(false);

  const [otpData, setOtpData] = React.useState({
    email: data?.email,
    OTP: "",
  });

  const VerifyOtp = async () => {
    setOtpLoading(true);
    const success = await verifyOTP(otpData.OTP, authDispatch);
    if (success){
      navigation.navigate(TABS_NAVIGATOR)
    }
    setOtpLoading(false);
  };

  const [resendOtp, setResendOtp] = React.useState({
    email: "",
  });
  React.useEffect(() => {
    setOtpData({ ...otpData, email: data?.email });
    setResendOtp({ ...resendOtp, email: data?.email });
  }, [data?.email]);
  React.useEffect(() => {
    const numberStr = otpData.OTP.toString();
    const length = numberStr.length;
    if (length === 4) {
      VerifyOtp();
      Keyboard.dismiss();
    }
  }, [otpData.OTP]);

  const ResendOtp = async () => {
    const res = await resendOtpHandler(resendOtp, authDispatch);
    if (res) {
      Alert.alert("OTP Resent");
    }
  };
  const styles = ScaledSheet.create({
    root: {
      flex: 1,
      backgroundColor: "#000",
    },
    image: {
      width: "100%",
      height: "200@vs",
      resizeMode: "contain",
    },
    container2: {
      paddingHorizontal: 15,
    },
    content: {
      flex: 1,
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      backgroundColor: colors.white[2],
      marginTop: 10,
      paddingTop:30,
      padding: "15@s",
      minHeight:"100%"
    },
    icon: {
      padding: 15,
      backgroundColor:colors.white[4],
      borderRadius: 100,
      width: 60,
      height: 60,
      justifyContent: "center",
      alignItems: "center",
    },
  });
  return (
    <View style={styles.root}>
   
      <Header
          left={
            <TouchableOpacity
              style={styles.icon}
              onPress={() => {
                navigation.goBack();
              }}
            >
              <MaterialIcons
              style={{marginLeft:5}}
                name="arrow-back-ios"
                size={24}
                color={colors.dark.main}
              />
            </TouchableOpacity>
          }
          center={
            <Typography variant="h5" fontWeight={600} align="center">
            Otp Verification
            </Typography>
          }
     
        />
        <View style={styles.content}>
          <FormWrapper behavior="height">
            <Image
              source={require("../../assets/img/otp.png")}
              style={styles.image}
            />
            <View>
              <Typography variant="h3" fontWeight={600} gutterBottom={5}>
                Enter your 4-digit code
              </Typography>
              <Typography gutterBottom={30}>
                We sent a 4-digit code to your Email
              </Typography>
            </View>
            <View style={{ marginBottom: 40 }}>
              <OTPTextInput
                offTintColor={colors.dark.main}
                autoFocus
                textInputStyle={{
                  color: colors.dark.main,
                }}
                handleTextChange={(e) => {
                  setOtpData({ ...otpData, OTP: +e });
                }}
                inputCount={4}
                tintColor={colors.dark.main}
              />
            </View>
            <Row mb={25} justifyContent={"center"}>
              <Typography align="center" color="grey">
                Didn’t get the code?
              </Typography>
              <Button
                onPress={() => {
                  ResendOtp();
                }}
                title="Resend code"
                variant="text"
              />
            </Row>
          
            
            <Button
              disabled={otpData.OTP === ""}
              loading={optloading}
              title="Submit"
              fullWidth
              onPress={() => {
                VerifyOtp();
              }}
            />
          </FormWrapper>
        </View>

    </View>
  );
}

export default OtpScreen;
