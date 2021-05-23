import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import Constants from 'expo-constants';

export default function Header()
{
    return(
        <Text style = {styles.header}>Pocket Dictionary</Text>
    )
}

const styles = StyleSheet.create({
  header:
  {
    backgroundColor: "purple",
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
    padding: 30,
    margin: 0
  }
});