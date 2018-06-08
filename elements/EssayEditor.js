import React, {Component} from 'react'
import {View} from 'react-native'
import {ListItem, Text, Input, FormLabel, FormInput, Button} from 'react-native-elements'

export default class Essay extends Component {
    static navigationOptions = {title: 'Essay'}
    constructor(props) {
        super(props);
        this.state = {
            title: 'Essay',
            description: 'Essay Description',
            points: 20
        }
        this.changeText = this.changeText.bind(this);
        this.changePoints = this.changePoints.bind(this);
        this.postEssay = this.postEssay.bind(this);
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
                           onPress={this.postEssay}
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

    postEssay() {
        const {navigation} = this.props;
        const examId = navigation.getParam("essayId");
        fetch('localhost:8080/api/exam/' + examId + '/essay', {
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


    changePoints(text) {
        console.log(text);
        this.setState({
            points: text
        })
    }
}