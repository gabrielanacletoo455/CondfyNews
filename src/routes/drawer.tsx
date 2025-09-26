import { createDrawerNavigator } from '@react-navigation/drawer';
import StackNavigationApp from './stacks';
import Login from '@/screens/login';
import Profile from '@/screens/profile';

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: '#121212',
        },
        drawerPosition: 'right',
        drawerActiveTintColor: '#6A5ACD',
        drawerInactiveTintColor: '#FFF',
      }}
    >
      <Drawer.Screen 
        name="MainStack" 
        component={StackNavigationApp}
        
        options={{ 
            title: 'Home',
            drawerItemStyle: {display: 'none'}
        }}
      />
      <Drawer.Screen 
        name="Perfil" 
        component={Profile}
        options={{ 
            title: 'Perfil' }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;