import React from "react";
import { Text, Image, StyleSheet } from "react-native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import Acceuil from "./Acceuil";
import Profil from "./Profil";
import Rechercher from "./Rechercher";
import Combinaison from "./Combinaison";
import Apropos from "./Apropos";
import Logout from "./Logout";
// import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { Ionicons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";

const DrawerNav = createDrawerNavigator();

// Pour ajouter des éléments dans le tiroir (drawer)
const CustomDrawerContent = (props) => {
  const route = useRoute();
  const { professor } = route.params || { professor: null };

  return (
    <DrawerContentScrollView {...props}>
      <Image source={require("../assets/image123.jpg")} style={styles.image} />
      <Text style={styles.marge}>ProfSwap</Text>
      {professor && (
        <Text style={[styles.margeText, { fontWeight: "bold" }]}>
          Account : {professor.nom} {professor.prenom}
        </Text>
      )}
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
};

export default function Drawer() {
  const route = useRoute();
  const { professor } = route.params || { professor: null };

  return (
    <DrawerNav.Navigator drawerContent={CustomDrawerContent}>
      <DrawerNav.Screen
        name="Acceuil"
        component={Acceuil}
        initialParams={{ professor: professor }}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="md-home" size={size} color="black" />
          ),
          drawerLabelStyle: { color: "black" },
        }}
      />

      <DrawerNav.Screen
        name="Profil"
        component={Profil}
        initialParams={{ professor: professor }}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="md-person" size={size} color="black" />
          ),
          drawerLabelStyle: { color: "black" },
        }}
      />

      <DrawerNav.Screen
        name="Rechercher"
        component={Rechercher}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="md-search" size={size} color="black" />
          ),
          drawerLabelStyle: { color: "black" },
        }}
      />
      <DrawerNav.Screen
        name="Combinaison"
        component={Combinaison}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="md-git-branch" size={size} color="black" />
          ),
          drawerLabelStyle: { color: "black" },
        }}
      />
      <DrawerNav.Screen
        name="A propos"
        component={Apropos}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="md-information-circle" size={size} color="black" />
          ),
          drawerLabelStyle: { color: "black" },
        }}
      />

      <DrawerNav.Screen
        name="Logout"
        component={Logout}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="md-log-out" size={size} color="black" />
          ),
        }}
      />
    </DrawerNav.Navigator>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
    resizeMode: "contain",
    paddingHorizontal: 130,
  },
  marge: {
    paddingHorizontal: 95,
  },
  margeText: {
    paddingHorizontal: 15,
    marginTop: 25,
    marginBottom: 15,
  },
});
