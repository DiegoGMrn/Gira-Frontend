import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../components/ThemeProvider";
import Modal from "react-native-modal";
import { AuthContext } from "../../context/AuthContext";
import { NavigationProp } from "@react-navigation/native";
import { useQuery, gql } from "@apollo/client";

interface ProfileScreenProps {
  navigation: NavigationProp<any>;
}

const ProfileScreen = ({ navigation }: ProfileScreenProps) => {
  const { dark, colors, setScheme } = useTheme();
  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [newName, setNewName] = useState("");
  const { login, logout, isLoading, userToken } = useContext(AuthContext);

  const get_profile_m = gql`
    query showInfo {
      showInfo
    }
  `;

  const { loading, error, data } = useQuery(get_profile_m);

  useEffect(() => {
    
    if (!loading && !error && data) {
     
    }
  }, [loading, error, data]);
  if (loading) {
    return <Text>Cargando...</Text>;
  }
  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  function logouthandle() {
    logout();
  }

  const openEditModal = () => {
    setNewName(info.nombre);
    setEditModalVisible(true);
  };

  const closeEditModal = () => {
    setEditModalVisible(false);
  };

  const saveNewName = () => {
    closeEditModal();
  };

  const jsonObject = JSON.stringify(data);
  const jsonObject2 = JSON.parse(jsonObject);
  console.log("json 2", jsonObject2);
  const info = JSON.parse(jsonObject2.showInfo);
  console.log("teams", info);
  

  return (
    <View style={[styles.container, { backgroundColor: colors.background2 }]}>
      {/* Header */}
      <Text style={[styles.header, { color: colors.text }]}>Cuenta</Text>

      {/* Sección de Información del Usuario */}
      <View style={styles.userInfo}>
        <Ionicons name="ios-person" size={64} color={colors.tint} />
        <View style={styles.userDetails}>
          <View style={styles.userNameContainer}>
            <Text style={[styles.userName, { color: colors.text }]}>
              {info.nombre}
            </Text>
            <TouchableOpacity style={styles.editIcon} onPress={openEditModal}>
              <Ionicons name="ios-create" size={24} color={colors.tint} />
            </TouchableOpacity>
          </View>
          <Text style={styles.userEmail}>{info.correo}</Text>
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
              onPress={saveNewName}
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

      {/* Línea de Separación */}
      <View style={[styles.separator, { backgroundColor: colors.tint }]} />

      {/* Opciones del Perfil */}
      <TouchableOpacity
        style={styles.profileOption}
        onPress={() => navigation.navigate("Settings")}
      >
        <Ionicons
          name="ios-settings"
          size={24}
          color={colors.tint}
          style={{ paddingRight: 12 }}
        />
        <Text style={[styles.optionText, { color: colors.text }]}>
          Configuración
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.profileOption}
        onPress={() => {
          logouthandle();
        }}
      >
        <Ionicons
          name="ios-log-out"
          size={24}
          color={colors.tint}
          style={{ paddingRight: 12 }}
        />
        <Text style={[styles.optionText, { color: colors.text }]}>
          Cerrar Sesión
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    paddingTop: 14,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  userDetails: {
    marginLeft: 16,
  },
  userNameContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  userName: {
    fontSize: 20,
    fontWeight: "bold",
  },
  editIcon: {
    marginLeft: 8,
  },
  userEmail: {
    fontSize: 16,
    color: "gray",
  },
  separator: {
    height: 1,
    backgroundColor: "lightgray",
    marginBottom: 16,
  },
  profileOption: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
  },
  optionText: {
    fontSize: 18,
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
export default ProfileScreen;
