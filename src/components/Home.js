import _ from 'lodash';
import React, { Component } from 'react';
import {
  View,
  ListView,
  Image
} from 'react-native';
import firebase from 'firebase';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import moment from 'moment';

import { loadData, changeContent } from '../actions';
import ListItem from './ListItem';
import { Spinner } from './common';
import { Button } from './common2';

class Home extends Component {

  componentWillMount() {
    this.props.loadData();
    this.createDataSource(this.props);
  }

  componentWillReceiveProps(nextProps) {
    // nextProps are the next set of props that this component
    // will be rendered with
    // this.props is still the old set of props

    this.createDataSource(nextProps);
  }

  createDataSource({ kinder }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.dataSource = ds.cloneWithRows(kinder);
  }

  changeStyleButton(id) {
    if (id === this.props.con) {
      return styles.buttonSelectedStyle;
    }

    return styles.buttonNotSelectedStyle;
  }

  changeImgHomeButton(id) {
    if (id === this.props.con) {
      return (
        <Image
          style={{ padding: 12, paddingLeft: 15, paddingRight: 15 }}
          source={require('../public/imgs/icHome@3x.png')}
        />
      );
    }

    return (
      <Image
        style={{ padding: 12, paddingLeft: 15, paddingRight: 15 }}
        source={require('../public/imgs/icHomeNotchoose@3x.png')}
      />
    );
  }

  changeImgFavButton(id) {
    if (id === this.props.con) {
      return (
        <Image
          style={{ padding: 12, paddingLeft: 15, paddingRight: 15 }}
          source={require('../public/imgs/icFavorites@3x.png')}
        />
      );
    }

    return (
      <Image
        style={{ padding: 12, paddingLeft: 15, paddingRight: 15 }}
        source={require('../public/imgs/icStarNotChoose@3x.png')}
      />
    );
  }

  renderListOrNot() {
    if (this.props.kinder.length === 0) {
      return (
        <Spinner size='large' />
      );
    }

    return (
      <ListView
        enableEmptySections
        dataSource={this.dataSource}
        renderRow={this.renderRow}
      />
    );
  }

  renderRow(kinderItem) {
    return <ListItem kinderItem={kinderItem} />;
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderListOrNot()}
        <View style={styles.buttonStyle}>
          <Button
            onPress={() => this.props.changeContent(0)}
            style={this.changeStyleButton(0)}
            path='1'
          >
            {this.changeImgHomeButton(0)}
          </Button>
          <Button
            onPress={() => this.props.changeContent(1)}
            style={this.changeStyleButton(1)}
            path='2'
          >
            {this.changeImgFavButton(1)}
          </Button>
          <Button
            path='3'
            onPress={() => {
                              firebase.auth().signOut();
                              Actions.MyAuth();
                            }}
          >
            <Image
              style={{ padding: 12, paddingLeft: 15, paddingRight: 15 }}
              source={require('../public/imgs/icLogOut@3x.png')}
            />
          </Button>
        </View>
      </View>
    );
  }
}

const styles = {
  container: {
    marginTop: 50,
    flex: 1
  },
  buttonStyle: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    borderTopWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.5)'
  },
  buttonSelectedStyle: {
    backgroundColor: 'rgb(255, 102, 98)'
  },
  buttonNotSelectedStyle: {
    backgroundColor: 'rgb(255, 255, 255)'
  },
};

const mapStateToProps = state => {
  let kinder = _.map(state.Data, (val, uid) => {
    return { ...val, uid };
  });

  kinder = kinder.sort((a, b) => {
    if ((typeof b.last_updated === 'undefined' && typeof a.last_updated !== 'undefined')
          || moment(a.last_updated).isAfter(b.last_updated)) {
        return -1;
    }
    if ((typeof a.last_updated === 'undefined' && typeof b.last_updated !== 'undefined')
          || moment(a.last_updated).isBefore(b.last_updated)) {
        return 1;
    }

    return 0;
  });

  const con = state.Content;

  return { kinder, con };
};

export default connect(mapStateToProps, { loadData, changeContent })(Home);
