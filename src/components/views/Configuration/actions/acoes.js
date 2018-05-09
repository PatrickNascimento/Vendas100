import React, { Component } from 'react'
import { Text, View, Alert,TextInput,StyleSheet, TouchableOpacity,TouchableHighlight } from 'react-native'
import Expo, { SQLite } from 'expo';
import { Button,Icon } from 'react-native-elements'
import axios from 'axios'

const db = SQLite.openDatabase('db.db');

export function  limpaclientes(){
  db.transaction(tx => {
    {/* dropar a tabela de clientes via SQLite*/}
    tx.executeSql(
      'Drop table clientes;'
    );
    //console.log(tx);
    console.log('Tabela dropada com sucesso');
  });

  db.transaction(tx => {
    {/* Criando a tabela de clientes via SQLite*/}
    tx.executeSql(
      'create table if not exists clientes (CDCLIFOR text, NMFANTASIA text, NUFONE text, DEENDERECO text,DEBAIRRO text,NMCID text,CDUF text,DEOBS text,TPSTATUS text,ATIVO text,CPFCNPJ text,VLSALDO numeric,DEPRAZO text,VLSALDODEV numeric,NMCLIFOR text);'
    );
  // console.log(tx);
    console.log('Tabela criada com sucesso');
  });
}

export function ler() {
  alert('lendo')
}
