import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Modal,
} from "react-native";
export default function Register({ navigation }) {
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
  const handleSignUp = async () => {
    if (
      email === "" ||
      password === "" ||
      nom === "" ||
      prenom === "" ||
      tel === "" ||
      grade === "" ||
      specialite === "" ||
      faculteActuelle === "" ||
      villeFaculteActuelle === "" ||
      villeDesiree === ""
    ) {
      setShowSuccessModal(true);
      return;
    }
    try {
      const response = await fetch(
        "https://tiny-worm-nightgown.cyclic.app/professeurs",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nom: nom,
            prenom: prenom,
            tel: tel,
            email: email,
            grade: grade,
            specialite: specialite,
            faculteActuelle: faculteActuelle,
            villeFaculteActuelle: villeFaculteActuelle,
            villeDesiree: villeDesiree,
            password: password,
          }),
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log("Professor added successfully:", data);
        const professor = {
          nom: nom,
          prenom: prenom,
          tel: tel,
          email: email,
          grade: grade,
          specialite: specialite,
          faculteActuelle: faculteActuelle,
          villeFaculteActuelle: villeFaculteActuelle,
          villeDesiree: villeDesiree,
        };
        navigation.navigate("Drawer", { professor });
      } else {
        const error = await response.json();
        console.error("Failed to add professor:", error.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.scrollView}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <TextInput
            placeholder="Name"
            value={nom}
            onChangeText={setNom}
            style={styles.input}
          />
          <TextInput
            placeholder="FirstName"
            value={prenom}
            onChangeText={setPrenom}
            style={styles.input}
          />
          <TextInput
            placeholder="Phone"
            value={tel}
            onChangeText={setTel}
            style={styles.input}
          />
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
          />
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.input}
          />

          <TextInput
            placeholder="Grade"
            value={grade}
            onChangeText={setGrade}
            style={styles.input}
          />
          <TextInput
            placeholder="Spéciality"
            value={specialite}
            onChangeText={setSpecialite}
            style={styles.input}
          />
          <TextInput
            placeholder="Actual Faculty"
            value={faculteActuelle}
            onChangeText={setFaculteActuelle}
            style={styles.input}
          />
          <TextInput
            placeholder="Actual City"
            value={villeFaculteActuelle}
            onChangeText={setVilleFaculteActuelle}
            style={styles.input}
          />
          <TextInput
            placeholder="Desired City"
            value={villeDesiree}
            onChangeText={setVilleDesiree}
            style={styles.input}
          />

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={() => navigation.navigate("Login")}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Back</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSignUp} style={styles.button}>
              <Text style={styles.buttonText}>Register</Text>
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
              <Text style={styles.modalText}>Please Fill All Information</Text>
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
  buttonContainer: {
    flexDirection: "row", // Afficher les boutons côte à côte
    justifyContent: "space-between", // Espace égal entre les boutons
    width: "80%",
    marginTop: 10,
  },
  button: {
    backgroundColor: "#446688",
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 20,
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
