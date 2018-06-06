import {SQLite} from 'expo';
import React, {Component} from "react";
import {Input} from 'react-native-elements';
import Modal from 'react-native-modal'; // 2.4.0
import {Hoshi,} from 'react-native-textinput-effects';
import {FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert} from "react-native";
import {Actions} from "react-native-router-flux";
import { numberToReal } from '../../../Functions';
import ProductItem from './ProductItem'

var exlist = '';
dataSource = [];

const db = SQLite.openDatabase('db.db');
export default class ProductsList extends Component {

  componentDidMount() {

    db.transaction(tx => {
      {/* Criando a tabela de usuarios Tabela de teste inicial via SQLite*/}
      tx.executeSql(
        'create table if not exists resumopedido (codigo text, produto text, qtde text, unid text, total text);'
      );
    });

  };

  add(codigo,produto,qtde,unid,total) {
    db.transaction(
      tx => {
        tx.executeSql('insert into resumopedido (codigo,produto,qtde,unid,total) values (?,?,?,?,?)',[codigo,produto,qtde,unid,total]);
        console.log(tx);
      }
    );
  }

  delete(){
  db.transaction(
    tx => {
      tx.executeSql('drop table resumopedido');
      console.log('tabela dropada')
    }
  );
}
criar(){
  db.transaction(
    tx => { tx.executeSql('create table if not exists resumopedido (codigo interger, produto text, qtde text, unid text, total text);');
      console.log(tx);
      console.log('tabela criada com sucesso');
    }
  );

}

  ler() {
  db.transaction((tx) =>{
    tx.executeSql('SELECT * FROM resumopedido',[],(tx,results) => {
      var len = results.rows.length;
        var row = results.rows._array;
        console.log(row);
    });
  });
}

  constructor(props) {
    super(props);
    this.state = {
      visibleModal: null,
      qtde: 1,
      pcte: 0,
      valor:'100',
      cod : '',
      desc : '',
      descLong : '',
      peso: '',
      total: '850',
      totalview: '',
      row: [],
    };

  }

  changeQtde(qtde) {

    {/**Ao Alterar a quantidade o produto ele efetua automaticamente o calculo pelo valor*/}
    this.setState({qtde});
    console.log(qtde);
    let vl = this.state.valor;
    this.setState({total : (qtde*vl)});
    this.setState({totalview : numberToReal((qtde*vl))});
  }

  changeTotal(total) {
    this.setState({total});
  }

  changePcte(pcte) {
    this.setState({pcte});
  }

  _Modal = (text, onPress) => (
    <View style={styles.containerStyle}>
      <View style={styles.topicos}>
        <Text>
          <Text> {this.state.cod.trim()+': '} </Text>
          <Text style={{fontWeight: 'bold'}} > {this.state.desc } </Text>
        </Text>
      </View>

      <View style={styles.line}></View>
      <View style={{ flexDirection : 'row'}}>
        <Text style={{paddingRight:10,marginTop:10}}>Qtde: </Text>
        <View style={{marginTop:5, width:'80%'}}>
          <TextInput
            style={styles.input}
            placeholder="1"
            value={this.state.qtde}
            onChangeText={qtde => this.changeQtde(qtde)}
            />
        </View>
      </View>

      <View style={{ flexDirection : 'row'}}>
        <Text style={{paddingRight:10,marginTop:10}}>Pcte: </Text>
        <View style={{marginTop:5, width:'80%'}}>
          <TextInput
            style={styles.input}
            placeholder=""
            value={this.state.pcte}
            onChangeText={pcte => this.changePcte(pcte)}
            />
        </View>
      </View>

      <View style={{ flexDirection : 'row'}}>
        <Text style={{paddingRight:10,marginTop:10}}>Valor:</Text>
        <View style={{marginTop:5, width:'80%'}}>
          <TextInput
            style={styles.input}
            placeholder=""
            value={this.state.valor.toString()}
            />
        </View>
      </View>

      <View style={{ flexDirection : 'row'}}>
        <Text style={{paddingRight:10,marginTop:5}}>Peso: </Text>
        <View style={{marginTop:5, marginBottom:25, width:'80%'}}>
          <Text>{this.state.peso}</Text>
        </View>
      </View>

      <View style={styles.topicos}>
        <Text>
          <Text>Total :</Text>
          <Text style={{fontWeight: 'bold'}}>{this.state.totalview}</Text>
        </Text>
      </View>

      <View style={{ flexDirection : 'row'}}>
        <TouchableOpacity onPress={onPress}>
          <View style={styles.button}>
            <Text style={styles.textButton}>{text}</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={ () => this.add(this.state.cod,this.state.desc,this.state.qtde,this.state.valor,this.state.total)}>
          <View style={styles.btn_add}>
            <Text style={styles.textButton}>ADICIONAR</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );

  _renderModalContent = () => (
    <View style={styles.modalContent}>
      {this._Modal('CANCELAR', () => this.setState({ visibleModal: null }))}
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
          //console.log(row);
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
        this.setState({valor: source.item.VLVENDA.toFixed(2)})
        //  console.log('->'+this.state.valor);
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
          //console.log(busca);
          //console.log(len);
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

          <View>
            <TouchableOpacity onPress={ () => this.ler()}>
              <View style={styles.btn_add}>
                <Text style={styles.textButton}>Console.log</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={ () => this.delete()}>
              <View style={styles.btn_add}>
                <Text style={styles.textButton}>Drop</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={ () => this.criar()}>
              <View style={styles.btn_add}>
                <Text style={styles.textButton}>Create</Text>
              </View>
            </TouchableOpacity>

          </View>

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
      width:300,
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
    btn_add: {
      backgroundColor: '#ff3333',
      padding: 12,
      margin: 16,
      width: 150,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 4,
      borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    button: {
      backgroundColor: '#666666',
      padding: 12,
      margin: 16,
      width: 150,
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
    },
    input: {
      height: 40,
      borderColor: "#ccc",
      fontSize: 14,
      borderWidth: 2,
      marginBottom: 20
    },
  });

  export {exlist};
