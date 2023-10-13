import React from 'react';
import {View, ViewProps} from 'react-native';

interface SeparatorProps extends ViewProps {
    height?: number;
    width?: number;
}

const Separator = ({height = 0, width = 0, ...extraProps}: SeparatorProps) => (
    <View style={{height, width, ...extraProps}} />
);

export default Separator;