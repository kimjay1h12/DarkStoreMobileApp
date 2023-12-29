import React, { useEffect } from "react";
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

import { AntDesign, Entypo, MaterialIcons } from "@expo/vector-icons";
import { ScaledSheet } from "react-native-size-matters";
import Divider from "../../components/custom/Divider";
import Row from "../../components/custom/Row";
import { GLobalContext } from "../../src/context";
import { Alert } from "react-native";
import { updateUser } from "../../src/context/actions/authAction";
function Mydetails({ navigation }) {
  const colors = useColors();
  const {
    authState: { data },
    authDispatch,
  } = React.useContext(GLobalContext);

  const [edit, setEdit] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    interestedCategory: [],
  });
  useEffect(() => {
    setFormData({
      ...formData,
      email: data?.email,

      firstName: data?.firstName,
      lastName: data?.lastName,
      phoneNumber: data?.phoneNumber,
      interestedCategory: data?.interestedCategory,
    });
  }, [data]);
  const UpdateUser = async () => {
    setLoading(true);
    const success = await updateUser(formData, authDispatch);

    setLoading(false);
  };
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
              My details
            </Typography>
          }
        />
        <Divider />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.root}>
            <TouchableOpacity style={styles.header}>
              <View style={{ width: 120 }}>
                <Avatar
                  size={100}
                  style={{ borderRadius: 20 }}
                  source={require("../../assets/img/product1.png")}
                />
                <View
                  style={{
                    position: "absolute",
                    bottom: 2,
                    right: 0,
                    backgroundColor: "#fff",
                    borderRadius: 17,
                    padding: 5,
                  }}
                >
                  <Entypo name="edit" size={24} color="#000" />
                </View>
              </View>
            </TouchableOpacity>
            <View style={styles.container}>
              <Row justifyContent={"space-between"}>
                <TextField2
                  onFocus={() => {
                    setEdit(true);
                  }}
                  style={styles.textField}
                  value={formData.firstName}
                  onChangeText={(e) => {
                    setFormData({ ...formData, firstName: e });
                  }}
                  gutterBottom={20}
                  label="First Name"
                  end={
                    <TouchableOpacity>
                      <Entypo name="edit" size={24} color={colors.dark.main} />
                    </TouchableOpacity>
                  }
                />
                <TextField2
                  style={styles.textField}
                  value={formData.lastName}
                  onChangeText={(e) => {
                    setFormData({ ...formData, lastName: e });
                  }}
                  gutterBottom={20}
                  label="Last Name"
                  onFocus={() => {
                    setEdit(true);
                  }}
                  end={
                    <Entypo name="edit" size={24} color={colors.dark.main} />
                  }
                />
              </Row>
              <TextField2
                onFocus={() => {
                  setEdit(true);
                }}
                label="Email"
                value={formData.email}
                onChangeText={(e) => {
                  setFormData({ ...formData, email: e });
                }}
                end={<Entypo name="edit" size={24} color={colors.dark.main} />}
                gutterBottom={20}
              />
              <TextField2
                onFocus={() => {
                  setEdit(true);
                }}
                value={formData.phoneNumber}
                onChangeText={(e) => {
                  setFormData({ ...formData, phoneNumber: e });
                }}
                gutterBottom={20}
                label="Phone Number"
                end={<Entypo name="edit" size={24} color={colors.dark.main} />}
              />
              {formData.interestedCategory > 0 && (
                <View>
                  <Typography variant="h6" fontWeight={600}>
                    My Interest
                  </Typography>

                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={{ marginTop: 25 }}
                  >
                    {/* <TouchableOpacity style={styles.interest}>
                    <Row gap={10}>
                      <AntDesign
                        name="pluscircleo"
                        size={24}
                        color={colors.dark.main}
                      />
                      <Typography>Add Interest</Typography>
                    </Row>
                  </TouchableOpacity> */}

                    <>
                      {formData.interestedCategory?.map((cur) => (
                        <TouchableOpacity key={cur} style={styles.interest}>
                          <Row gap={10}>
                            <Image
                              source={require("../../assets/icons/icon1.png")}
                              style={styles.icon}
                            />
                            <Typography>Fit Farm</Typography>
                          </Row>
                        </TouchableOpacity>
                      ))}
                    </>
                  </ScrollView>
                </View>
              )}
              <View style={{ marginTop: 30 }}>
                <Button
                  loading={loading}
                  fullWidth
                  onPress={() => {
                    UpdateUser();
                  }}
                  title="Save Changes"
                  disabled={edit === false}
                />
              </View>
            </View>
          </View>
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
    marginTop: "30@s",
  },
  header: {
    flex: 0,
    alignItems: "center",
    marginTop: "25@s",
    textAlign: "center",
  },
  interest: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#CC5500",
    paddingHorizontal: 25,
    paddingVertical: 15,
    marginRight: 15,
    flex: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  textField: {
    width: "48%",

    color: "#fff",
  },
  icon: {
    height: 35,
    width: 35,
    resizeMode: "contain",
  },
});
export default Mydetails;
