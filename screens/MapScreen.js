import React, { Component, useContext } from "react";
import { Platform, Text, View, StyleSheet } from "react-native";
import Constants from "expo-constants";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";

export default class MapScreen extends React.Component {
  state = {
    location: {
      latitude: 48.8534,
      longitude: 2.3488
    },
    errorMessage: null
  };

  componentWillMount() {
    if (Platform.OS === "android" && !Constants.isDevice) {
      this.setState({
        errorMessage:
          "Oops, this will not work on Sketch in an Android emulator. Try it on your device!"
      });
    } else {
      this._getLocationAsync();
    }
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      this.setState({
        errorMessage: "Permission to access location was denied"
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location: location.coords });
  };

  render() {
    let position = this.state.location;

    console.log(position);
    let text = "";
    let latitude;
    let longitude;

    if (this.state.errorMessage) {
      text = this.state.errorMessage;
    } else if (position) {
      latitude = position.latitude;
      longitude = position.longitude;
    }

    return (
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        region={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.009,
          longitudeDelta: 0.009
        }}
      >
        {<MapView.Marker coordinate={position} />}
        <View
          style={styles.container}
          style={{ position: "absolute", top: 100, left: 50 }}
        >
          <Text>{text}</Text>
        </View>
      </MapView>
    );
  }
}
MapScreen.navigationOptions = {
  title: "Géolocalisation"
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#fff"
  },
  map: {
    flex: 1,
    width: 360,
    maxHeight: 300,
    flexDirection: "column",
    backgroundColor: "transparent",
    justifyContent: "flex-start"
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    textAlign: "center"
  }
});
