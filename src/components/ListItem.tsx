import React from 'react';
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import {Person} from '../types';

type ListItemProps = {
  item: Person;
  onPress: (arg: Person) => void;
};

export const ListItem = ({item, onPress}: ListItemProps): JSX.Element => {
  const {name, birth_year, gender} = item;
  return (
    <TouchableOpacity
      onPress={() => onPress(item)}
      style={styles.list_item_container}>
      <View>
        <Text style={styles.list_item_primary_text}>{name}</Text>
        <Text style={styles.list_item_secondary_text}>{gender}</Text>
      </View>
      <Text style={styles.list_item_primary_text}>{birth_year}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  list_item_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 15,
    padding: 20,
    borderRadius: 16,
    backgroundColor: '#FFF',
  },
  list_item_primary_text: {
    fontSize: 18,
    color: '#000',
  },
  list_item_secondary_text: {
    fontSize: 14,
    color: 'grey',
  },
});
