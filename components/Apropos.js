import { View, Text, StyleSheet } from "react-native";

export default function Apropos() {
  return (
    <View style={styles.rectangle}>
      <Text style={styles.paragraph}>
        Cette plateforme est simplement un espace permettant aux professeurs
        universitaires de rechercher un partenaire pour une permutation. Elle se
        limite à cette fonctionnalité. Les enseignants peuvent rechercher des
        partenaires intéressés par un échange dans d'autres établissements
        d'enseignement supérieur. Le système facilite la recherche et la
        correspondance entre les enseignants ayant une volonté mutuelle
        d'échanger. La plateforme offre une interface conviviale et sécurisée
        aux enseignants pour communiquer et échanger les informations
        nécessaires. Les membres peuvent créer des profils personnels et
        renseigner des informations concernant leurs spécialités, les
        établissements et les informations de contact. Les enseignants peuvent
        consulter les profils des partenaires potentiels et entrer en contact
        avec eux pour discuter des détails de l'accord d'échange. En utilisant
        cette plateforme, les enseignants peuvent faciliter leur recherche de
        partenaires d'échange, économiser du temps et des efforts en évitant les
        communications individuelles et les recherches continues d'opportunités
        d'échange. Ce système est efficace et utile pour les enseignants
        souhaitant changer d'institution ou travailler dans un nouvel
        établissement pour élargir leur expérience académique.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#5BC0BE",
    marginBottom: 20,
  },
  rectangle: {
    width: "100%",
    marginTop: 50,
    padding: 10,
    backgroundColor: "white",
    marginBottom: 10,
    borderLeftWidth: 2, // Ajoutez cette ligne pour définir l'épaisseur de la bordure gauche
    borderRightWidth: 2, // Ajoutez cette ligne pour définir l'épaisseur de la bordure droite
    borderTopWidth: 2, // Ajoutez cette ligne pour définir l'épaisseur de la bordure supérieure
    borderBottomWidth: 2, // Ajoutez cette ligne pour définir l'épaisseur de la bordure inférieure
    borderColor: "#446688", // Ajoutez cette ligne pour définir la couleur de la bordure
  },

  paragraph: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1C2541",
    textAlign: "justify",
    textJustify: "inter-word",
  },

  arrow: {
    fontSize: 40,
    fontWeight: "bold",
    marginTop: 10,
    textAlign: "center",
  },
});
