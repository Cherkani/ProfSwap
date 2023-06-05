import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

const Connexion = () => {
  const navigation = useNavigation();

  useEffect(() => {
    handleConnexion();
  }, []);

  const handleConnexion = () => {
    navigation.navigate("Login");
  };

  return null;
};

export default Connexion;
