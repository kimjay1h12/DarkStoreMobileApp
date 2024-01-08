import { MaterialIcons } from "@expo/vector-icons";
import { useHeaderHeight } from "@react-navigation/elements";
import React, { useContext, useEffect, useState } from "react";
import { Dimensions, TouchableOpacity, View } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import PasswordValidation from "../../components/custom/PasswordValidation";
import Row from "../../components/custom/Row";
import {
  Button,
  FormWrapper,
  Locator,
  SafeAreaView,
  TextField2,
  Typography,
  useColors,
} from "../../src/Hoddy-ui";
import { GLobalContext } from "../../src/context";
import { signupHandler } from "../../src/context/actions/authAction";
import { LOGIN_SCREEN, OTPSCREEN } from "../../src/navigation/routes";
import Header from "../../components/custom/Header";

function Signup({ navigation }) {
  const [passwordVisible, setPasswordVisible] = React.useState(false);

  const [steps, setSteps] = React.useState(1);
  const height = useHeaderHeight();
  const colors = useColors();
  const [loading, setLoading] = React.useState(false);
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
    name: "",

    phoneNumber: "",
    location: "",
  });
  const { authDispatch } = useContext(GLobalContext);
  const [visible, setVisible] = React.useState(false);
  const HandleSignUp = async () => {
    setLoading(true);
    const success = await signupHandler(formData, authDispatch);
    if (success) {
      navigation.navigate(OTPSCREEN)
    }
    setLoading(false);
  };

  const [passwordError, setPasswordError] = useState({});
  const validatePassword = (password) => {
    const errors = {};
    const minLength = 8;
    const capitalRegex = /.*[A-Z].*/;
    const lowercaseRegex = /.*[a-z].*/;
    const specialCharacterRegex = /.*[!@#$%^&*].*/;
    const numberRegex = /.*[0-9].*/;
    errors.lengthError = password.length >= minLength;
    errors.uppercaseError = capitalRegex.test(password);
    errors.lowercaseError = lowercaseRegex.test(password);
    errors.specialCharacterError = specialCharacterRegex.test(password);
    errors.numberRegex = numberRegex.test(password);
    return errors;
  };
  useEffect(() => {
    const error = validatePassword(formData.password);
    setPasswordError(error);
  }, [formData.password]);
  const styles = ScaledSheet.create({
    root: {
      flex: 1,
   
      backgroundColor: "#000",
    },
    welcomeimage: {
      height: "400@vs",
      resizeMode: "contain",
    },
    icon: {
      height: 35,
      width: 35,
      resizeMode: "contain",
    },
    
    step1: {
      flex: 1,
  
    },
    checkbox: {
      borderRadius: 10,
      height: "50@vs",
      padding: "10@vs",
      borderWidth: 0.7,
      width: "100%",
      flex: 0,
      alignItems: "center",
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: "20@s",
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
    container2: {
      padding: "20@s",
      marginTop: "6@s",
      flex: 0,
      alignItems: "center",
      flexDirection: "column",
    },
  
    step2: {
      flex: 1,
    },
  
    image: {
      width: "100%",
      height: "200@vs",
      resizeMode: "contain",
    },
    end: {
      marginTop: "20@s",
      textAlign: "center",
    },
    action: {
      marginTop:20
    },
    2: {
      marginTop: "50@vs",
    },
    textField: {
      width: "48%",
  
      color: "#fff",
    },
    header: {
      padding: "10@s",
      flex: 0,
      flexDirection: "row",
      justifyContent: "space-between", // This pushes the left object to the left and the centered object to the center
      alignItems: "center",
    },
    container: {
      marginTop: "50@vs",
    },
    checkboxLeft: {
      flex: 0,
      alignItems: "center",
      flexDirection: "row",
      gap: 10,
    },
    row: {
      flex: 0,
      alignItems: "center",
      flexDirection: "row",
      justifyContent: "space-between",
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
            Sign Up
            </Typography>
          }
          content={
            <View style={{marginTop:16,marginBottom:3}}>
              <Row justifyContent={"space-between"}>
                <View>
          <Typography fontWeight={600} gutterBottom={5} >Welcome</Typography>
          <Typography>Already have an account?</Typography>
                </View>
                <Button title="Login" onPress={()=>{navigation.navigate(LOGIN_SCREEN)}}  size="large" />
              </Row>
              </View>
          }
        />
              <View style={styles.content}>
            <FormWrapper behavior="height" keyboardVerticalOffset={-500}>
                <View>
                  <Typography  gutterBottom={10}>
                    Welcome to Store
                  </Typography>
                  <Typography
                    
                    gutterBottom={25}
                    fontWeight={700}
                    variant="h3"
                  >
                    Create a new account
                  </Typography>
                </View>
                <View>
                  <Row align="center" justifyContent={"space-between"}>
           
                    <TextField2
                    
                      style={styles.textField}
                      fullWidth
                      placeholder="Name"
                      value={formData.name}
                      onChangeText={(e) => {
                        setFormData({ ...formData, name: e });
                      }}
                      gutterBottom={15}
                      background
                    />
                 <TextField2
                      style={styles.textField}

                    placeholder="Phone Number"
                    gutterBottom={15}
                    background
                    // start={<Typography>+234</Typography>}
                    value={formData.phoneNumber}
                    onChangeText={(e) => {
                      setFormData({ ...formData, phoneNumber: e });
                    }}
                    type="number"
                  />
               
             </Row>
                  <Locator  background  gutterBottom={15} placeholder="Location"  onLocationSelected={(e)=>{setFormData({
                    ...formData,
                      location: e
  
                  })}}/>
              
                         <TextField2
                    placeholder="Email"
                    gutterBottom={15}
                    background
                    type="email"
                    value={formData.email}
                    onChangeText={(e) => {
                      setFormData({ ...formData, email: e });
                    }}
                  />
                  <TextField2
                    background
                    placeholder="Password"
                    type={passwordVisible ? "" : "password"}
                    value={formData.password}
                    onChangeText={(e) => {
                      setFormData({ ...formData, password: e });
                    }}
                    end={
                      <TouchableOpacity
                        onPress={() => {
                          setPasswordVisible(!passwordVisible);
                        }}
                      >
                        <MaterialIcons
                          name={
                            passwordVisible ? "visibility" : "visibility-off"
                          }
                          size={24}
                          color={"#000"}
                        />
                      </TouchableOpacity>
                    }
                  />
                  {formData.password != "" && (
                    <PasswordValidation passwordError={passwordError} />
                  )}
              
                  <View style={styles.action}>
                  {/* <Typography
                    variant="body2"
                    gutterBottom={20}
                    align="center"
                    style={{ color: "#fff",marginTop:20 }}
                  >
                    By continuing you agree to our Terms of Service and Privacy
                    Policy.
                  </Typography> */}
                    <Button
                      disabled={
                        formData.email === "" ||
                        formData.firstName === "" ||
                        formData.lastName === "" ||
                        formData.phoneNumber === "" ||
                        formData.password === ""
                      }
                      title="Sign up"
                   
                      fullWidth
                      loading={loading}
                      gutterBottom={1}
                      onPress={() => {
                        HandleSignUp();
                      }}
                    />
           
                  </View>
                 
                </View>
            </FormWrapper>
              </View>
    
      
  
    </View>
  );
}

export default Signup;
