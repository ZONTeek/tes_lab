import React from 'react';
import {Button, Modal, Text, View, StyleSheet} from 'react-native';
import {Person} from '../types';

type PersonModalProps = {
  currentPerson: Person | undefined;
  close: () => void;
};

export const PersonModal = ({currentPerson, close}: PersonModalProps) => {
  return (
    <Modal
      animationType="fade"
      visible={!!currentPerson}
      onRequestClose={close}
      transparent>
      <View style={styles.modal_wrapper}>
        <View style={styles.modal_container}>
          <View style={styles.modal_field_row}>
            <Text>{'Name: '}</Text>
            <Text>{currentPerson?.name}</Text>
          </View>
          <View style={styles.modal_field_row}>
            <Text>{'Birth year: '}</Text>
            <Text>{currentPerson?.birth_year}</Text>
          </View>
          <View style={styles.modal_field_row}>
            <Text>{'Height: '}</Text>
            <Text>{currentPerson?.height}cm</Text>
          </View>
          <View style={styles.modal_field_row}>
            <Text>{'Mass: '}</Text>
            <Text>{currentPerson?.mass}kg</Text>
          </View>
          <View style={styles.modal_field_row}>
            <Text>{'Gender: '}</Text>
            <Text>{currentPerson?.gender}</Text>
          </View>
          <Button onPress={close} title="Close" color={'#000'} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal_wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal_container: {
    backgroundColor: '#876391',
    minWidth: '50%',
    padding: 20,
    borderRadius: 16,
  },
  modal_field_row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
});
