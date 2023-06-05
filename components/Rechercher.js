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
  const [specialitésFilter, setspecialitésFilter] = useState("");
  const [villeActuelleFilter, setvilleActuelleFilter] = useState("");
  const [wantedCityFilter, setWantedCityFilter] = useState("");

  const [professeurss, setprofesseurss] = useState([]);
  const [professeurSelectionne, setprofesseurSelectionne] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const Links = "https://troubled-red-garb.cyclic.app/professeurs";

  useEffect(() => {
    axios
      .get(Links)
      .then((response) => {
        setprofesseurss(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const getvilleActuelleOptions = () => {
    const uniqueCities = [
      ...new Set(
        professeurss.map((professeurs) => professeurs.villeFaculteActuelle)
      ),
    ];
    return ["", ...uniqueCities];
  };

  const getWantedCityOptions = () => {
    const uniqueCities = [
      ...new Set(
        professeurss
          .map((professeurs) =>
            professeurs.villeDesiree.split(";").map((city) => city.trim())
          )
          .flat()
      ),
    ];
    return ["", ...uniqueCities];
  };

  const getspecialitésOptions = () => {
    const uniqueSpecialties = [
      ...new Set(professeurss.map((professeurs) => professeurs.specialite)),
    ];
    return ["", ...uniqueSpecialties];
  };

  const filterprofesseurss = () => {
    return professeurss.filter((professeurs) => {
      const villeActuelleMatch =
        villeActuelleFilter === "" ||
        professeurs.villeFaculteActuelle
          .toLowerCase()
          .includes(villeActuelleFilter.toLowerCase());
      const wantedCityMatch =
        wantedCityFilter === "" ||
        professeurs.villeDesiree
          .toLowerCase()
          .includes(wantedCityFilter.toLowerCase());
      const specialitésMatch =
        specialitésFilter === "" ||
        professeurs.specialite
          .toLowerCase()
          .includes(specialitésFilter.toLowerCase());

      return villeActuelleMatch && wantedCityMatch && specialitésMatch;
    });
  };

  const handleprofesseursPress = (professeurs) => {
    setprofesseurSelectionne(professeurs);
    setModalVisible(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.dropdowncontainer}>
        <Text style={styles.dropdownText}>Specialities</Text>

        <Picker
          style={styles.dropdown}
          selectedValue={specialitésFilter}
          onValueChange={(itemValue) => setspecialitésFilter(itemValue)}
        >
          {getspecialitésOptions().map((specialités) => (
            <Picker.Item
              key={specialités}
              label={specialités === "" ? "All  specialities" : specialités}
              value={specialités}
            />
          ))}
        </Picker>
      </View>

      <View style={styles.dropdowncontainer}>
        <Text style={styles.dropdownText}>Actual Cities</Text>
        <Picker
          style={styles.dropdown}
          selectedValue={villeActuelleFilter}
          onValueChange={(itemValue) => setvilleActuelleFilter(itemValue)}
        >
          {getvilleActuelleOptions().map((city) => (
            <Picker.Item
              key={city}
              label={city === "" ? "All Cities" : city}
              value={city}
            />
          ))}
        </Picker>
      </View>
      <View style={styles.dropdowncontainer}>
        <Text style={styles.dropdownText}>Wanted Cities</Text>
        <Picker
          style={styles.dropdown}
          selectedValue={wantedCityFilter}
          onValueChange={(itemValue) => setWantedCityFilter(itemValue)}
        >
          {getWantedCityOptions().map((city) => (
            <Picker.Item
              key={city}
              label={city === "" ? "Toutes les villes" : city}
              value={city}
            />
          ))}
        </Picker>
      </View>
      <FlatList
        data={filterprofesseurss()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleprofesseursPress(item)}>
            <View style={styles.fleche}>
              <Text>
                {item.nom} {item.prenom} -{item.villeFaculteActuelle}- ---&gt;
                {item.villeDesiree.replace(/;/g, " | ")}
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
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}> Email </Text>
              <Text style={styles.tableCell}>
                {" "}
                {professeurSelectionne?.email}
              </Text>
            </View>

            <View style={styles.tableRow}>
              <Text style={styles.tableCell}> Firstname </Text>
              <Text style={styles.tableCell}>
                {" "}
                {professeurSelectionne?.prenom}
              </Text>
            </View>

            <View style={styles.tableRow}>
              <Text style={styles.tableCell}> Name </Text>
              <Text style={styles.tableCell}>
                {" "}
                {professeurSelectionne?.nom}
              </Text>
            </View>

            <View style={styles.tableRow}>
              <Text style={styles.tableCell}> Phone</Text>
              <Text style={styles.tableCell}>
                {" "}
                {professeurSelectionne?.tel}
              </Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}> Speciality </Text>
              <Text style={styles.tableCell}>
                {" "}
                {professeurSelectionne?.specialite}
              </Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}> Faculty </Text>
              <Text style={styles.tableCell}>
                {" "}
                {professeurSelectionne?.faculteActuelle}
              </Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}> Grade</Text>
              <Text style={styles.tableCell}>
                {" "}
                {professeurSelectionne?.grade}
              </Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}> Actual City</Text>

              <Text style={styles.tableCell}>
                {" "}
                {professeurSelectionne?.villeFaculteActuelle.replace(
                  /;/g,
                  " | "
                )}
              </Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}> Desired City</Text>
              <Text style={styles.tableCell}>
                {" "}
                {professeurSelectionne?.villeDesiree.replace(/;/g, " | ")}
              </Text>
            </View>
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
  dropdownText: {
    fontWeight: "bold",
    marginTop: 15,
    marginLeft: 15,
  },
  dropdowncontainer: {
    marginLeft: 20,
    flexDirection: "row", // Afficher les boutons côte à côte
    justifyContent: "space-between", // Espace égal entre les boutons
    width: "80%",
    marginTop: 10,
  },
  tableRow: {
    flexDirection: "row",
  },
  tableCell: {
    flex: 1,
    borderWidth: 1,
    padding: 5,
  },
  container: {
    flex: 1,
    paddingTop: 20,
  },
  fleche: {
    borderWidth: 1,
    borderColor: "black",
    padding: 10,
    marginBottom: 10,
  },
  dropdown: {
    height: 40,
    width: 200,
    marginBottom: 5,
    backgroundColor: "lightblue",
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 20,
    overflow: "hidden", // Ajouter cette propriété pour les coins arrondis
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
