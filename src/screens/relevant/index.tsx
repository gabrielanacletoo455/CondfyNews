import { Loading } from '@/components';
import useNavigationCustom from '@/hooks';
import { useQuery } from '@tanstack/react-query';
import {
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  View,
} from 'react-native';
import { Posts } from '../home/services/types';
import QUERY_KEYS from '@/config/QUERY_KEYS';
import { getPosts } from '../home/services';
import { useMemo } from 'react';
import { getTimeAgo } from '@/utils/timeUtils';
import styles from './styles';



const Relevantes = () => {
  const navigation = useNavigationCustom();

  const { data: posts, isLoading } = useQuery<Posts[]>({
    queryKey: [QUERY_KEYS.POSTS.GET_POSTS],
    queryFn: getPosts,
  });

  const sortedPosts = useMemo(() => {
    if (!posts) return [];

    return [...posts].sort((a, b) => {
      return b.comments.length - a.comments.length;
    });
  }, [posts]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      {sortedPosts && sortedPosts.length > 0 ? (
        <>
          <FlatList
            data={sortedPosts}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.card}
                onPress={() => navigation.navigate('Post', { id: item.id })}
              >
                <Text style={styles.title}>{item.title}</Text>

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


export default Relevantes;
