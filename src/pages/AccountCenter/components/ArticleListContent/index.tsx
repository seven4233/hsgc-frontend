import { Avatar, Image, Space } from 'antd';
import React from 'react';
import moment from 'moment';
import styles from './index.less';

export type ApplicationsProps = {
  data: {
    content?: string;
    updatedAt?: any;
    owner?: string;
    href?: string;
    userInfo?: any;
  };
};
const ArticleListContent: React.FC<ApplicationsProps> = ({
  data: { content, updatedAt, owner, href, userInfo },
}) => (
  <div style={{ display: 'flex' , justifyContent: 'space-between'}}>
    <div className={styles.listContent}>
      <div className={styles.extra}>
        <Avatar src={userInfo?.avatar} size="small" />
        <a href={href}>{userInfo?.username}</a> 发布于
        <em>{moment(updatedAt).format('YYYY-MM-DD HH:mm')}</em>
      </div>
      <div className={styles.description}>{content}</div>
    </div>
    {/* 图片 */}
    <div className={styles.images}>
      <Image.PreviewGroup
        preview={{
          onVisibleChange: (current, prev) =>
            console.log(`current index: ${current}, prev index: ${prev}`),
        }}
      >
        <Space wrap style={{width: '400px'}}>
        <Image
          width={100}
          src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
        />
        <Image
          width={100}
          src="https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg"
        />
         <Image
          width={100}
          src="https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg"
        />
       
        </Space>
       
      </Image.PreviewGroup>
    </div>
  </div>
);

export default ArticleListContent;
