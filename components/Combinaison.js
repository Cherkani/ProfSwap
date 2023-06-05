import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, FlatList } from "react-native";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";
const Combinaison = () => {
  const [Professeurs, setProfesseurs] = useState([]);
  const [Spécialités, setSpécialités] = useState("");
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
    //si pas prof sauter
    if (correspondingProfesseurs.length === 0) {
      return null;
    }
    //
    return (
      <View style={styles.itemContainer}>
        <View style={styles.column}>
          <Text style={styles.professorName}>
            {item.nom} ({item.villeFaculteActuelle})({item.grade}) -&gt;
          </Text>
          {correspondingProfesseurs.map((professor) => (
            <Text style={styles.correspondingProfessorName} key={professor._id}>
              {professor.nom} ( {professor.villeDesiree.replace(/;/g, " | ")})(
              {item.grade})
            </Text>
          ))}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Picker
        style={styles.dropdown}
        selectedValue={Spécialités}
        onValueChange={(itemValue) => setSpécialités(itemValue)}
      >
        <Picker.Item label="None" value="" />
        {specialities.map((Spécialités, index) => (
          <Picker.Item label={Spécialités} value={Spécialités} key={index} />
        ))}
      </Picker>

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
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  column: {
    flex: 1,
  },
  professorName: {
    fontWeight: "bold",
  },
  correspondingProfessorName: {
    marginLeft: 10,
  },
});

export default Combinaison;
