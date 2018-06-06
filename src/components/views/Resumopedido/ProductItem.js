import {SQLite} from 'expo';
import React from 'react'
import { TouchableBox, BoxSection } from '../../utils'
import { Alert,View, Text,TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native'
import { numberToReal } from '../../../Functions'
import Modal from 'react-native-modal'; // 2.4.0
import { Button,Icon } from 'react-native-elements'
import ProductsList from '../PedidoNovo/ProductsList'

const db = SQLite.openDatabase('db.db');
export default class ProductItem extends React.Component {

  componentDidMount() {

  }

  add(codigo,produto,qtde,unid,total) {
    db.transaction(
      tx => {
        tx.executeSql('insert into resumopedido (codigo,produto,qtde,unid,total) values (?,?,?,?,?)',[codigo,produto,qtde,unid,total]);
        console.log(tx);
      }
    );
  }

  constructor(props) {
    super(props);
    this.state = {
      visibleModal: null,
    };

  }

  changeQtde(qtde) {
    {/**Ao Alterar a quantidade o produto ele efetua automaticamente o calculo pelo valor*/}
    this.setState({qtde});
    console.log(qtde);
    let vl = this.props.valor;
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
          <Text> {this.props.id+': '} </Text>
          <Text style={{fontWeight: 'bold'}} > {this.props.produto} </Text>
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
            value={this.props.valor}
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
            <Text style={styles.textButton}>ALTERAR</Text>
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


  render(){
    return (
      <View>
        <View>
          <Modal isVisible={this.state.visibleModal === 1}>
            {this._renderModalContent()}
          </Modal>
        </View>

        <TouchableBox
          style={{ flex: 1,
            alignItems: 'stretch',
            flexDirection : 'column',
            backgroundColor : '#f8f8f8'}}
            onPress={this.props.onPress} >
            <View style={{
                alignSelf: 'flex-start',
                flexDirection: 'row'}}>
                <Text
                  style={{
                    fontWeight: 'bold',
                  }}>
                  {this.props.id+ ' - '}
                </Text>

                <Text
                  style={{
                    fontWeight: 'bold'}}
                    >
                    { this.props.produto }
                  </Text>
                </View>
                <View style={{ marginTop : 5 }}>
                  <Text>
                    { 'Qtde:  '}
                    { this.props.qtde }
                    { ' / Unit:  '}
                    {numberToReal(parseInt(this.props.valor))}
                    { ' / Total:  '}
                    {numberToReal(parseInt(this.props.total))}
                  </Text>
                </View>
                <View style={{ flex: 1,
                    alignItems: 'stretch',
                    flexDirection : 'column'}}>
                    <View style={{
                        flexDirection: 'row'}}>
                        <Text style={{fontWeight: 'bold' }}>
                          { 'Codigo:  '}
                          { this.props.codigo }
                        </Text>
                        <View style={{marginLeft: '60%', marginTop:15, flexDirection:'row'}}>
                          <View>
                            <Icon
                              name='pencil'
                              type='font-awesome'
                              color='red'
                              size={30}
                              onPress={() =>  this.setState({ visibleModal: 1 })} />
                          </View>
                          <View style={{marginLeft:20}}>
                            <Icon
                              name='trash'
                              size={30}
                              type='font-awesome'
                              color='red'
                              onPress={() => console.log(
                                Alert.alert(
                                  'Confirma Exclusão',
                                  'Deseja realmente Excluir',
                                  [
                                    {text: 'Cancelar', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                                    {text: 'OK', onPress: () => console.log('OK Pressed')},
                                  ],
                                  { cancelable: false }
                                )
                              )} />
                            </View>
                          </View>
                        </View>
                      </View>
                    </TouchableBox>
                  </View>
                )
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
