import { fetcher } from '../base/fetch';
import { IComment } from '../types/typings';

const getAll = async () => {
  const res = await fetcher<IComment[]>('http://localhost:3000/comments');

  return res;
};

const create = async (comment: IComment) => {
  const res = await fetcher<IComment>('http://localhost:3000/comments', {
    method: 'POST',
    body: JSON.stringify(comment)
  });

  return res;
};

const update = async (comment: IComment) => {
  const res = await fetcher<IComment>(`http://localhost:3000/comments/${comment.id}`, {
    method: 'PATCH',
    body: JSON.stringify(comment)
  });

  return res;
};

const remove = async (id: string) => {
  const res = await fetcher<IComment>(`http://localhost:3000/comments/${id}`, {
    method: 'DELETE'
  });

  return res;
};

export default { getAll, create, update, remove };
