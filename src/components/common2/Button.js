import React from 'react';
import { TouchableOpacity } from 'react-native';

const Button = ({ onPress, style, children }) => {
	const { buttonStyle } = styles;

	return (
		<TouchableOpacity onPress={onPress} style={[buttonStyle, style]}>
      {children}
		</TouchableOpacity>
	);
};

const styles = {
	imgStyle: {
    padding: 30,
    paddingLeft: 36,
    paddingRight: 36,
	},

	buttonStyle: {
		flex: 1,
    height: 60,
		alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgb(255, 255, 255)'
	}
};

export { Button };
