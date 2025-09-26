import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { getPosts } from './services';
import { useQuery } from '@tanstack/react-query';
import QUERY_KEYS from '@/config/QUERY_KEYS';
import { Posts } from './services/types';
import styles from './styles';
import { getTimeAgo } from '@/utils/timeUtils';
import useNavigationCustom from '@/hooks';
import { Loading } from '@/components';


const Home = () => {
const navigation = useNavigationCustom();

  const { data: posts, isLoading } = useQuery<Posts[]>({
    queryKey: [QUERY_KEYS.POSTS.GET_POSTS],
    queryFn: getPosts,
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      {posts && posts.length > 0 ? (
        <>
          <FlatList
            data={posts}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity 
                style={styles.card} 
                onPress={() => navigation.navigate('Post', { id: item.id })}
              >
                <Text style={styles.title}>
                  {item.title}
                </Text>

                <View style={styles.infoPostContainer}>
                   <Text style={styles.comments}>
                    {item.comments.length} comentários -
                  </Text>
                  <Text style={styles.tags}>{item.author.userName} - </Text>
                  <Text style={styles.tags}>{getTimeAgo(item.createdAt)}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </>
      ) : (
        <View style={styles.containerNotFound}>
          <Text style={styles.textNotFound}>Nenhum post encontrado</Text>
        </View>
      )}
    </View>
  );
};

export default Home;
