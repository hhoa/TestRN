import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
  LayoutAnimation,
  UIManager,
  Platform
} from 'react-native';
import { connect } from 'react-redux';
import firebase from 'firebase';

import { favPressedCreate, selectKinder } from '../actions';
import { CardSection } from './common';
import * as c2 from './common2';

class ListItem extends Component {

  componentWillUpdate() {
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental
        && UIManager.setLayoutAnimationEnabledExperimental(true);
    }
    LayoutAnimation.spring();
  }

  favButtonPress() {
    const sendValue = this.props.chooseStar === 1 ? 0 : 1;
    this.props.favPressedCreate(this.props.kinderItem.id, sendValue);
  }

  checkIfFaved() {
    if (this.props.chooseStar === 0) {
      return (
        <Image
          style={styles.imgStar}
          source={require('../public/imgs/icStarNotChoose@3x.png')}
        />
      );
    }

    return (
      <Image
        style={styles.imgStar}
        source={require('../public/imgs/icStarChoose@3x.png')}
      />
    );
  }

  checkIfExpand() {
    if (this.props.expand) {
      return (
        <View>
          <View>
            <Image
              style={{ height: 213, width: null, flex: 1 }}
              source={{ uri: `${this.props.kinderItem.image}` }}
            />
          </View>
          <View style={{ alignItems: 'flex-end' }}>
            <TouchableWithoutFeedback
              style={styles.buttonStar}
              onPress={this.favButtonPress.bind(this)}
            >
              <View
                style={{
                  margin: 10,
                  borderWidth: 1,
                  borderRadius: 30,
                  backgroundColor: 'rgb(255, 255, 255)',
                  position: 'relative',
                  bottom: 40
                }}
              >
                {this.checkIfFaved()}
              </View>
            </TouchableWithoutFeedback>
          </View>

          <c2.CardSection>
            <View style={{ flex: 0.145, alignItems: 'center', justifyContent: 'center' }}>
              <Image
                style={styles.imgStyle}
                source={require('../public/imgs/icAddress@3x.png')}
              />
            </View>
            <View style={{ flex: 0.768 }}>
              <Text style={styles.textStyle}>
                {this.props.kinderItem.address}
              </Text>
            </View>
          </c2.CardSection>

          <c2.CardSection>
            <View style={{ flex: 0.145, alignItems: 'center', justifyContent: 'center' }}>
              <Image
                style={styles.imgStyle}
                source={require('../public/imgs/icPhone@3x.png')}
              />
            </View>
            <View style={{ flex: 0.768 }}>
              <Text style={styles.textStyle}>
                {this.props.kinderItem.phone}
              </Text>
            </View>
          </c2.CardSection>

          <c2.CardSection>
            <View style={{ flex: 0.145, alignItems: 'center', justifyContent: 'center' }}>
              <Image
                style={styles.imgStyle}
                source={require('../public/imgs/icUpdate@3x.png')}
              />
            </View>
            <View style={{ flex: 0.768 }}>
              <Text style={styles.textStyle}>
                {this.props.kinderItem.last_updated}
              </Text>
            </View>
          </c2.CardSection>
        </View>
      );
    }
  }

  checkIfContent() {
    if ((this.props.type === 0 && this.props.kinderItem.title !== undefined)
          || this.props.chooseStar === 1) {
      return (
        <View>
          <CardSection style={{ flex: 1, padding: 5, margin: 10 }}>
            <View style={{ flex: 0.136 }}>
              <Image
                style={{ padding: 12, marginLeft: 8 }}
                source={require('../public/imgs/icLogo@2x.png')}
              />
            </View>

            <View style={{ flex: 0.864 }}>
              <Text
                style={{ fontSize: 18, fontWeight: 'bold', }}
              >
                {this.props.kinderItem.title}
              </Text>
            </View>
          </CardSection>

          <View>
            {this.checkIfExpand()}
          </View>
        </View>
      );
    }
  }

  render() {
    return (
      <TouchableWithoutFeedback
        onPress={() => this.props.selectKinder(this.props.kinderItem.id)}
      >
        <View>
          {this.checkIfContent()}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = {
  buttonStar: {
    backgroundColor: 'rgb(0, 0, 0)',
  },
  imgStar: {
    padding: 20,
  },
  imgStyle: {
    padding: 14
  },
  textStyle: {
    fontSize: 16
  }
};

const mapStateToProps = (state, ownProps) => {
  const { currentUser } = firebase.auth();
  if (currentUser === null) {
    return;
  }
  const expand = state.Select === ownProps.kinderItem.id;

  let chooseStar = 0;

  if ('users' in ownProps.kinderItem) {
    if (ownProps.kinderItem.users[`${currentUser.uid}`] === 1) {
      chooseStar = 1;
    }
  }

  const type = state.Content;

  return ({
    expand,
    chooseStar,
    type
  });
};

export default connect(mapStateToProps, { favPressedCreate, selectKinder })(ListItem);
