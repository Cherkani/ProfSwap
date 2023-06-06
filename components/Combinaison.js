import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, FlatList } from "react-native";
import ModalSelector from "react-native-modal-selector";
import axios from "axios";
import { TouchableOpacity } from "react-native";

import { Card } from "react-native-shadow-cards";

const Combinaison = () => {
  const [Professeurs, setProfesseurs] = useState([]);
  const [Spécialités, setSpécialités] = useState("");
  const [selectedSpeciality, setSelectedSpeciality] = useState(
    "Select a speciality"
  );
  const Link = "https://troubled-red-garb.cyclic.app/professeurs";

  useEffect(() => {
    axios
      .get(Link)
      .then((response) => {
        setProfesseurs(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const specialities = [
    ...new Set(Professeurs.map((professor) => professor.specialite)),
  ];
  const filteredProfesseurs = Professeurs.filter(
    (professor) => professor.specialite === Spécialités
  );

  const renderProfessorItem = ({ item }) => {
    const correspondingProfesseurs = filteredProfesseurs.filter(
      (professor) =>
        item.villeDesiree.includes(professor.villeFaculteActuelle) &&
        professor.villeDesiree.includes(item.villeFaculteActuelle) &&
        professor.nom !== item.nom &&
        Professeurs.indexOf(professor) > Professeurs.indexOf(item)
    );

    if (correspondingProfesseurs.length === 0) {
      return null;
    }

    return (
      <View style={styles.itemContainer}>
        <Card style={{ padding: 15, marginTop: 10 }}>
          <Text style={styles.professorName}>
            {item.nom} ({item.villeFaculteActuelle})({item.grade}) -&gt; {"\n"}
          </Text>
          {correspondingProfesseurs.map((professor) => (
            <Text style={styles.correspondingProfessorName} key={professor._id}>
              {professor.nom} ({professor.villeDesiree.replace(/;/g, " | ")})(
              {item.grade}) {"\n"}
            </Text>
          ))}
        </Card>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ModalSelector
        style={styles.Pickerstyle}
        data={specialities.map((speciality) => ({
          key: speciality,
          label: speciality,
        }))}
        initValue={selectedSpeciality} // Set the initial value from the state variable
        onChange={(option) => {
          setSelectedSpeciality(option.key); // Update the selected specialty value
          setSpécialités(option.key);
        }}
      />

      {filteredProfesseurs.length > 0 && (
        <FlatList
          data={filteredProfesseurs}
          renderItem={renderProfessorItem}
          keyExtractor={(item) => item._id}
        />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  chartTitleContainer: {
    borderWidth: 1,
    borderColor: "black",
    padding: 10,
    marginBottom: 10,
  },
  Pickerstyle: {
    height: 40,
    backgroundColor: "#446688",
    borderWidth: 1,
    borderColor: "#446688",
    borderRadius: 20,
    justifyContent: "center",
  },
  chart: {
    marginTop: 20,
    borderRadius: 16,
  },
  tableContainer: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
  },
  tableHeader: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#ccc",
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  columnHeader: {
    fontWeight: "bold",
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  column: {
    flex: 1,
  },
  professorName: {
    fontWeight: "bold",
    fontSize: 18,
  },
  correspondingProfessorName: {
    marginLeft: 18,
  },
});

export default Combinaison;
