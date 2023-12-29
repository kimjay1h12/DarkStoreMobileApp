import React, { useContext } from "react";
import { ScaledSheet } from "react-native-size-matters";
import { Button, Typography, useColors } from "../../src/Hoddy-ui";
// import { TouchableOpacity } from "react-native-gesture-handler";
import {
  Perferences,
  signoutHandler,
} from "../../src/context/actions/authAction";
import { View, TouchableOpacity, Image } from "react-native";
import CheckBox from "../../src/Hoddy-ui/Components/Checkbox";
import { GLobalContext } from "../../src/context";
const peference = [
  {
    label: "Fit Fam",
    value: "fit_fam",
    url: require("../../assets/icons/icon1.png"),
  },
  {
    label: "Good Vibes",
    value: "good_vibes",
    url: require("../../assets/icons/icon2.png"),
  },
  {
    label: "Africana",
    value: "african",
    url: require("../../assets/icons/icon3.png"),
  },
  {
    label: "Foodie",
    value: "foodie",
    url: require("../../assets/icons/icon4.png"),
  },
];

function Preferences() {
  const colors = useColors();
  const { authDispatch } = useContext(GLobalContext);
  const [steps, setSteps] = React.useState(1);
  const [category, setCategory] = React.useState({
    interestedCategory: [],
  });
  const [categoryLoading, setCategoryLoading] = React.useState(false);
  const HandlePerferences = async () => {
    setCategoryLoading(true);
    const success = await Perferences(category, authDispatch);
    if (success) setSteps(4);
    setCategoryLoading(false);
  };
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.main}>
        <View>
          <Typography
            gutterBottom={20}
            align="center"
            variant="h3"
            fontWeight={700}
          >
            What are you interested in?
          </Typography>
          <Typography align="center" gutterBottom={30}>
            You can select more than one
          </Typography>
          <View>
            {peference.map((cur, i) => (
              <TouchableOpacity
                onPress={() => {
                  const r = [...category.interestedCategory];
                  const i = category.interestedCategory.findIndex(
                    (item) => item === cur.value
                  );
                  if (i > -1) {
                    r.splice(i, 1);
                    setCategory({ ...category, interestedCategory: r });
                  } else {
                    const b = r.push(cur.value);
                    setCategory({ ...category, interestedCategory: r });
                  }
                }}
                key={i}
                style={[styles.checkbox, { borderColor: colors.dark.main }]}
              >
                <View style={styles.checkboxLeft}>
                  <Image style={styles.icon} source={cur.url} />
                  <Typography>{cur.label}</Typography>
                </View>
                <CheckBox
                  setChecked={(e) => {
                    const r = [...category.interestedCategory];
                    const i = category.interestedCategory.findIndex(
                      (item) => item === cur.value
                    );
                    if (i > -1) {
                      r.splice(i, 1);
                      setCategory({ ...category, interestedCategory: r });
                    } else {
                      const b = r.push(cur.value);
                      setCategory({ ...category, interestedCategory: r });
                    }
                  }}
                  checked={category.interestedCategory.find(
                    (item) => item === cur.value
                  )}
                />
              </TouchableOpacity>
            ))}
          </View>
          <View style={{ marginTop: 20 }}>
            <TouchableOpacity
              onPress={() => {
                signoutHandler(authDispatch);
              }}
            >
              <Typography
                gutterBottom={10}
                align="center"
                variant="h6"
                fontWeight={600}
                color="primary"
              >
                Log Out
              </Typography>
            </TouchableOpacity>
            <Button
              disabled={category.interestedCategory.length === 0}
              title="Let’s go shopping"
              fullWidth
              loading={categoryLoading}
              onPress={() => {
                HandlePerferences();
              }}
            />
          </View>
        </View>
      </View>
    </View>
  );
}
const styles = ScaledSheet.create({
  root: {
    flex: 1,
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
  main: {
    flex: 1,
    flexDirection: "column",

    justifyContent: "center",
    gap: "20@vs",
    padding: "20@s",
    textAlign: "center",
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
    marginTop: "40@s",
    textAlign: "center",
  },
  action: {},
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
export default Preferences;
