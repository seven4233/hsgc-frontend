import React, {  useRef, useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Spin, Upload, message } from 'antd';
import ProForm, {
  ProFormRadio,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  ProFormInstance,
} from '@ant-design/pro-form';
import { history, useModel, useRequest } from '@umijs/max';
import styles from './BaseView.less';
import { getCollegeListAPI, getMajorListAPI, gradeList } from '../data';
import { updateUser } from '@/services/custom/admin';

const validatorPhone = (rule: any, value: string) => {
  if (!value) {
    return Promise.reject('请输入您的联系电话')
  }
  return Promise.resolve()
};
// 头像组件 方便以后独立，增加裁剪之类的功能
const AvatarView = ({ avatar }: { avatar: string }) => (
  <>
    <div className={styles.avatar_title}>头像</div>
    <div className={styles.avatar}>
      <img src={avatar} alt="avatar" />
    </div>
    <Upload showUploadList={false}>
      <div className={styles.button_view}>
        <Button>
          <UploadOutlined />
          更换头像
        </Button>
      </div>
    </Upload>
  </>
);

const BaseView: React.FC = () => {
  const { initialState } = useModel('@@initialState');
  const { currentUser, fetchUserInfo } = initialState || {};
  const [userInfo, setUserInfo] = useState<API.CurrentUser| undefined>(currentUser)
  const [loading, setLoading] = useState(false)
  const [collegeCode, setCollegeCode] = useState<string|undefined>(userInfo?.collegeCode)
  const [majorList, setMajorList] = useState();
  const formRef = useRef<ProFormInstance>();

  // 获取学院列表
  let getCollegeList = async () => {
    let res = await getCollegeListAPI();
    return res.result;
  };

  // 获取专业列表
  let getMajorList = async (c = userInfo?.collegeCode) => {
    let res = await getMajorListAPI(c as string); 
    setMajorList(res.result);
  };

   useRequest(async() => {
    await getMajorList();
  });

  const getAvatarURL = () => {
    if (userInfo) {
      if (userInfo.avatar) {
        return userInfo.avatar;
      }
      const url = 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png';
      return url;
    }
    return '';
  };

  const handleChange = (c: string) => {
    let code = c.substring(1,3)
    formRef.current?.setFieldValue('major', null);
    getMajorList(code);

    setCollegeCode(code)
  };

  // 保存信息
  const handleFinish = async (e:any) => {


    let newInfo:API.CurrentUser = {...e, collegeCode}
    // 调用更新用户信息接口
    setLoading(true)
    let res = await updateUser(userInfo?.id, newInfo)
    if(res.status === 0){
      let res = await fetchUserInfo!()
      setUserInfo(res)
      setLoading(false)
      message.success("更新用户信息成功!")
      return
    }
    setLoading(false)
    message.error("更新用户信息失败!"+ res.message)

  };

  return (
    <div className={styles.baseView}>
      { loading? <Spin style={{width: '100%'}} spinning={loading} tip={"正在加载...."} />: 
        <>
          <div className={styles.left}>
            <ProForm
              formRef={formRef}
              layout="vertical"
              onFinish={handleFinish}
              submitter={{
                render: (props, doms)=>{
                  return [
                    ...doms,
                    <Button onClick={()=>{history.back()}} key={'back'}>返回</Button>
                  ]
                },
                resetButtonProps: {
                  style: {
                    display: 'none',
                  },
                },
                submitButtonProps: {
                  children: '更新基本信息',
                },
              }}
              initialValues={{
                ...userInfo,
              }}
              hideRequiredMark
            >
              <ProFormText
                width="md"
                name="email"
                label="邮箱"
                rules={[
                  {
                    required: true,
                    message: '请输入您的邮箱!',
                  },
                ]}
              />
              <ProFormText
                width="md"
                name="username"
                label="昵称"
                rules={[
                  {
                    required: true,
                    message: '请输入您的昵称!',
                  },
                ]}
              />
              <ProFormTextArea
                name="signature"
                label="个性签名"
                rules={[
                  {
                    required: true,
                    message: '请输入个性签名!',
                  },
                ]}
                placeholder="个性签名"
              />
              {/* 学院 */}
              <ProFormSelect
                showSearch
                width="sm"
                name="college"
                label="学院"
                request={getCollegeList}
                placeholder={"请选择您所在的学院"}
                fieldProps={{
                  onChange: (val) => handleChange(val),
                }}
                rules={[
                  {
                    required: true,
                    message: '请选择您所在的学院!',
                  },
                ]}
              />
              {/* 专业 */}
              <ProFormSelect
                width="sm"
                showSearch
                name="major"
                label="专业"
                placeholder={'请选择您的专业'}
                rules={[
                  {
                    required: true,
                    message: '请输入您的专业!',
                  },
                ]}
                options={majorList}
              />
              {/* 年级 */}
              <ProFormSelect
                width="md"
                name="grade"
                label="年级"
                placeholder={'请选择您的年级'}
                options={gradeList}
             
              />
            {/* 性别 */}
            <ProFormRadio.Group
              name="gender"
              label="性别"
              options={[
                {
                  label: '男',
                  value: 0,
                },
                {
                  label: '女',
                  value: 1,
                },
                {
                  label: '保密',
                  value: 2,
                },
              ]}
            />
              <ProFormText
                name="phone"
                label="联系电话"
                disabled
                rules={[
                  { validator: validatorPhone },
                ]}
              >
              </ProFormText>
            </ProForm>
          </div>
          <div className={styles.right}>
            <AvatarView avatar={getAvatarURL()} />
          </div>
        </>
      }
    </div>
  );
};

export default BaseView;
