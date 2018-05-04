import React, { Component } from 'react'
import { Text, View, TouchableOpacity, ListView } from 'react-native'
import { Actions } from 'react-native-router-flux'


const ListItem = (props) => {
    return (
        <View style={{ flex: 1,
                       padding: 10,
                       flexDirection : 'row',
                       backgroundColor : '#dfdfdf'}}>
            <Text style={{ flex : 1 }}>
                { props.itemCod }
            </Text>
            <Text style={{ flex: 1 }}>
                { props.itemName }
            </Text>
        </View>
    )
}

class List extends Component {
    constructor(props) {
        super(props)
    }


    renderRow(item) {
      return <ListItem
        itemCod={item.itemCod}
        itemName={item.itemName}
        onPress={() => Actions.client({ item })} />
    }

    render () {
        return (
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
                              { this.props.ListType }
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

                    <ListView
                        dataSource={this.dataSource}
                        renderRow={this.renderRow}
                    />
                </View>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        [ownProps.listName] : [
            {itemCod : 1, itemName : 'asd'}, {itemCod : 2, itemName : 'kjf'}
        ]
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(List)
