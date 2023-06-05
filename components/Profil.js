import React, { useState, useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Modal,
} from "react-native";
import axios from "axios";
import { useRoute } from "@react-navigation/native";
export default function Profil({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [tel, setTel] = useState("");
  const [grade, setGrade] = useState("");
  const [specialite, setSpecialite] = useState("");
  const [faculteActuelle, setFaculteActuelle] = useState("");
  const [villeFaculteActuelle, setVilleFaculteActuelle] = useState("");
  const [villeDesiree, setVilleDesiree] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const route = useRoute();
  const { professor } = route.params || { professor: null };
  useEffect(() => {
    if (route.params?.professor) {
      const { professor } = route.params;
      setEmail(professor.email);
      setPassword(professor.password);
      setNom(professor.nom);
      setPrenom(professor.prenom);
      setTel(professor.tel);
      setGrade(professor.grade);
      setSpecialite(professor.specialite);
      setFaculteActuelle(professor.faculteActuelle);
      setVilleFaculteActuelle(professor.villeFaculteActuelle);
      setVilleDesiree(professor.villeDesiree);
    }
  }, [route.params]);
  const handleDelete = async () => {
    try {
      await axios.delete(
        `https://troubled-red-garb.cyclic.app/professeurs/${email}`
      );
      console.log("Professor deleted");
      navigation.navigate("DrawerSkip");
    } catch (error) {
      console.error("Error deleting professor:", error);
    }
  };
  const handleUpdate = async () => {
    if (true) {
      try {
        const response = await axios.post(
          "https://troubled-red-garb.cyclic.app/professeurs",
          {
            nom: nom,
            prenom: prenom,
            tel: tel,
            email: email,
            grade: grade,
            specialite: specialite,
            faculteActuelle: faculteActuelle,
            villeFaculteActuelle: villeFaculteActuelle,
            villeDesiree: villeDesiree,
          }
        );
        setNom(nom);
        setPrenom(prenom);
        setTel(tel);
        setGrade(grade);
        setSpecialite(specialite);
        setFaculteActuelle(faculteActuelle);
        setVilleFaculteActuelle(villeFaculteActuelle);
        setVilleDesiree(villeDesiree);
        if (response.status === 200) {
          setShowSuccessModal(true);
        } else {
          console.error("Failed to update professor");
        }
      } catch (error) {
        console.error("Error updating professor:", error);
        Alert.alert("Error", "An error occurred while updating the profile.", [
          {
            text: "OK",
          },
        ]);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.scrollView}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <TextInput
            placeholder="Email d'utilisateur"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            editable={false}
          />
          <TextInput
            placeholder="Nom"
            value={nom}
            onChangeText={setNom}
            style={styles.input}
          />
          <TextInput
            placeholder="Prénom"
            value={prenom}
            onChangeText={setPrenom}
            style={styles.input}
          />
          <TextInput
            placeholder="Téléphone"
            value={tel}
            onChangeText={setTel}
            style={styles.input}
          />
          <TextInput
            placeholder="Grade"
            value={grade}
            onChangeText={setGrade}
            style={styles.input}
          />
          <TextInput
            placeholder="Spécialité"
            value={specialite}
            onChangeText={setSpecialite}
            style={styles.input}
          />
          <TextInput
            placeholder="Faculté actuelle"
            value={faculteActuelle}
            onChangeText={setFaculteActuelle}
            style={styles.input}
          />
          <TextInput
            placeholder="Ville de la faculté actuelle"
            value={villeFaculteActuelle}
            onChangeText={setVilleFaculteActuelle}
            style={styles.input}
          />
          <TextInput
            placeholder="Ville désirée"
            value={villeDesiree}
            onChangeText={setVilleDesiree}
            style={styles.input}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={handleDelete} style={styles.button}>
              <Text style={styles.buttonText}>Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleUpdate} style={styles.button2}>
              <Text style={styles.buttonText}>Update</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <Modal
          visible={showSuccessModal}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setShowSuccessModal(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>
                Informations was updated Successfully
              </Text>
              <TouchableOpacity
                onPress={() => setShowSuccessModal(false)}
                style={styles.modalButton}
              >
                <Text style={styles.modalButtonText}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    marginTop: 10,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text_bold: {
    textAlign: "left",
    fontWeight: "bold",
    marginTop: 40,
  },
  scrollView: {
    flex: 1,
    alignSelf: "stretch",
  },
  scrollContent: {
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#446688",
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
    width: "80%",
  },
  button: {
    backgroundColor: "red",
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginTop: 10,
  },
  button2: {
    backgroundColor: "green",
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
  modalContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 20,
    alignItems: "center",
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
  },
  modalButton: {
    backgroundColor: "#446688",
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  modalButtonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
});
