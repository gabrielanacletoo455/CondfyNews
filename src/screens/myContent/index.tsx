import { Container, Loading, RowContainer } from '@/components';
import QUERY_KEYS from '@/config/QUERY_KEYS';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import { getMyContent } from './services';
import { useQuery } from '@tanstack/react-query';
import { MyContentType } from './types';
import useNavigationCustom from '@/hooks';
import styles from './styles';


const MyContent = () => {
  const navigation = useNavigationCustom();

  const { data: myContent, isLoading } = useQuery<MyContentType[]>({
    queryKey: [QUERY_KEYS.POSTS.GET_MY_CONTENT],
    queryFn: getMyContent,
  });

  if (isLoading) {
    return <Loading />;
  }


  return (
    <Container>
      <Text style={styles.title}>Meus Conteúdos ( {myContent?.length} )</Text>

      <View style={styles.container}>
        <FlatList
          data={myContent}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() => navigation.navigate('Post', { id: item.id })}
            >
              <RowContainer>
                <Text style={styles.title}>{item.title}</Text>

                <TouchableOpacity>
                  <Image
                    source={require('@/assets/icons/link-externo.png')}
                    style={styles.iconLink}
                  />
                </TouchableOpacity>
              </RowContainer>

              <View style={styles.infoPostContainer}>
                <Text style={styles.comments}>
                  {item.comments.length} comentários -
                </Text>
                <Text style={styles.author}>{item.author.userName}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </Container>
  );
};



export default MyContent;
