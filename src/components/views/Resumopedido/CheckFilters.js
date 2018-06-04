import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { CheckBox } from 'react-native-elements'

export default class CheckFilters extends Component {
  state = {
    checked: false,
    checked2: false,
    checked3: false,
  };
  render() {
    return (
      <View
        style={{ flexDirection : 'row',
          flexWrap : 'wrap',
          justifyContent : 'center'
        }}
        >
        <CheckBox
          title="Fechados"
          checked={this.state.checked}
          onPress={() => this.setState({ checked: !this.state.checked })}
          />
        <CheckBox
          title="Abertos"
          checked={this.state.checked2}
          onPress={() => this.setState({ checked2: !this.state.checked2 })}
          />
        <CheckBox
          title="Sincronizados"
          checked={this.state.checked3}
          onPress={() => this.setState({ checked3: !this.state.checked3 })}
          />
      </View>
    )
  }
}
