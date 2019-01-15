import React from 'react';
import { TouchableOpacity, Text, Dimensions } from 'react-native';
const { height, width } = Dimensions.get("window")
export const CSButton = ({style,color,bWidth,title,onPress,disabled}) => (
    <TouchableOpacity
    disabled= {disabled?true:false}
        onPress={()=>{onPress? disabled? null:onPress():null}}
        style={{ ...style, backgroundColor: disabled?"lightgray": color, justifyContent: "center", alignItems: "center", height: height / 18, width: width / bWidth }}
    >
        <Text style={{ color: "white", fontWeight: "500" }} >{title}</Text>
    </TouchableOpacity>
)