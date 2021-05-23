import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity} from 'react-native';

import Header from "./assets/header"

export default class extends React.Component
{
  constructor()
  {
    super();
    this.state = {
      //stuff to check what we entered
      currText: "",
      isSearchPressed: false,
      lexicalCategory: '',
      examples: [], 
      definition: '',
      word: ''
    }
  }

  getWord=(word)=>{
    var searchKeyword=word.toLowerCase();
    var url = "https://rupinwhitehatjr.github.io/dictionary/"+searchKeyword+".json"
    console.log(url);
    return fetch(url)
    .then((data)=>{
      if(data.status === 200)
      {
        return data.json()
      }
      else
      {
        return null
      }
    })
    .then((response)=>{
      console.log(response);

      var responseObj = response

      if(responseObj)
      {
        var wordData = responseObj.definitions[0];
        var def = wordData.description;
        var lexCategory = wordData.wordtype;

        this.setState({
          "word": this.state.currText,
          "definition" : def,
          "lexicalCategory" : lexCategory
        })
      }
      else
      {
        this.setState({
          "word" : this.state.currText,
          "definition" : "Couldn't find it ¯\_(ツ)_/¯"
        })
      }
    })
  }

  render()
  {
    return(
      <View>
        <Header/>
        <View style = {styles.container}>
          <View style = {styles.inputBoxContainer}>
            <TextInput 
            style = {styles.inputBox}
            placeholder = "What do you want to know?"
            onChangeText={currText => {
              this.setState({
                currText:currText,
                isSearchPressed: false,
                word: "loading...",
                lexicalCategory: '', 
                examples: [],
                definition: ''
              });
            }}
            value = {this.state.currText}
            />
          </View> 
          
          <View style = {styles.buttonView}>
            <TouchableOpacity
            style = {styles.buttonStyle}
            title = "Find the definition!"
            onPress = {() => {
              this.setState({isSearchPressed: true})
              this.getWord(this.state.currText)
            }}
            >
              <Text style = {styles.buttonText}>Find the definition!</Text>
            </TouchableOpacity>
          </View>

          <View style = {styles.outputBox}>
            <Text style = {styles.textStyle}>Word:{""}</Text>
            <Text>{this.state.word}</Text>
            <Text style = {styles.textStyle}>Type:{""}</Text>
            <Text>{this.state.lexicalCategory}</Text>
            <Text style = {styles.textStyle}>Definition:{""}</Text>
            <Text>{this.state.definition}</Text>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  inputBox: {
    width: 400,
    height: 40,
    borderWidth: 2,
    margin: 20,
  },
  outputBox: {
    flex: 1,
    margin: 80,
    alignItems: 'center'
  },
  inputBoxContainer: {
    flex: 0.3,
    alignItems: 'center',
    height: 40,
    margin: 30
  },
  buttonStyle:
  {
    width: 150,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    borderRadius: 5,
    alignSelf: "center",
    backgroundColor: "black"
  },
  buttonText:
  {
    color: "white",
    fontWeight: "bold"
  },
  buttonView: 
  {
    margin: 30,
    alignItems: 'center'
  },
  textStyle:
  {
    fontWeight: 'bold'
  }
});
