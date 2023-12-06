import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {ListItem} from './src/components/ListItem';
import {PersonModal} from './src/components/Modal';

import {getPeople} from './src/api';
import {Person} from './src/types';

const REFRESH_INTERVAL = 30000;

function App(): JSX.Element {
  const [data, setData] = useState<{page: number; people: Person[]}>({
    page: 1,
    people: [],
  });
  const [error, setError] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentPerson, setCurrentPerson] = useState<Person>();

  const interval = useRef<NodeJS.Timeout>();

  const getData = useCallback(async () => {
    if (isLoading) {
      return;
    }

    try {
      setIsLoading(true);
      const {data: _data} = await getPeople(data.page);

      setData(prevData => ({
        page: prevData.page + 1,
        people: [...prevData.people, ..._data.results],
      }));
    } catch (err) {
      setError('Error during fetch');
    } finally {
      setIsLoading(false);
    }
  }, [data.page, isLoading]);

  useEffect(() => {
    setIsLoading(true);
    getData();

    interval.current = setInterval(() => {
      refreshData();
    }, REFRESH_INTERVAL);

    return () => {
      if (interval.current !== null) {
        clearInterval(interval.current);
      }
    };
  }, []);

  const refreshData = () => {
    if (interval.current !== null) {
      clearInterval(interval.current);
    }
    interval.current = setInterval(() => {
      refreshData();
    }, REFRESH_INTERVAL);

    setData({page: 1, people: []});
    setIsLoading(true);
    getData();
  };

  const openModal = (item: Person) => {
    setCurrentPerson(item);
  };

  const closeModal = () => {
    setCurrentPerson(undefined);
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <Text style={styles.header}>Star wars people</Text>
      <Text style={styles.error}>{error}</Text>
      <View style={styles.list_container}>
        {isLoading && data.people?.length === 0 ? (
          <ActivityIndicator size={'large'} />
        ) : (
          <>
            <FlatList
              data={data.people}
              onEndReachedThreshold={0.1}
              onEndReached={getData}
              refreshControl={
                <RefreshControl
                  refreshing={isLoading}
                  onRefresh={refreshData}
                />
              }
              renderItem={({item}) => (
                <ListItem item={item} onPress={openModal} />
              )}
            />
          </>
        )}
      </View>
      <PersonModal currentPerson={currentPerson} close={closeModal} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 20,
  },
  header: {
    fontSize: 21,
    color: '#000',
  },
  list_container: {
    flex: 1,
    justifyContent: 'center',
  },
  error: {
    color: 'red',
    fontSize: 16,
  },
});

export default App;
