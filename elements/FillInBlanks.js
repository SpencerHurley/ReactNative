import React from 'react'
import {View} from 'react-native'
import {Text, Button, ListItem} from 'react-native-elements'
import {FormLabel, FormInput, FormValidationMessage, Icon}
    from 'react-native-elements'

class Blanks extends React.Component {
    static navigationOptions = { title: "Blanks"}
    constructor(props) {
        super(props)
        this.addOption = this.addOption.bind(this);
        this.postQuestion = this.postQuestion.bind(this);
        this.state = {
            title: '',
            description: '',
            nextQuestion: '',
            points: 0,
            variables: ''
        }
    }

    updateForm(newState) {
        this.setState(newState)
        this.forceUpdate();
    }

    addOption() {
        console.log();
        this.state.options.push(this.state.nextQuestion);
        this.setState({nextQuestion: ''});
    }

    postQuestion() {
        const {navigation} = this.props;
        const examId = navigation.getParam("examId");
        fetch('localhost:8080/api/exam/' + examId + '/blanks', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: this.state.title,
                description: this.state.description,
                points: this.state.points,
                options: this.state.options,
                variables: this.state.variables
            }),
        });
    }

    render() {
        return(
            <View>
                <FormLabel>Title</FormLabel>
                <FormInput onChangeText={
                    text => this.updateForm({title: text})
                }/>
                <FormValidationMessage>
                    Title is required
                </FormValidationMessage>

                <FormLabel>Description</FormLabel>
                <FormInput onChangeText={
                    text => this.updateForm({description: text})
                }/>

                <FormLabel>Points</FormLabel>
                <FormInput onChangeText={
                    text => this.updateForm({points: text})
                }/>

                <FormLabel>Input Question</FormLabel>
                <FormInput onChangeText={
                    text => this.updateForm({variables: text})
                }/>

                <Text h3>Preview</Text>
                <Text h2>{this.state.title}</Text>
                <Text>{this.state.description}</Text>
                <Text>{this.state.points} points</Text>
                <Parse text={this.state.variables}/>

                <Button	backgroundColor="green"
                           color="white"
                           title="Save"
                           onPress={this.postQuestion}
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
}

const Parse = ({text}) => {
    let toReturn = [];

    let splits = text.split(/\[[^\]]+\]/gm);

    for (let i = 0; i < splits.length; i++) {
        toReturn.push(<Text>{splits[i]}</Text>);
        toReturn.push(<FormInput/>)
    }

    return toReturn;

}

export default Blanks