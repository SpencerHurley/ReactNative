import React, {Component} from 'react'
import {View, Alert} from 'react-native'
import {Text, ListItem, Button} from 'react-native-elements'
import QuestionList from "../components/QuestionList";
import ExamList from "../components/ExamList";

class LessonLanding extends Component {
    static navigationOptions = {title: 'LessonLanding'}
    constructor(props) {
        super(props);

        /*
      fetch('http://localhost:8080/api/course')
        .then(response => (response.json()))
        .then(courses => {
          this.setState({courses: courses})
        })
        */
        this.state = {
            courses: [{courseId: 5880, title: 'Web Development'}]
        }
    }

    render() {
        const lessonId = this.props.navigation.getParam('lessonId');
        return(
            <View style={{padding: 15}}>
                <ExamList lessonId={lessonId}/>
                <Button title="New Exam"
                        onPress={() =>
                            fetch('http://localhost:8080/api/exam')
                                .then(response => (response.json()))
                                .then(courses => {
                                    this.setState({courses: courses})
                                })}/>
                <Button title="New Assignment"
                        onPress={() =>
                            this.props.navigation
                                .navigate('Assignment', {lessonId: lessonId})}/>
            </View>
        )
    }
}
export default LessonLanding