import { Card, Form, Select, Row, Col, List, Button, Tag, Input } from 'antd';
import { useModel, useRequest } from '@umijs/max';
import { queryFakeList } from './service';
import StandardFormRow from './components/StandardFormRow';
import TagSelect from './components/TagSelect';
import { PageContainer } from '@ant-design/pro-components';
import styles from './index.less';
import { ListItemDataType } from '../AccountCenter/data';
import { LoadingOutlined, StarOutlined, MessageOutlined, LikeOutlined } from '@ant-design/icons';
import ArticleListContent from '../AccountCenter/components/ArticleListContent';

const { Option } = Select;
const FormItem = Form.Item;
const pageSize = 5;

const Moment = () => {
  const [form] = Form.useForm();
const {initialState} = useModel('@@initialState')
const { currentUser} = initialState || {}

  const { data, reload, loading, loadMore, loadingMore } = useRequest(
    () => {
      return queryFakeList({
        count: pageSize,
      });
    },
    {
      loadMore: true,
    },
  );



  const formItemLayout = {
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 24 },
      md: { span: 12 },
    },
  };

  const IconText: React.FC<{
    type: string;
    text: React.ReactNode;
  }> = ({ type, text }) => {
    switch (type) {
      case 'star-o':
        return (
          <span>
            <StarOutlined style={{ marginRight: 8, cursor: 'pointer' }} />
            {text}
          </span>
        );
      case 'like-o':
        return (
          <span>
            <LikeOutlined style={{ marginRight: 8, cursor: 'pointer'}} />
            {text}
          </span>
        );
      case 'message':
        return (
          <span>
            <MessageOutlined style={{ marginRight: 8, cursor: 'pointer' }} />
            {text}
          </span>
        );
      default:
        return null;
    }
  };
  const list = data?.list || [];
  const loadMoreDom = list.length > 0 && (
    <div style={{ textAlign: 'center', marginTop: 16 }}>
      <Button onClick={loadMore} style={{ paddingLeft: 48, paddingRight: 48 }}>
        {loadingMore ? (
          <span>
            <LoadingOutlined /> 加载中...
          </span>
        ) : (
          '加载更多'
        )}
      </Button>
    </div>
  );

  return (
    <PageContainer>
      <Card bordered={false}>
        <Form layout="inline" form={form} onValuesChange={reload}>
          <StandardFormRow title="所属分类" block style={{ paddingBottom: 11 }}>
            <FormItem name={'category'}>
              <TagSelect>
                <TagSelect.Option value={'cat1'}>最新</TagSelect.Option>
                <TagSelect.Option value={'cat2'}>最热</TagSelect.Option>
              </TagSelect>
            </FormItem>
          </StandardFormRow>

          <StandardFormRow title="其他选项" grid last>
            <Row gutter={16}>
              <Col xl={8} lg={10} md={12} sm={24} xs={24}>
                <FormItem {...formItemLayout} label="活跃用户" name="user">
                  <Select placeholder="不限" style={{ maxWidth: 200, width: '100%' }}>
                    <Option value="lisa">李三</Option>
                  </Select>
                </FormItem>
              </Col>
              <Col xl={8} lg={10} md={12} sm={24} xs={24}>
                <FormItem {...formItemLayout} label="好评度" name="rate">
                  <Select placeholder="不限" style={{ maxWidth: 200, width: '100%' }}>
                    <Option value="good">优秀</Option>
                  </Select>
                </FormItem>
              </Col>
            </Row>
          </StandardFormRow>
        </Form>
      </Card>

      <Card
        style={{ marginTop: 24 }}
        bordered={false}
        bodyStyle={{ padding: '8px 32px 32px 32px' }}
      >
        <List<ListItemDataType>
          size="large"
          loading={loading}
          rowKey={'id'}
          itemLayout="vertical"
          loadMore={loadMoreDom}
          dataSource={list}
          renderItem={(item) => (
            <List.Item
              key={item.id}
              actions={[
                <IconText  key="star" type="star-o" text={item.star} />,
                <IconText key="like" type="like-o" text={item.like} />,
                <IconText key="message" type="message" text={item.message} />,
              ]}
              extra={<div className={styles.listItemExtra} />}
            >
              <List.Item.Meta
                // 描述标签
                // description={
                //   <span>
                //     <Tag>设计语言</Tag>
                //     <Tag>蚂蚁金服</Tag>
                //   </span>
                // }
              ></List.Item.Meta>
              <ArticleListContent data={item} />
            </List.Item>
          )}
        ></List>
      </Card>
    </PageContainer>
  );
};

export default Moment;
