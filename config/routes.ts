export default [
  { path: '/welcome', name: '欢迎', icon: 'smile', component: './Welcome' },

  {
    path: '/user',
    layout: false,
    routes: [
      { name: '登录', path: '/user/login', component: './User/Login' },
      { name: '注册', path: '/user/register', component: './User/Register' },
    ],
  },
  {
    path: '/admin',
    name: '管理页',
    icon: 'crown',
    access: 'canAdmin',
    component: './Admin',
    routes: [
      { path: '/admin', redirect: '/admin/userlist' },
      { path: '/admin/userlist', name: '用户列表', component: './Admin/UserList' },
    ],
  },
  {
    path: '/account/center',
    name: '个人中心',
    menu:false,
    component: './AccountCenter',
  },
  {
    path: '/account/settings',
    name: '个人设置',
    menu:false,
    component: './AccountSettings',
  },
  // { name: '查询表格', icon: 'table', path: '/list', component: './TableList' },
  { path: '/', redirect: '/welcome' },
  { path: '*', layout: false, component: './404' },
];
