import React, { Component } from 'react'
import { Text, View, Alert,TextInput,StyleSheet, TouchableOpacity,TouchableHighlight } from 'react-native'
import { Input, TouchableBox } from '../../utils'
import Expo, { SQLite } from 'expo';
import { Button,Icon } from 'react-native-elements'
import axios from 'axios'
import {limpaclientes,ler} from './actions/acoes.js'
var cc = '';

const db = SQLite.openDatabase('db.db');

class Configuration extends Component {
  constructor (props ) {
    super (props)
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
      console.log('gerado carga de clientes com sucesso');
    }
  );
}

SyncSendClientes(){
  return this.state.itemsclientes.map((item) =>(
    this.syncClientes(item.CDCLIFOR, item.NMFANTASIA, item.NUFONE,
      item.DEENDERECO,item.DEBAIRRO,item.NMCID,
      item.CDUF,item.DEOBS,item.TPSTATUS,item.ATIVO,item.CPFCNPJ,
      item.VLSALDO,item.DEPRAZO,item.VLSALDODEV,item.NMCLIFOR)
    )
  )
}


syncProdutos(CDPRO,CDPROREF,DEPROLONG,IDATIVO,DEPRO,CDUNMED,VLVENDA,VLVENDAMIN,VALOR,QTSALDO,PEDESCMAX){
  {/*Lançamento de produtos*/}
  db.transaction(
    tx => {
      tx.executeSql('insert into produtos (CDPRO,CDPROREF,DEPROLONG,IDATIVO,DEPRO,CDUNMED,VLVENDA,VLVENDAMIN,VALOR,QTSALDO,PEDESCMAX) values (?,?,?,?,?,?,?,?,?,?,?)',[CDPRO,CDPROREF,DEPROLONG,IDATIVO,DEPRO,CDUNMED,VLVENDA,VLVENDAMIN,VALOR,QTSALDO,PEDESCMAX]);
      console.log('gerado carga de produtos com sucesso');
    }
  );
}

SyncSendProdutos(){
  {/*Mapeia os registros do electron e os insere no Sqlite*/}
  return this.state.itemsprodutos.map((item) =>(
    this.syncProdutos(item.CDPRO,item.CDPROREF,item.DEPROLONG,item.IDATIVO,
      item.DEPRO,item.CDUNMED,item.VLVENDA,item.VLVENDAMIN,
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
    console.log('Tabela dropada com sucesso');
  });

  db.transaction(tx => {
    {/* Criando a tabela de clientes via SQLite*/}
    tx.executeSql(
      'create table if not exists clientes (CDCLIFOR text, NMFANTASIA text, NUFONE text, DEENDERECO text,DEBAIRRO text,NMCID text,CDUF text,DEOBS text,TPSTATUS text,ATIVO text,CPFCNPJ text,VLSALDO numeric,DEPRAZO text,VLSALDODEV numeric,NMCLIFOR text);'
    );
    console.log(tx);
    console.log('Tabela criada com sucesso');
  });
}

lerclientes() {
  db.transaction((tx) =>{
    tx.executeSql('select rowid FROM clientes',[],(tx,results) => {
      var len = results.rows.length;
      console.log(len);
      var row = results.rows;
      console.log('->'+JSON.stringify(row));

    });
  });
}

lerprodutos() {
  db.transaction((tx) =>{
    tx.executeSql('select rowid from produtos',[],(tx,results) => {
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
        onPress={() => Alert.alert('teste button ok')}
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
  }
});

export default Configuration
