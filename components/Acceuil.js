import React, { useEffect, useState } from "react";
import { View, ScrollView, Text, StyleSheet } from "react-native";
import { PieChart } from "react-native-chart-kit";
import axios from "axios";

const Acceuil = () => {
  const [professorTableData, setProfessorTableData] = useState([]);
  const [specialtyData, setSpecialtyData] = useState([]);
  const [cityData, setCityData] = useState([]);
  const [gradeData, setGradeData] = useState([]);
  const [specialtyTableData, setSpecialtyTableData] = useState([]);
  const [cityTableData, setCityTableData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://troubled-red-garb.cyclic.app/professeurs"
      );
      // ///////////////////////
      const professors = response.data;

      // Count the number of professors per specialty
      const specialtyCount = {};
      professors.forEach((professor) => {
        const specialties = professor.specialite.split(";");
        specialties.forEach((specialty) => {
          if (specialtyCount[specialty]) {
            specialtyCount[specialty]++;
          } else {
            specialtyCount[specialty] = 1;
          }
        });
      });

      // Convert the specialty count object to an array of data objects
      const specialtyChartData = Object.keys(specialtyCount).map(
        (specialty) => ({
          name: specialty,
          population: specialtyCount[specialty],
          color: getRandomColor(), // Generate a random color
        })
      );
      const sortedspecialityData = specialtyChartData.sort(
        (a, b) => b.population - a.population
      );
      const limitedspecialityData = sortedspecialityData.slice(0, 15);

      setSpecialtyData(limitedspecialityData);

      // Convert the specialty count object to an array of table data objects///////
      const specialtyTableChartData = Object.keys(specialtyCount).map(
        (specialty) => ({
          specialty: specialty,
          count: specialtyCount[specialty],
        })
      );

      setSpecialtyTableData(specialtyTableChartData);

      // Count the number of professors per city
      const cityCount = {};
      professors.forEach((professor) => {
        const villeDesiree = professor.villeDesiree;
        if (villeDesiree) {
          const cities = villeDesiree.split(";");
          cities.forEach((city) => {
            const trimmedCity = city.trim(); // Remove leading/trailing whitespaces
            if (cityCount[trimmedCity]) {
              cityCount[trimmedCity]++;
            } else {
              cityCount[trimmedCity] = 1;
            }
          });
        }
      });

      // Convert the city count object to an array of data objects
      const cityChartData = Object.keys(cityCount).map((city) => ({
        name: city,
        population: cityCount[city],
        color: getRandomColor(), // Generate a random color
      }));
      const sortedCityData = cityChartData.sort(
        (a, b) => b.population - a.population
      );
      const limitedCityData = sortedCityData.slice(0, 15);

      setCityData(limitedCityData);

      //table cities
      const CityyTableChartData = Object.keys(cityCount).map((city) => ({
        city: city,
        count: cityCount[city],
      }));

      setCityTableData(CityyTableChartData);

      // Count the number of professors per grade
      const gradeCount = {};
      professors.forEach((professor) => {
        const grade = professor.grade;
        if (grade) {
          if (gradeCount[grade]) {
            gradeCount[grade]++;
          } else {
            gradeCount[grade] = 1;
          }
        }
      });

      // Convert the grade count object to an array of data objects
      const gradeChartData = Object.keys(gradeCount).map((grade) => ({
        name: grade,
        population: gradeCount[grade],
        color: getRandomColor(), // Generate a random color
      }));

      setGradeData(gradeChartData);

      //table cities
      const ProfessorTableChartData = Object.keys(gradeCount).map((grade) => ({
        grade: grade,
        count: gradeCount[grade],
      }));

      setProfessorTableData(ProfessorTableChartData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const chartConfig = {
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    legendFontColor: "red",
    legendFontSize: 12,
  };

  const renderLegendItem = (legend) => (
    <View key={legend.name} style={styles.legendItem}>
      <View style={[styles.legendColor, { backgroundColor: legend.color }]} />
      <Text style={styles.legendText}>{legend.name}</Text>
    </View>
  );

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.chartTitleContainer}>
          <Text style={styles.chartTitle}>
            Number of Registred Teacher :{" "}
            {specialtyData.reduce(
              (total, specialty) => total + specialty.population,
              0
            )}
          </Text>
        </View>

        <View style={styles.chartTitleContainer}>
          <Text style={styles.chartTitle}>Number of teachers by specialty</Text>
        </View>
        <View style={styles.chartTitleContainer}>
          <PieChart
            data={specialtyData}
            width={400}
            height={200}
            accessor="population"
            chartConfig={chartConfig}
            style={styles.chart}
            hasLegend={false}
          />
          <View style={styles.legendContainer}>
            {specialtyData.map(renderLegendItem)}
          </View>
        </View>
      </View>

      <View style={styles.container}>
        <View style={styles.chartTitleContainer}>
          <Text style={styles.chartTitle}>Most in-demand cities</Text>
        </View>
        <View style={styles.chartTitleContainer}>
          <PieChart
            data={cityData}
            width={400}
            height={200}
            accessor="population"
            chartConfig={chartConfig}
            style={styles.chart}
            hasLegend={false}
          />
          <View style={styles.legendContainer}>
            {cityData.map(renderLegendItem)}
          </View>
        </View>
      </View>

      <View style={styles.container}>
        <View style={styles.chartTitleContainer}>
          <Text style={styles.chartTitle}>Number of teachers by Grade</Text>
        </View>

        <View style={styles.chartTitleContainer}>
          <PieChart
            data={gradeData}
            width={400}
            height={200}
            accessor="population"
            chartConfig={chartConfig}
            style={styles.chart}
            hasLegend={false}
          />
          <View
            style={[styles.legendContainer, styles.lastChartLegendContainer]}
          >
            {gradeData.map(renderLegendItem)}
          </View>
        </View>
      </View>

      <View style={styles.containerTable}>
        <Text style={styles.chartTitle}>
          Number of teachers by specialty (Top 15)
        </Text>
        <View>
          <View style={styles.tableRow}>
            <Text style={styles.tableHeader}>Ville</Text>
            <Text style={styles.tableHeader}>Nombre</Text>
          </View>
          {specialtyTableData
            .sort((a, b) => b.count - a.count) // Tri par ordre décroissant
            .slice(0, 15) // Limite à 15 éléments
            .map((item, index) => (
              <View key={index} style={styles.tableRow}>
                <Text style={styles.tableCell}>{item.specialty}</Text>
                <Text style={styles.tableCell}>{item.count}</Text>
              </View>
            ))}
        </View>
      </View>

      <View style={styles.containerTable}>
        <Text style={styles.chartTitle}>Most in-demand cities(Top 15)</Text>
        <View>
          <View style={styles.tableRow}>
            <Text style={styles.tableHeader}>Spéciality</Text>
            <Text style={styles.tableHeader}>Number</Text>
          </View>
          {cityTableData
            .sort((a, b) => b.count - a.count) // Tri par ordre décroissant
            .slice(0, 15) // Limite à 15 éléments
            .map((item, index) => (
              <View key={index} style={styles.tableRow}>
                <Text style={styles.tableCell}>{item.city}</Text>
                <Text style={styles.tableCell}>{item.count}</Text>
              </View>
            ))}
        </View>
      </View>
      <View style={styles.containerTable}>
        <Text style={styles.chartTitle}>Number of teachers by Grade</Text>
        <View>
          <View style={styles.tableRow}>
            <Text style={styles.tableHeader}>Grade</Text>
            <Text style={styles.tableHeader}>Nombre</Text>
          </View>
          {professorTableData
            .sort((a, b) => b.count - a.count) // Tri par ordre décroissant

            .map((item, index) => (
              <View key={index} style={styles.tableRow}>
                <Text style={styles.tableCell}>{item.grade}</Text>
                <Text style={styles.tableCell}>{item.count}</Text>
              </View>
            ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  containerTable: {
    flex: 1,

    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20,
  },
  chartTitleContainer: {
    borderWidth: 1,
    borderColor: "black",
    padding: 10,
    marginBottom: 10,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  chart: {
    marginVertical: 10,
    marginLeft: 180,
  },
  legendContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
    marginLeft: 90,
    marginRight: 90,
  },
  lastChartLegendContainer: {
    marginLeft: 70,
    marginRight: 70,

    marginBottom: 30,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
    marginBottom: 5,
  },
  legendColor: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 6,
  },
  legendText: {
    fontSize: 12,
  },
  tableContainer: {
    flexDirection: "column",
    marginTop: 10,
  },
  tableHeader: {
    fontWeight: "bold",
    flex: 1,
    borderWidth: 1,
    padding: 5,
  },
  tableRow: {
    flexDirection: "row",
  },
  tableCell: {
    flex: 1,
    borderWidth: 1,
    padding: 5,
  },
});

export default Acceuil;
