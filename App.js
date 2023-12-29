import "react-native-gesture-handler";
import GlobalProvider from "./src/context";
import { UIThemeProvider } from "./src/Hoddy-ui";
import AppNavigator from "./src/navigation";
import Storage from "./components/Storage";
import { StatusBar } from "react-native";

const App = () => {
  // GoogleSignin.configure({
  //   webClientId:
  //     "160116712806-asnvq86v4uni1o30av00498q4o1m5ka5.apps.googleusercontent.comy",
  //   offlineAccess: false, // Set to true if you need offline access
  // });


  return (

    <GlobalProvider>

      <UIThemeProvider>
        <Storage />
        <AppNavigator />
      </UIThemeProvider>
    </GlobalProvider>
  );
};

export default App;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
