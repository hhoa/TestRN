import React, { Component } from 'react';
import {
  Text,
  View,
  Image
} from 'react-native';
import { connect } from 'react-redux';
import { Button, Spinner } from './common';
import { Input, CardSection } from './common2';
import { watchEmail, watchPassword, logInPress } from '../actions';

class Authentication extends Component {
  checkEmail(text) {
    this.props.watchEmail(text);
  }

  checkPassword(text) {
    this.props.watchPassword(text);
  }

  buttonPress() {
    const { emailValue, passwordValue } = this.props;
    this.props.logInPress(emailValue, passwordValue);
  }

  renderButton() {
    if (this.props.loadingValue) {
      return <Spinner size='large' />;
    }

    return (
        <Button
          onPress={this.buttonPress.bind(this)}
          style={{ borderRadius: 15, backgroundColor: 'rgb(255, 102, 98)', marginLeft: 57, marginRight: 57 }}
          textStyleOverride={{ color: 'rgb(255, 255, 255)' }}
        >
        LOGIN
        </Button>
      );
    }


  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 0.15 }} />
        <View style={{ flex: 0.18, alignItems: 'center' }}>
          <Image
            style={{ width: 255, height: null, flex: 1 }}
            source={require('../public/imgs/logoAppColor.png')}
          />
        </View>
        <View style={{ flex: 0.1 }} />
        <View>
          <CardSection>
            <Input
              placeholder='Username'
              onChangeText={this.checkEmail.bind(this)}
              value={this.props.emailValue}
              path='1'
            />
          </CardSection>

          <CardSection>
            <Input
              placeholder='Password'
              onChangeText={this.checkPassword.bind(this)}
              value={this.props.passwordValue}
              secureTextEntry
              path='2'
            />
          </CardSection>

          <CardSection style={{ marginTop: 20 }}>
            {this.renderButton()}
          </CardSection>

        </View>
        <View style={{ flex: 0.1 }} >
          <Text style={{ color: 'red', fontSize: 20, textAlign: 'center', marginTop: 20 }}>
            {this.props.errorValue}
          </Text>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    emailValue: state.Auth.email,
    passwordValue: state.Auth.password,
    errorValue: state.Auth.error,
    loadingValue: state.Auth.loading
  };
};

export default connect(mapStateToProps,
  {
    watchEmail,
    watchPassword,
    logInPress,
  })(Authentication);
