import { request } from "@umijs/max"


export async function getCollegeListAPI(options?: { [key: string]: any }) {
    return request('/api/spider/college', {
      ...(options || {}),
    });
}


export async function getMajorListAPI( code: string, options?: { [key: string]: any }) {
    return request('/api/spider/major', {
        params:{
            code
        },
      ...(options || {}),
    });
}

export const gradeList = [
  {
    label:'2019级',
    value:'2019'
  },
  {
    label:'2020级',
    value:'2020'
  },
  {
    label:'2021级',
    value:'2021'
  },
  {
    label:'2022级',
    value:'2022'
  },
  {
    label:'2023级',
    value:'2023'
  }
]



