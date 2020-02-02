import React from "react";
import { View, StyleSheet, Text } from "react-native";
import MapView from "react-native-maps";
/* import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col,
  Cols,
  Cell
} from "react-native-table-component"; */

export default class DetailScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const retrieve = this.props;
    const velibInfo = retrieve.navigation.state.params.velib;

    const stationCode = velibInfo.station_code;
    const stationName = velibInfo.station_name;
    const creditCard = velibInfo.creditcard;

    const paris = {
      latitude: velibInfo.geo[0],
      longitude: velibInfo.geo[1]
    };
    /* 
    console.log(stationCode);
    console.log(velibInfo);
    console.log(stationName); */

    return (
      <View style={styles.container}>
        {
          <MapView
            style={styles.map}
            region={{
              latitude: paris.latitude,
              longitude: paris.longitude,
              latitudeDelta: 0.009,
              longitudeDelta: 0.005
            }}
          >
            <MapView.Marker coordinate={paris} />
          </MapView>
        }

        <Text style={styles.txt}>Name : {velibInfo.station_name}</Text>
        <Text style={styles.txt}>Code : {velibInfo.station_code}</Text>
        <Text style={styles.txt}>Credit card : {velibInfo.creditcard}</Text>
      </View>
    );
  }
}

DetailScreen.navigationOptions = {
  title: "Détails"
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    textAlign: "center"
  },

  map: {
    flex: 1,
    width: 360,
    maxHeight: 300,
    flexDirection: "column",
    backgroundColor: "transparent",
    justifyContent: "flex-start"
  },

  txt: {
    textAlign: "center",
    marginTop: 10
  }
});
