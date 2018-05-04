import React, { Component } from 'react'
import { Text, View, TextInput,StyleSheet, TouchableOpacity,TouchableHighlight } from 'react-native'
import { Input, TouchableBox } from '../../utils'
import Expo, { SQLite } from 'expo';
import axios from 'axios'


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
      console.log(tx);
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
  db.transaction(tx => {
    {/* Criando a tabela de clientes via SQLite*/}
    tx.executeSql(      
      'create table if not exists clientes (CDCLIFOR text, NMFANTASIA text, NUFONE text, DEENDERECO text,DEBAIRRO text,NMCID text,CDUF text,DEOBS text,TPSTATUS text,ATIVO text,CPFCNPJ text,VLSALDO numeric,DEPRAZO text,VLSALDODEV numeric,NMCLIFOR text);'
    );
    console.log(tx);
    console.log('Tabela criada com sucesso');
  });
}

drop(){
  db.transaction(tx => {
    {/* dropar a tabela de clientes via SQLite*/}
    tx.executeSql(
      'Drop table clientes;'
    );
    console.log(tx);
    console.log('Tabela dropada com sucesso');
  });
}

ler() {
  db.transaction((tx) =>{
    tx.executeSql('select * from clientes',[],(tx,results) => {
      var len = results.rows.length;
      console.log(len);
      var row = results.rows;
      console.log('->'+JSON.stringify(row));

    });
  });
}

render () {
  return (
    <View style={styles.container}>


      <TouchableHighlight
        style={styles.buttonsync}
        onPress={() => this.SyncSend()}
        >
        <Text style={styles.textButton}>Gerar Carga Usuários</Text>
      </TouchableHighlight>

      <TouchableHighlight
        style={styles.buttonsync}
        onPress={() => this.SyncSendClientes()}
        >
        <Text style={styles.textButton}>Gerar Carga Clientes</Text>
      </TouchableHighlight>

      <TouchableHighlight
        style={styles.buttonsync}
        onPress={() => this.criar()}
        >
        <Text style={styles.textButton}>Criar Tabela de Clientes</Text>
      </TouchableHighlight>

      <TouchableHighlight
        style={styles.buttonsync}
        onPress={() => this.ler()}
        >
        <Text style={styles.textButton}>Clientes Console</Text>
      </TouchableHighlight>
      <TouchableHighlight
        style={styles.buttonsync}
        onPress={() => this.drop()}
        >
        <Text style={styles.textButton}>Dropar tabela Clientes</Text>
      </TouchableHighlight>
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
