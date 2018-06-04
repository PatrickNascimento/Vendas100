import React from 'react'
import { TouchableBox, BoxSection } from '../../utils'
import { View, Text, Image, StyleSheet } from 'react-native'
import { numberToReal } from '../../../Functions';

const ProductItem = (props) => {
  console.log('-------------')
  console.log(props)
  return (
    <TouchableBox
      style={{ flex: 1,
        alignItems: 'stretch',
        flexDirection : 'column',
        backgroundColor : '#f8f8f8'}}
        onPress={props.onPress} >
        <View style={{
            alignSelf: 'flex-start',
            flexDirection: 'row'}}>
            <Text
              style={{
                fontWeight: 'bold',
              }}>
              {props.id+ ' - '}
            </Text>

            <Text
              style={{
                fontWeight: 'bold'}}
                >
                { props.produto }
              </Text>
            </View>
            <View style={{ marginTop : 5 }}>
              <Text>
                { 'Qtde:  '}
                { props.qtde }
                { ' / Unit:  '}
                {numberToReal(parseInt(props.valor))}
                { ' / Total:  '}
                {numberToReal(parseInt(props.total))}
              </Text>
            </View>

            <View style={{ marginTop : 5}}>
              <Text style={{ fontWeight: 'bold' }}>
                { 'Codigo:  '}
                { props.codigo }
              </Text>
            </View>
          </TouchableBox>
        )
      }

      const styles = StyleSheet.create({
        canvas : {
          resizeMode: 'cover'
          // position : 'absolute',
          // top: 10,
          // right: 0,
          // left: 0,
          // bottom: 20,
          // paddingBottom: 20,
          // marginBottom: 20,
          // marginRight: 20
        }
      })

      export default ProductItem
