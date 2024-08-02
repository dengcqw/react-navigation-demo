import { Linking } from 'react-native'
import { LinkingOptions } from '@react-navigation/native';

Linking.addEventListener('url', ({ url }) => {
  console.log('----> 接受到url： ', url)
})


// 参考 https://reactnavigation.org/docs/configuring-links
// 定义页面路由
// config的嵌套要和导航器一直
// 设置 NotFound 为 404页面
// 输入命令验证 npx uri-scheme open "pagerouter://customtab/settings" --ios
export const linking = ((): LinkingOptions => {
  return {
    prefixes: [
      'pagerouter://',
      'http://127.0.0.1' // deeplink
    ],
    config: {
      screens: {
        NotFound: '*',
        MyTask: {
          screens: {
            Home: 'mytask/home',
            Settings: 'mytask/settings'
          }
        },
        Home: 'home',
        Detail: 'detail',
        BottomTab: {
          path: 'customtab',
          screens: {
            Home: 'home',
            Settings: 'settings'
          }
        },
        Edit: 'edit'
      }
    }
  }
})()
