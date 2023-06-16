import React, { useRef, useState } from 'react';
import { useModel } from '@umijs/max';
import { PlusOutlined} from '@ant-design/icons';
import styles from './index.less';
import { GridContent } from '@ant-design/pro-components';
import { Card, Divider, Row, Col, Input, Tag, Image, Space } from 'antd';
import { TagType, tabKeyType } from './data';
import Articles from './components/Articles';

const operationTabList = [
  {
    key: 'articles',
    tab: (
      <span>
        文章 <span style={{ fontSize: 14 }}>(8)</span>
      </span>
    ),
  },
  {
    key: 'applications',
    tab: (
      <span>
        应用 <span style={{ fontSize: 14 }}>(8)</span>
      </span>
    ),
  },
  {
    key: 'projects',
    tab: (
      <span>
        项目 <span style={{ fontSize: 14 }}>(8)</span>
      </span>
    ),
  },
];

const TagList: React.FC<{ tags: API.CurrentUser['tags'] }> = ({ tags }) => {
  // @ts-ignore
  const ref = useRef<Input | null>(null);
  const [newTags, setNewTags] = useState<TagType[]>([]);
  const [inputVisible, setInputVisible] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>('');

  const showInput = () => {
    setInputVisible(true);
    if (ref.current) {
      // eslint-disable-next-line no-unused-expressions
      ref.current?.focus();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputConfirm = () => {
    let tempsTags = [...newTags];
    if (inputValue && tempsTags.filter((tag) => tag.label === inputValue).length === 0) {
      tempsTags = [...tempsTags, { key: `new-${tempsTags.length}`, label: inputValue }];
    }
    setNewTags(tempsTags);
    setInputVisible(false);
    setInputValue('');
  };

  return (
    <div className={styles.tags}>
      <div className={styles.tagsTitle}>标签</div>
      {(tags || []).concat(newTags).map((item) => (
        <Tag key={item.key}>{item.label}</Tag>
      ))}
      {inputVisible && (
        <Input
          ref={ref}
          type="text"
          size="small"
          style={{ width: 78 }}
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputConfirm}
          onPressEnter={handleInputConfirm}
        />
      )}
      {!inputVisible && (
        <Tag onClick={showInput} style={{ borderStyle: 'dashed' }}>
          <PlusOutlined />
        </Tag>
      )}
    </div>
  );
};

const AccountCenter: React.FC = () => {
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};
  const [tabKey, setTabKey] = useState<tabKeyType>('articles');

  // 渲染用户信息
  const renderUserInfo = ({ college, major, phone }: Partial<API.CurrentUser>) => {
    return (
      <div className={styles.detail}>
        <p>
          <Space size={5}>
            <Image
              width={20}
              preview={false}
              src="https://cdn.huashui666.com/static/images/%E7%94%B5%E8%AF%9D.png"
            />
            {phone}
          </Space>
        </p>
        <p>
          <Space size={5}>
            <Image
              width={20}
              preview={false}
              src="https://cdn.huashui666.com/static/images/college.png"
            />
            {college}
          </Space>
        </p>
        <p>
       
        <Space size={5}>
            <Image
              width={20}
              preview={false}
              src="https://cdn.huashui666.com/static/images/%E4%B8%93%E4%B8%9A%E6%8E%92%E5%90%8D.png"
            />
            {major}
          </Space>
        </p>
      </div>
    );
  };
  // 渲染tab切换
  const renderChildrenByTabKey = (tabValue: tabKeyType) => {
    if (tabValue === 'projects') {
      // return <Projects />;
    }
    if (tabValue === 'applications') {
      // return <Applications />;
    }
    if (tabValue === 'articles') {
      return <Articles />;
    }
    return null;
  };

  return (
    <GridContent>
      <Row gutter={24}>
        <Col lg={7} md={24}>
          <Card bordered={false} style={{ marginBottom: 24 }} loading={false}>
            {currentUser && (
              <div>
                <div className={styles.avatarHolder}>
                  <img src={currentUser.avatar} alt="" />
                  <div className={styles.name}>{currentUser.username}</div>
                  <div>{'我看到的不是风 而是整个世界'}</div>
                </div>
                {renderUserInfo(currentUser)}
                <Divider dashed />
                <TagList tags={currentUser.tags || []} />
                <Divider style={{ marginTop: 16 }} dashed />

                <div className={styles.team}>
                  <div className={styles.teamTitle}>团队</div>
                  <Row gutter={36}></Row>
                </div>
              </div>
            )}
          </Card>
        </Col>
        {/* 右侧标签导航 */}
        <Col lg={17} md={24}>
          <Card
            className={styles.tabsCard}
            bordered={false}
            tabList={operationTabList}
            activeTabKey={tabKey}
            onTabChange={(_tabKey: string) => {
              setTabKey(_tabKey as tabKeyType);
            }}
          >
            {renderChildrenByTabKey(tabKey)}
          </Card>
        </Col>
      </Row>
    </GridContent>
  );
};
export default AccountCenter;
