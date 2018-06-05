import React, {Component} from 'react'
import {View, Alert} from 'react-native'
import {Text, ListItem} from 'react-native-elements'

class ExamList extends Component {
    static navigationOptions = {title: 'Exams'}
    constructor(props) {
        super(props)
        this.state = {
            exams: [],
        }
    }
    componentDidMount() {
        const {navigation} = this.props;
        const lessonId = this.props.lessonId;
        // get exams for this lesson
        fetch("http://localhost:8080/api/exam/"+lessonId+"/question")
            .then(response => (response.json()))
            .then(questions => this.setState({questions}))
    }
    render() {
        return(
            <View style={{padding: 15}}>
                {this.state.exams.map(
                    (exam, index) => (
                        <ListItem
                            onPress={() => {
                                    this.props.navigation
                                        .navigate("QuestionList", {examId: exam.id})
                            }}
                            key={index}
                            title={index}/>))}
            </View>
        )
    }
}
export default ExamList