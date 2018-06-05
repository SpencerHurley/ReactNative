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
        this.changeTitle = this.changeTitle.bind(this);
        this.changeText = this.changeText.bind(this);
        this.changePoints = this.changePoints.bind(this);
        this.postAssignment = this.postAssignment.bind(this);
        console.log(this.props);
    }

    render() {
        return(
            <View style={{padding: 15}}>
                <View>
                    <FormLabel>Change Title</FormLabel>
                    <FormInput onChangeText={this.changeTitle}/>

                    <FormLabel>Change Points</FormLabel>
                    <FormInput onChangeText={this.changePoints}/>

                    <FormLabel>Change Description</FormLabel>
                    <FormInput onChangeText={this.changeText}/>

                </View>

                <Text h3>Preview</Text>
                <Text h2>{this.state.title}</Text>
                <Text h2>{this.state.points}</Text>
                <Text>{this.state.description}</Text>
                <Text>Essay Answer</Text>
                <FormInput/>

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
        const {navigation} = this.props;
        const lessonId = navigation.getParam("lessonId");
        fetch('localhost:8080/api/lesson/' + lessonId + '/assignment', {
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
            description: text
        })
    }

    changeTitle(text) {
        console.log(text);
        this.setState({
            title: text
        })
    }

    changePoints(text) {
        console.log(text);
        this.setState({
            points: text
        })
    }
}