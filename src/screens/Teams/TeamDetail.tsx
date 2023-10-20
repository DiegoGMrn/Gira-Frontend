import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { gql, useMutation } from "@apollo/client";
import { useTheme } from "../../components/ThemeProvider";
import { Shadow } from "react-native-shadow-2";
import { NavigationProp, useRoute } from "@react-navigation/native";
import Modal from "react-native-modal";
import Toast from "react-native-toast-message";
import { useFocusEffect } from "@react-navigation/native";


interface TeamDetailScreenProps {
  navigation: NavigationProp<any>;
}

interface TeamDetailScreenRouteProps {
  route: {
    params: {
      teamId: string;
      teamName: string;
    };
  };
}

function TeamDetailScreen(
  { navigation }: TeamDetailScreenProps,
  { route }: TeamDetailScreenRouteProps
) {
  const { dark, colors, setScheme } = useTheme();
  const route2 = useRoute();
  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [isCreateModalVisible, setCreateModalVisible] = useState(false);
  const [isdeleteModalVisible, setdeleteModalVisible] = useState(false);
  const { teamName: initialTeamName } = route2.params.teamName;
  const [newName, setNewName] = useState(initialTeamName);
  const [newName2, setNewName2] = useState(initialTeamName);
  const [memberEmail, setMemberEmail] = useState("");
  const get_teams_m = gql`
    mutation showInfoEquipo {
      showInfoEquipo
    }
  `;

  const update_name_m = gql`
    mutation updateEquipoName($updateNameInput: UpdateEquipoNameInput!) {
      updateEquipoName(updateNameInput: $updateNameInput)
    }
  `;

  const add_member_m = gql`
    mutation agregarIntegrante($agregarIntegrante: AgregarIntegrante!) {
      agregarIntegrante(agregarIntegrante: $agregarIntegrante)
    }
  `;

  const delete_team_m = gql`
    mutation deleteEquipo($deleteEquipoInput: DeleteEquipoInput!) {
      deleteEquipo(deleteEquipoInput: $deleteEquipoInput)
    }
  `;
  const [delete_team] = useMutation(delete_team_m, {
    variables: {
      deleteEquipoInput: {
        name: newName2,
      },
    },
    onCompleted: (data) => {
      const response = data.deleteEquipo;
      console.log(response);
      if (response == true) {
        showToastSuccessDelete();
        closedeleteModal();
        navigation.navigate("Teams");
      } else {
        showToastErrorDelete();
        closedeleteModal();
        navigation.navigate("Teams");
      }
    },
  });

  const [add_member] = useMutation(add_member_m, {
    variables: {
      agregarIntegrante: {
        nombreEquipo: newName2,
        correoIntegrante: memberEmail,
      },
    },
    onCompleted: (data) => {
      const response = data.agregarIntegrante;
      console.log(response);
      if (response == true) {
        showToastSuccessMember();
        closeCreateModal();
      } else {
        showToastErrorMember();
        closeCreateModal();
      }
    },
  });

  const [edit_name] = useMutation(update_name_m, {
    variables: {
      updateNameInput: {
        antiguoNombreEquipo: route2.params.teamName,
        nuevoNombreEquipo: newName,
      },
    },
    onCompleted: (data) => {
      const response = data.updateEquipoName;
      console.log(response);
      if (response == true) {
        showToastSuccess();
        closeEditModal();
        setNewName2(newName);
      } else {
        showToastError();
        closeCreateModal();
      }
    },
  });

  useEffect(() => {
    // Este efecto se ejecutará cada vez que cambien los parámetros de la ruta.
    setNewName(route2.params.teamName);
    setNewName2(route2.params.teamName);
  }, [route2.params.teamName]);

  const showToastSuccess = () => {
    Toast.show({
      type: "success",
      text1: "Nombre editado",
      text2: "El nombre del equipo se ha editado exitosamente.",
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

  const showToastSuccessMember = () => {
    Toast.show({
      type: "success",
      text1: "Integrante agregado",
      text2: "El integrante se ha agregado exitosamente",
      position: "top",
      topOffset: 30,
    });
  };

  const showToastErrorMember = () => {
    Toast.show({
      type: "error",
      text1: "Error",
      text2: "No se pudo agregar al usuario.",
      position: "top",
      topOffset: 30,
    });
  };

  const showToastSuccessDelete = () => {
    Toast.show({
      type: "success",
      text1: "Equipo Eliminado",
      text2: "El equipo se ha eliminado exitosamente",
      position: "top",
      topOffset: 30,
    });
  };

  const showToastErrorDelete = () => {
    Toast.show({
      type: "error",
      text1: "Error",
      text2: "No se pudo eliminar el equipo.",
      position: "top",
      topOffset: 30,
    });
  };

  const openEditModal = () => {
    setEditModalVisible(true);
  };

  const closeEditModal = () => {
    setEditModalVisible(false);
  };

  const saveNewName = () => {
    // Realiza aquí la lógica para guardar el nuevo nombre
    // Puedes hacer una solicitud a tu API o actualizar el estado del usuario
    // Luego, cierra el modal
    closeEditModal();
  };

  const openCreateModal = () => {
    setCreateModalVisible(true);
  };

  const closeCreateModal = () => {
    setCreateModalVisible(false);
  };

  const opendeleteModal = () => {
    setdeleteModalVisible(true);
  };

  const closedeleteModal = () => {
    setdeleteModalVisible(false);
  };

  console.log("nombre", route2.params.teamName);
  console.log("nombre2", newName2);
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
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity onPress={() => navigation.navigate("Teams")}>
            <Ionicons
              name="ios-arrow-back"
              style={{ paddingTop: 5, paddingRight: 5 }}
              size={24}
              color={colors.tint}
            />
          </TouchableOpacity>
          <Text
            style={{ fontSize: 24, fontWeight: "bold", color: colors.text }}
          >
            {newName2}
          </Text>
          <TouchableOpacity style={styles.editIcon} onPress={openEditModal}>
            <Ionicons name="ios-create" size={24} color={colors.tint} />
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity onPress={openCreateModal}>
            <Ionicons name="add" size={30} color={colors.text} />
          </TouchableOpacity>
          <TouchableOpacity onPress={opendeleteModal}>
            <Ionicons name="close" size={30} color={colors.text} />
          </TouchableOpacity>
        </View>
      </View>
      {/* Modal de Edición de Nombre */}
      <Modal isVisible={isEditModalVisible}>
        <View
          style={[
            styles.modalContainer,
            { backgroundColor: colors.background },
          ]}
        >
          <Text style={[styles.modalTitle, { color: colors.text }]}>
            Editar Nombre
          </Text>
          <TextInput
            style={[
              styles.modalInput,
              { color: colors.text, borderColor: colors.tint },
            ]}
            value={newName}
            onChangeText={(text) => setNewName(text)}
          />
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <TouchableOpacity
              style={[
                styles.modalButton,
                { backgroundColor: colors.tint, marginHorizontal: 12 },
              ]}
              onPress={() => {
                edit_name();
              }}
            >
              <Text style={[styles.modalButtonText, { color: "white" }]}>
                Guardar
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalButton, { backgroundColor: colors.tint }]}
              onPress={closeEditModal}
            >
              <Text style={[styles.modalButtonText, { color: "white" }]}>
                Cancelar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal de integrante */}
      <Modal isVisible={isCreateModalVisible}>
        <View
          style={[
            styles.modalContainer,
            { backgroundColor: colors.background },
          ]}
        >
          <Text style={[styles.modalTitle, { color: colors.text }]}>
            Agregar Integrante
          </Text>
          <TextInput
            style={[
              styles.modalInput,
              { color: colors.text, borderColor: colors.tint },
            ]}
            onChangeText={(text) => setMemberEmail(text)}
          />
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <TouchableOpacity
              style={[
                styles.modalButton,
                { backgroundColor: colors.tint, marginHorizontal: 12 },
              ]}
              onPress={() => add_member()}
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

      {/* Modal de delete */}
      <Modal isVisible={isdeleteModalVisible}>
        <View
          style={[
            styles.modalContainer,
            { backgroundColor: colors.background },
          ]}
        >
          <Text style={[styles.modalTitle, { color: colors.text }]}>
            Eliminar Equipo
          </Text>
          <Text style={[styles.modalInput, { color: colors.text, borderWidth: 0, alignItems: "center", alignContent: "center" }]}>
            ¿Estás seguro de que deseas eliminar este equipo?
          </Text>
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <TouchableOpacity
              style={[
                styles.modalButton,
                { backgroundColor: colors.tint, marginHorizontal: 12 },
              ]}
              onPress={() => delete_team()}
            >
              <Text style={[styles.modalButtonText, { color: "white" }]}>
                Sí
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalButton, { backgroundColor: colors.tint }]}
              onPress={closedeleteModal}
            >
              <Text style={[styles.modalButtonText, { color: "white" }]}>
                No
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Contenido */}
      <View style={styles.content}></View>
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
  editIcon: {
    marginLeft: 8,
    marginTop: 3,
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

export default TeamDetailScreen;
