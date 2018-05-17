import React, { Component } from 'react'
import { Text, View, Alert,TextInput,StyleSheet, TouchableOpacity,TouchableHighlight } from 'react-native'
import { Input, TouchableBox } from '../../utils'
import Expo, { SQLite } from 'expo';
import { Button,Icon } from 'react-native-elements'
import axios from 'axios'
import {limpaclientes,ler} from './actions/acoes.js'
import { Actions } from 'react-native-router-flux'
import ProgressCircle from 'react-native-progress-circle'
import Modal from 'react-native-modal'; // 2.4.0

var cc = '';
const db = SQLite.openDatabase('db.db');

class Configuration extends Component {
  constructor (props ) {
    super (props)

    this.state = {
      visibleModal: null,
      percent: 0,
      totalreg : 0,
    };
  }

  componentWillMount () {
    axios.get('http://10.1.1.39:211/client')
    .then(resp => {
      //console.log(resp.data.result)
      this.setState({ items : resp.data.result })
    }

  ).catch(e => console.log('error no catch: ', e))

  axios.get('http://10.1.1.39:211/clientemobile')
  .then(resp => {
    //console.log(resp.data.result)
    this.setState({ itemsclientes : resp.data.result })
  }

).catch(e => console.log('error no catch: ', e))

axios.get('http://10.1.1.39:211/produtos')
.then(resp => {
  //console.log(resp.data.result)
  this.setState({ itemsprodutos : resp.data.result })
}

).catch(e => console.log('error no catch: ', e))
}

sync(code,name,city,key){
  db.transaction(
    tx => {
      tx.executeSql('insert into usuarios (codigo,nome,email,comentario) values (?,?,?,?)',[code,name,city,key]);
      console.log('gerado carga com sucesso');
    }
  );
}
SyncSend(){
  return this.state.items.map((item) =>(
    this.sync(item.CODE,item.NAME,item.CITY,item.KEY)
  )
)
}




syncClientes(CDCLIFOR,NMFANTASIA, NUFONE,DEENDERECO,DEBAIRRO,NMCID,CDUF,DEOBS,TPSTATUS,ATIVO,CPFCNPJ,VLSALDO,DEPRAZO,VLSALDODEV,NMCLIFOR){
  db.transaction(
    tx => {
      tx.executeSql('insert into clientes (CDCLIFOR, NMFANTASIA, NUFONE,DEENDERECO,DEBAIRRO,NMCID,CDUF,DEOBS,TPSTATUS,ATIVO,CPFCNPJ,VLSALDO,DEPRAZO,VLSALDODEV,NMCLIFOR) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',[CDCLIFOR, NMFANTASIA, NUFONE,DEENDERECO,DEBAIRRO,NMCID,CDUF,DEOBS,TPSTATUS,ATIVO,CPFCNPJ,VLSALDO,DEPRAZO,VLSALDODEV,NMCLIFOR]);

    }
  );
}

SyncSendClientes(){
  return this.state.itemsclientes.map((item,index) =>(
    this.syncClientes(item.CDCLIFOR, item.NMFANTASIA, item.NUFONE,
      item.DEENDERECO,item.DEBAIRRO,item.NMCID,
      item.CDUF,item.DEOBS,item.TPSTATUS,item.ATIVO,item.CPFCNPJ,
      item.VLSALDO,item.DEPRAZO,item.VLSALDODEV,item.NMCLIFOR),
      this.setState({percent: index}),
      this.setState({ visibleModal: 1 })
    )

  )
}


syncProdutos(CDPRO,CDPROREF,DEPROLONG,IDATIVO,DEPRO,CDUNMED,VLVENDA,VLVENDAMIN,VLPESOMED,VALOR,QTSALDO,PEDESCMAX){
  {/*Lançamento de produtos*/}
  db.transaction(
    tx => {
      tx.executeSql('insert into produtos (CDPRO,CDPROREF,DEPROLONG,IDATIVO,DEPRO,CDUNMED,VLVENDA,VLVENDAMIN,VLPESOMED,VALOR,QTSALDO,PEDESCMAX) values (?,?,?,?,?,?,?,?,?,?,?,?)',[CDPRO,CDPROREF,DEPROLONG,IDATIVO,DEPRO,CDUNMED,VLVENDA,VLVENDAMIN,VLPESOMED,VALOR,QTSALDO,PEDESCMAX]);

    }
  );
}

SyncSendProdutos(){

  return this.state.itemsprodutos.map((item) =>(
    this.syncProdutos(item.CDPRO,item.CDPROREF,item.DEPROLONG,item.IDATIVO,
      item.DEPRO,item.CDUNMED,item.VLVENDA,item.VLVENDAMIN,item.VLPESOMED,
      item.VALOR,item.QTSALDO,item.PEDESCMAX)
    )
  )
}

syncClientesmanual(){
  {/*inserindo registro manualmente*/}
  db.transaction(
    tx => {
      tx.executeSql('insert into clientes (CDCLIFOR, NMFANTASIA) values ("111","222");');
      console.log('gerado carga de clientes com sucesso');
      console.log(tx);
    }
  );
}

criar(){

}

limpaclientes(){
  db.transaction(tx => {
    {/* dropar a tabela de clientes via SQLite*/}
    tx.executeSql(
      'Drop table clientes;'
    );
    console.log(tx);
    console.log('Tabela clientes dropada com sucesso');
  });

  db.transaction(tx => {
    {/* Criando a tabela de clientes via SQLite*/}
    tx.executeSql(
      'create table if not exists clientes (CDCLIFOR text, NMFANTASIA text, NUFONE text, DEENDERECO text,DEBAIRRO text,NMCID text,CDUF text,DEOBS text,TPSTATUS text,ATIVO text,CPFCNPJ text,VLSALDO numeric,DEPRAZO text,VLSALDODEV numeric,NMCLIFOR text);'
    );
    console.log(tx);
    console.log('Tabela clientes criada com sucesso');
  });
}

limpaprodutos(){
  db.transaction(tx => {
    {/* dropar a tabela de produtos via SQLite*/}
    tx.executeSql(
      'Drop table produtos;'
    );
    console.log(tx);
    console.log('Tabela  produtos dropada com sucesso');
  });

  db.transaction(tx => {
    {/* Criando a tabela de produtos via SQLite*/}
    tx.executeSql(
      'create table if not exists produtos (CDPRO text, CDPROREF text,DEPROLONG text, IDATIVO text, DEPRO text, CDUNMED text, VLVENDA integer, VLVENDAMIN numeric, VLPESOMED numeric, VALOR numeric, QTSALDO numeric, PEDESCMAX numeric);'
    );
    console.log(tx);
    console.log('Tabela produtos criada com sucesso');
  });
}


lerclientes() {
  db.transaction((tx) =>{
    tx.executeSql('select * from clientes',[],(tx,results) => {
      var len = results.rows.length;
      console.log(len);
      var row = results.rows;
      console.log('->'+JSON.stringify(row));

    });
  });
}

lerprodutos() {
  db.transaction((tx) =>{
    tx.executeSql('select * from produtos',[],(tx,results) => {
      var len = results.rows.length;
      console.log(len);
      var row = results.rows;
      console.log('->'+JSON.stringify(row));

    });
  });
}

envia2ERP() {
  axios.post("http://10.1.1.39:3000/receive",
  data = {
    "Nome": "Patrick Nascimento",
    "Nome2": "Luiz Ferrari",
    "Nome3": "Arthur Picket",
  })
  .then(function(response){
    console.log('Enviado com sucesso')
  });
}

_Modal = (text, onPress) => (
  <View>
    <View style={{marginTop:'30%',marginBottom:'20%',marginLeft:'40%',marginRight:'40%'}}>
      <ProgressCircle
        percent={this.state.percent}
        radius={70}
        borderWidth={8}
        color="#3399FF"
        shadowColor="#999"
        bgColor="#fff"
        >
        <Text style={{ fontSize: 18 }}>{this.state.percent+'%'}</Text>
      </ProgressCircle>
    </View>

    <TouchableOpacity onPress={onPress}>
      <View style={styles.button}>
        <Text style={styles.title}>{text}</Text>
      </View>
    </TouchableOpacity>
  </View>
);

_renderModalContent = () => (
  <View style={styles.modalContent}>
    {this._Modal('Fechar', () => this.setState({ visibleModal: null }))}
  </View>
);


render () {
  return (
    <View style={styles.container}>

      <Button
        small
        icon={{name: 'android', type: 'font-awesome', buttonStyle: styles.someButtonStyle }}
        backgroundColor= '#ff4d4d'
        onPress={() => this.SyncSendClientes()}
        title='SINCRONIZAR CLIENTES' />

      <Button
        small
        icon={{name: 'trash', type: 'font-awesome', buttonStyle: styles.someButtonStyle }}
        backgroundColor= '#ff4d4d'
        onPress={() =>   Alert.alert(
          'Confirma?',
          'Está ação limparar todos os dados',
          [
            {text: 'Cancel', onPress: () => console.log('Ação cancelada'), style: 'cancel'},
            {text: 'OK', onPress: () => {limpaclientes();}},
          ],
          { cancelable: false }
        )}
        title='LIMPAR DADOS CLIENTES' />

      <Button
        small
        icon={{name: 'search', type: 'font-awesome', buttonStyle: styles.someButtonStyle }}
        backgroundColor= '#222222'
        onPress={() => this.lerclientes()}
        title='EXIBIR CLIENTE NO TERMINAL' />

      <Button
        small
        icon={{name: 'th-large', type: 'font-awesome', buttonStyle: styles.someButtonStyle }}
        backgroundColor= '#ff4d4d'
        onPress={() => this.SyncSendProdutos()}
        title='SINCRONIZAR PRODUTOS' />

      <Button
        small
        icon={{name: 'trash', type: 'font-awesome', buttonStyle: styles.someButtonStyle }}
        backgroundColor= '#ff4d4d'
        onPress={() => this.limpaprodutos()}
        title='LIMPAR DADOS PRODUTOS' />

      <Button
        small
        icon={{name: 'search', type: 'font-awesome', buttonStyle: styles.someButtonStyle }}
        backgroundColor= '#222222'
        onPress={() => this.lerprodutos()}
        title='EXIBIR PRODUTOS NO TERMINAL' />

      <Button
        small
        icon={{name: 'server', type: 'font-awesome', buttonStyle: styles.someButtonStyle }}
        backgroundColor= '#000000'
        onPress={() => envia2ERP()}
        title='SINCRONIZAR COM ERP' />
      <Button
        small
        icon={{name: 'server', type: 'font-awesome', buttonStyle: styles.someButtonStyle }}
        backgroundColor= '#000000'
        onPress={() => this.setState({ visibleModal: 1 })}
        title='MODAL' />
        <View>
          <Modal isVisible={this.state.visibleModal === 1}>
            {this._renderModalContent()}
          </Modal>
        </View>

    </View>





  )
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingLeft: 15,
    paddingRight: 15,
    marginTop: 30
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    fontSize: 14,
    borderWidth: 2,
    marginBottom: 20
  },
  textArea: {
    height: 60
  },
  title: {
    textAlign: "center",
    fontSize: 18,
    marginBottom: 5
  },
  button: {
    textAlign:'center',
    marginLeft:'30%',
    marginRight:'30%',
    backgroundColor: "skyblue",
    paddingTop: 7,
    paddingBottom: 7,
    marginBottom:5
  },
  buttonf: {
    backgroundColor: "red",
    paddingTop: 7,
    paddingBottom: 7,
    marginBottom:5
  },
  buttonsync: {
    backgroundColor: "black",
    paddingTop: 7,
    paddingBottom: 7,
    marginBottom:5
  },
  textButton: {
    textAlign: "center",
    fontSize: 18,
    color: "white"
  },
  modalContent: {
    textAlign:'center',
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
  }
});

export default Configuration
