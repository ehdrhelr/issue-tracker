import { useQuery } from 'react-query';
import axios from 'axios';

const url = 'https://44c597b3-b68a-4a8a-b608-3fe8108c0210.mock.pstmn.io/api';

interface Props {
  id?: string;
  assignee?: string;
  label?: string;
  milstone?: string;
  writer?: string;
}

const getData = async (type: string, action: string, filter?: Props) => {
  switch (type) {
    case 'issue':
      switch (action) {
        case 'getAllData':
          const allData = await axios.get(`${url}/issues`);
          return allData.data.data;
        case 'count':
          const count = await axios.get(`${url}/issues`);
          return count.data.data;
        case 'detail':
          const detail = await axios.get(`${url}${filter?.id}`);
          return detail.data.data;
      }
      return;
    case 'label':
      switch (action) {
        case 'getAllData':
          const allData = await axios.get(`${url}/labels`);
          return allData.data.data;
      }
      return;
    case 'milestone':
      switch (action) {
        case 'getAllData':
          const allData = await axios.get(`${url}/milestones`);
          return allData.data.data;
      }
      return;
  }
};

export default function useFetch(type: string, action: string, filter?: Props) {
  return useQuery([type, action, filter], () => getData(type, action, filter));
}