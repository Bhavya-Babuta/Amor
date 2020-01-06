import { createSwitchNavigator, createAppContainer } from "react-navigation";
import AuthLoadingScreen from "./src/components/screens/AuthLoadingScreen";
import AuthStack from "./src/components/navigation/AuthStack";
import Amplify from "aws-amplify";
import config from "./amplify-configure";
import { Text } from "react-native";
import React from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import reducer from "./reducers";
import TabNav from "./src/components/navigation/TabNav";
import * as Font from "expo-font";

const store = createStore(reducer);
Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    region: config.cognito.REGION,
    userPoolId: config.cognito.USER_POOL_ID,
    userPoolWebClientId: config.cognito.APP_CLIENT_ID
  },
  API: {
    endpoints: [
      {
        name: "ecommerce-backend",
        endpoint: config.apiGateway.URL,
        region: config.apiGateway.REGION
      }
    ]
  }
});
let oldRender = Text.render;
Text.render = function(...args) {
  let origin = oldRender.call(this, ...args);
  return React.cloneElement(origin, {
    style: [
      { fontFamily: "AvenirNext-Medium", fontWeight: "300" },
      origin.props.style
    ]
  });
};

const app = createSwitchNavigator({
  AuthLoading: AuthLoadingScreen,
  AuthStack: AuthStack,
  App: TabNav
});

let Navigation = createAppContainer(app);

class App extends React.Component {
  constructor(props) {
    super(props);
    Font.loadAsync({
      "AvenirNext-Medium": require("./assets/fonts/AvenirNext-Medium.ttf")
    });
  }

  render() {
    return (
      <Provider store={store}>
        <Navigation />
      </Provider>
    );
  }
}

export default App;
