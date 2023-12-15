import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Button, StyleSheet } from 'react-native';
import { useMutation } from '@apollo/client';
import Modal from 'react-native-modal';
import { useTheme } from './ThemeProvider';
const CreateTaskModal = ({ isVisible, onClose }) => {
    const [taskName, setTaskName] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const { dark, colors, setScheme } = useTheme();
    // Define tu estado para equipos seleccionados si lo necesitas
    // const [selectedTeams, setSelectedTeams] = useState([]);
  
    // Utiliza useMutation para la mutación de GraphQL
    //const [createTaskMutation] = useMutation();
  
    const handleCreateTask = async () => {
      /*try {
        // Lógica de validación de datos si es necesario
  
        // Realiza la mutación
        const { data } = await createTaskMutation({
          variables: {
            name: taskName,
            description: taskDescription,
            startDate: startDate,
            endDate: endDate,
            // Agrega otras variables según tu esquema GraphQL
          },
        });
  
        // Lógica posterior a la creación de la tarea si es necesario
  
        // Cierra el modal
        onClose();
      } catch (error) {
        console.error('Error al crear la tarea', error);
      }*/
    };
  
    return (
      <Modal isVisible={isVisible} onBackdropPress={onClose}>
        <View style={[styles.modalContainer, {backgroundColor: colors.background}]}>
          {/* Formulario de creación de tareas */}
          <Text style={[styles.modalTitle, { color: colors.text }]}>Nombre de la tarea:</Text>
          <TextInput style={[styles.modalInput, {color: colors.text, borderColor: colors.tint}]} value={taskName} onChangeText={(text) => setTaskName(text)} />
  
          {/* Agrega otros campos del formulario según tus necesidades (descripcion, fechas, equipos, etc.) */}
  
          {/* Botones de acción */}
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <Button title="Crear Tarea" onPress={handleCreateTask} />
            <Button title="Cancelar" onPress={onClose} />
          </View>
        </View>
      </Modal>
    );
  };

  const styles = StyleSheet.create({
    modalContainer: {
        backgroundColor: "white",
        padding: 16,
        borderRadius: 8,
      },
      modalTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 16,
      },
      modalInput: {
        borderWidth: 1,
        borderColor: "gray",
        padding: 8,
        marginBottom: 16,
      },
      modalButton: {
        backgroundColor: "blue",
        padding: 12,
        borderRadius: 8,
        alignItems: "center",
        marginBottom: 12,
      },
      modalButtonText: {
        color: "white",
        fontSize: 18,
      },
  });
  
  export default CreateTaskModal;
  