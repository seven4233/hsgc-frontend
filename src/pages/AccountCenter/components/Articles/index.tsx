import { List, Tag , Space, Divider} from 'antd';
import { ListItemDataType } from '../../data';
import styles from './index.less';
import { LikeOutlined, MessageFilled, StarTwoTone } from '@ant-design/icons';
import ArticleListContent from '../ArticleListContent';
const Articles: React.FC = () => {
  const IconText: React.FC<{
    icon: React.ReactNode;
    text: React.ReactNode;
  }> = ({ icon, text }) => (
    <span>
      {icon} {text}
    </span>
  );

  function fakeList(count: number): ListItemDataType[] {
    const list = [];
    for (let i = 0; i < count; i += 1) {
      list.push({
        id: `fake-list-${i}`,
        title:'AliPay',
        // owner: user[i % 10],
        // title: titles[i % 8],
        // avatar: avatars[i % 8],
        // cover: parseInt(`${i / 4}`, 10) % 2 === 0 ? covers[i % 4] : covers[3 - (i % 4)],
        status: ['active', 'exception', 'normal'][i % 3] as
          | 'normal'
          | 'exception'
          | 'active'
          | 'success',
        percent: Math.ceil(Math.random() * 50) + 50,
        // logo: avatars[i % 8],
        href: 'https://ant.design',
        updatedAt: new Date(new Date().getTime() - 1000 * 60 * 60 * 2 * i).getTime(),
        createdAt: new Date(new Date().getTime() - 1000 * 60 * 60 * 2 * i).getTime(),
        // subDescription: desc[i % 5],
        description:
          '在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。',
        activeUser: Math.ceil(Math.random() * 100000) + 100000,
        newUser: Math.ceil(Math.random() * 1000) + 1000,
        star: Math.ceil(Math.random() * 100) + 100,
        like: Math.ceil(Math.random() * 100) + 100,
        message: Math.ceil(Math.random() * 10) + 10,
        content:
          '段落示意：蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。',
        members: [
          {
            avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ZiESqWwCXBRQoaPONSJe.png',
            name: '曲丽丽',
            id: 'member1',
          },
          {
            avatar: 'https://gw.alipayobjects.com/zos/rmsportal/tBOxZPlITHqwlGjsJWaF.png',
            name: '王昭君',
            id: 'member2',
          },
          {
            avatar: 'https://gw.alipayobjects.com/zos/rmsportal/sBxjgqiuHMGRkIjqlQCd.png',
            name: '董娜娜',
            id: 'member3',
          },
        ],
      });
    }
  
    return list;
  }
  const listData = ()=>{
    return fakeList(1)
  };

  return (
    <List<ListItemDataType>
      size="large"
      className={styles.articleList}
      rowKey={'id'}
      itemLayout="vertical"
      dataSource={listData() || []}
      renderItem={(item) => (
        <List.Item
          key={item.id}
          actions={[
            <>
            <Space split={<Divider type="vertical" />}>
              <IconText key={'start'} icon={<StarTwoTone />} text={item.star} />
              <IconText key={'like'} icon={<LikeOutlined />} text={item.like} />
              <IconText key={'message'} icon={<MessageFilled />} text={item.message} />
            </Space>
            </>
          ]}
        >
          <List.Item.Meta
            title={
              <a className={styles.listItemMetaTitle} href={item.href}>
                {item.title}
              </a>
            }
            description={
              <span>
                <Tag>Ant Design</Tag>
                <Tag>设计语言</Tag>
                <Tag>蚂蚁金服</Tag>
              </span>
            }
          ></List.Item.Meta>
          <ArticleListContent data={item} /> 
        </List.Item>
      )}
    ></List>
  );
};

export default Articles;
