import * as React from 'react';
import { View, Linking } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { Button } from '@react-navigation/elements';
import { Drawer } from 'react-native-drawer-layout';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'

function HomeScreen() {
  const navigation = useNavigation();
  const rightDrawerAction = React.useContext(RightDrawerContext)

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button onPress={() => navigation.navigate('Notifications')}>
        Go to notifications
      </Button>
      <Button onPress={() => navigation.openDrawer()}>Open drawer</Button>
      <Button onPress={() => rightDrawerAction.openRightDrawer()}>Open Right drawer</Button>
    </View>
  );
}

function NotificationsScreen() {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button onPress={() => navigation.goBack()}>Go back home</Button>
    </View>
  );
}

const DrawerNavi = createDrawerNavigator();

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Help"
        onPress={() => Linking.openURL('https://www.google.com')}
      />
      <DrawerItem
        label="Close"
        onPress={() => props.navigation.closeDrawer()}
      />
      <Button onPress={() => props.navigation.dispatch(DrawerActions.closeDrawer())}>
        Close drawer
      </Button>
    </DrawerContentScrollView>
  );
}

export function LeftDrawerScreen() {
  return (
    <DrawerNavi.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      initialRouteName="Home">
      <DrawerNavi.Screen name="Home" component={HomeScreen} />
      <DrawerNavi.Screen name="Notifications" component={NotificationsScreen} />
    </DrawerNavi.Navigator>
  );
}


function RightCustomDrawerContent(props) {
  return (
    <SafeAreaView>
    <Button onPress={() => props.actions.closeRightDrawer()}>
      Close drawer
    </Button>
    </SafeAreaView>
  );
}

const RightDrawerContext = React.createContext();
// 两个Drawer 推荐下面方式
export function RightDrawerScreen() {
  const [rightDrawerOpen, setRightDrawerOpen] = React.useState(false);

  // navigation 不能控制RightDrawer，把打开和关闭方法通过context传递下去
  const value = React.useMemo(
    () => ({
      openRightDrawer: () => setRightDrawerOpen(true),
      closeRightDrawer: () => setRightDrawerOpen(false),
    }),
    []
  );

  return (
    <SafeAreaProvider>
      <Drawer
        open={rightDrawerOpen}
        onOpen={() => setRightDrawerOpen(true)}
        onClose={() => setRightDrawerOpen(false)}
        drawerPosition="right"
        renderDrawerContent={() => <RightCustomDrawerContent actions={value} />}
      >
        <RightDrawerContext.Provider value={value}>
          <LeftDrawerScreen />
        </RightDrawerContext.Provider>
      </Drawer>
    </SafeAreaProvider>
  );
}
