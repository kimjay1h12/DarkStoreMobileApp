import React from "react";
import { TouchableOpacity, View } from "react-native";
import {
  Button,
  FormWrapper,
  SafeAreaView,
  TextField2,
  Typography,
  useColors,
} from "../../src/Hoddy-ui";
import { ScaledSheet } from "react-native-size-matters";
import { MaterialIcons } from "@expo/vector-icons";
import {
  FORGOTTENPASSWORD,
  SIGNUP_SCREEN,
  TABS_NAVIGATOR,
} from "../../src/navigation/routes";
import { GLobalContext } from "../../src/context";
import { signInHandler } from "../../src/context/actions/authAction";
import Row from "../../components/custom/Row";
import Header from "../../components/custom/Header";

// import * as Google from "expo-google-app-auth";

function Login({ navigation }) {
  const [passwordVisible, setPasswordVisible] = React.useState(false);

  const [loading, setLoading] = React.useState(false);
  const { authDispatch } = React.useContext(GLobalContext);
  const colors = useColors();
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });
  const HandleSignIn = async () => {
    setLoading(true);
    const success = await signInHandler(formData, authDispatch);
    if(success)
    {
   navigation.navigate(TABS_NAVIGATOR)
    }
    setLoading(false);
  };
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
                color={colors.primary.main}
              />
            </TouchableOpacity>
          }
          center={
            <Typography variant="h5" fontWeight={600} align="center">
            Login
            </Typography>
          }
          content={
            <View style={{marginTop:16,marginBottom:3}}>
              <Row justifyContent={"space-between"}>
                <View>
          <Typography fontWeight={600} gutterBottom={5} >Welcome</Typography>
          <Typography> Dont have an account?</Typography>
                </View>
                <Button title="Sign Up" onPress={()=>{navigation.navigate(SIGNUP_SCREEN)}}  size="large" />
              </Row>
              </View>
          }
        />
          <View style={styles.content}>
        <FormWrapper behavior="height"  >
        <View>
              <Typography  gutterBottom={10}>
                Welcome back
              </Typography>
              <Typography
                
                gutterBottom={25}
                fontWeight={700}
                variant="h3"
              >
                Login to your account
              </Typography>
            </View>
            <View>
              <TextField2
                type="email"
                placeholder="Email"
                value={formData.email}
                onChangeText={(e) => {
                  setFormData({ ...formData, email: e });
                }}
                gutterBottom={20}
                background
              />

              <TextField2
                value={formData.password}
                onChangeText={(e) => {
                  setFormData({ ...formData, password: e });
                }}
                background
                type={passwordVisible ? "" : "password"}
                placeholder="Password"
                end={
                  <TouchableOpacity
                    onPress={() => {
                      setPasswordVisible(!passwordVisible);
                    }}
                  >
                    <MaterialIcons
                      name={passwordVisible ? "visibility" : "visibility-off"}
                      size={24}
                      color={"#000"}
                    />
                  </TouchableOpacity>
                }
              />
           
            
            </View>
            <View>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate(FORGOTTENPASSWORD);
                }}
              >
                <Typography

                  variant="body2"
                  gutterBottom={20}
             
                  style={{ color: "red" }}
                >
                  Forgotten Password
                </Typography>
              </TouchableOpacity>
              <View style={styles.action}>
                <Button
                  loading={loading}
                  title="Login"
                 
                  fullWidth
                  gutterBottom={25}
                  onPress={() => {
                    HandleSignIn();
                  }}
                />
              </View>
              </View>
              <View style={styles.end}>
                <Row gap={5} justifyContent={"center"}>
                  <Typography align="center">
                    Dont have an account?
                  </Typography>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate(SIGNUP_SCREEN);
                    }}
                  >
                    <Typography style={{ color: "red" }}>Sign up</Typography>
                  </TouchableOpacity>
                </Row>
              </View>
        </FormWrapper>
        
     
          </View>
       
     
    </View>
  );
}
const styles = ScaledSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#000",
  },

 

  textField: {
    width: "48%",

    color: "#fff",
  },

  container: {
    marginTop: "50@vs",
  },
  end: {

// position:"absolute",
// bottom:0,
// width:"100%",
// height:"100%",
// alignItems:"center",
// justifyContent:"center",
// color:"#000"
  },
  content: {
    flex: 1,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: "#fff",
    marginTop: 10,
    paddingTop:30,
    padding: "15@s",
    minHeight:"100%"
  },
  icon: {
    padding: 15,
    backgroundColor: "#e7e7e7",
    borderRadius: 100,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  row: {
    flex: 0,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
export default Login;
