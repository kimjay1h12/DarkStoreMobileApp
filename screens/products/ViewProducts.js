import React from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import {
  Button,
  SafeAreaView,
  Typography,
  useColors,
} from "../../src/Hoddy-ui";
import Header from "../../components/custom/Header";
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
import Divider from "../../components/custom/Divider";
import { groupArrayByProperty } from "../../utility";
import ItemCard from "../../components/products/ItemCard";
import Row from "../../components/custom/Row";
import { PRODUCT_DETAILS } from "../../src/navigation/routes";
function ViewProducts({ navigation, route }) {
  const { data2 } = route.params;
  const colors = useColors();
  console.log("data2", data2);
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
              {data2.name?.substring(0, 20)}
            </Typography>
          }
        />
        <Divider />
        <View style={{ paddingHorizontal: 15 }}>
          <View style={{ marginTop: 20 }}>
            <View style={{ marginTop: 20, marginBottom: 60, flexWrap: "wrap" }}>
              {data2.items.map((item, i) => (
                <ItemCard
                  key={i}
                  url={item.image}
                  name={item.name}
                  price={item.price}
                  id={item._id}
                  onPress={() => {
                    navigation.navigate(PRODUCT_DETAILS, {
                      productId: item._id,
                    });
                  }}
                />
              ))}
            </View>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

export default ViewProducts;
