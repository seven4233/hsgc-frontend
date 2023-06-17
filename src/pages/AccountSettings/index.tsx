import React, { useRef, useState } from 'react';
import styles from './index.less';
import { GridContent } from '@ant-design/pro-components';
import { Menu } from 'antd';
import BaseView from './components/Base';
import { MenuItemType } from 'antd/es/menu/hooks/useItems';


type AccountSettingsStateKeys = 'base' | 'security' | 'binding' | 'notification';
type AccountSettingsState = {
  mode: 'inline' | 'horizontal';
  selectKey: AccountSettingsStateKeys;
};

const AccountSettings: React.FC = () => {

  const menuItems: MenuItemType[] = [
    {
        key:'base',
        label:"基本设置"
    },
    {
        key:'security',
        label:"安全设置"
    },
    {
        key:'binding',
        label:"账号绑定"
    },
    {
        key:'notification',
        label:"新消息通知"
    }
  ]
  
  
//   {
//     base: '基本设置',
//     security: '安全设置',
//     binding: '账号绑定',
//     notification: '新消息通知',
//   };


  const dom = useRef<HTMLDivElement>();
  const [initConfig, setInitConfig] = useState<AccountSettingsState>({
    mode: 'inline',
    selectKey: 'base',
  });


  const renderChildren = () => {
    const { selectKey } = initConfig;
    switch (selectKey) {
      case 'base':
        return <BaseView />; 
    //   case 'security':
    //     return <SecurityView />;
    //   case 'binding':
    //     return <BindingView />;
    //   case 'notification':
    //     return <NotificationView />;
      default:
        return null;
    }
  };

  return (
    <GridContent>
      <div
        className={styles.main}
        ref={(ref) => {
          if (ref) {
            dom.current = ref;
          }
        }}
      >
        <div className={styles.leftMenu}>
          <Menu
            mode={initConfig.mode}
            selectedKeys={[initConfig.selectKey]}
            onClick={({ key }) => {
                console.log(key);
              setInitConfig({
                ...initConfig,
                selectKey: key as AccountSettingsStateKeys,
              });
            }}
            items={menuItems}
          />
          
        </div>
        <div className={styles.right}>
            <div className={styles.title}>{menuItems.find((item:any)=> item!.key === initConfig.selectKey)?.label} </div>
            {renderChildren()}
        </div>
      </div>
    </GridContent>
  );
};

export default AccountSettings;
