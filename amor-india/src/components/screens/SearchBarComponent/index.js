import React, { Component } from "react";
import { SearchBar } from "react-native-elements";

class SearchBarComponent extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <SearchBar
        //   onChangeText={someMethod}
        //   onClearText={someMethod}

        containerStyle={[
          {
            width: "100%",
            backgroundColor: "#2a3c3c",
            alignSelf: "center"
          }
          // {
          //   backgroundColor: "white",
          //   borderWidth: 0.8,
          //   borderColor: "#CDCDCD",
          //   borderTopColor: "#CDCDCD",
          //   borderBottomColor: "#CDCDCD"
          // }
        ]}
        inputStyle={{
          backgroundColor: "#ffffff",
          borderWidth: 0,
          width: "100%"
        }}
        inputContainerStyle={{
          backgroundColor: "#ffffff",
          borderWidth: 0,
          borderRadius: 5
        }}
        placeholder="Search Amor"
        round={true}
        platform="default"
      />
    );
  }
}

export default SearchBarComponent;
