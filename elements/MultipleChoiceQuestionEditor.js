import React from 'react'
import {View} from 'react-native'
import {Text, Button, ListItem} from 'react-native-elements'
import {FormLabel, FormInput, FormValidationMessage, Icon}
  from 'react-native-elements'

class MultipleChoiceQuestionEditor extends React.Component {
  static navigationOptions = { title: "MultChoice"}
  constructor(props) {
    super(props)
    this.addOption = this.addOption.bind(this);
    this.postQuestion = this.postQuestion.bind(this);
    this.state = {
      title: '',
      description: '',
      nextQuestion: '',
      points: 0,
      options: [],
      selectedItem : -1
    }
  }

  updateForm(newState) {
    this.setState(newState)
  }

  addOption() {
      console.log();
      this.state.options.push(this.state.nextQuestion);
      this.setState({nextQuestion: ''});
  }

  postQuestion() {
      const {navigation} = this.props;
      const examId = navigation.getParam("examId");
      fetch('localhost:8080/api/exam/' + examId + '/choice', {
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

        <FormLabel>Input next choice</FormLabel>
        <FormInput onChangeText={
          text => this.updateForm({nextQuestion: text})
        }/>
         <Button
             backgroundColor="green"
             color="white"
             title="Add Question"
             onPress={this.addOption}
          />


        <Text h3>Preview</Text>
        <Text h2>{this.state.title}</Text>
        <Text>{this.state.description}</Text>
          <Text>{this.state.points} points</Text>
          <View>
          {
              this.state.options.map((item, i) => (
                  <ListItem
                      key={i}
                      leftIcon={{name: i == this.state.selectedItem ? 'donut-small' : 'donut-large'}}
                      title={item}
                      onPress={() => this.updateForm({selectedItem: i})}
                      containerStyle={{backgroundColor: i == this.state.selectedItem ? 'blue' : 'lightgrey'}}
                      rightIcon={<Icon name='clear'
                                       onPress={() => {
                                           this.state.options.splice(i, 1);
                                           this.forceUpdate();
                                       }}
                      />}
                  />
              ))
          }
          </View>

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

export default MultipleChoiceQuestionEditor