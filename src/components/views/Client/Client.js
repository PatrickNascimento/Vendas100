import React, { Component } from 'react';
import { ListView, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Box, BoxSection } from '../../utils'
import { Actions } from 'react-native-router-flux'
import { CheckBox } from 'react-native-elements'
import OrderItem from '../OrderItem/OrderItem'
import ClientHeader from './ClientHeader'
import CheckFilters from './CheckFilters'

const css =  require('../MenuPrincipal/styles/style');

const {
  main,
  button,
  topoimg,topo,footer,footer2,
  icon, metatext, muraltext,
  acesso, mural,muralground, acessotext,
  ic0,ic1,ic2,ic3
} = css;

class Topo extends Component {
  render() {
    return (
      <View>
        <ClientHeader/>
        <CheckFilters/>
      </View>
    );
  }
}

class Client extends Component {


  render () {
    return (
      <View style={{flex: 1, backgroundColor: '#FFFFFF'}} >

        <Topo></Topo>


        <ScrollView>

          <View style={{ flexDirection : 'column' }}>
            <View style={{ flexDirection : 'row',
              margin : 10,
              backgroundColor : '#d6d6d6'}} >
              <Text style={{ flex: 1,
                  alignSelf: 'center',
                  fontWeight : 'bold',
                  paddingTop: 15,
                  paddingBottom: 15,
                  marginLeft : 10 }}>
                  { 'ULTIMOS PEDIDOS' }
                </Text>
                <TouchableOpacity
                  style={{ flex: .2,
                    marginRight: 5,
                    padding: 10,
                    alignSelf: 'center',
                    backgroundColor: '#a6a6a6',
                  }}>
                  <Text style={{ textAlign : 'center',
                    color: 'white',
                    fontWeight: 'bold' }}>
                    { 'MAIS' }
                  </Text>
                </TouchableOpacity>
              </View>

            </View>

            <View>

            </View>

            <View style={{ flexDirection : 'column' }}>
              <View style={{ flexDirection : 'row',
                margin : 10,
                backgroundColor : '#d6d6d6'}} >
                <Text style={{ flex: 1,
                    alignSelf: 'center',
                    fontWeight : 'bold',
                    paddingTop: 15,
                    paddingBottom: 15,
                    marginLeft : 10 }}>
                    { 'PRODUTOS MAIS VENDIDOS' }
                  </Text>


                  <TouchableOpacity
                    style={{ flex: .2,
                      marginRight: 5,
                      padding: 10,
                      alignSelf: 'center',
                      backgroundColor: '#a6a6a6',
                    }}>
                    <Text style={{ textAlign : 'center',
                      color: 'white',
                      fontWeight: 'bold' }}>
                      { 'MAIS' }
                    </Text>
                  </TouchableOpacity>
                </View>

              </View>



            </ScrollView>

            <View style={footer2}>
              <TouchableOpacity style={{
                  backgroundColor: '#a6a6a6',
                  paddingTop: 20,
                  paddingBottom: 15,
                  marginLeft: 10,
                  marginRight: 10,
                }}
                >
                <Text style={{
                    textAlign : 'center',
                    color: 'white'
                  }}>
                  { 'ABRIR NOVO PEDIDO' }
                </Text>
              </TouchableOpacity>
            </View>

          </View>
        );
      }
    }

    export default Client
