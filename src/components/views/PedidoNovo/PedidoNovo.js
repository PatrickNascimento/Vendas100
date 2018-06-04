import React, { Component } from 'react';
import { ListView, View, Text, StyleSheet,TouchableOpacity, ScrollView, Picker } from 'react-native';
import { Box, BoxSection } from '../../utils'
import { Actions } from 'react-native-router-flux'
import { CheckBox } from 'react-native-elements'
import PedidoNovoHeader from './PedidoNovoHeader'
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
  state = {user: ''}
  updateUser = (user) => {
    this.setState({ user: user })
  }
  render() {
    return (
      <View>
        <PedidoNovoHeader/>
        <Text style={styles.pedidos}>Este pedido ainda não tem itens</Text>
      </View>
    );
  }
}

class PedidoNovo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tipo: 'VENDA'
    }
  }

  render () {
    return (
      <View style={{flex: 1, backgroundColor: '#FFFFFF'}} >
        <Topo></Topo>
        <ScrollView>
        </ScrollView>

        <View style={footer2}>

          <View style={{
              backgroundColor: '#dcdcdc',
              borderRadius: 5,
              margin: 10,
              padding: 10,
              flexDirection : 'column' }}>
              <View style={{ flexDirection : 'row'}}>
                <Text>TIPO : </Text>
                <View>
                  <Picker
                    style={{width: 120,marginTop:-13}}
                    selectedValue={this.state.tipo}
                    onValueChange={(tip) => this.setState({tipo: tip})}>
                    <Picker.Item label="VENDA" value="VENDA" />
                    <Picker.Item label="ORÇAMENTO" value="ORÇAMENTO" />
                    <Picker.Item label="TROCA" value="TROCA" />
                    <Picker.Item label="BONIFICAÇÃO" value="BONIFICAÇÃO" />
                  </Picker>
                </View>
              </View>
              <View style={{ flexDirection : 'row'}}>
                <Text>TOTAL : </Text>
                <Text>R$ 10.000,00 : </Text>
              </View>
            </View>

            <View style={{ flexDirection : 'column' }}>
              <View style={{ flexDirection : 'row',
                margin : 10,
                alignItems: 'center'
              }} >

              <TouchableOpacity style={{
                  backgroundColor: '#333333',
                  paddingTop: 20,
                  paddingBottom: 15,
                  marginLeft: 5,
                  marginRight: 5,
                  width:'48%'
                }}
                >
                <Text style={{
                    textAlign : 'center',
                    color: 'white'
                  }}>
                  { 'FATURAR' }
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => Actions.pedidoproducts({onBack: () => Alert.alert('Voltando')})}
                style={{
                  backgroundColor: '#333333',
                  paddingTop: 20,
                  paddingBottom: 15,
                  marginLeft: 5,
                  marginRight: 5,
                  width:'48%'
                }}
                >
                <Text style={{
                    textAlign : 'center',
                    color: 'white'
                  }}>
                  { 'ADICIONAR PRODUTOS' }
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>

    );
  }
}
const styles = StyleSheet.create({
  pedidos:{
    marginTop:10,
    marginBottom:10,
    textAlign:'center',
    fontWeight: 'bold',
  }
});

export default PedidoNovo
