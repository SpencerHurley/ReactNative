import React, {Component} from 'react'
import {View} from 'react-native'
import {ListItem, Text, Input, FormLabel, FormInput, Button} from 'react-native-elements'

export default class AssignmentWidget extends Component {
    static navigationOptions = {title: 'Assignment'}
    constructor(props) {
        super(props);
        this.state = {
            title: 'Assignment 1',
            description: 'This is a test description',
            text: '',
            points: 20,
        }
        this.changeText = this.changeText.bind(this);
        this.postAssignment = this.postAssignment.bind(this);
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
                           title="Save"
                           onPress={this.postAssignment}
                />
                <Button	backgroundColor="red"
                           color="white"
                           title="Cancel"
                           onPress={() =>this.props
                               .navigation
                               .goBack()}
                />
            </View>
        )
    }

    postAssignment() {
        fetch('localhost:8080/api/lesson' + this.props.lesson.id + 'assignment', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.state),
        });
    }

    changeText(text) {
        console.log(text);
        this.setState({
            text: text
        })
    }
}