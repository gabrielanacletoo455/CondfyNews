import { NavigationContainer } from '@react-navigation/native';
import StackNavigationApp from './stacks';
import { createNavigationContainerRef } from '@react-navigation/native';
export const navigationRef = createNavigationContainerRef();

const Routes = () => {
  return (
    <NavigationContainer
      ref={navigationRef}
      onStateChange={() => {
        const currentRoute = navigationRef.getCurrentRoute()?.name;
      }}
    >
      <StackNavigationApp />
    </NavigationContainer>
  );
};

export default Routes;
