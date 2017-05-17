import React from 'react';
import { TextInput, View, Image } from 'react-native';

const Input = ({ value, onChangeText, placeholder, secureTextEntry, path }) => {
	const { inputStyle, imgStyle, containerStyle } = styles;
	const IMAGES = {
		image1: require('../../public/imgs/icMail@2x.png'),
		image2: require('../../public/imgs/icLock@2x.png'),
	};

	return (
		<View style={containerStyle}>
			<Image
				style={imgStyle}
				source={IMAGES['image' + path]}
			/>
			<TextInput
				secureTextEntry={secureTextEntry}
				placeholder={placeholder}
				autoCorrect={false}
				style={inputStyle}
				value={value}
				onChangeText={onChangeText}
			/>
		</View>
	);
};

const styles = {
	inputStyle: {
		color: '#000',
		paddingRight: 5,
		paddingLeft: 15,
		fontSize: 18,
		lineHeight: 23,
		flex: 1
	},
	imgStyle: {
		paddingLeft: 10,
	},
	containerStyle: {
		height: 50,
		flex: 1,
		marginLeft: 57,
		marginRight: 57,
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'row',
	}
};

export { Input };
