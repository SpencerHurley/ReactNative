import React, {Component} from 'react'
import {View} from 'react-native'
import {ListItem, Text} from 'react-native-elements'


export default class Exam extends Component {
  constructor() {
    super();
    this.state = {
      questions: []
    }
  }
  render() {
    return(
      <View style={{padding: 15}}>
        <Text h2>Lists</Text>
        {questions.map( (question, index) => (
          <ListItem
            key={index}
            leftIcon={{name: question.icon}}
            subtitle={question.subtitle}
            title={question.title}/>
        ))}
      </View>
    )
  }

  componentWillMount() {
    const examId = navigation.getParam("examId")
    fetch('localhost:8080/api/exam/' + examId)
        .then(response => response.json())
        .then(this.questions = response.questions)
  }
}