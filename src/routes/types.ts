import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type RootStackParamList = {
    Index: undefined;
    Home: undefined;
    Login: undefined;
    Relevantes: undefined;
    Recentes: undefined;
    Register: undefined;
    Profile: undefined;
    ProfileDetail: { id: number };
    NovoConteudo: undefined;
    MeusConteudos: undefined;
    Post: { id: number };
    Search: {query: string};
  };



  export type PropsScreesApp = NativeStackScreenProps<RootStackParamList>;