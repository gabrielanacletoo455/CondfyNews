import {
  Avatar,
  Container,
  Divider,
  Loading,
  RowContainer,
} from '@/components';
import QUERY_KEYS from '@/config/QUERY_KEYS';
import { RootStackParamList } from '@/routes/types';
import { useRoute } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useQuery } from '@tanstack/react-query';
import {
  FlatList,
  Image,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import { UserProfile } from '../profile/types';
import {
  getMyCommentsByProfileId,
  getMyPostsByProfileId,
  getProfileDetail,
} from './services';
import { MyContentType } from '../myContent/types';
import useNavigationCustom from '@/hooks';
import { Comment } from '../post/components';

const ProfileDetail = () => {
  const navigation = useNavigationCustom();
  const route =
    useRoute<
      NativeStackScreenProps<RootStackParamList, 'ProfileDetail'>['route']
    >();
  const { id } = route.params;

  // Queries
  const { data: profileDetail, isLoading } = useQuery<UserProfile>({
    queryKey: [QUERY_KEYS.PROFILE.GET_PROFILE_DETAIL, id],
    queryFn: () => getProfileDetail(id),
  });

  const { data: myContent, isLoading: isLoadingMyContent } = useQuery<
    MyContentType[]
  >({
    queryKey: [QUERY_KEYS.POSTS.GET_MY_CONTENT],
    queryFn: () => getMyPostsByProfileId(id),
  });

  const { data: myComments, isLoading: isLoadingMyComments } = useQuery<
    Comment[]
  >({
    queryKey: [QUERY_KEYS.POSTS.GET_MY_COMMENTS],
    queryFn: () => getMyCommentsByProfileId(id),
  });

  if (isLoading || isLoadingMyContent || isLoadingMyComments) {
    return <Loading />;
  }

  const hasInstagram = !!profileDetail?.instagram;
  const hasLinkedin = !!profileDetail?.linkedin;
  const hasWebsite = !!profileDetail?.website;
  const hasAnyLink = hasInstagram || hasLinkedin || hasWebsite;

  const normalizeUrl = (
    value: string,
    type: 'instagram' | 'linkedin' | 'website'
  ): string => {
    if (!value) return '';
    const withProtocol = (url: string) =>
      url.startsWith('http://') || url.startsWith('https://') ? url : `https://${url}`;

    if (type === 'instagram') {
      const handle = value.replace('@', '').trim();
      return `https://instagram.com/${handle}`;
    }
    if (type === 'linkedin') {
      const v = value.trim();
      if (v.includes('linkedin.')) return withProtocol(v);
      const handle = v.replace('@', '').trim();
      return `https://www.linkedin.com/in/${handle}`;
    }
    return withProtocol(value.trim());
  };

  // Nova função para tentar abrir app nativo primeiro
  const openInstagramProfile = async (username: string) => {
    const cleanUsername = username.replace('@', '').trim();

    const urls = [
      `instagram://user?username=${cleanUsername}`,
      `https://instagram.com/${cleanUsername}`,
    ];

    for (const url of urls) {
      try {
        await Linking.openURL(url);
        return; // abriu com sucesso
      } catch (error) {
        console.log(`Falha ao abrir ${url}:`, error);
      }
    }

    console.log('Não foi possível abrir o Instagram');
  };

  const openLink = async (url: string) => {
    try {
      await Linking.openURL(url);
    } catch (e) {
      console.log('Falha ao abrir link:', url, e);
    }
  };


  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      {/* Header Card */}
      <View style={styles.headerCard}>
        <RowContainer
          justifyContent="flex-start"
          alignItems="center"
          marginVertical={0}
          paddingHorizontal={0}
        >
          <Avatar
            username={profileDetail?.userName || ''}
            size={100}
            photoProfile={profileDetail?.photoProfile || ''}
          />
          <View style={styles.headerTextBox}>
            <Text style={styles.textName}>{profileDetail?.userName}</Text>
            <Text style={styles.textEmail}>{profileDetail?.email}</Text>
            {!!profileDetail?.bioDescription && (
              <Text style={styles.textBio} numberOfLines={3}>
                {profileDetail?.bioDescription}
              </Text>
            )}
          </View>
        </RowContainer>

        {/* Stats */}
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{myContent?.length || 0}</Text>
            <Text style={styles.statLabel}>Posts</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{myComments?.length || 0}</Text>
            <Text style={styles.statLabel}>Comentários</Text>
          </View>
        </View>
      </View>

      {/* Links Card */}
      {hasAnyLink && (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Links</Text>
          <View style={styles.linksList}>
            {hasInstagram && (
              <TouchableOpacity
                style={styles.linkItem}
                onPress={() => openInstagramProfile(profileDetail?.instagram || '')}
              >
                <Text style={styles.linkText}>Instagram</Text>
                <Image
                  source={require('@/assets/icons/link-externo.png')}
                  style={styles.iconLink}
                />
              </TouchableOpacity>
            )}

            {hasLinkedin && (
              <TouchableOpacity
                style={styles.linkItem}
                onPress={() =>
                  openLink(normalizeUrl(profileDetail?.linkedin || '', 'linkedin'))
                }
              >
                <Text style={styles.linkText}>LinkedIn</Text>
                <Image
                  source={require('@/assets/icons/link-externo.png')}
                  style={styles.iconLink}
                />
              </TouchableOpacity>
            )}

            {hasWebsite && (
              <TouchableOpacity
                style={styles.linkItem}
                onPress={() =>
                  openLink(normalizeUrl(profileDetail?.website || '', 'website'))
                }
              >
                <Text style={styles.linkText}>Website</Text>
                <Image
                  source={require('@/assets/icons/link-externo.png')}
                  style={styles.iconLink}
                />
              </TouchableOpacity>
            )}
          </View>
        </View>
      )}

      {/* Posts recentes */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>
          Posts recentes ( {(myContent?.length || 0)} )
        </Text>
        <Divider color="#888" height={1} marginBottom={10} marginTop={10} />
        <FlatList
          data={myContent}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => navigation.navigate('Post', { id: item.id })}
            >
              <View style={styles.listRow}>
                <Text style={styles.textTitle}>
                  {item.title.length > 40
                    ? item.title.substring(0, 40) + '...'
                    : item.title}
                </Text>
                <Image
                  source={require('@/assets/icons/link-externo.png')}
                  style={styles.iconLink}
                />
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={item => item.id.toString()}
          scrollEnabled={false}
        />
      </View>

      {/* Comentários recentes */}
      {/* <View style={styles.card}>
        <Text style={styles.cardTitle}>
          Comentários recentes ( {(myComments?.length || 0)} )
        </Text>
        <Divider color="#888" height={1} marginBottom={10} marginTop={10} />
        <FlatList
          data={myComments}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => navigation.navigate('Post', { id: item.postId })}
            >
              <View style={styles.listRow}>
                <Text style={styles.textTitle}>
                  {item.content.length > 40
                    ? item.content.substring(0, 40) + '...'
                    : item.content}
                </Text>
                <Image
                  source={require('@/assets/icons/link-externo.png')}
                  style={styles.iconLink}
                />
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) =>
            item.postId?.toString() || `comment-${index}`
          }
          scrollEnabled={false}
        />
      </View> */}

      <View style={{ height: 20 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#121212',
  },
  content: {
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 16,
  },

  // Cards
  headerCard: {
    width: '92%',
    backgroundColor: '#000',
    borderWidth: 1,
    borderColor: '#222',
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
  },
  card: {
    width: '92%',
    backgroundColor: '#000',
    borderWidth: 1,
    borderColor: '#222',
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
  },

  // Header content
  headerTextBox: {
    marginLeft: 12,
    flexShrink: 1,
  },
  textName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
  },
  textEmail: {
    fontSize: 13,
    color: '#FFF',
    marginTop: 4,
  },
  textBio: {
    fontSize: 14,
    color: '#FFF',
    marginTop: 8,
  },

  // Stats
  statsRow: {
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0A0A0A',
    borderWidth: 1,
    borderColor: '#222',
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
    height: 24,
    backgroundColor: '#222',
    marginHorizontal: 8,
  },
  statNumber: {
    color: '#6A5ACD',
    fontSize: 18,
    fontWeight: 'bold',
  },
  statLabel: {
    color: '#FFF',
    fontSize: 12,
    marginTop: 2,
  },

  // Links
  linksList: {
    marginTop: 8,
    gap: 8,
  },
  linkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#222',
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: '#0A0A0A',
    justifyContent: 'space-between',
  },
  linkText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  iconLink: {
    width: 15,
    height: 15,
    marginLeft: 8,
  },

  // List rows
  listRow: {
    backgroundColor: '#121212',
    width: '100%',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#222',
    marginBottom: 8,
  },
  textTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#6A5ACD',
  },
});

export default ProfileDetail;