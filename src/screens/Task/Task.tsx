import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  StatusBar,
  FlatList,
  TextInput,

} from "react-native";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useTheme } from "../../components/ThemeProvider";
import { NavigationProp, useFocusEffect } from "@react-navigation/native";
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { useRoute } from "@react-navigation/native";
import { gql, useQuery, useMutation } from "@apollo/client";
import Modal from "react-native-modal";

interface TaskScreenProps {
  navigation: NavigationProp<any>;
}

interface TaskScreenRoute{
  route: {
    params: {
      id: string;
      idProyecto: string;
      projectName: string;
      teamid: string;
    }
  }
}

export function Task({ navigation }: TaskScreenProps, { route }: TaskScreenRoute) {
  //const {state, dispatch} = useContext(AuthContext);
  // const {selectedTask} = state;
  const route2 = useRoute();
  const [userComment, setUserComment] = useState("");
  const [comments, setComments] = useState([]);
  const { dark, colors, setScheme } = useTheme();
  const [selectedTask, setSelectedTask] = useState({});
  const [numberComentarios, setNumberComentarios] = useState(0);
  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [isDescriptionModalVisible, setDescriptionModalVisible] = useState(false);
  const [newName, setNewName] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [isdeleteModalVisible, setdeleteModalVisible] = useState(false);
  const [isCompleteModalVisible, setCompleteModalVisible] = useState(false);
  /*const selectedTask = {
    title: "Task Title",
    progress: 50,
    members: [
      { photo: "https://picsum.photos/200/300", photoid: 1 },
      { photo: "https://picsum.photos/200/300", photoid: 2 },
      { photo: "https://picsum.photos/200/300", photoid: 3 },
      { photo: "https://picsum.photos/200/300", photoid: 4 },
    ],
  };*/

  const get_task_m = gql`
    query showTaskProject($mostrarTaskProject: ShowTaskProjectInput!) {
      showTaskProject(mostrarTaskProject: $mostrarTaskProject)
    }
  `;

  const createComment_m = gql`
    mutation createTaskComentary($taskComentaryInput: CreateTaskComentaryInput!) {
      createTaskComentary(taskComentaryInput: $taskComentaryInput)
    }
  `;

  const update_name_m = gql`
    mutation updateNameTask($updateTaskNameInput: UpdateTaskNameInput!) {
      updateNameTask(updateTaskNameInput: $updateTaskNameInput)
    }
  `;

  const update_state_m = gql`
    mutation updateStateTask($updateTaskStateInput: UpdateTaskStateInput!) {
      updateStateTask(updateTaskStateInput: $updateTaskStateInput)
  }
  `;

  const [update_task] = useMutation(update_state_m, {
    variables: {
      updateTaskStateInput: {
        idTarea: route2.params.id,
      },
    },
    onCompleted: (data) => {
      const confirm = data.updateStateTask;
      console.log("confirm", confirm)
      if (confirm == true) {
        closeCompleteModal()
      } else {
        console.log("error");
        closeCompleteModal()
      }
    },
  });

  const [createComment] = useMutation(createComment_m, {
    variables: {
      taskComentaryInput: {
        idProyecto: parseFloat(route2.params.idProyecto),
        idEquipo: 0,
        idTarea: parseFloat(route2.params.id),
        comentario: userComment,
      },
    },
    onCompleted: (data) => {
      const confirm = data.createTaskComentary;
      console.log("confirm", confirm)
      if (confirm == true) {
   
        setUserComment('');
      } else {
        console.log("error");
      }
    },
  });

  const { loading, error, data, refetch } = useQuery(get_task_m, {variables: {mostrarTaskProject: {idTask: route2.params.id}}});

  useEffect(() => {
    // Lógica para cargar comentarios desde tu backend
    /*const loadedComments = [
      {
        id: 1,
        author: { name: "Usuario1", photo: "https://picsum.photos/30", photoid: 1 },
        text: "¡Gran tarea!",
      },
      {
        id: 2,
        author: { name: "Usuario2", photo: "https://picsum.photos/30", photoid: 2 },
        text: "Buena suerte con esto.",
      },
      // Agrega más comentarios según sea necesario
    ];*/

    setComments([]);

    if (!loading && !error && data) {
      const jsonObject = JSON.parse(data.showTaskProject);
      
      const task = {
        title: jsonObject[0].taskName,
        description: jsonObject[0].descripcion,
        duedate: jsonObject[0].fechaVencimiento,
        members: [
          { photo: "https://picsum.photos/200/300", photoid: 1 },
          { photo: "https://picsum.photos/200/300", photoid: 2 },
          { photo: "https://picsum.photos/200/300", photoid: 3 },
          { photo: "https://picsum.photos/200/300", photoid: 4 },
        ],
      }
    
      const jsonObject2 = JSON.stringify(jsonObject[0].comentarios);
      console.log("json 222", jsonObject2);

      const loadedComments = jsonObject[0].comentarios
      .filter(comment => comment.contenido !== null) // Filter out comments with empty content
      .map(comment => ({
        id: comment.idComentario,
        author: { name: comment.correoCreador, photo: "https://picsum.photos/30", photoid: comment.idComentario },
        text: comment.contenido,
      }));;

      setNumberComentarios(loadedComments.length);
      setComments(loadedComments);
      setSelectedTask(task)
    }

  }, [loading, error, data]);

  useFocusEffect(
    React.useCallback(() => {
      refetch();
    }, [])
  );
  const handleAddComment = () => {
    if (userComment.trim() !== '') {
      /*const newComment = {
        id: comments.length + 1,
        author: { name: 'Nombre del Usuario', photo: 'https://picsum.photos/30' },
        text: userComment,
      };*/
      createComment();
      refetch();
      //setComments([...comments, newComment]);
      setUserComment('');
    }
  };
  
  const openEditModal = () => {
    setEditModalVisible(true);
  };

  const closeEditModal = () => {
    setEditModalVisible(false);
  };

  const [edit_name] = useMutation(update_name_m, {
    variables: {
      updateTaskNameInput: {
        idTarea: route2.params.id,
        nuevoNombre: newName,
      },
    },
    onCompleted: (data) => {
      const response = data.UpdateTaskNameInput;
      console.log(response);
      if (response == true) {
        refetch();
        closeEditModal();
      } else {
        refetch();
        closeEditModal();
      }
    },
  });

  const openDescriptionModal = () => {
    setDescriptionModalVisible(true);
  };

  const closeDescriptionModal = () => {
    setDescriptionModalVisible(false);
  };

  const edit_description_m = gql`
    mutation createTaskDescripcion($taskDescripcionInput: CreateTaskDescripcionInput!) {
      createTaskDescripcion(taskDescripcionInput: $taskDescripcionInput)
    }
  `;

  const [edit_description] = useMutation(edit_description_m, {
    variables: {
      taskDescripcionInput: {
        idTask: route2.params.id,
        descripcion: newDescription,
      },
    },
    onCompleted: (data) => {
      const response = data.createTaskDescripcion;
      console.log(response);
      if (response == true) {
        refetch();
        closeDescriptionModal();
      } else {

        closeDescriptionModal();
      }
    },
  });

  const opendeleteModal = () => {
    setdeleteModalVisible(true);
  };

  const closedeleteModal = () => {
    setdeleteModalVisible(false);
  };

  const openCompleteModal = () => {
    setCompleteModalVisible(true);
  };

  const closeCompleteModal = () => {
    setCompleteModalVisible(false);

  };

  const delete_task_m = gql`
    mutation deleteTask($taskDeleteInput: DeleteTaskInput!) {
      deleteTask(taskDeleteInput: $taskDeleteInput)
    }
  `;

  const [delete_task] = useMutation(delete_task_m, {
    variables: {
      taskDeleteInput: {
        idTask: route2.params.id,
      },
    },
    onCompleted: (data) => {
      const response = data.taskDeleteInput;
      console.log(response);
      if (response == true) {
        //showToastSuccessDelete();
        closedeleteModal();
        navigation.navigate("ProyectDetail", {
          projectId: route2.params.idProyecto,
          projectName: route2.params.projectName,
          teamid: route2.params.teamid,
        })
      } else {
        //showToastErrorDelete();
        closedeleteModal();
        navigation.navigate("ProyectDetail", {
          projectId: route2.params.idProyecto,
          projectName: route2.params.projectName,
          teamid: route2.params.teamid,
        });
    }
  },
  });
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
          <TouchableOpacity onPress={() => navigation.navigate("ProyectDetail", {
            projectId: route2.params.idProyecto,
            projectName: route2.params.projectName,
            teamid: route2.params.teamid,
          })}>
            <Ionicons
              name="ios-arrow-back"
              style={{ paddingTop: 5, paddingRight: 5 }}
              size={24}
              color={colors.tint}
            />
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: "row"}}>
          <TouchableOpacity onPress={opendeleteModal}>
              <Ionicons name="close" style={{ paddingTop: 5, paddingRight: 5 }} size={24} color={colors.tint} />
            </TouchableOpacity>

          <TouchableOpacity onPress={openCompleteModal}>
            <Ionicons
                  name="checkmark-sharp"
                  style={{ paddingTop: 5, paddingRight: 5 }}
                  size={24}
                  color={colors.tint}
                />
          </TouchableOpacity>
        </View>
      </View>

      <View style={[styles.container, {backgroundColor: colors.background2}]}>
        <View style={styles.topWrapper}>
          <Text style={styles.taskTitle}>{selectedTask?.title}</Text>
          <TouchableOpacity style={[styles.editIcon, {marginTop: 0}]} onPress={openEditModal} >
              <Ionicons name="ios-create" size={24} color={colors.tint} />
          </TouchableOpacity>
        </View>
        {/*<Text style={styles.taskTeamText}>Team</Text>
        <View style={styles.taskMembersWrapper}>
          {selectedTask?.members?.map((member) => (
            <Image
              style={styles.taskMemberPhoto}
              source={{ uri: member?.photo }}
              key={member?.photoid}
            />
          ))}
          <TouchableOpacity
            style={[styles.plusBtnContainer, { backgroundColor: colors.tint }]}
          >
            <MaterialCommunityIcons name="plus" size={22} color="#fff" />
          </TouchableOpacity>
          </View>*/}
        <View style={styles.scheduleWrapper}>
          <View style={styles.scheduleRow}>
            <AntDesign name="calendar" size={20} />
            <Text style={[styles.scheduleText, { color: colors.text }]}>
            {selectedTask?.duedate}
            </Text>
          </View>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={styles.taskTeamText}>Descripción</Text>
          <TouchableOpacity style={styles.editIcon} onPress={openDescriptionModal}>
              <Ionicons name="ios-create" size={24} color={colors.tint} />
          </TouchableOpacity>
          </View>
        <Text style={[styles.longText, { color: colors.text }]}>
          {selectedTask?.description}
        </Text>
        <View style={styles.bottomWrapper}>
          <TouchableOpacity style={styles.bottomContent}>
            <EvilIcons name="comment" size={25} color={colors.text} />
            <Text style={[styles.bottomText, { color: colors.text }]}>
              {numberComentarios} comments
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.commentsSection}>
          <Text style={styles.commentsTitle}>Comentarios</Text>
          { comments.length == 0 ? (
            <Text style={{ color: colors.text }}>No hay comentarios</Text>
          ) : 
          <FlatList
          data={comments}
          keyExtractor={(comment) => comment.id}
          renderItem={({ item }) => (
            <View style={styles.commentItem}>
              <Image
                style={styles.commentAuthorPhoto}
                source={{ uri: item.author.photo }}
                key={item.author.photoid}
              />
              <View>
                <Text style={styles.commentAuthor}>{item.author.name}</Text>
                <Text style={styles.commentText}>{item.text}</Text>
              </View>
            </View>
          )}
        />}
          
        </View>
 
        {/* Contenedor del TextInput */}

          <View style={[styles.commentInputContainer, {backgroundColor: colors.background2}]}>
            <TextInput
              style={[styles.commentInput, { color: colors.text, borderColor: "transparent" }]}
              placeholder="Escribe tu comentario..."
              value={userComment}
              onChangeText={(text) => setUserComment(text)}
            />
            <TouchableOpacity
              style={[styles.sendButton, { backgroundColor: colors.tint, marginLeft: 10 }]}
              onPress={handleAddComment}
            >
              <Ionicons name="send" size={20} color="#fff" />
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

      {/* Modal de Edición de descripcion */}
      <Modal isVisible={isDescriptionModalVisible}>
        <View
          style={[
            styles.modalContainer,
            { backgroundColor: colors.background },
          ]}
        >
          <Text style={[styles.modalTitle, { color: colors.text }]}>
            Editar Descripción
          </Text>
          <TextInput
            style={[
              styles.modalInput,
              { color: colors.text, borderColor: colors.tint },
            ]}
            value={newDescription}
            onChangeText={(text) => setNewDescription(text)}
          />
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <TouchableOpacity
              style={[
                styles.modalButton,
                { backgroundColor: colors.tint, marginHorizontal: 12 },
              ]}
              onPress={() => {
                edit_description();
              }}
            >
              <Text style={[styles.modalButtonText, { color: "white" }]}>
                Guardar
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalButton, { backgroundColor: colors.tint }]}
              onPress={closeDescriptionModal}
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
            ¿Estás seguro de que deseas eliminar esta tarea?
          </Text>
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <TouchableOpacity
              style={[
                styles.modalButton,
                { backgroundColor: colors.tint, marginHorizontal: 12 },
              ]}
              onPress={() => delete_task()}
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

      {/* Modal de confirmar tarea */}
      <Modal isVisible={isCompleteModalVisible}>
        <View
          style={[
            styles.modalContainer,
            { backgroundColor: colors.background },
          ]}
        >
          <Text style={[styles.modalTitle, { color: colors.text }]}>
            Completar Tarea
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
            ¿Estás seguro de que deseas completar esta tarea?
          </Text>
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <TouchableOpacity
              style={[
                styles.modalButton,
                { backgroundColor: colors.tint, marginHorizontal: 12 },
              ]}
              onPress={() => update_task()}
            >
              <Text style={[styles.modalButtonText, { color: "white" }]}>
                Sí
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalButton, { backgroundColor: colors.tint }]}
              onPress={closeCompleteModal}
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
  container: {
    flex: 1,
    backgroundColor: "#fafafa",
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  topWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
  },
  taskProgressWrapper: { marginRight: 20 },
  taskProgress: {
    fontWeight: "bold",
    fontSize: 14,
  },
  taskTitle: {
    fontWeight: "bold",
    fontSize: 18,
  },
  taskTeamText: { fontWeight: "bold", marginBottom: 7, fontSize: 17 },
  taskMembersWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 10,
    marginBottom: 20,
  },
  taskMemberPhoto: {
    height: 45,
    width: 45,
    borderRadius: 50,
    marginLeft: -10,
  },
  plusBtnContainer: {
    backgroundColor: "transparent",
    height: 45,
    width: 45,
    borderRadius: 50,
    marginLeft: -10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  scheduleWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  scheduleRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  scheduleText: { color: "transparent", marginLeft: 5 },
  longText: {
    maxHeight: 200,
    fontSize: 16,
    lineHeight: 22,
    color: "transparent",
  },
  bottomWrapper: {
    marginTop: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  bottomContent: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  bottomText: {
    marginLeft: 10,
    color: "transparent",
  },
  commentsSection: {
    marginTop: 20,
  },
  commentsTitle: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 10,
  },
  commentItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  commentAuthorPhoto: {
    height: 30,
    width: 30,
    borderRadius: 15,
    marginRight: 10,
  },
  commentAuthor: {
    fontWeight: "bold",
    marginRight: 5,
  },
  commentText: {
    color: "#555",
  },
  userCommentSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  userCommentInput: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 5,
    padding: 8,
    marginRight: 10,
  },
  commentInputContainer: {
    flexDirection: "row",
    alignItems: "center",  // Alinea el contenido al centro verticalmente
    paddingHorizontal: 16,
    paddingVertical: 8,       // Espaciado inferior
    position: "absolute",   // Colocar el contenedor por encima de otros elementos
    bottom: 0,              // Pegar el contenedor en la parte inferior
    left: 0,
    right: 0,
    zIndex: 1,              // Asegurar que el contenedor esté en la parte superior
    borderRadius: 20,  // Bordes redondeados en la esquina superior izquierda
    marginHorizontal: 5,
    paddingTop: 5, // Bordes redondeados en la esquina superior derecha // Fondo blanco
  },
  commentInput: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 10, // Bordes redondeados en el TextInput
    padding: 8,
  },
  sendButton: {
    borderRadius: 50, // Bordes redondeados en el botón de enviar
    marginLeft: 10,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  editIcon: {
    marginLeft: 8,
    marginTop: -5,
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
