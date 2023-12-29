import React, { useContext } from "react";
import { Image, View, ScrollView ,StatusBar} from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import {
  Button,
  FormWrapper,
  Typography,
  UIThemeContext,
} from "../src/Hoddy-ui";
import { LOGIN_SCREEN, SIGNUP_SCREEN, TABS_NAVIGATOR } from "../src/navigation/routes";
import { Platform } from "react-native";
// import { StatusBar } from "expo-status-bar";
function Onboarding({ navigation }) {
  const [steps, setSteps] = React.useState(1);
  const { themeState, themeDispatch } = useContext(UIThemeContext);

  return (
    <View style={style.root}>
<StatusBar barStyle="light-content"/>
   
      <View style={style.step1}>
  
        <Image source={require("../assets/img/ob2.png")} style={style.image} />
        <View style={style.text}>
          <Typography
            variant="h3"
            gutterBottom={10}
            fontWeight={700}
            style={{ color: "#fff" }}
          >
 In The Dark We Find Light
          </Typography>
          <Typography  style={{ color: "#fff" }} gutterBottom={10} variant="h6">
          Experience the convenience of having your groceries and essential household items seamlessly delivered to your door, hassle-free. 
          </Typography>

         
        </View>
      </View>
      <View style={style.action}>
            <Button
              title="Get Started"
              color="secondary"
              fullWidth
              gutterBottom={16}
              onPress={() => navigation.navigate(TABS_NAVIGATOR)}
            />
            {/* <Button
              title="Login"
              variant="outlined"
              color="secondary"
              fullWidth
              onPress={() => navigation.navigate(LOGIN_SCREEN)}
            /> */}
          </View>
    </View>
  );
}
const style = ScaledSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#000",
  },
  step1: {flex:1},
  action: {
marginBottom:20,
padding:"10@s"
  },
  logo: {
    marginTop: "15@vs",
    marginLeft: "20@s",
    minHeight: "50@vs",
    width: "100@s",
    resizeMode: "contain",
  },
  image: {
    maxHeight: Platform.OS === "android" ? "330@vs" : "400@vs",
    width: "100%",
    resizeMode: "cover",
    marginTop: "-10@vs",
    marginBottom: 10,
  },
  text: {
    padding: "10@s",
    marginTop: "-15@s",
  
  },
});
export default Onboarding;
