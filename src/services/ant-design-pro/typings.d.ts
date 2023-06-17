// @ts-ignore
/* eslint-disable */

declare namespace API {
  type CurrentUser = {
    id?:number;
    account?: string;
    password?: string;
    username?: string;
    avatar?: string;
    email?: string;
    signature?: string;
    title?: string;
    grade?:string; //年级
    group?: string;
    major?:string; //专业
    college?:string; //学院
    collegeCode?:string; //学院代号
    tags?: { key: string; label: string, id?:number }[];
    notifyCount?: number;
    unreadCount?: number;
    country?: string;
    access?: 0 | 1;
    gender?: 0 | 1;
    address?: string;
    dorm?:string;
    phone?: string;
  };

  type LoginResult = {
    status?: string | number;
    type?: string;
    message?: string;
    currentAuthority?: string;
    token?:string;
  };

  type RegisterResult = {
    status?: string | number;
    message?: string;
    result?:any
  };

  type PageParams = {
    current?: number;
    pageSize?: number;
  };

  type RuleListItem = {
    key?: number;
    disabled?: boolean;
    href?: string;
    avatar?: string;
    name?: string;
    owner?: string;
    desc?: string;
    callNo?: number;
    status?: number;
    updatedAt?: string;
    createdAt?: string;
    progress?: number;
  };
  type UserListItem = CurrentUser

  type RuleList = {
    data?: RuleListItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type FakeCaptcha = {
    code?: number;
    status?: string;
  };

  type LoginParams = {
    account?: string;
    password?: string;
    autoLogin?: boolean;
    type?: string;
  };

  type CreateUserParams = CurrentUser

  type RegisterParams = {
    account?: string;
    password?: string;
    confirmPassword?: string;
    captcha?:string;
  };
  type updateUserParams = CurrentUser

  type ErrorResponse = {
    /** 业务约定的错误码 */
    errorCode: string;
    /** 业务上的错误信息 */
    errorMessage?: string;
    /** 业务上的请求是否成功 */
    success?: boolean;
  };

  type NoticeIconList = {
    data?: NoticeIconItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type NoticeIconItemType = 'notification' | 'message' | 'event';

  type NoticeIconItem = {
    id?: string;
    extra?: string;
    key?: string;
    read?: boolean;
    avatar?: string;
    title?: string;
    status?: string;
    datetime?: string;
    description?: string;
    type?: NoticeIconItemType;
  };
}
