import React from 'react'
import {View} from 'react-native'
import {Text, Button, CheckBox} from 'react-native-elements'
import {FormLabel, FormInput, FormValidationMessage}
  from 'react-native-elements'

class TrueFalseQuestionEditor extends React.Component {
  static navigationOptions = { title: "TrueFalse"}
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      description: '',
      points: 0,
      isTrue: true
    }
  }
  updateForm(newState) {
    this.setState(newState)
  }

    postQuestion() {
        const {navigation} = this.props;
        const examId = navigation.getParam("examId");
        fetch('localhost:8080/api/exam/' + examId + '/truefalse', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: this.state.title,
                description: this.state.description,
                points: this.state.points,
                options: this.state.options
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

          <FormLabel>Set Points</FormLabel>
          <FormInput onChangeText={
              text => this.updateForm({points: text})
          }/>

        <FormLabel>Description</FormLabel>
        <FormInput onChangeText={
          text => this.updateForm({description: text})
        }/>

        <CheckBox onPress={() => this.updateForm({isTrue: !this.state.isTrue})}
                  checked={this.state.isTrue} title='The answer is true'/>

          <Text h2>
              Preview
          </Text>
          <Text h2>{this.state.title}</Text>
          <Text h4>{this.state.points} Points</Text>
          <Text h4>Description: {this.state.description}</Text>

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

export default TrueFalseQuestionEditor