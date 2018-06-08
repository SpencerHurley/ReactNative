import React, {Component} from 'react'
import {View, Alert} from 'react-native'
import {Text, ListItem, Button} from 'react-native-elements'
import QuestionTypeButtonGroupChooser from "../elements/QuestionTypeButtonGroupChooser";
import QuestionTypePicker from "../elements/QuestionTypePicker";

class QuestionList extends Component {
  static navigationOptions = {title: 'Questions'}
  constructor(props) {
    super(props)
    this.state = {
      questions: [],
      examId: 1,
        questionType : 1
    }
    this.questionTypes = ["Essay", "TrueFalse", "MultChoice", "Blank"];
  }
  componentDidMount() {
    const {navigation} = this.props;
    console.log(this.props);
    this.examId = this.props.navigation.getParam('examId');
    this.setQuestionType = this.setQuestionType.bind(this);
    fetch("http://localhost:8080/api/exam/"+this.examId)
      .then(response => (response.json()))
      .then(exam => this.setState({questions: exam.questions}))
  }

  setQuestionType(index) {
    console.log("New index");
    console.log(index);
    this.setState({questionType: index})
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
                                      .navigate("True False", {questionId: question.id,
                                      examId : this.examId})
                              if(question.type === "MultipleChoice")
                                  this.props.navigation
                                      .navigate("Multiple Choice", {questionId: question.id, examId : this.examId})
                              if(question.type === "Essay")
                                  this.props.navigation
                                      .navigate("Essay", {questionId: question.id, examId : this.examId})
                              if(question.type === "FillInTheBlank")
                                  this.props.navigation
                                      .navigate("FillInTheBlankEditor", {questionId: question.id, examId : this.examId})
                          }}
                          key={index}
                          subtitle={question.description}
                          title={question.title}/>))}
          </View>
          <QuestionTypeButtonGroupChooser onChange={this.setQuestionType}/>
          <Button	backgroundColor="green"
                     color="white"
                     title="Add Question"
                     onPress={() => this.props.navigation.navigate(this.questionTypes[this.state.questionType], {examId : this.examId})}
          />

      </View>
    )
  }
}
export default QuestionList