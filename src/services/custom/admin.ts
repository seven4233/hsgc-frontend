// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';


type CreatUserResult = {
    status: number;
    message: string
}
/** 创建用户 POST /api/admin/user */
export async function createUser(
  data: API.CreateUserParams,
  options?: { [key: string]: any },
) {
  return request<CreatUserResult>('/api/admin/user', {
    method: 'POST',
    data,
    ...(options || {}),
  });
}

/** 更新用户信息 PATCH /api/admin/user/ */
export async function updateUser(id:number|undefined, body: API.updateUserParams, options?: { [key: string]: any }) {
  return request<API.RegisterResult>(`/api/admin/user/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除用户信息 DELETE /api/admin/user/:id */
export async function deleteUser(id:number|undefined,  options?: { [key: string]: any }) {
  return request<API.RegisterResult>(`/api/admin/user/${id}`, {
    method: 'DELETE',
    ...(options || {}),
  });
}