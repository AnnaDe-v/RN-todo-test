import {AnyAction, createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';

export type listType = {
    id: string
    title: string
    IsCompleted: boolean
}

type TodosState = {
    list: listType[]
    loading: boolean
    error: string | null
}

function Error(action: AnyAction) {
    return action.type.endsWith('rejected');
}

export const getTodosAsync = createAsyncThunk<listType[], undefined, { rejectValue: string }>(
    'todo/getTodosAsync',
    async function (_, {rejectWithValue}) {
        const resp = await fetch('https://630a5a4a324991003284bd51.mockapi.io/todolist');

        if (!resp.ok) {
            return rejectWithValue('Server Error!');
        }

        const todoFormResp = await resp.json();
        return todoFormResp as listType[]
    }
);



const initialState: TodosState = {
    list: [],
    loading: false,
    error: null
}

export const taskSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {},
    extraReducers: (builder => {
        builder
            .addCase(getTodosAsync.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(getTodosAsync.fulfilled, (state, action) => {
                state.list = action.payload
                state.loading = false
            })
            .addCase(addTodoAsync.pending, (state) => {
                state.error = null
            })
            .addCase(addTodoAsync.fulfilled, (state, action) => {
                state.list.push(action.payload)
            })
            .addCase(toggleCompleteAsync.pending, (state) => {
                state.error = null
            })
            .addCase(toggleCompleteAsync.fulfilled, (state, action) => {
                const toggledTodo = state.list.find((todo) => todo.id === action.payload.id);
                toggledTodo.IsCompleted = !toggledTodo.IsCompleted;
            })
            .addCase(deleteTodoAsync.pending, (state) => {
                state.error = null
            })
            .addCase(deleteTodoAsync.fulfilled, (state, action) => {
                state.list = state.list.filter((todo) => todo.id !== action.payload);
            })
            .addMatcher(Error, (state, action: PayloadAction<string>) => {
                state.error = action.payload;
                state.loading = false;
            });
    })
});
export default taskSlice.reducer;