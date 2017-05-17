import React from 'react';
import { View } from 'react-native';

const CardSection = (props) => {
	return (
		<View style={[style.containerStyle, props.style]}>
			{props.children}
		</View>
	);
};

const style = {
	containerStyle: {
		backgroundColor: '#fff',
		justifyContent: 'flex-start',
		flexDirection: 'row',
		position: 'relative',
		marginTop: 5,
		marginBottom: 5,
	}
};

export { CardSection };
