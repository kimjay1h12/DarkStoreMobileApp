import React, { useContext } from "react";
import { Alert, Image, ScrollView, TouchableOpacity, View } from "react-native";
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
import { ADDADDRESS } from "../../src/navigation/routes";
import { GLobalContext } from "../../src/context";
function Addressbook({ navigation }) {
  const colors = useColors();
  const [steps, setSteps] = React.useState(1);
  const {
    authState: { data },
  } = useContext(GLobalContext);

  return (
    <View style={{ flex: 1 ,backgroundColor:"#000"}}>
   
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
              Address book
            </Typography>
          }
        />
        <Divider />
        {data?.address?.length > 0 ? (
          <ScrollView style={styles.root} showsVerticalScrollIndicator={false}>
            {data?.address?.map((cur, i) => (
              <TouchableOpacity
                key={i}
                style={[styles.address, { backgroundColor: colors.light.main }]}
              >
                <Row justifyContent={"space-between"}>
                  <View>
                    <Typography
                      variant="h6"
                      fontWeight={600}
                      gutterBottom={15}
                      color="grey"
                    >
                      {cur.label}
                    </Typography>
                    <Typography gutterBottom={20}>{cur.description}</Typography>
                    {/* <Button title="Edit" size="small" /> */}
                  </View>
                  <TouchableOpacity>
                    <MaterialIcons
                      name="delete-outline"
                      size={24}
                      color="red"
                    />
                  </TouchableOpacity>
                </Row>
              </TouchableOpacity>
            ))}
          </ScrollView>
        ) : (
          <View style={styles.empty}>
            <Image
              source={require("../../assets/img/addressbook.png")}
              style={styles.Image}
            />
            <Typography gutterBottom={20} variant="h5" fontWeight={600}>
              You have no saved address
            </Typography>
            <Button
              start={
                <Entypo
                  name="plus"
                  size={24}
                  style={{ marginRight: 5 }}
                  color={colors.light.main}
                />
              }
              title="Add a new address"
              fullWidth
            />
          </View>
        )}
 
      {data?.address?.length > 0 && (
        <View style={styles.action}>
          <Button
            start={
              <Entypo
                name="plus"
                size={24}
                style={{ marginRight: 5 }}
                color={colors.light.main}
              />
            }
            onPress={() => {
              navigation.navigate(ADDADDRESS);
            }}
            title="Add a new address"
            fullWidth
          />
        </View>
      )}
    </View>
  );
}
const styles = ScaledSheet.create({
  root: {
    padding: "15@s",
  },
  empty: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: "30@s",
  },
  Image: {
    width: "200@s",
    height: "200@s",
    resizeMode: "contain",
    marginBottom: 10,
  },
  address: {
    padding: "15@s",
    marginBottom: 20,
    borderRadius: 10,
  },
  action: {
    position: "absolute",
    width: "100%",
    bottom: 0,
    padding: 30,
  },
});
export default Addressbook;
