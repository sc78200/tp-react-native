import React from "react";
import {
  AsyncStorage,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  Animated,
  LayoutAnimation,
  NativeModules,
  TouchableOpacity,
  Button
} from "react-native";
import { render } from "react-dom";

const { UIManager } = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

export default class ListScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: true };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(item) {
    const stationName = item.fields.station_name;
    console.log("Nom : " + stationName);

    const stationState = item.fields.station_state;
    console.log("Etat de la station : " + stationState);

    const Position = item.fields.geo;
    console.log("Position  : " + Position);
  }

  componentDidMount() {
    return fetch(
      "https://raw.githubusercontent.com/tlenclos/fake-opendata-velib-server/master/db.json"
    )
      .then(response => response.json())
      .then(responseJson => {
        this.setState(
          {
            isLoading: false,
            dataSource: responseJson.records,
            dataS: responseJson
          },
          function() {}
        );
        const velib = JSON.stringify(responseJson);
        AsyncStorage.setItem("velibTab", velib);
        AsyncStorage.getItem("velibTab ", (err, result) => {
          // console.log(JSON.parse(result));
          // console.log(err);
        });
      })
      .catch(error => {
        // console.error(error);
        // console.log(error);
      });
  }

  listDetail = velib => {
    this.props.navigation.navigate("Detail", { velib: velib.fields });
    //console.log(velib);
  };

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 10 }}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <FlatList
          style={styles.list}
          data={this.state.dataSource}
          //renderItem={({item}) => <Text>{item.station_state}, {item.station_name}</Text>}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => this.listDetail(item)}>
              <Text style={styles.itemOfList}>
                {" "}
                {item.fields.station_name} - {item.fields.station_code}
              </Text>
            </TouchableOpacity>
          )}
          keyExtractor={({ id }, index) => id}
        />
      </View>
    );
  }
}

ListScreen.navigationOptions = {
  title: "Liste ",
  headerStyle: {
    backgroundColor: "white",
    fontSize: 1
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 4,
    justifyContent: "center",
    backgroundColor: "white"
  },
  list: {
    flex: 1,
    padding: 0,
    backgroundColor: "white",
    fontSize: 10
  },
  itemOfList: {
    color: "black",
    flex: 1,
    padding: 15,
    backgroundColor: "#7DC3FF",
    fontSize: 12,
    borderRadius: 80,
    marginBottom: 7,
    marginLeft: 0,
    overflow: "scroll",
    textAlign: "center"
  }
});
