import React, { Component } from 'react'
import { Router, Stack, Scene, Actions, Reducer } from 'react-native-router-flux'
import { Button,Icon } from 'react-native-elements'
import { Text, View, Alert,TextInput,StyleSheet, TouchableOpacity,TouchableHighlight } from 'react-native'

import Login from './components/views/Login/Login'
import ListClients from './components/views/ListClients/ListClients'
import MenuPrincipal from './components/views/MenuPrincipal/MenuPrincipal'
import Client from './components/views/Client/Client'
import ProductsList from       './components/views/Products/ProductsList'
import PedidoProductsList from './components/views/PedidoNovo/ProductsList'
import Pedidos from './components/views/Pedidos/ListPedidos'
import PedidoNovo from './components/views/PedidoNovo/PedidoNovo'
import PedidoResumo from './components/views/Resumopedido/PedidoResumo'
//import OrdersList from './components/views/OrderItem/OrdersList'
import Configuration from './components/views/Configuration/Configuration'
import Modal from './components/views/Configuration/modal'


const getSceneStyle = () => ({
  backgroundColor: '#F5FCFF',
  shadowOpacity: 1,
  shadowRadius: 3,
  top: 10
});

const RouterComponent = () => {



  return (

    <Router
      getSceneStyle={getSceneStyle}
      showLabel={false}
      >
      <Stack key="root" style={{display: "flex"}} hideNavBar>
        <Scene key="main" initial>
          <Scene key="menuPrincipal" component={MenuPrincipal} title="Menu Principal" rightTitle = "<<<" initial/>
          <Scene key="listClients" component={ListClients} title="Lista de Clientes" />
          <Scene key="pedidos" component={Pedidos} title="Pedidos" />
          <Scene key="client"      component={Client} title="Cliente Detalhes"/>
          <Scene key="products" component={ProductsList} title="Lista de Produtos"/>
          <Scene key="configuration" component={Configuration} title="Configuração"/>
          <Scene key="pedidoproducts"
             component={PedidoProductsList}
             title=" Adicionar Produtos"
             leftButtonIconStyle={{ width: 30, height: 30 }}
             leftButtonImage={require("./components/views/Pedidos/imgs/left_arrow.png")}
             onLeft={() => {
                Actions.pedidoResumo();
             }}
             />
          <Scene key="modal" component={Modal} title="Modal"/>

            <Scene
              key="pedidoResumo"
              component={PedidoResumo}
              title="Resumo do pedido"
              leftButtonIconStyle={{ width: 30, height: 30 }}
              leftButtonImage={require("./components/views/Pedidos/imgs/left_arrow.png")}
              onLeft={() => {
                 Actions.menuPrincipal();
              }}
              />

          <Scene
            key="pedidoNovo"
            component={PedidoNovo}
            title="PedidoNovo"
            rightButtonIconStyle={{ width: 30, height: 30 }}
            rightButtonImage={require("./components/views/Pedidos/imgs/trash_small.png")}
            onRight={() => alert('Excluir Pedido?')}
            />
        </Scene>

      </Stack>
    </Router>
  )
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


export default RouterComponent
