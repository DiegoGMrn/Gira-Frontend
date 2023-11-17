import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useTheme } from "../../components/ThemeProvider";
import Modal from "react-native-modal";
import Toast from "react-native-toast-message";
import { useFocusEffect } from "@react-navigation/native";

interface ProyectScreenProps {
  navigation: any;
}

function ProyectScreen({ navigation }: ProyectScreenProps) {
  const { dark, colors, setScheme } = useTheme();
  const [isCreateModalVisible, setCreateModalVisible] = useState(false);
  const [newName, setNewName] = useState("");
  const [proyects, setProyects] = useState([]);
  const get_proyects_m = gql`
    query showInfoProyecto {
        showInfoProyecto
    }
  `;

  const createProyect_m = gql`
    mutation createProyecto($proyectoInput: CreateProyectoInput!) {
      createProyecto(proyectoInput: $proyectoInput)
    }
  `;
  const [createProyect] = useMutation(createProyect_m, {
    variables: {
      proyectoInput: {
        name: newName,
      },
    },
    onCompleted: (data) => {
      const confirm = data.createProyecto;
      console.log(data)
      console.log("confirm", confirm)
      if (confirm == true) {
        showToastSuccess();
        closeCreateModal();
        refetchProyectsData();
      } else {
        showToastError();
      }
    },
  });

  const {
    loading,
    error,
    data,
    refetch: refetchProyectsData,
  } = useQuery(get_proyects_m);

  useEffect(() => {
    if (!loading && !error && data) {
      const jsonObject = JSON.stringify(data.showInfoProyecto);
      const jsonObject2 = JSON.parse(jsonObject);
      console.log("json 2", jsonObject2);
      
      if (jsonObject2 == "[]"){
        setProyects(Array.from([]));
      }else{
        var proy = JSON.parse(jsonObject2);
        setProyects(proy);
      }

    }
  }, [loading, error, data]);

  useFocusEffect(
    React.useCallback(() => {
      refetchProyectsData();
    }, [])
  );

  if (loading) {
    return <Text>Cargando...</Text>;
  }
  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  const showToastSuccess = () => {
    Toast.show({
      type: "success",
      text1: "Equipo creado",
      text2: "El equipo se ha creado exitosamente.",
      position: "top",
      topOffset: 30,
    });
  };

  const showToastError = () => {
    Toast.show({
      type: "error",
      text1: "Error",
      text2: "Ha ocurrido un error, por favor intente de nuevo.",
      position: "top",
      topOffset: 30,
    });
  };

  const saveNewName = () => {
    closeCreateModal();
  };

  const openCreateModal = () => {
    setCreateModalVisible(true);
  };

  const closeCreateModal = () => {
    setCreateModalVisible(false);
  };

  

  return (
    <View style={{ flex: 1, backgroundColor: colors.background2 }}>
      <StatusBar
        barStyle={dark ? "light-content" : "dark-content"}
        backgroundColor={colors.background}
        translucent
      />
      {/* Header */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 13,
          paddingHorizontal: 16,
          marginTop: 14,
          marginBottom: 16,
          backgroundColor: colors.background,
        }}
      >
        <TouchableOpacity onPress={() => refetchProyectsData()}>
          <Text
            style={{ fontSize: 24, fontWeight: "bold", color: colors.text }}
          >
            Proyectos
          </Text>
        </TouchableOpacity>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity onPress={openCreateModal}>
            <Ionicons name="add" size={30} color={colors.text} />
          </TouchableOpacity>
          <TouchableOpacity style={{ paddingLeft: 12 }}>
            <Ionicons name="search" size={30} color={colors.text} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Modal de equipo */}
      <Modal isVisible={isCreateModalVisible}>
        <View
          style={[
            styles.modalContainer,
            { backgroundColor: colors.background },
          ]}
        >
          <Text style={[styles.modalTitle, { color: colors.text }]}>
            Agregar Proyecto
          </Text>
          <TextInput
            style={[
              styles.modalInput,
              { color: colors.text, borderColor: colors.tint },
            ]}
            onChangeText={(text) => setNewName(text)}
          />
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <TouchableOpacity
              style={[
                styles.modalButton,
                { backgroundColor: colors.tint, marginHorizontal: 12 },
              ]}
              onPress={() => createProyect()}
            >
              <Text style={[styles.modalButtonText, { color: "white" }]}>
                Guardar
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalButton, { backgroundColor: colors.tint }]}
              onPress={closeCreateModal}
            >
              <Text style={[styles.modalButtonText, { color: "white" }]}>
                Cancelar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {/* Contenido */}
      <View style={styles.content}>
        {proyects.length > 0 ? ( // Comprueba si 'teams' existe
          proyects.map((proyect) => (
            <TouchableOpacity
              key={proyect.id}
              style={[styles.teamCard, { backgroundColor: colors.background }]}
              onPress={() => {
                navigation.navigate("ProyectDetail", {
                  projectId: proyect.id,
                  projectName: proyect.nombre,
                  teamid: proyect.idEquipo,
                });
              }}
            >
              <View style={styles.teamInfo}>
                <Text style={[styles.teamName, { color: colors.tint }]}>
                  {proyect.nombre}
                </Text>
                <View style={styles.teamIcons}>
                {/*<Ionicons name="people" size={18} color={colors.text} />*/}
                {/*<Text style={{ color: colors.text, paddingLeft:2 }}>{proyect.cantidadMiembros}</Text>*/}
                {/*<Text style={{ color: colors.text }}>{proyect.cantidadMiembros == 1 ? " Miembro" : " Miembros" }</Text>*/}
                </View>
              </View>
              <TouchableOpacity>
                <Ionicons
                  name="ios-arrow-forward"
                  size={24}
                  color={colors.tint}
                />
              </TouchableOpacity>
            </TouchableOpacity>
          ))
        ) : (
          <Text
            style={{
              color: colors.text,
              alignItems: "center",
              textAlign: "center",
            }}
          >
            No tienes proyectos
          </Text> // Muestra un mensaje si 'teams' no existe
        )}
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  teamCard: {
    marginBottom: 16,
    borderRadius: 12,
    backgroundColor: "lightgray",
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 80,
  },
  teamInfo: {
    flex: 1,
  },
  teamName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  teamIcons: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  // Estilos del modal
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

export default ProyectScreen;
