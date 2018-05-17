import React, { Component } from 'react'
import { Router, Stack, Scene, Actions, Reducer } from 'react-native-router-flux'

import Login from './components/views/Login/Login'
import ListClients from './components/views/ListClients/ListClients'
import MenuPrincipal from './components/views/MenuPrincipal/MenuPrincipal'
import Client from './components/views/Client/Client'
import ProductsList from './components/views/Products/ProductsList'
import ListPedidos from './components/views/Pedidos/ListPedidos'
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
        <Scene key="Auth" >
          <Scene key="screenLogin" component={Login} title="Tela de Login"
           />
        </Scene>

        <Scene key="main" initial>
        <Scene key="menuPrincipal" component={MenuPrincipal} title="Menu Principal" initial/>
          <Scene key="listClients" component={ListClients} title="Lista de Clientes" />
          <Scene key="listPedidos" component={ListPedidos} title="Novo Pedido" />
          <Scene key="client" component={Client} title="Cliente Detalhes"/>
          <Scene key="products" component={ProductsList} title="Lista de Produtos"/>
          <Scene key="configuration" component={Configuration} title="Configuração"/>
          <Scene key="modal" component={Modal} title="Modal"/>
        </Scene>
        {/*
        // <Scene key="orders"
        //     component={OrdersList}
        //     title="Ordens de Pedido"
        //     initial>
        // </Scene>
        */}
      </Stack>
    </Router>
  )
}

export default RouterComponent
