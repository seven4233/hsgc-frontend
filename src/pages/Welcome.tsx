import { PageContainer } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { Card, theme } from 'antd';
import React from 'react';

/**
 * 每个单独的卡片，为了复用样式抽成了组件
 * @param param0
 * @returns
 */
const InfoCard: React.FC<{
  title: string;
  index: number;
  desc: string;
  href: string;
}> = ({ title, href, index, desc }) => {
  const { useToken } = theme;

  const { token } = useToken();

  return (
    <div
      style={{
        backgroundColor: token.colorBgContainer,
        boxShadow: token.boxShadow,
        borderRadius: '8px',
        fontSize: '14px',
        color: token.colorTextSecondary,
        lineHeight: '22px',
        padding: '16px 19px',
        minWidth: '220px',
        flex: 1,
      }}
    >
      <div
        style={{
          display: 'flex',
          gap: '4px',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            width: 48,
            height: 48,
            lineHeight: '22px',
            backgroundSize: '100%',
            textAlign: 'center',
            padding: '8px 16px 16px 12px',
            color: '#FFF',
            fontWeight: 'bold',
            backgroundImage:
              "url('https://gw.alipayobjects.com/zos/bmw-prod/daaf8d50-8e6d-4251-905d-676a24ddfa12.svg')",
          }}
        >
          {index}
        </div>
        <div
          style={{
            fontSize: '16px',
            color: token.colorText,
            paddingBottom: 8,
          }}
        >
          {title}
        </div>
      </div>
      <div
        style={{
          fontSize: '14px',
          color: token.colorTextSecondary,
          textAlign: 'justify',
          lineHeight: '22px',
          marginBottom: 8,
        }}
      >
        {desc}
      </div>
      <a href={href} target="_blank" rel="noreferrer">
        了解更多 {'>'}
      </a>
    </div>
  );
};

const Welcome: React.FC = () => {
  const { token } = theme.useToken();
  const { initialState } = useModel('@@initialState');
  return (
    <PageContainer>
      <Card
        style={{
          borderRadius: 8,
        }}
        bodyStyle={{
          backgroundImage:
            initialState?.settings?.navTheme === 'realDark'
              ? 'background-image: linear-gradient(75deg, #1A1B1F 0%, #191C1F 100%)'
              : 'background-image: linear-gradient(75deg, #FBFDFF 0%, #F5F7FF 100%)',
        }}
      >
        <div
          style={{
            backgroundPosition: '100% -30%',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '274px auto',
            backgroundImage:
              "url('https://gw.alipayobjects.com/mdn/rms_a9745b/afts/img/A*BuFmQqsB2iAAAAAAAAAAAAAAARQnAQ')",
          }}
        >
          <div
            style={{
              fontSize: '20px',
              color: token.colorTextHeading,
            }}
          >
            欢迎来到 华水共创空间
          </div>
          <p
            style={{
              fontSize: '14px',
              color: token.colorTextSecondary,
              lineHeight: '22px',
              marginTop: 16,
              marginBottom: 32,
              width: '65%',
            }}
          >
            华水共创空间（Hua Shui Co-Creating Space）是一个创新性的、多功能的共享办公空间，为创业者、企业家和自由职业者提供一个包容、灵活和激励的工作环境。位于一个便利的城市中心地区，华水共创空间致力于打造一个创新社区，促进知识共享、合作和创业精神的蓬勃发展。
          </p>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 16,
            }}
          >
            <InfoCard
              index={1}
              href="https://ncwu.edu.cn"
              title="了解 NCWU"
              desc="华北水利水电大学(North China University of Water Resources and Electric Power)建有花园校区（河南省郑州市北环路36号，占地面积555亩）、龙子湖校区（河南省郑州市金水东路136号，占地面积1780亩）和江淮校区（河南省信阳市罗山县龙池大道236号，占地面积1500亩），是水利部与河南省共建、以河南省管理为主的高校，是河南省特色骨干大学，是全国首批硕士学位授予权单位、首批中西部高校基础能力建设工程高校、首批具有海外留学生招生资格高校、教育部卓越工程师教育培养计划高校，是教育部确定的“金砖国家网络大学”中方高校牵头单位。学校起源自1951年创建于北京的中央人民政府水利部水利学校，1954年更名为水利部北京水利学校。1958年北京水力发电学校、北京水力发电函授学院并入，成立北京水利水电学院。1969年迁至河北省磁县岳城水库办学，1971年更名为河北水利水电学院。1977年迁至河北省邯郸市办学，1978年更名为华北水利水电学院。1990年迁至河南省郑州市办学，2000年由水利部主管划转河南省管理，实行省部共建。2009年水利部与河南省政府签署共建华北水利水电学院战略协议。2013年更名为华北水利水电大学。2021年入选河南省“双一流”学科创建高校。"
            />
            {/* <InfoCard
              index={2}
              title="了解 ant design"
              href="https://ant.design"
              desc="antd 是基于 Ant Design 设计体系的 React UI 组件库，主要用于研发企业级中后台产品。"
            />
            <InfoCard
              index={3}
              title="了解 Pro Components"
              href="https://procomponents.ant.design"
              desc="ProComponents 是一个基于 Ant Design 做了更高抽象的模板组件，以 一个组件就是一个页面为开发理念，为中后台开发带来更好的体验。"
            /> */}
          </div>
        </div>
      </Card>
    </PageContainer>
  );
};

export default Welcome;
