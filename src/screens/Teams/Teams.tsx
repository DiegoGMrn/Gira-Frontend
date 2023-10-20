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
import { Shadow } from "react-native-shadow-2";
import Modal from "react-native-modal";
import Toast from "react-native-toast-message";

interface TeamScreenProps {
  navigation: any;
}

function TeamScreen({ navigation }: TeamScreenProps) {
  const { dark, colors, setScheme } = useTheme();
  const [isCreateModalVisible, setCreateModalVisible] = useState(false);
  const [newName, setNewName] = useState("");
  const get_teams_m = gql`
    query showInfoEquipo {
      showInfoEquipo
    }
  `;

  const createEquipo_m = gql`
    mutation createEquipo($equipoInput: CreateEquipoInput!) {
      createEquipo(equipoInput: $equipoInput)
    }
  `;
  const [createTeam] = useMutation(createEquipo_m, {
    variables: {
      equipoInput: {
        name: newName,
      },
    },
    onCompleted: (data) => {
      const confirm = data.createEquipo;
      if (confirm == true) {
        showToastSuccess();
        closeCreateModal();
        refetchTeamData();
      } else {
        showToastError();
      }
    },
  });

  const {
    loading,
    error,
    data,
    refetch: refetchTeamData,
  } = useQuery(get_teams_m);

  useEffect(() => {
    // Realiza acciones adicionales después de que la consulta se haya ejecutado
    if (!loading && !error && data) {
      // Aquí puedes trabajar con los datos recibidos
    }
  }, [loading, error, data]);
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
    // Realiza aquí la lógica para guardar el nuevo nombre
    // Puedes hacer una solicitud a tu API o actualizar el estado del usuario
    // Luego, cierra el modal
    closeCreateModal();
  };

  const openCreateModal = () => {
    setCreateModalVisible(true);
  };

  const closeCreateModal = () => {
    setCreateModalVisible(false);
  };

  const jsonObject = JSON.stringify(data);
  const jsonObject2 = JSON.parse(jsonObject);
  console.log("json 2", jsonObject2);
  var teams = JSON.parse(jsonObject2.showInfoEquipo);
  console.log("teams", teams);

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
        <TouchableOpacity onPress={() => refetchTeamData()}>
          <Text
            style={{ fontSize: 24, fontWeight: "bold", color: colors.text }}
          >
            Equipos
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
            Agregar Equipo
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
              onPress={() => createTeam()}
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
        {teams.map((team) => (
          <TouchableOpacity
            key={team.id}
            style={[styles.teamCard, { backgroundColor: colors.background }]}
            onPress={() => {
              navigation.navigate("TeamDetail", {
                teamId: team.id,
                teamName: team.nombre,
              });
            }}
          >
            <View style={styles.teamInfo}>
              <Text style={[styles.teamName, { color: colors.tint }]}>
                {team.nombre}
              </Text>
              <View style={styles.teamIcons}>
                <Ionicons
                  name="person-circle"
                  size={30}
                  color={colors.text}
                  style={{ marginLeft: 0 }}
                />
                <Ionicons
                  name="person-circle-sharp"
                  size={30}
                  color={colors.text}
                  style={{ marginLeft: -12 }}
                />
                <Ionicons
                  name="person-circle"
                  size={30}
                  color={colors.text}
                  style={{ marginLeft: -12 }}
                />
                <Ionicons
                  name="add-circle"
                  size={30}
                  color={colors.text}
                  style={{ marginLeft: -12 }}
                />
              </View>
            </View>
            <TouchableOpacity>
              <Ionicons
                name="ios-arrow-forward"
                size={30}
                color={colors.tint}
              />
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </View>

      {/* Team Cards */}
      {/*<View style={{ flex: 1, paddingHorizontal: 16 }}>
        {teams.map((team) => (
          <View key={team.id} style={{ marginBottom: 16 }}>
            <Shadow distance={3} style={{ alignSelf: "stretch" }}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("TeamDetail", { teamId: team.id })
                }
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  borderRadius: 16,
                  backgroundColor: colors.background,
                  padding: 16,
                }}
              >
                <View
                  style={{
                    flex: 1,
                  }}
                >
                  <Text
                    style={{ flex: 1, color: colors.text, marginBottom: 8 }}
                  >
                    {team.name}
                  </Text>
                  {/* Icons 
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      paddingHorizontal: 16,
                      marginTop: -8,
                    }}
                  >
                    <Ionicons name="person" size={24} color={colors.text} />
                    <Ionicons name="person" size={24} color={colors.text} />
                    <Ionicons name="person" size={24} color={colors.text} />
                    <Ionicons name="add-circle" size={24} color={colors.text} />
                  </View>
                </View>

                <View>
                  <Ionicons
                    name="arrow-forward"
                    size={24}
                    color={colors.text}
                  />
                </View>
              </TouchableOpacity>
            </Shadow>
          </View>
        ))}
      </View>*/}
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
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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

export default TeamScreen;
