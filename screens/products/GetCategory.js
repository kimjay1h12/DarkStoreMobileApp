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
import { PRODUCT_DETAILS, VIEWPRODUCTS } from "../../src/navigation/routes";
import { GLobalContext } from "../../src/context";
function GetCategory({ navigation, route }) {
  const { data } = route.params;
  const colors = useColors();
  const { categoryState } = React.useContext(GLobalContext);
  const [products, setProducts] = React.useState([]);
  React.useEffect(() => {
    const res = groupArrayByProperty(data?.items, "category");
    setProducts(res);
  }, [data]);

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
              {data.title?.substring(0, 20)}
            </Typography>
          }
        />
        <Divider />
        <View style={{ paddingHorizontal: 15 }}>
          {products.map((cur, i) => (
            <View style={{ marginTop: 20 }} key={i}>
              <Row justifyContent="space-between">
                <Typography variant="h6" fontWeight={500} color="blue">
                  {
                    categoryState.data?.find((e) => e._id === cur.category)
                      ?.name
                  }
                </Typography>
                <Button
                  title="View all"
                  size="small"
                  color="secondary"
                  onPress={() => {
                    navigation.navigate(VIEWPRODUCTS, {
                      data2: {
                        title: categoryState.data?.find(
                          (e) => e._id === cur.category
                        )?.name,
                        items: cur?.items,
                      },
                    });
                  }}
                />
              </Row>
              <View style={{ marginTop: 30, marginBottom: 60 }}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {cur.items?.map((item, index) => (
                    <ItemCard
                      key={index}
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
                </ScrollView>
              </View>
            </View>
          ))}
        </View>
      </SafeAreaView>
    </View>
  );
}

export default GetCategory;
