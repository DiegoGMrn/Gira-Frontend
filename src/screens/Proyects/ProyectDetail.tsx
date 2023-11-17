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
import { gql, useMutation, useQuery } from "@apollo/client";
import { useTheme } from "../../components/ThemeProvider";
import {
  NavigationProp,
  useFocusEffect,
  useRoute,
} from "@react-navigation/native";
import Modal from "react-native-modal";
import Toast from "react-native-toast-message";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import ProgressCircle from "react-native-progress-circle";

interface ProyectDetailScreenProps {
  navigation: NavigationProp<any>;
}

interface ProyectDetailScreenRouteProps {
  route: {
    params: {
      projectId: string;
      projectName: string;
      teamid: string;
    };
  };
}

function ProyectDetailScreen(
  { navigation }: ProyectDetailScreenProps,
  { route }: ProyectDetailScreenRouteProps
) {
  const { dark, colors, setScheme } = useTheme();
  const route2 = useRoute();
  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [isCreateModalVisible, setCreateModalVisible] = useState(false);
  const [isdeleteModalVisible, setdeleteModalVisible] = useState(false);
  const { initialTeamName } = route2.params.projectName;
  const [newName, setNewName] = useState(initialTeamName);
  const [newName2, setNewName2] = useState(initialTeamName);
  const [teamid, setTeamid] = useState(route2.params.teamid);
  const [memberEmail, setMemberEmail] = useState("");
  const [members, setMembers] = useState([]);
  const [project, setProject] = useState({});
  console.log("route", route2.params.projectName);
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

  const delete_proyect_m = gql`
    mutation deleteProyecto($deleteProyectoInput: DeleteProyectoInput!) {
      deleteProyecto(deleteProyectoInput: $deleteProyectoInput)
    }
  `;

  const get_members_m = gql`
    query mostrarIntegrantes($mostrarIntegrantes: MostrarIntegrantes!) {
      mostrarIntegrantes(mostrarIntegrantes: $mostrarIntegrantes)
    }
  `;

  const {
    loading,
    error,
    data,
    refetch: refetchMembers,
  } = useQuery(get_members_m, {
    variables: { mostrarIntegrantes: { nombreEquipo: route2.params.teamName } },
  });

  const [delete_team] = useMutation(delete_proyect_m, {
    variables: {
      deleteProyectoInput: {
        name: newName2,
      },
    },
    onCompleted: (data) => {
      const response = data.deleteProyecto;
      console.log(response);
      if (response == true) {
        showToastSuccessDelete();
        closedeleteModal();
        navigation.navigate("Proyects");
      } else {
        showToastErrorDelete();
        closedeleteModal();
        navigation.navigate("Proyects");
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
        refetchMembers();
      } else {
        showToastErrorMember();
        closeCreateModal();
        refetchMembers();
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
    setNewName(route2.params.projectName);
    setNewName2(route2.params.projectName);
    if (!loading && !error && data) {
      console.log(data);
      const jsonObject = JSON.parse(data.mostrarIntegrantes);
      console.log("json", jsonObject);
      //const jsonObject2 = JSON.parse(jsonObject);
      //console.log("json 2", jsonObject2);
      //var members = JSON.parse(jsonObject2.showInfoEquipo);
      //console.log("members", members);
      setMembers(jsonObject);
    }
  }, [route2.params.teamName, loading, error, data]);

  useFocusEffect(
    React.useCallback(() => {
      setNewName(route2.params.projectName);
      setNewName2(route2.params.projectName);
    }, [route2.params.projectName])
  );

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

  useFocusEffect(
    React.useCallback(() => {
      refetchMembers();
    }, [])
  );

  console.log("nombre", route2.params.projectName);
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
          marginBottom: 0,
          backgroundColor: colors.background,
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity onPress={() => navigation.navigate("Proyects")}>
            <Ionicons
              name="ios-arrow-back"
              style={{ paddingTop: 5, paddingRight: 5 }}
              size={24}
              color={colors.tint}
            />
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity onPress={opendeleteModal}>
            <Ionicons name="close" size={30} color={colors.text} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Nuevo Contenido */}
      <View style={{ flex: 1 }}>
        <View
          style={[
            styles.projectDetailsSection,
            { backgroundColor: colors.background },
          ]}
        >
          <View style={styles.projectTitleWrapper}>
            <Text style={[styles.projectTitle, {color: colors.text}]}>{newName2}</Text>
            {/*<TouchableOpacity style={styles.editIcon} onPress={openEditModal}>
              <Ionicons name="ios-create" size={20} color={colors.tint} />
            </TouchableOpacity>*/}
          </View>
          <Text style={styles.projectDescription}></Text>
          <View style={styles.projectTeamAndProgress}>
            <View style={styles.projectProgressWrapper}>
              <ProgressCircle
                percent={75}
                radius={50}
                borderWidth={10}
                color={colors.tint}
                shadowColor="#f4f4f4"
                bgColor="#fff"
              >
                <Text style={styles.projectProgress}>{75}%</Text>
              </ProgressCircle>
            </View>
            <View>
              <Text style={[styles.projectTeamTitle, {color: colors.text}]}>Equipo</Text>
              <TouchableOpacity
                style={styles.projectTeamWrapper}
                onPress={() => {
                  navigation.navigate("TeamsProject", {
                    projectId: route2.params.projectId,
                    projectName: route2.params.projectName,
                    teamid: route2.params.teamid,
                  });
                }}
              >
                <Ionicons
                  name="person-circle"
                  size={40}
                  color={colors.text}
                  style={styles.projectMemberPhoto}
                />
                <Ionicons
                  name="person-circle"
                  size={40}
                  color={colors.tint}
                  style={styles.projectMemberPhoto}
                />
                <Ionicons
                  name="person-circle"
                  size={40}
                  color={colors.text}
                  style={styles.projectMemberPhoto}
                />
              </TouchableOpacity>
            </View>
          </View>
          {/*<Text style={styles.projectStatus}>{10}</Text>*/}
        </View>
      </View>

      {/* Contenido */}
      <View style={styles.content}>
        {members ? (
          members.map((member) => (
            <TouchableOpacity
              style={[styles.teamCard, { backgroundColor: colors.background }]}
            >
              <View style={styles.teamIcons}>
                <Ionicons
                  name="person-circle"
                  size={50}
                  color={colors.text}
                  style={{ margin: 0, padding: 0 }}
                />
              </View>

              <View style={styles.teamInfo}>
                <Text style={[styles.teamName, { color: colors.text }]}>
                  {member.nombre}
                </Text>
                <Text
                  style={[
                    { color: colors.text, fontSize: 16, paddingLeft: 10 },
                  ]}
                >
                  {member.rol}
                </Text>
              </View>
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
            El equipo no tiene integrantes
          </Text>
        )}
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
          <Text
            style={[
              styles.modalInput,
              {
                color: colors.text,
                borderWidth: 0,
                alignItems: "center",
                alignContent: "center",
              },
            ]}
          >
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
    alignItems: "flex-start",
    justifyContent: "center",
  },
  teamName: {
    fontSize: 18,
    fontWeight: "bold",
    paddingLeft: 10,
  },
  teamIcons: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  editIcon: {
    marginLeft: 0,
    marginTop: 0,
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
  nameAndGraphContainer: {
    padding: 16,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    marginBottom: 16,
  },

  nameContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  graphContainer: {
    marginTop: 16,
    alignItems: "center",
  },

  graph: {
    fontSize: 16,
    color: "black",
  },

  teamLink: {
    marginTop: 10,
    //color: colors.tint,
  },
  projectDetailsSection: {
    paddingTop: 15,
    paddingHorizontal: 16,
    borderBottomStartRadius: 30,
    borderBottomEndRadius: 30,
    paddingBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 1,
    //elevation: 1,
    marginBottom: 15,
  },
  projectTitleWrapper: {
    marginBottom: 5,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  projectTitle: {
    fontWeight: "bold",
    fontSize: 24,
    marginRight: 10,
  },
  projectTeamAndProgress: {
    paddingTop: 0,
    paddingLeft: 50,
    display: "flex",
    flexDirection: "row",
    marginBottom: 20,
    alignItems: "center",
  },
  projectTeamTitle: { fontWeight: "bold", marginBottom: 5 },
  projectDescription: {
    //color: appTheme.INACTIVE_COLOR,
    marginBottom: 0,
  },
  projectProgressWrapper: { marginRight: 30 },
  projectProgress: {
    fontWeight: "bold",
    fontSize: 18,
  },
  projectTeamWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 10,
  },
  projectMemberPhoto: {
    height: 40,
    width: 40,
    borderRadius: 50,
    marginLeft: -15,
  },
  plusBtnContainer: {
    //backgroundColor: appTheme.COLOR1,
    height: 40,
    width: 40,
    borderRadius: 50,
    marginLeft: -10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  projectStatus: {
    marginLeft: "auto",
    borderRadius: 20,
    textAlign: "center",
    //borderColor: appTheme.INACTIVE_COLOR,
    borderWidth: 1,
    textTransform: "capitalize",
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 15,
    fontWeight: "bold",
    //color: appTheme.INACTIVE_COLOR,
  },
  projectBody: {
    paddingTop: 20,
    paddingHorizontal: 16,
    paddingBottom: 120,
  },
  projectTabs: {
    backgroundColor: "#fff",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 3,
    borderRadius: 7,
    marginBottom: 5,
  },
  projectTab: {
    width: "30%",
    borderRadius: 7,
  },
  activeProjectTab: {
    //backgroundColor: appTheme.PRIMARY_COLOR,
  },
  projectTabText: { fontSize: 16, paddingVertical: 7, textAlign: "center" },
  activeProjectTabText: {
    color: "#fff",
  },
});

export default ProyectDetailScreen;
