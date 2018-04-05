import React, { Component } from 'react'
import { Router, Stack, Scene, Actions, Reducer } from 'react-native-router-flux'

import Login from './components/views/Login/Login'
import ListClients from './components/views/ListClients/ListClients'
import MenuPrincipal from './components/views/MenuPrincipal/MenuPrincipal'
import Client from './components/views/Client/Client'
import ProductsList from './components/views/Products/ProductsList'
// import OrdersList from './components/views/OrderItem/OrdersList'
import Configuration from './components/views/Configuration/Configuration'

const reducerCreate = params => {
  const defaultReducer = new Reducer(params);
  return (state, action) => {
    // console.log('ACTION:', action);
    return defaultReducer(state, action);
  };
};

const getSceneStyle = () => ({
  backgroundColor: '#F5FCFF',
  shadowOpacity: 1,
  shadowRadius: 3,
});

const RouterComponent = () => {
  return (
    <Router
      createReducer={reducerCreate}
      getSceneStyle={getSceneStyle}
      showLabel={false}
    >
      <Stack key="root" style={{display: "flex"}} hideNavBar>
        <Scene key="Auth" >
          <Scene key="screenLogin" component={Login} title="Tela de Login"
           />         
        </Scene>

        <Scene key="main" initial>
          <Scene key="menuPrincipal"
            component={MenuPrincipal}
            title="Menu Principal"
            initial            
            />
          <Scene key="listClients"
            component={ListClients}
            title="Lista de Clientes"
            />
          <Scene key="client"
            component={Client}
            title="Client Detail"
          />
          <Scene key="products"
            component={ProductsList}
            title="Lista de Produtos"
            
          />
          <Scene key="configuration"
                 component={Configuration}
                 title="Configuração"
          />
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
