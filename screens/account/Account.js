import { useContext, useEffect, useState } from "react";
import { Alert, ScrollView, TouchableOpacity, View } from "react-native";
import {
  Avatar,
  Button,
  SafeAreaView,
  Spinner,
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
import {
  ADDRESSBOOK,
  CHANGEPASSWORD,
  GETHELP,
  LOGIN_SCREEN,
  MYDETAILS,
  MYORDERS,
  PAYMENTDETAILS,
  PROMOTION,
  REFERRAL,
  TABS_NAVIGATOR,
} from "../../src/navigation/routes";
import { signoutHandler } from "../../src/context/actions/authAction";
import { GLobalContext } from "../../src/context";

function Account({ navigation }) {
  const colors = useColors();
  const accountmenu = [
    {
      label: "My details",
      icon: (
        <FontAwesome5
          name="user-circle"
          size={24}
          color={colors.dark.main}
        />
      ),
      route: MYDETAILS,
    },
    {
      label: "My Orders",
      icon: (
        <Foundation
          name="book-bookmark"
          size={24}
          color={colors.dark.main}
        />
      ),
      route: MYORDERS,
    },
    {
      label: "Notifications",
      icon: (
        <Entypo name="notification" size={24} color={colors.dark.main} />
      ),
      route: TABS_NAVIGATOR,
    },
    {
      label: "Address book",
      icon: (
        <FontAwesome
          name="address-book"
          size={24}
          color={colors.dark.main}
        />
      ),
      route: ADDRESSBOOK,
    },
    {
      label: "Payment details",
      icon: (
        <Ionicons
          name="md-shield-checkmark-outline"
          size={24}
          color={colors.dark.main}
        />
      ),
      route: PAYMENTDETAILS,
    },
    {
      label: "Change password",
      icon: <AntDesign name="lock" size={24} color={colors.dark.main} />,
      route: CHANGEPASSWORD,
    },
  ];

  const { authDispatch ,authState:{data,loggedIn}} = useContext(GLobalContext);
  const [loading, setLoading] = useState(false);
  const HandleSignOut = async () => {
    setLoading(true);
    const res = await signoutHandler(authDispatch);
    setLoading(false);
  };
  const styles = ScaledSheet.create({
    root: {
      backgroundColor:"#000",
      flex:1
    },
    header: {
      backgroundColor: "#fff",
      minHeight: "100@vs",
      marginTop: "-3%",
  
      padding: "15@s",
      paddingTop: "36@vs",
      borderBottomLeftRadius: 30,
      borderBottomRightRadius: 30,
    },
    search:{   backgroundColor: "#fff",  marginTop: "-3%",
    padding: "15@s",
    paddingTop: "15@vs",
    borderBottomLeftRadius: 30,
      borderBottomRightRadius: 30,},
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
    outlined: {
      borderWidth: 1,
      padding: 8,
      borderRadius: 8,
      marginTop: 20,
    },
    body: {
      padding: "15@s",
      marginTop: "10@s",
    },
    container: {
      padding: "13@s",
      borderRadius: 10,
    },
    icon: {
      padding: 15,
      backgroundColor: colors.white[4],
      borderRadius: 100,
      width: 60,
      height: 60,
      justifyContent: "center",
      alignItems: "center",
    },
  });
  return (
    <View style={styles.root}>
      {loading && <Spinner fullscreen />}
    

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
              Account
            </Typography>
          }
content={
  <View style={{marginTop:16,marginBottom:3}}>
    <Row justifyContent={"space-between"}>
      <View>
<Typography fontWeight={600} gutterBottom={5} >Welcome</Typography>
<Typography  fontWeight={600}>{loggedIn?data?.name: "Enter Your Account"}</Typography>
      </View>
      {
        loggedIn?
        <Button title="Log Out" onPress={() => {
          Alert.alert(
            "Alert Title",
            "Are You Sure You Want To Log Out",
            [
              {
                text: "Proceed",
                onPress: () => HandleSignOut(),
              },
              {
                text: "Cancel",
                onPress: () => {},
                style: "cancel",
                
              },
            ]
          );
        }}  color="error" size="large" />
        :
      <Button title="Login/Sign Up" onPress={()=>{navigation.navigate(LOGIN_SCREEN)}}  size="large" />
      
      }
    </Row>
    </View>
}
        />
  
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            <View
              
            >
            
              <View >
                {accountmenu.map((cur, i) => (
                  <TouchableOpacity
                    onPress={() => {
                      if(loggedIn){
                        navigation.navigate(cur.route);
                      }
                      else{
                        navigation.navigate(LOGIN_SCREEN);

                      }
                  
                    }}
                    key={i}
                  >
                    <View style={{ paddingVertical: 12 }}>
                      <Row justifyContent="space-between">
                        <Row gap={13}>
                          {cur.icon}
                          <Typography>{cur.label}</Typography>
                        </Row>
                        <MaterialIcons
                          name="keyboard-arrow-right"
                          size={24}
                          color={colors.dark.main}
                        />
                      </Row>
                    </View>
                    <Divider style={{ height: 0.7 }} />
                  </TouchableOpacity>
                ))}
              </View>
            </View>
        
           
          </View>
        </ScrollView>

    </View>
  );
}

export default Account;
