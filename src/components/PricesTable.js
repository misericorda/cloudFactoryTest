import React, {Component} from 'react';
import {Text, View, FlatList, StyleSheet, ActivityIndicator} from 'react-native';

const Cell = ({value, isHeader}) => (
  <View style={styles.cell}>
    <Text style={isHeader ? styles.headerText : null}>{value}</Text>
  </View>
);


const PricesTable = ({data, isLoading, error}) => {

  const keyExtractor = (item, index) => item.name;

  const renderRow = ({item}) => (
    <View style={styles.tableRow}>
      <Cell value={item.name}/>
      <Cell value={item.last}/>
      <Cell value={item.highestBid}/>
      <Cell value={item.percentChange}/>
    </View>
  );

  return (
    <View style={styles.mainContainer}>
      {isLoading &&
      <View style={styles.loadingIndicatorContainer}>
        <ActivityIndicator size="large" color="#0000ff"/>
      </View>
      }
      <View style={styles.tableHeaderRow}>
        <Cell value='Ticker' isHeader/>
        <Cell value='Last' isHeader/>
        <Cell value='Highest Bid' isHeader/>
        <Cell value='Change %' isHeader/>
      </View>
      {error &&
      <View style={styles.errorContainer}>
        <Text style={styles.errorMessage}>Ошибка</Text>
      </View>
      }
      <FlatList
        data={data}
        renderItem={renderRow}
        keyExtractor={keyExtractor}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    paddingLeft: 15,
    paddingRight: 15
  },
  errorContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
    paddingBottom: 10
  },
  errorMessage: {
    fontWeight: 'bold',
    color: '#b00000'
  },
  loadingIndicatorContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5FCFF88'
  },
  tableHeaderRow: {
    flexDirection: 'row',
    paddingTop: 15,
    paddingBottom: 15
  },
  tableRow: {
    flex: 1,
    alignSelf: 'stretch',
    flexDirection: 'row'
  },
  cell: {
    flex: 1,
    alignSelf: 'stretch'
  },
  headerText: {
    fontWeight: '900'
  }
});

export default PricesTable;