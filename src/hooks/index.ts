import { useNavigation } from "@react-navigation/native";
import { NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "@/routes/types";

const useNavigationCustom = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    return navigation;
}


export default useNavigationCustom;