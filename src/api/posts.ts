import { fetcher } from '../base/fetch';
import { IPost } from '../types/typings';

const getAll = async () => {
  const res = await fetcher<IPost[]>('http://localhost:3000/posts');

  return res;
};

const create = async (post: IPost) => {
  const res = await fetcher<IPost>('http://localhost:3000/posts', {
    method: 'POST',
    body: JSON.stringify(post)
  });

  return res;
};

const update = async (post: IPost) => {
  const res = await fetcher<IPost>(`http://localhost:3000/posts/${post.id}`, {
    method: 'PATCH',
    body: JSON.stringify(post)
  });

  return res;
};

const remove = async (id: string) => {
  const res = await fetcher<IPost>(`http://localhost:3000/posts/${id}?_dependent=comments`, {
    method: 'DELETE'
  });

  return res;
};

export default { getAll, create, update, remove };
