import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { postsApi } from '../api';
import { IPost } from '../types/typings';

interface PostsState {
  posts: IPost[];
  status: 'idle' | 'pending';
}

export const getPosts = createAsyncThunk('posts/all', postsApi.getAll);
export const createPost = createAsyncThunk('posts/create', postsApi.create);
export const updatePost = createAsyncThunk('posts/update', postsApi.update);
export const deletePost = createAsyncThunk('posts/delete', postsApi.remove);

const initialState: PostsState = {
  posts: [],
  status: 'idle'
};

const postsSlice = createSlice({
  name: 'posts',
  initialState: initialState as PostsState,
  reducers: {},
  extraReducers: builder => {
    // getPosts
    builder
      .addCase(getPosts.pending, state => {
        state.status = 'pending';
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.posts = action.payload;
        state.status = 'idle';
      });

    // createPost
    builder
      .addCase(createPost.pending, state => {
        state.status = 'pending';
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.posts.push(action.payload);
        state.status = 'idle';
      });

    // updatePost
    builder
      .addCase(updatePost.pending, state => {
        state.status = 'pending';
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.posts = state.posts.map((post) => {
          if (post.id !== action.payload.id)
            return post;

          return action.payload;
        });
        state.status = 'idle';
      });

    // deletePost
    builder
      .addCase(deletePost.pending, state => {
        state.status = 'pending';
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.posts = state.posts.filter(post => post.id !== action.payload.id);
        state.status = 'idle';
      });
  }
});

export const postsReducer = postsSlice.reducer;
