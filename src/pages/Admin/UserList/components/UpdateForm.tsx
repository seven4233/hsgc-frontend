import React, { useEffect, useRef, useState, MutableRefObject} from 'react';
import { Button, Form, message, Image, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { ModalForm, ProFormText, ProFormInstance, ProFormRadio, ActionType } from '@ant-design/pro-components';
import { request } from '@umijs/max';
import { updateUser } from '@/services/custom/admin';
export type UpdateUserParams = API.CreateUserParams;
export type UpdateFormProps = {
  // onCancel?: (flag?: boolean, formVals?: FormValueType) => void;
  // onSubmit?: (values: FormValueType) => Promise<void>;
  updateModalVisible: boolean;
  setUpdateModelVisible: any;
  values?: Partial<UpdateUserParams>;
  FatherFormRef?: MutableRefObject<ActionType|undefined>
};



const UpdateForm: React.FC<UpdateFormProps> = ({
  updateModalVisible,
  setUpdateModelVisible,
  values,
  FatherFormRef
}) => {
  const [uploadToken, setUploadToken] = useState();
  const [filename, setFilename] = useState<string>();
  const [fileUrl, setFileUrl] = useState<string>();
  const cdn = 'https://cdn.huashui666.com';
  // 获取uploadtoken请求
  useEffect(() => {
    request('/api/user/uploadToken', {
      method: 'GET',
    }).then((res) => {
      if (res.status === 0) {
        setUploadToken(res.uploadToken);
      }
    });
  });
  // 上传参数
  const getUploadToken = () => {
    return {
      token: uploadToken,
      key: `avatar/${filename}`,
      'x:name': filename,
    };
  };
  // 上传之前回调
  const beforeUpload = async (file: File) => {
    console.log('before upload:', file, uploadToken);
    setFilename(file.name);
    return true;
  };
  // 上传成功回调
  const handleChange = (e: any) => {
    const { file } = e;
    if (file.response) {
      let url = `${cdn}/${file.response?.key}`;
      setFileUrl(url);
    }
    console.log(file);
  };

  const formRef = useRef<ProFormInstance>();
  const [form] = Form.useForm<UpdateUserParams>();

  return (
    <ModalForm<UpdateUserParams>
      open={updateModalVisible}
      formRef={formRef}
      onOpenChange={setUpdateModelVisible}
      initialValues={values}
      layout="horizontal"
      labelCol={{ span: 3 }}
      form={form}
      title="编辑用户信息"
      submitter={{
        render: (props, defaultDoms) => {
          return [
            ...defaultDoms,
            <Button
              key="reset"
              onClick={() => {
                props.reset();
              }}
            >
              重置
            </Button>,
          ];
        },
      }}
      onFinish={async (value) => {
        // await waitTime(2000);

        // 调用更新用户接口
        let res = await updateUser(values?.id, { ...value, avatar: fileUrl });
        if (res.status === 0) {
          message.success('更新成功');
          // 更新用户信息
          FatherFormRef?.current?.reload()
          return true;
        } else {
          return false;
        }
      }}
    >
      <ProFormText width={'sm'} name="account" label="账号" placeholder="请输入账号" />
      <ProFormText width={'sm'} name="password" label="密码" placeholder="请输入密码" />
      <ProFormText width="sm" name="username" label="用户名" placeholder="请输入用户名" />

      <ProFormText width="sm" name="avatar" label="头像">
        <Image width={50} src={fileUrl || values?.avatar} />
        <Upload
          showUploadList={false}
          action={'https://upload-z1.qiniup.com'}
          data={getUploadToken}
          beforeUpload={beforeUpload}
          onChange={handleChange}
        >
          <Button style={{ transform: 'translate(20px)' }} icon={<UploadOutlined />}>
            点击上传
          </Button>
        </Upload>
      </ProFormText>

      <ProFormText width="sm" name="email" label="邮箱" placeholder="请输入邮箱" />
      <ProFormText width="sm" name="phone" label="手机号" placeholder="请输入手机号" />
      <ProFormRadio.Group
        width={'sm'}
        label="性别"
        name="gender"
        options={[
          { label: '男', value: 0 },
          { label: '女', value: 1 },
        ]}
      />
      <ProFormText width="sm" name="tags" label="标签" placeholder="请输入标签" />
    </ModalForm>
  );
};

export default UpdateForm;
