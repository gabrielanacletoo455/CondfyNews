import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import Login from '@/screens/login';
import Recentes from '@/screens/recent';
import Relevantes from '@/screens/relevant';
import Layout from '@/components/Layout';
import Register from '@/screens/register';
import NewContent from '@/screens/newContent';
import MyContent from '@/screens/myContent';
import Profile from '@/screens/profile';
import Post from '@/screens/post';
import ProfileDetail from '@/screens/profileDetail';
import Search from '@/screens/search';

const Stack = createNativeStackNavigator<RootStackParamList>();

const StackNavigationApp = () => {
  return (
    <>
      <Layout>
        <Stack.Navigator
          screenOptions={{ headerShown: false }}
           initialRouteName="Relevantes"
        >
          <Stack.Screen name="Index" component={Relevantes} />

          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />

          <Stack.Screen name="Relevantes" component={Relevantes} />
          <Stack.Screen name="Recentes" component={Recentes} />
        

          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="ProfileDetail" component={ProfileDetail} />

          <Stack.Screen name="NovoConteudo" component={NewContent} />
          <Stack.Screen name="MeusConteudos" component={MyContent} />
          <Stack.Screen name="Post" component={Post} />
          <Stack.Screen name="Search" component={Search} />
        </Stack.Navigator>
      </Layout>
    </>
  );
};

export default StackNavigationApp;
