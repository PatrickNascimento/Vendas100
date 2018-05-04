import Expo, { SQLite } from 'expo'
import React, { Component } from 'react'
import { Actions } from 'react-native-router-flux'
import axios from 'axios'

import  {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Image,
  TouchableOpacity,
  Alert,
  Dimensions,
  ScrollView,
} from 'react-native';



const css =  require('./styles/style');

const {
  main,
  button,
  topoimg,topo,footer,
  icon, metatext, muraltext,
  acesso, mural,muralground, acessotext,
  ic0,ic1,ic2,ic3
} = css;

const db = SQLite.openDatabase('db.db');

class Topo extends Component {
  render() {
    return (
      <View style={topo}>
        <Image style={topoimg} source={require('./imgs/logo.png')} />
        <Text style={metatext}>Vendas Metasis</Text>
      </View>
    );
  }
}

export default class App extends React.Component {

  componentDidMount() {

    db.transaction(tx => {
      {/* Criando a tabela de usuarios Tabela de teste inicial via SQLite*/}
      tx.executeSql(
        'create table if not exists usuarios (codigo integer, nome text, email text, comentario text);'
      );
    });

    db.transaction(txc => {
      {/* Criando a tabela de clientes via SQLite*/}
      txc.executeSql(
        'create table if not exists clientes (CDCLIFOR text, NMFANTASIA text, NUFONE text, DEENDERECO text,DEBAIRRO text,NMCID text,CDUF text,DEOBS text,TPSTATUS text,ATIVO text,CPFCNPJ text,VLSALDO numeric,DEPRAZO text,VLSALDODEV numeric,NMCLIFOR text);'
      );
      });
    };




  render() {
    return (

      <View style={{flex: 1, backgroundColor: '#FFFFFF'}} >
        <Topo></Topo>

        <View style={acesso}>
          <Text style={acessotext}></Text>
        </View>
        <ScrollView>

          <View style={main}>

            <TouchableOpacity
              onPress={() => metasis('acao')}>

              <Image style={icon} source={require('./imgs/carrinho.png')} />
              <Text style={ic1}>Novo pedido</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => Actions.listClients()}>
              <Image style={icon} source={require('./imgs/users.png')} />
              <Text style={ic2}>Clientes</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => Actions.products()}>
              <Image style={icon} source={require('./imgs/produtos.png')} />
              <Text style={ic3}>Produtos</Text>
            </TouchableOpacity>
          </View>

          <View style={main}>
            <TouchableOpacity
              onPress={() => metasis('acao')}>
              <Image style={icon} source={require('./imgs/historico.png')} />
              <Text style={ic3}>Histórico</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => Actions.configuration()}>
              <Image style={icon} source={require('./imgs/sinc.png')} />
              <Text style={ic0}>Sincronização</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => Actions.configuration()}>
              <Image style={icon} source={require('./imgs/config.png')} />
              <Text style={ic1}>Configuração</Text>
            </TouchableOpacity>

          </View>


          <View style={mural}>
            <Text style={acessotext}>Mural de recados</Text>
          </View>
          <View style={muralground}>
            <Text style={acessotext}>Olá!</Text>
            <Text style={muraltext}>SEJA BEM VINDOS AO APLICATIVO VENDAS METASIS</Text>
          </View>
        </ScrollView>

        <View style={footer}>
        </View>

      </View>

    );
  }
};
