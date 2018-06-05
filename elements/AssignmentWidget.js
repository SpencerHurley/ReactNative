import React, {Component} from 'react'
import {View} from 'react-native'
import {ListItem, Text, Input, FormLabel, FormInput, Button} from 'react-native-elements'

export default class AssignmentWidget extends Component {

    constructor() {
        super();
        this.state = {
            title: 'Assignment 1',
            description: 'This is a test description',
            text: '',
            points: 20,
        }
        this.changeText = this.changeText.bind(this)
    }

    render() {
        return(
            <View style={{padding: 15}}>
                <View>
                    <FormLabel>Name</FormLabel>
                    <FormInput onChangeText={this.changeText}/>

                </View>

                <Text h3>Preview</Text>
                <Text h2>{this.state.title}</Text>
                <Text h2>{this.state.points}</Text>
                <Text>{this.state.description}</Text>
                <Text>Essay Answer</Text>
                <Text>{this.state.text}</Text>

                <Button	backgroundColor="green"
                           color="white"
                           title="Save"/>
                <Button	backgroundColor="red"
                           color="white"
                           title="Cancel"/>
            </View>
        )
    }

    changeText(text) {
        console.log(text);
        this.setState({
            text: text
        })
    }
}