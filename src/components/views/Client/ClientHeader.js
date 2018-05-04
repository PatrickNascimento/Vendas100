import React, { Component } from 'react'
import { Text, View } from 'react-native'
import {exlist} from "../ListClients/ListClients";
import Expo, { SQLite } from 'expo';

const TextLeft = (props) =>
<Text style={{ flex: 1, overflow: 'hidden' }}>{ props.children }</Text>

const TextRight = (props) =>
<Text style={{ flex: 5, overflow: 'hidden' }}>{ props.children }</Text>

const db = SQLite.openDatabase('db.db');

export default class ClientHeader extends Component {

  constructor() {
    super();
    this.state = {
      row: []
    };
  }

  componentDidMount() {
    this.parseData();
  }

  parseData() {
    var row = [];
    //alert(exlist.i);
    var filtro = exlist.i;
    //alert(filtro)
    db.transaction((tx) =>{
      tx.executeSql('select * from clientes limit 1',[],(tx,results) => {
        var len = results.rows.length;
        console.log(len);
        if(len>0){
          var row = results.rows._array;
          console.log(row);
          this.setState({row});
        }
      });
    });
  }

  renderListItems = () => this.state.row.map((item) => (

        <View style={{
            backgroundColor: '#dcdcdc',
            borderRadius: 5,
            margin: 10,
            padding: 10,
            flexDirection : 'column' }}>
            <View style={{ width: '100%', flexDirection : 'row'}}>
              <TextLeft>{ 'R. Soc.:'}</TextLeft>
              <TextRight> {item.NMCLIFOR} </TextRight>
            </View>

            <View style={{ flexDirection : 'row'}}>
              <TextLeft>{ 'CNPJ:'}</TextLeft>
              <TextRight>{ 'ALKJDFLKJF' }</TextRight>
            </View>

            <View style={{ flexDirection : 'row'}}>
              <TextLeft>{ 'Tel.:'}</TextLeft>
              <TextRight>{ 'ALKJDFLKJF' }</TextRight>
            </View>

            <View style={{ flexDirection : 'row'}}>
              <TextLeft>{ 'End.:'}</TextLeft>
              <TextRight>{ 'ALKJDFLKJFALKJDFLKJFALKJDFLKJFALKJDFLKJFALKJDFLKJF' }</TextRight>
            </View>

            <View style={{ flexDirection : 'row'}}>
              <TextLeft>{ 'Sit.:'}</TextLeft>
              <TextRight>{ 'ALKJDFLKJF' }</TextRight>
            </View>

            <View style={{ flexDirection : 'row'}}>
              <TextLeft>{ 'Saldo:'}</TextLeft>
              <TextRight>{ 'ALKJDFLKJF' }</TextRight>
            </View>
          </View>
    )
  );

  render() {
    return (
        <View>
          {this.renderListItems()}
        </View>
    )
  }
}
