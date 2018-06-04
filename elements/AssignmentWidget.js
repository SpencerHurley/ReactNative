import React, {Component} from 'react'
import {View} from 'react-native'
import {ListItem, Text, Input, FormLabel, FormInput} from 'react-native-elements'

export default class AssignmentWidget extends Component {

    render() {
        return(
            <View style={{padding: 15}}>
                <View>
                    <FormLabel>Name</FormLabel>
                    <FormInput onChangeText={someFunction}/>
                    <FormValidationMessage>Error message</FormValidationMessage>

                </View>
                <View>
                    <Text h2>{this.props.assignment.title} {this.props.assignment.points}</Text>
                    <Text>{this.props.assignment.description}</Text>
                    <Input></Input>
                    <Text>Upload a File</Text>
                </View>
            </View>
        )
    }
}