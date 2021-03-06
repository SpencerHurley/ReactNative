import React from 'react';
import { StyleSheet, Text, View, StatusBar, ScrollView } from 'react-native';
import FixedHeader from './elements/FixedHeader'

import { createStackNavigator } from 'react-navigation'
import {Button} from 'react-native-elements'
import ScreenX from './elements/ScreenX'
import CourseList from './components/CourseList'
import ModuleList from './components/ModuleList'
import LessonList from './components/LessonList'
import WidgetList from './components/WidgetList'
import QuestionList from './components/QuestionList'
import Assignment from "./elements/AssignmentWidget";
import LessonLanding from './elements/LessonLandingPage';
import Essay from './elements/EssayEditor';
import TrueFalse from './elements/TrueFalseQuestionEditor';
import MultChoice from './elements/MultipleChoiceQuestionEditor';
import Blanks from './elements/FillInBlanks';

class Home extends React.Component {
  static navigationOptions = {
    title: 'Home'
  }
  constructor(props) {
    super(props)
  }
  render() {
    return(
      <ScrollView>
        <StatusBar barStyle="light-content"/>
        <FixedHeader/>

        <Button title="Courses"
                onPress={() => this.props.navigation
                  .navigate('CourseList') } />
      </ScrollView>
    )
  }
}

class ScreenA extends React.Component {
  static navigationOptions = {title: "Screen A"}
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <View>
        <Text h1>Screen A</Text>
        <Button title="Go Home"
                onPress={() =>this.props
                  .navigation
                  .goBack()} />
      </View>
    )
  }
}

const ScreenB = () => (
  <View>
    <Text h1>Screen B</Text>
  </View>
)

const App = createStackNavigator({
  Home,
  CourseList,
  ModuleList,
  LessonList,
  WidgetList,
    Assignment,
    LessonLanding,
  QuestionList,
  TrueFalse,
  MultChoice,
    Essay,
    Blanks,
  ScreenA,
  ScreenB,
  ScreenX,

});

export default App;

