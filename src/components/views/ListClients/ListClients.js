import Expo, { SQLite } from 'expo';
import { Font } from 'expo';
import React, { Component } from "react";
import ClientItem from './ClientItem'
import { Input } from 'react-native-elements';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {
  Kaede,
  Hoshi,
  Jiro,
  Isao,
  Madoka,
  Akira,
  Hideo,
  Kohana,
  Makiko,
  Sae,
  Fumi,
} from 'react-native-textinput-effects';
import {
  TouchableHighlight,
  Text,
  View,
  AsyncStorage,
  StyleSheet,
  ScrollView,
  Alert,
  FlatList,
  TextInput,
} from "react-native";
import { Actions } from "react-native-router-flux";

var exlist = '';
dataSource = [];

const db = SQLite.openDatabase('db.db');

export default class Clientslist extends Component {

  async componentDidMount() {
     await Font.loadAsync({
       'Arial': require('./Arial.ttf')
     });
   }

  constructor() {
    super();
    this.state = {
    row: []
  };

  }

  componentDidMount() {
    this.parseData();
  }

  dados(i){
    exlist = {i}
    Actions.client();
  }

  parseData() {
    var row = [];
    db.transaction((tx) =>{
      tx.executeSql('SELECT CDCLIFOR AS key,CDCLIFOR,NMFANTASIA,NMCID FROM clientes',[],(tx,results) => {
        var len = results.rows.length;
        console.log(len);
        if(len>0){
          var row = results.rows._array;
          dataSource = row;
          //console.log(row);
          this.setState({row});
        }
      });
    });
  }

  renderRow = (source) => {
      return <ClientItem
        client={source.item.NMFANTASIA}
        codCli={source.item.CDCLIFOR}
        cidade={source.item.NMCID}
        onPress={() => this.dados(source.item.CDCLIFOR)} />
    }

/** seção de Busca*/

buscarParse(busca) {
  var row = [];
  db.transaction((tx) =>{
    tx.executeSql('SELECT CDCLIFOR AS key, CDCLIFOR,NMFANTASIA,NMCID FROM clientes where NMFANTASIA like "'+busca+'%"',[],(tx,results) => {
      var len = results.rows.length;
      console.log(busca);
      console.log(len);
      if(len>0){
        var row = results.rows._array;
        dataSource = row;
        //console.log(row);
        this.setState({row});
      }
    });
  });
}

render() {
  return (
    <View style={styles.container}>
      <View style={[styles.card1, { backgroundColor: '#F9F7F6' }]}>
        <Hoshi label={'Procurar'} borderColor={'#b76c94'} maskColor={'#F9F7F6'}
           onChangeText={(buscar) => this.buscarParse(buscar)} />
       </View>

       <FlatList
             data={dataSource}
             renderItem={this.renderRow}
       />
    </View>
  );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    marginTop: 10
  },
  button: {
    backgroundColor: "skyblue",
    paddingTop: 15,
    paddingBottom: 15,
    marginBottom: 5,
    marginTop: 15
  },
  card1: {
   paddingVertical: 3,
 },
 card2: {
   padding: 16,
 },
 input: {
   marginTop: 2,
 },
 title: {
   paddingBottom: 6,
   textAlign: 'center',
   color: '#404d5b',
   fontSize: 20,
   fontWeight: 'bold',
   opacity: 0.8,
 },
  textButton: {
    textAlign: "left",
    fontSize: 18,
    color: "white"
  },
  datalista: {
    marginBottom: 5,
    padding: 20,
    marginTop: 5,
    height: 150,
    borderRadius: 10,
    backgroundColor: "#888888",
  }
});

export {exlist};
