import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

const Connexion = () => {
  const navigation = useNavigation();

  useEffect(() => {
    handleConnexion();
  }, []);

  const handleConnexion = () => {
    // Effectuer ici les opérations de déconnexion, par exemple, supprimer les tokens d'authentification, réinitialiser les états, etc.

    // Rediriger vers l'écran de connexion (ou l'écran principal de l'application)
    navigation.navigate("Login"); // Remplacez 'Login' par le nom de votre écran de connexion
  };

  return null;
};

export default Connexion;
