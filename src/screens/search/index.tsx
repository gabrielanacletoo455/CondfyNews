import { Container, Loading, MainTitle } from '@/components';
import QUERY_KEYS from '@/config/QUERY_KEYS';
import { RootStackParamList } from '@/routes/types';
import { useRoute } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useQuery } from '@tanstack/react-query';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import getSearch from './services';
import useNavigationCustom from '@/hooks';
import styles from './styles';

const Search = () => {
  const navigation = useNavigationCustom();
  const route =
    useRoute<NativeStackScreenProps<RootStackParamList, 'Search'>['route']>();

  const { query } = route.params;
  const { data: Search, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.SEARCH.GET_SEARCH, query],
    queryFn: () => getSearch(query),
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Container>
      <MainTitle title="Resultados da busca" />
        {Search && Search.length > 0 ? (
          <FlatList
            data={Search}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => navigation.navigate('Post', { id: item.id })}>
                <View style={styles.card}>
                  <Text style={styles.text}>{item.title}</Text>
                  <Image
                    source={require('@/assets/icons/link-externo.png')}
                    style={styles.iconLink}
                  />
                </View>
              </TouchableOpacity>
            )}
          />
        ) : (
          <Text style={styles.text}>Nenhum resultado encontrado</Text>
        )}
    </Container>
  );
};


export default Search;
