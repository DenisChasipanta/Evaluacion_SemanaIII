import React, { useState } from 'react';
import { Modal, Portal, Text, IconButton, Divider, TextInput, Button } from 'react-native-paper';
import { styles } from '../../../theme/styles';
import { View } from 'react-native';
import { push, ref, set } from 'firebase/database';
import { auth, dbRealTime } from '../../../configs/firebaseConfig';

// Interface - Props del componente: propiedades
interface Props {
    showModalMessage: boolean;
    setShowModalMessage: Function;
}

// Interface - Formulario mensaje
interface FormMessage {
    email: string;
    comentario: string;
}

export const NewPostsComponent = ({ showModalMessage, setShowModalMessage }: Props) => {

    // Hook useState: manipulación de la data del formulario
    const [formMessage, setFormMessage] = useState<FormMessage>({
        email: auth.currentUser?.email || '',
        comentario: ''
    });

    // Función que cambie los valores del formMessage
    const handlerSetValues = (key: string, value: string) => {
        setFormMessage({ ...formMessage, [key]: value });
    }

    // Función guardar el mensaje
    const handlerSaveMessage = async () => {
        if (!formMessage.comentario) {
            return;
        }
        // Referencia a la BDD y creación tabla
        const dbRef = ref(dbRealTime, 'comentarios/' + auth.currentUser?.uid);
        // Crear una colección - evitando sobreescritura de la data
        const saveMessage = push(dbRef);
        // Almacenar en la BDD
        try {
            await set(saveMessage, formMessage);
            // Limpiar formulario
            setFormMessage({
                email: auth.currentUser?.email || '',
                comentario: ''
            });
        } catch (ex) {
            console.log(ex);
        }
        setShowModalMessage(false);
    }

    return (
        <Portal>
            <Modal visible={showModalMessage} contentContainerStyle={styles.modal}>
                <View style={styles.header}>
                    <Text variant='headlineMedium'>Comentario</Text>
                    <View style={styles.iconEnd}>
                        <IconButton
                            icon='close-circle-outline'
                            size={28}
                            onPress={() => setShowModalMessage(false)}
                        />
                    </View>
                </View>
                <Divider />
                <TextInput
                    label='Correo Electrónico'
                    mode='outlined'
                    value={formMessage.email}
                    disabled={true}
                />
                <TextInput
                    label='comentario'
                    mode='outlined'
                    multiline={true}
                    numberOfLines={7}
                    onChangeText={(value) => handlerSetValues('comentario', value)}
                />
                <Button mode='contained' onPress={handlerSaveMessage}>Enviar</Button>
            </Modal>
        </Portal>
    );
}
