import React, {Component} from 'react'
import {View, Alert} from 'react-native'
import {Text, ListItem} from 'react-native-elements'

class QuestionList extends Component {
  static navigationOptions = {title: 'Questions'}
  constructor(props) {
    super(props)
    this.state = {
      questions: [],
      examId: 1
    }
  }
  componentDidMount() {
    const {navigation} = this.props;
    this.examId = this.props.navigation.getParam('examId');
    fetch("http://localhost:8080/api/exam/"+this.examId)
      .then(response => (response.json()))
      .then(exam => this.setState({questions: exam.questions}))
  }
  render() {
    return(
      <View style={{padding: 15}}>
          <Text>Question List:</Text>
          <View>
              {this.state.questions.map(
                  (question, index) => (
                      <ListItem
                          onPress={() => {
                              if(question.type === "TrueFalse")
                                  this.props.navigation
                                      .navigate("TrueFalseQuestionEditor", {questionId: question.id,
                                      examId : this.examId})
                              if(question.type === "MultipleChoice")
                                  this.props.navigation
                                      .navigate("MultipleChoiceQuestionEditor", {questionId: question.id, examId : this.examId})
                              if(question.type === "Essay")
                                  this.props.navigation
                                      .navigate("EssayQuestionEditor", {questionId: question.id, examId : this.examId})
                              if(question.type === "FillInTheBlank")
                                  this.props.navigation
                                      .navigate("FillInTheBlankEditor", {questionId: question.id, examId : this.examId})
                          }}
                          key={index}
                          subtitle={question.description}
                          title={question.title}/>))}
          </View>

      </View>
    )
  }
}
export default QuestionList