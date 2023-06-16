import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable, ModalForm, ProFormText, ProFormInstance } from '@ant-design/pro-components';
import { Button, Form, Space, Tag, message, Popconfirm } from 'antd';
import { useRef, useState } from 'react';
import { request } from '@umijs/max';
import { createUser, deleteUser } from '@/services/custom/admin';
import UpdateForm, { UpdateUserParams } from './components/UpdateForm';

type GithubIssueItem = {
  id?: number;
  account?: string;
  password?: string;
  username?: string;
  avatar?: string;
  email?: string;
  signature?: string;
  title?: string;
  group?: string;
  tags?: string[]; // { key?: string; label?: string }[]
  notifyCount?: number;
  unreadCount?: number;
  country?: string;
  access?: 0 | 1;
  gender?: 0 | 1;
  address?: string;
  phone?: string;
};

export default () => {
  const getUserList = (
    params: any,
  ): Promise<{
    result: GithubIssueItem[];
  }> => {
    return request<{
      result: GithubIssueItem[];
    }>('/api/admin/user', {
      method: 'GET',
      params,
    });
  };

  type createUserForm = {
    account: string;
    password: string;
  };

  const [createModelVisible, handleModelVisible] = useState(false);
  const [updateModalVisible, setUpdateModalVisible] = useState<boolean>(false);
  const [item, setItem] = useState<UpdateUserParams>();

  const formRef = useRef<ProFormInstance>();
  const [form] = Form.useForm<createUserForm>();
  const actionRef = useRef<ActionType>();

  const handleConfirm = async(e:any, id:number ) => {
    // 调用删除接口
    let res =  await deleteUser(id)
    if(res.status === 0 ){
      message.success("删除用户成功")
      // 请求用户列表
      actionRef.current?.reload()
    }
  };

  const columns: ProColumns<GithubIssueItem>[] = [
    {
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48,
    },
    {
      title: '账号',
      dataIndex: 'account',
      
    },
    {
      title: '密码',
      dataIndex: 'password',
      hideInSearch: true
    },
    {
      title: '用户名',
      dataIndex: 'username',
    },
    {
      title: '头像',
      dataIndex: 'avatar',
      valueType: 'image',
      hideInSearch: true
    },
    {
      title: '性别',
      dataIndex: 'gender',
      hideInSearch: true,
      render: (_, record) => (
        <div>
          {record.gender === 0 && <Tag color="blue">{'男'}</Tag>}
          {record.gender === 1 && <Tag color="red">{'女'}</Tag>}
        </div>
      ),
    },
    {
      title: '电话',
      dataIndex: 'phone',
      hideInSearch: true
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      hideInSearch: true
    },
    {
      title: '创建时间',
      key: 'showTime',
      dataIndex: 'createdAt',
      valueType: 'dateTime',
      sorter: true,
      hideInSearch: true,
    },

    {
      title: '操作',
      hideInSearch: true,

      valueType: 'option',
      key: 'option',
      render: (_, record: any) => {
        return (
          <div>
            <Space>
              <a
                onClick={() => {
                  setUpdateModalVisible(true);
                  console.log(record);
                  setItem(record);
                }}
              >
                编辑
              </a>

              <Popconfirm
                title="确认删除?"
                onConfirm={(e)=>handleConfirm(e,record.id)}
                // onCancel={}
                okText="确定"
                cancelText="取消"
              >
                <a onClick={() => {}}>删除</a>
              </Popconfirm>
            </Space>
          </div>
        );
      },
    },
  ];

  // const handleCancel  =()=>{}
  // const handleSubmit =  async()=>{}

  return (
    <div>
      <ProTable<GithubIssueItem>
        columns={columns}
        actionRef={actionRef}
        cardBordered
        request={async (params = {}, sort, filter) => {
          console.log(sort, filter);
          let res = await getUserList(params);
          console.log(res.result);
          return { data: res.result };
        }}
        editable={{
          type: 'multiple',
        }}
        columnsState={{
          persistenceKey: 'pro-table-singe-demos',
          persistenceType: 'localStorage',
          onChange(value) {
            console.log('value: ', value);
          },
        }}
        rowKey="id"
        search={{
          labelWidth: 'auto',
          span:6
          
        }}
        options={{
          setting: {
            listsHeight: 400,
          },
        }}
        form={{
          // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
          // syncToUrl: (values, type) => {
          //   if (type === 'get') {
          //     return {
          //       ...values,
          //       created_at: [values.startTime, values.endTime],
          //     };
          //   }
          //   return values;
          // },
        }}
        pagination={{
          pageSize: 5,
          
          onChange: (page) => console.log(page),
        }}
        dateFormatter="string"
        headerTitle="用户列表"
        toolBarRender={() => [
          <Button
            onClick={() => handleModelVisible(true)}
            key="button"
            icon={<PlusOutlined />}
            type="primary"
          >
            新建
          </Button>,
        ]}
      />

      {/* 创建用户的弹窗     */}
      <ModalForm<createUserForm>
        formRef={formRef}
        open={createModelVisible}
        onOpenChange={handleModelVisible}
        title="创建用户"
        form={form}
        onFinish={async (values) => {
          console.log(values);
          // 调用创建用户接口
          let res = await createUser(values);
          if (res.status === 0) {
            message.success('创建用户成功');
            // 重新获取用户列表
            actionRef.current?.reload();
            formRef.current?.resetFields();
            return true;
          } else {
            message.error(res.message);
            return false;
          }
        }}
        submitter={{
          render: (props, defaultDoms) => {
            return [
              ...defaultDoms,
              <Button
                key={'reset'}
                onClick={() => {
                  formRef.current?.resetFields();
                }}
              >
                重置
              </Button>,
            ];
          },
          searchConfig: {
            submitText: '提交',
            resetText: '取消',
          },
        }}
      >
        <ProFormText
          width="md"
          name="account"
          label="账号"
          tooltip="最长为 24 位"
          placeholder="请输入账号"
        />

        <ProFormText width="md" name="password" label="密码" placeholder="请输入密码" />
      </ModalForm>

      {updateModalVisible && (
        <UpdateForm
          values={item}
          FatherFormRef={actionRef}
          updateModalVisible={updateModalVisible}
          setUpdateModelVisible={setUpdateModalVisible}
        ></UpdateForm>
      )}
    </div>
  );
};
