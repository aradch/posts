import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { commentsApi } from '../api';
import { IComment } from '../types/typings';

interface CommentsState {
  comments: IComment[];
  status: 'idle' | 'pending';
}

export const getComments = createAsyncThunk('comments/all', commentsApi.getAll);
export const createComment = createAsyncThunk('comments/create', commentsApi.create);
export const updateComment = createAsyncThunk('comments/update', commentsApi.update);
export const deleteComment = createAsyncThunk('comments/delete', commentsApi.remove);

const initialState: CommentsState = {
  comments: [],
  status: 'idle'
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState: initialState as CommentsState,
  reducers: {},
  extraReducers: builder => {
    // getComments
    builder
      .addCase(getComments.pending, state => {
        state.status = 'pending';
      })
      .addCase(getComments.fulfilled, (state, action) => {
        state.comments = action.payload;
        state.status = 'idle';
      });

    // createComment
    builder
      .addCase(createComment.pending, state => {
        state.status = 'pending';
      })
      .addCase(createComment.fulfilled, (state, action) => {
        state.comments.push(action.payload);
        state.status = 'idle';
      });

    // updateComment
    builder
      .addCase(updateComment.pending, state => {
        state.status = 'pending';
      })
      .addCase(updateComment.fulfilled, (state, action) => {
        state.comments = state.comments.map((comment) => {
          if (comment.id !== action.payload.id)
            return comment;

          return action.payload;
        });
        state.status = 'idle';
      });

    // deleteComment
    builder
      .addCase(deleteComment.pending, state => {
        state.status = 'pending';
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.comments = state.comments.filter(comment => comment.id !== action.payload.id);
        state.status = 'idle';
      });
  }
});

export const commentsReducer = commentsSlice.reducer;
