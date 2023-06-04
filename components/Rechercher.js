import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Modal,
  SafeAreaView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";

const Recherche = () => {
  const [specialtyFilter, setSpecialtyFilter] = useState("");
  const [currentCityFilter, setCurrentCityFilter] = useState("");
  const [wantedCityFilter, setWantedCityFilter] = useState("");

  const [professors, setProfessors] = useState([]);
  const [selectedProfessor, setSelectedProfessor] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const Links = "https://plain-teal-bull.cyclic.app/professeurs";

  useEffect(() => {
    axios
      .get(Links)
      .then((response) => {
        setProfessors(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const getCurrentCityOptions = () => {
    const uniqueCities = [
      ...new Set(professors.map((professor) => professor.villeFaculteActuelle)),
    ];
    return ["", ...uniqueCities];
  };

  const getWantedCityOptions = () => {
    const uniqueCities = [
      ...new Set(
        professors
          .map((professor) =>
            professor.villeDesiree.split(";").map((city) => city.trim())
          )
          .flat()
      ),
    ];
    return ["", ...uniqueCities];
  };

  const getSpecialtyOptions = () => {
    const uniqueSpecialties = [
      ...new Set(professors.map((professor) => professor.specialite)),
    ];
    return ["", ...uniqueSpecialties];
  };

  const filterProfessors = () => {
    return professors.filter((professor) => {
      const currentCityMatch =
        currentCityFilter === "" ||
        professor.villeFaculteActuelle
          .toLowerCase()
          .includes(currentCityFilter.toLowerCase());
      const wantedCityMatch =
        wantedCityFilter === "" ||
        professor.villeDesiree
          .toLowerCase()
          .includes(wantedCityFilter.toLowerCase());
      const specialtyMatch =
        specialtyFilter === "" ||
        professor.specialite
          .toLowerCase()
          .includes(specialtyFilter.toLowerCase());

      return currentCityMatch && wantedCityMatch && specialtyMatch;
    });
  };

  const handleProfessorPress = (professor) => {
    setSelectedProfessor(professor);
    setModalVisible(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Picker
        style={styles.dropdown}
        selectedValue={currentCityFilter}
        onValueChange={(itemValue) => setCurrentCityFilter(itemValue)}
      >
        {getCurrentCityOptions().map((city) => (
          <Picker.Item
            key={city}
            label={city === "" ? "None" : city}
            value={city}
          />
        ))}
      </Picker>

      <Picker
        style={styles.dropdown}
        selectedValue={wantedCityFilter}
        onValueChange={(itemValue) => setWantedCityFilter(itemValue)}
      >
        {getWantedCityOptions().map((city) => (
          <Picker.Item
            key={city}
            label={city === "" ? "None" : city}
            value={city}
          />
        ))}
      </Picker>

      <Picker
        style={styles.dropdown}
        selectedValue={specialtyFilter}
        onValueChange={(itemValue) => setSpecialtyFilter(itemValue)}
      >
        {getSpecialtyOptions().map((specialty) => (
          <Picker.Item
            key={specialty}
            label={specialty === "" ? "None" : specialty}
            value={specialty}
          />
        ))}
      </Picker>

      <FlatList
        data={filterProfessors()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleProfessorPress(item)}>
            <View style={styles.prof}>
              <Text>
                {item.nom} ({item.villeFaculteActuelle}) -&gt; (
                {item.villeDesiree})
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />

      <Modal
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        transparent
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
              Prenom: {selectedProfessor?.prenom}
            </Text>
            <Text style={styles.modalText}>Name: {selectedProfessor?.nom}</Text>
            <Text style={styles.modalText}>
              Email: {selectedProfessor?.email}
            </Text>
            <Text style={styles.modalText}>
              Phone: {selectedProfessor?.tel}
            </Text>

            <Text style={styles.modalText}>
              Specialité: {selectedProfessor?.specialite}
            </Text>
            <Text style={styles.modalText}>
              Faculté: {selectedProfessor?.faculteActuelle}
            </Text>
            <Text style={styles.modalText}>
              Grade: {selectedProfessor?.grade}
            </Text>
            <Text style={styles.modalText}>
              Current City: {selectedProfessor?.villeFaculteActuelle}
            </Text>
            <Text style={styles.modalText}>
              Desired City: {selectedProfessor?.villeDesiree}
            </Text>
            {/* Add more details as needed */}
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalCloseButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <StatusBar style="auto" />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  prof: {
    borderWidth: 1,
    borderColor: "black",
    padding: 10,
    marginBottom: 10,
  },
  dropdown: {
    height: 40,
    borderWidth: 1,
    borderColor: "#446688",
    marginBottom: 10,
    backgroundColor: "lightblue",
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 3,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    width: "80%",
    maxHeight: "80%",
    borderRadius: 8,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
  },
  modalCloseButton: {
    backgroundColor: "#446688",
    alignSelf: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 20,
    backgroundColor: "#446688",
    borderRadius: 25,
  },
  modalCloseButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
});

export default Recherche;
