import Expo, { SQLite } from 'expo';
import { Font } from 'expo';
import React, { Component } from "react";
import { TouchableBox, BoxSection } from '../../utils'
import ProductItem from './ProductItem';
import { Input } from 'react-native-elements';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modal'; // 2.4.0
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
  TouchableOpacity,
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

export default class ProductsList extends Component {

  constructor() {
    super();
    this.state = {
      visibleModal: null,
      cod : '',
      desc : '',
      descLong : '',
      valor: '',
      peso: '',
      saldo: '',
      row: [],
    };
  }

  _Modal = (text, onPress) => (
    <View style={styles.containerStyle}>
      <View style={styles.topicos}>
        <Text>
        <Text> {this.state.cod.trim()+': '} </Text>
        <Text style={{   fontWeight: 'bold'}} > {this.state.desc } </Text>
        </Text>
      </View>

      <View style={styles.line}></View>

      <View style={{marginTop:5}}>
        <Text>
            <Text>Desc. Longa :</Text>
            <Text style={{fontWeight: 'bold'}}>{' '+this.state.descLong }</Text>
          </Text>
        </View>

        <View style={{marginTop:15}}>
          <Text>
              <Text>Valor Venda :</Text>
              <Text style={{fontWeight: 'bold'}}>{' '+this.state.valor }</Text>
            </Text>
          </View>

          <View style={styles.topicos}>
            <Text>
                <Text>Peso Médio :</Text>
                <Text style={{fontWeight: 'bold'}}>{' '+this.state.peso }</Text>
              </Text>
            </View>

            <View style={styles.topicos}>
              <Text>
                  <Text>Saldo Est :</Text>
                  <Text style={{fontWeight: 'bold'}}>{' '+this.state.saldo }</Text>
                </Text>
              </View>

            <View style={{marginTop:15}}>
                <Text>
                    <Text style={{fontWeight: 'bold'}}>*Ultima Atualização em 17-05-2018 17:57</Text>
                  </Text>
                </View>

        <TouchableOpacity onPress={onPress}>
          <View style={styles.button}>
            <Text>{text}</Text>
          </View>
        </TouchableOpacity>
      </View>

    );

    _renderModalContent = () => (
      <View style={styles.modalContent}>
        <Text>Detalhamento do produto</Text>
        {this._Modal('Fechar', () => this.setState({ visibleModal: null }))}
      </View>
    );

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
        tx.executeSql('SELECT rowid as key, rowid,CDPRO,DEPRO,DEPROLONG,VLVENDA,VLVENDAMIN,VLPESOMED,VALOR,QTSALDO FROM produtos',[],(tx,results) => {
          var len = results.rows.length;
          console.log(len);
          if(len>0){
            var row = results.rows._array;
            dataSource = row;
            console.log(dataSource);
            this.setState({row});
          }
        });
      });
    }

    renderRow = (source) => {
      return <ProductItem
        id={source.item.rowid}
        produto={source.item.DEPRO}
        codPro={source.item.CDPRO}
        descLong={source.item.DEPROLONG}
        vlvenda={source.item.VLVENDA}
        peso={source.item.VLPESOMED}
        saldo={source.item.QTSALDO}

        onPress={() => {
          //Alert.alert('Dados enviados')
          this.setState({cod: source.item.CDPRO })
          this.setState({desc: source.item.DEPRO })
          this.setState({descLong: source.item.DEPROLONG })
          this.setState({valor: source.item.VLVENDA })
          this.setState({peso: source.item.VLPESOMED })
          this.setState({saldo: source.item.QTSALDO })
          this.setState({ visibleModal: 1 })}
        } />
    }

    /** seção de Busca*/

    buscarParse(busca) {
      var row = [];
      db.transaction((tx) =>{
        tx.executeSql('SELECT rowid as key,rowid,CDPRO,DEPRO,DEPROLONG,VLVENDA,VLVENDAMIN,VLPESOMED,VALOR,QTSALDO from produtos where DEPRO like "'+busca+'%"',[],(tx,results) => {
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

          <View>
            <Modal isVisible={this.state.visibleModal === 1}>
              {this._renderModalContent()}
            </Modal>
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
    },
    button: {
      backgroundColor: 'lightblue',
      padding: 12,
      margin: 16,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 4,
      borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    modalContent: {
      backgroundColor: 'white',
      padding: 22,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 4,
      borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    bottomModal: {
      justifyContent: 'flex-end',
      margin: 0,
    },
    topicos:{

    },
    containerStyle: {
      borderWidth: 1,
      borderRadius: 2,
      borderColor: '#ddd',
      borderBottomWidth: 0,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 1,
      marginLeft: 3,
      marginRight: 3,
      marginTop: 3,
      marginBottom: 3,
      padding: 10,
    },
    line: {
      borderWidth: 2,
      borderColor: '#999',
      borderBottomWidth: 0,
      marginTop: 7,
      marginBottom: 7,
      padding: 0,
    },
    bigblue: {
      color: 'blue',
      fontWeight: 'bold',
      fontSize: 30,
    }
  });

  export {exlist};
