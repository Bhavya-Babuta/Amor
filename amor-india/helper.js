import { Auth } from "aws-amplify";
import { PixelRatio, Platform, Dimensions } from "react-native";
const WIDTH = Dimensions.get("window").width;

export function normalize(size) {
  const scale = WIDTH / 300;
  const newSize = size * scale;
  if (Platform.OS === "ios") {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
}

export const getSearchString = (obj) => {
  const parts = [];

  Object.keys(obj).forEach(function nestedObject(element) {
    if (obj[element] === null) return;
    if (typeof obj[element] === "object") {
      let s = `${element}=`;
      Object.keys(obj[element]).forEach(function noObject(ele) {
        s += `${ele}:${obj[element][ele]};`;
      });
      parts.push(s);
    } else {
      parts.push(`${element}=${obj[element]}`);
    }
  });
  return parts.join("&");
};

export const decode = (queryString) => {
  const queryStringPieces = queryString
    .replace(/%20/, " ")
    .replace(/%20/, " ")
    .split("&");
  const decodedQueryString = {};
  queryStringPieces.forEach((piece) => {
    let [key, value] = piece.split("=");
    if (/^\d+$/.test(value)) {
      value = Number(value);
    } else if (value === "true" || value === "false") {
      value = value === "true";
    } else if (/^\d:\w+/.test(value)) {
      value = [value.split(":")[1].replace(";", "")];
    } else {
      value = value || "";
    }
    set(decodedQueryString, key, value);
  });
  return decodedQueryString;
};

export function onSuccess(cognitoUser) {
  //   if (cognitoUser.attributes) {
  //     const {
  //       attributes: { given_name, email }
  //     } = cognitoUser;
  //     given_name
  //       ? localStorage.setItem("name", given_name)
  //       : localStorage.setItem("name", email);
  //   }
  const { navigation } = this.props;
  navigation.navigate("Home");
}

export function onFailure(err) {
  //   this.setState({ error: err.message });
}

export async function isUserLoggedIn() {
  try {
    const user = await Auth.currentAuthenticatedUser();
    if (user) {
      const { navigation } = this.props;
      navigation.navigate("Home");
    }
  } catch (error) {
    console.log("Error: ", error);
  }
}
