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
import RNPickerSelect from "react-native-picker-select";

interface TeamsProjectScreenProps {
  navigation: NavigationProp<any>;
}

interface TeamsProjectScreenRouteProps {
  route: {
    params: {
      projectId: string;
      projectName: string;
      teamid: string;
    };
  };
}

function TeamsProjectScreen(
  { navigation }: TeamsProjectScreenProps,
  { route }: TeamsProjectScreenRouteProps
) {
  const { dark, colors, setScheme } = useTheme();
  const route2 = useRoute();
  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [isCreateModalVisible, setCreateModalVisible] = useState(false);
  const [isdeleteModalVisible, setdeleteModalVisible] = useState(false);
  //const { teamName: initialTeamName } = route2.params.teamName;
  //const [newName, setNewName] = useState(initialTeamName);
  //const [newName2, setNewName2] = useState(initialTeamName);
  const [memberEmail, setMemberEmail] = useState("");
  const [members, setMembers] = useState([]);
  const [teams, setTeams] = useState([]);
  const [teamName, setTeamName] = useState(""); 
  const [selector, setSelector] = useState("");
  const [teamProject, setTeamProject] = useState([]);
const [teamid, setTeamid] = useState("");

  const add_team_m = gql`
    mutation agregarEquipo($agregarEquipo: AgregarEquipo!) {
      agregarEquipo(agregarEquipo: $agregarEquipo)
    }
  `;

  const delete_team_m = gql`
    mutation deleteEquipo($deleteEquipoInput: DeleteEquipoInput!) {
      deleteEquipo(deleteEquipoInput: $deleteEquipoInput)
    }
  `;

  const get_teams_m = gql`
    query showInfoEquipo {
      showInfoEquipo
    }
  `;

  const get_teams_project = gql`
    query showInfoEquipoProyecto(
      $mostrarEquiposProyecto: MostrarEquiposProyecto!
    ) {
      showInfoEquipoProyecto(mostrarEquiposProyecto: $mostrarEquiposProyecto)
    }
  `;
  const {
    loading,
    error,
    data,
    refetch: refetchTeamData,
  } = useQuery(get_teams_m);

  const {
    loading: loading2,
    error: error2,
    data: data2,
    refetch: refetchTeamData2,
  } = useQuery(get_teams_project, {
    variables: {
      mostrarEquiposProyecto: { idEquipo: teamid },
    },
  });

  const [delete_team] = useMutation(delete_team_m, {
    variables: {
      deleteEquipoInput: {
        name: teamName,
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

  const [add_team] = useMutation(add_team_m, {
    variables: {
      agregarEquipo: {
        idEquipo: selector,
        idProyecto: route2.params.projectId,
      },
    },
    onCompleted: (data) => {
      const response = data.agregarEquipo;
      console.log(response);
      if (response == true) {
        showToastSuccessMember();
        closeCreateModal();
        route2.params.teamid = selector;
        setTeamid(selector);
        refetchTeamData2();

      } else {
        showToastErrorMember();
        closeCreateModal();
        refetchTeamData2();
      }
    },
  });

  useEffect(() => {
    if(route2.params.teamid == null){
      setTeamProject(Array.from([]));
    }
    setTeamid(route2.params.teamid ? route2.params.teamid.toString() : null);
    
    if (!loading && !error && data) {
      const jsonObject = JSON.stringify(data.showInfoEquipo);
      const jsonObject2 = JSON.parse(jsonObject);
      console.log("json 2", jsonObject2);

      if (jsonObject2 == "[]") {
        setTeams(Array.from([]));
      } else {
        var proy = JSON.parse(jsonObject2);
        setTeams(proy);
      }

      console.log("teams", teams);
    }

    if (!loading2 && !error2 && data2) {
      const jsonObject = JSON.stringify(data2.showInfoEquipoProyecto);
      const jsonObject2 = JSON.parse(jsonObject);
      console.log("json 2", jsonObject2);

      if (jsonObject2 == "[]") {
        setTeamProject(Array.from([]));
      } else {
        var proy = JSON.parse(jsonObject2);
        setTeamProject(proy);
      }

      console.log("teams2", teamProject);
    }
  }, [loading, error, data, loading2, error2, data2, route2.params.teamid]);

  useFocusEffect(
    React.useCallback(() => {

      refetchTeamData();
      refetchTeamData2();
    }, [route2.params.teamid, teamid])
  );

  const showToastSuccessMember = () => {
    Toast.show({
      type: "success",
      text1: "Equipo agregado agregado",
      text2: "El equipo se ha agregado exitosamente",
      position: "top",
      topOffset: 30,
    });
  };

  const showToastErrorMember = () => {
    Toast.show({
      type: "error",
      text1: "Error",
      text2: "No se pudo agregar el equipo.",
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

  useFocusEffect(React.useCallback(() => {}, []));

  //console.log("nombre", route2.params.teamName);
  //console.log("nombre2", newName2);
  console.log("teamid", route2.params.teamid);
  console.log("teamproject", teamProject);

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
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("ProyectDetail", {
                projectId: route2.params.projectId,
                projectName: route2.params.projectName,
                teamid: route2.params.teamid,
              })
            }
          >
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
            Equipos
          </Text>
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
            //value={()}
            //onChangeText={(text) => ()}
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
            Agregar Equipo
          </Text>
          <RNPickerSelect
            onValueChange={(value) => setSelector(value)}
            items={teams.map((team) => {
              return {
                label: team.nombre,
                value: team.id,
              };
            })}
          />
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <TouchableOpacity
              style={[
                styles.modalButton,
                { backgroundColor: colors.tint, marginHorizontal: 12 },
              ]}
              onPress={() => add_team()}
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

      {/* Contenido */}
      <View style={styles.content}>
        {teamProject.length > 0 ? ( // Comprueba si 'teams' existe
          teamProject.map((team) => (
            <TouchableOpacity
              key={team.id}
              style={[styles.teamCard, { backgroundColor: colors.background }]}
              onPress={() => {
                navigation.navigate("EditTeamProyect", {
                  teamId: team.id,
                  teamName: team.nombre,
                  projectId: route2.params.projectId,
                  projectName: route2.params.projectName,
                });
              }}
            >
              <View style={styles.teamInfo}>
                <Text style={[styles.teamName, { color: colors.tint }]}>
                  {team.nombre}
                </Text>
                <View style={styles.teamIcons}>
                  <Ionicons name="people" size={18} color={colors.text} />
                  <Text style={{ color: colors.text, paddingLeft: 2 }}>
                    {team.cantidadMiembros}
                  </Text>
                  <Text style={{ color: colors.text }}>
                    {team.cantidadMiembros == 1 ? " Miembro" : " Miembros"}
                  </Text>
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
            No tienes equipos
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

export default TeamsProjectScreen;
