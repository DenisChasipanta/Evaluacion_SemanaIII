import React from 'react';
import { View } from 'react-native';
import { IconButton, Text } from 'react-native-paper';
import { styles } from '../../../theme/styles';
import { MessagePosts } from '../HomeScreen';
import { CommonActions, useNavigation } from '@react-navigation/native';

interface Props {
    message: MessagePosts;
}

export const PostsComponent = ({ message }: Props) => {

    //hook navegación
    const navigation = useNavigation();

    return (
        <View style={styles.rootMessage}>
            <View>
                <Text variant='labelLarge'>Comentario: {message.to}</Text>
                <Text variant='bodyMedium'>Email: {message.subject}</Text>
            </View>
            <View style={styles.iconEnd}>
                <IconButton
                    icon="email-open"
                    size={25}
                    onPress={() => navigation.dispatch(CommonActions.navigate({ name: 'Detail', params: { message } }))}
                />
            </View>
        </View>
    )
}
