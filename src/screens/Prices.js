import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import PricesTable from '../components/PricesTable';

const POLONIEX_API = 'https://poloniex.com/public?command=returnTicker';

class Prices extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isLoading: false,
      error: null
    }
  }

  componentDidMount() {
    this.navSub = [
      this.props.navigation.addListener('didFocus', this.startFetching),
      this.props.navigation.addListener('didBlur', this.stopFetching),
    ];
  }

  componentWillUnmount() {
    this.navSub.forEach(sub => sub.remove());
  }

  startFetching = () => {
    this.fetchData();
    this.interval = setInterval(this.fetchData, 5000)
  };

  stopFetching = () => {
    clearInterval(this.interval);
    console.log('Stopped fetching')
  };

  prepareFetchedData = data => {
    // transforms the object received from api to an array to use in FlatList
    return Object.keys(data).map(k => ({name: k, ...data[k]}));
  };

  fetchData = () => {
    if (this.state.isLoading) return null;
    console.log('Starting fetch');
    this.setState({isLoading: true});
    try {
      fetch(POLONIEX_API)
        .then(res => {
          if (res.status !== 200) {
            throw new Error('Response status is not 200!');
          } else {
            return res.json();
          }
        })
        .then(parsed => {
          console.log('Received data from api, transforming and passing to state');
          let data = this.prepareFetchedData(parsed);
          this.setState({data, isLoading: false, error: null});
        })
    } catch (error) {
      console.log('Got error while requesting updates from Poloniex', error);
      this.setState({error, isLoading: false});
    }
  };


  render() {
    return (
      <View style={styles.mainContainer}>
        <Text style={styles.screenTitle}>Котировки</Text>
        <PricesTable {...this.state}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  screenTitle: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 32
  }
});

export default Prices;