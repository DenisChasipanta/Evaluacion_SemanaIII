import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { Button, Divider, Text, TextInput } from 'react-native-paper'
import { styles } from '../../theme/styles'
import { useNavigation, useRoute } from '@react-navigation/native'
import { MessagePosts } from './HomeScreen';
import { ref, remove, update } from 'firebase/database'
import { dbRealTime } from '../../configs/firebaseConfig'

export const DetailMessageScreen = () => {
    //hook para tomar propiedades de la ruta
    const route = useRoute();
    //console.log(route);
    //@ts-ignore
    const { message } = route.params;

    //hook navegación
    const navigation = useNavigation();

    //hook useState: manipulando el formulario Detailm Message
    const [editFormMessage, setEditFormMessage] = useState<MessagePosts>({
        id: '',
        to: '',
        subject: '',
        message: ''
    });

    //hook useEffect: mostrar la información del mensaje en el formulario
    useEffect(() => {
        setEditFormMessage(message)
    }, [])

    //Función para cmabiar los datos del formulario
    const handlerSetValue = (key: string, value: string) => {
        setEditFormMessage({ ...editFormMessage, [key]: value })
    }

    //Función actualizar la data del mensaje
    const handlerUpdateMessage = async () => {
        //console.log(editFormMessage);
        //1. Referencia a la BDD - tabla
        const dbRef = ref(dbRealTime, 'messages/' + editFormMessage.id)
        await update(dbRef, { message: editFormMessage.message })
        navigation.goBack();
    }

    //función para eliminar la data del mensaje
    const handlerDeleteMessage = async () => {
        //1. Referenc a la BDD - tabla
        const dbRef = ref(dbRealTime, 'messages/' + editFormMessage.id)
        await remove(dbRef);
        navigation.goBack();
    }


    return (
        <View style={styles.rootDetail}>
            <View style={{ gap: 20 }}>
                <Text style={styles.textDetail}>Comentario</Text>
                <TextInput
                    value={editFormMessage.message}
                    multiline={true}
                    numberOfLines={5}
                    onChangeText={(value) => handlerSetValue('message', value)}
                />
            </View>
            <Button mode='contained' icon='email-sync' onPress={handlerUpdateMessage}>Actualizar</Button>
            <Button mode='contained' icon='email-remove' onPress={handlerDeleteMessage}>Eliminar</Button>
        </View>
    )
}
