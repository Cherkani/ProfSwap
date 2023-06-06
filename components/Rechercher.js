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
import axios from "axios";
import { Card } from "react-native-shadow-cards";
import ModalSelector from "react-native-modal-selector";

const Recherche = () => {
  const [selectedSpeciality, setSelectedSpeciality] =
    useState("All Specialities");
  const [selectedCityActual, setSelectedCityActual] = useState("All Cities");
  const [selectedCityDesired, setSelectedCityDesired] = useState("All Cities");

  const [specialitiesFilter, setSpecialitiesFilter] = useState("");
  const [cityActualFilter, setCityActualFilter] = useState("");
  const [cityDesiredFilter, setCityDesiredFilter] = useState("");

  const [professeurs, setProfesseurs] = useState([]);
  const [selectedProfesseur, setSelectedProfesseur] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const links = "https://troubled-red-garb.cyclic.app/professeurs";

  useEffect(() => {
    axios
      .get(links)
      .then((response) => {
        setProfesseurs(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const getActualCityOptions = () => {
    const uniqueCities = [
      ...new Set(
        professeurs.map((professeur) => professeur.villeFaculteActuelle)
      ),
    ];
    return [
      { key: "", label: selectedCityActual },
      ...uniqueCities.map((city) => ({ key: city, label: city })),
    ];
  };

  const getDesiredCityOptions = () => {
    const uniqueCities = [
      ...new Set(
        professeurs
          .map((professeur) =>
            professeur.villeDesiree.split(";").map((city) => city.trim())
          )
          .flat()
      ),
    ];
    return [
      { key: "", label: selectedCityDesired },
      ...uniqueCities.map((city) => ({ key: city, label: city })),
    ];
  };

  const getSpecialitiesOptions = () => {
    const uniqueSpecialities = [
      ...new Set(professeurs.map((professeur) => professeur.specialite)),
    ];
    return [
      { key: "", label: selectedSpeciality },
      ...uniqueSpecialities.map((specialite) => ({
        key: specialite,
        label: specialite,
      })),
    ];
  };

  const filterProfesseurs = () => {
    return professeurs.filter((professeur) => {
      const actualCityMatch =
        cityActualFilter === "" ||
        professeur.villeFaculteActuelle
          .toLowerCase()
          .includes(cityActualFilter.toLowerCase());
      const desiredCityMatch =
        cityDesiredFilter === "" ||
        professeur.villeDesiree
          .toLowerCase()
          .includes(cityDesiredFilter.toLowerCase());
      const specialitiesMatch =
        specialitiesFilter === "" ||
        professeur.specialite
          .toLowerCase()
          .includes(specialitiesFilter.toLowerCase());
      return actualCityMatch && desiredCityMatch && specialitiesMatch;
    });
  };

  const handleProfesseurPress = (professeur) => {
    setSelectedProfesseur(professeur);
    setModalVisible(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.dropdownContainer}>
        <Text style={styles.dropdownText}>Specialities</Text>
        <ModalSelector
          style={styles.dropdown}
          data={getSpecialitiesOptions()}
          initValue={selectedSpeciality}
          onChange={(option) => {
            setSpecialitiesFilter(option.key);
            setSelectedSpeciality(option.key);
          }}
        />
      </View>

      <View style={styles.dropdownContainer}>
        <Text style={styles.dropdownText}>Actual Cities</Text>
        <ModalSelector
          style={styles.dropdown}
          data={getActualCityOptions()}
          initValue={selectedCityActual}
          onChange={(option) => {
            setCityActualFilter(option.key);
            setSelectedCityActual(option.key);
          }}
        />
      </View>

      <View style={styles.dropdownContainer}>
        <Text style={styles.dropdownText}>Desired Cities</Text>
        <ModalSelector
          style={styles.dropdown}
          data={getDesiredCityOptions()}
          initValue={selectedCityDesired}
          onChange={(option) => {
            setCityDesiredFilter(option.key);
            setSelectedCityDesired(option.key);
          }}
        />
      </View>

      <FlatList
        data={filterProfesseurs()}
        renderItem={({ item }) => (
          <Card style={{ padding: 10, marginTop: 10, marginLeft: 15 }}>
            <Text style={styles.textContainer}>
              <Text style={styles.boldText}>
                {item.nom} {item.prenom}
              </Text>
              {"\n\n"}
              <Text>
                &lt;----{"\t\t\t\t"}
                {item.villeFaculteActuelle}
              </Text>
              {"\n\n"}
              <Text>
                ----&gt;{"\t\t\t\t"}
                {item.villeDesiree.replace(/;/g, " | ")}
              </Text>
            </Text>

            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => handleProfesseurPress(item)}
            >
              <Text style={styles.textBold}>View Details</Text>
            </TouchableOpacity>
          </Card>
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
              <Text style={styles.tableCell}>Email</Text>
              <Text style={styles.tableCell}>{selectedProfesseur?.email}</Text>
            </View>

            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Firstname</Text>
              <Text style={styles.tableCell}>{selectedProfesseur?.prenom}</Text>
            </View>

            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Name</Text>
              <Text style={styles.tableCell}>{selectedProfesseur?.nom}</Text>
            </View>

            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Phone</Text>
              <Text style={styles.tableCell}>{selectedProfesseur?.tel}</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Speciality</Text>
              <Text style={styles.tableCell}>
                {selectedProfesseur?.specialite}
              </Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Faculty</Text>
              <Text style={styles.tableCell}>
                {selectedProfesseur?.faculteActuelle}
              </Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Grade</Text>
              <Text style={styles.tableCell}>{selectedProfesseur?.grade}</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Actual City</Text>
              <Text style={styles.tableCell}>
                {selectedProfesseur?.villeFaculteActuelle.replace(/;/g, " | ")}
              </Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Desired City</Text>
              <Text style={styles.tableCell}>
                {selectedProfesseur?.villeDesiree.replace(/;/g, " | ")}
              </Text>
            </View>
            {/* Add more details as needed */}
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.textBold}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <StatusBar style="auto" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  boldText: {
    fontWeight: "bold",
    fontSize: 18,
  },
  dropdownText: {
    fontWeight: "bold",
    marginTop: 15,
    marginLeft: 15,
  },
  dropdownContainer: {
    marginLeft: 20,
    flexDirection: "row",
    justifyContent: "space-between",
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
    backgroundColor: "#446688",
    borderRadius: 20,
    overflow: "hidden",
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
  textBold: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
});

export default Recherche;
