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

export const getTodosAsync = createAsyncThunk<listType[], undefined, { rejectValue: string }>(
    'todo/getTodosAsync',
    async function (_, {rejectWithValue}) {
        const resp = await fetch('https://6305e272697408f7edcd6d37.mockapi.io/todo');
        if (!resp.ok) {
            return rejectWithValue('Server Error!');
        }

        const todoFormResp = await resp.json();
        return todoFormResp
    }
);

export const addTodoAsync = createAsyncThunk<listType, string, { rejectValue: string }>(
    'todo/addTodoAsync',
    async function (text, {rejectWithValue, dispatch}) {
        console.log(text)
        const todoObj = {
            title: text,
            IsCompleted: false
        }
        const resp = await fetch('https://6305e272697408f7edcd6d37.mockapi.io/todo',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                },
                body: JSON.stringify(todoObj),
            }
        );
        if (!resp.ok) {
            return rejectWithValue('Server Error!');
        }

        const data = await resp.json()
        return data as listType
    }
);

export const toggleCompleteAsync = createAsyncThunk<listType, string, { rejectValue: string, state: { todo: TodosState } }>(
    'todo/completeTodoAsync',
    async function (id, {rejectWithValue, dispatch, getState}) {
        const todo = getState().todo.list.find(todo => todo.id === id)

        if (todo) {
            const resp = await fetch(`https://6305e272697408f7edcd6d37.mockapi.io/todo/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                },
                body: JSON.stringify({IsCompleted: !todo.IsCompleted}),
            });

            if (!resp.ok) {
                return rejectWithValue('Server Error!');
            }
            const data = await resp.json()
            return data as listType
        }
        return rejectWithValue('No todo');

    }
);


export const deleteTodoAsync = createAsyncThunk<string, string, { rejectValue: string }>(
    'todo/deleteTodoAsync',
    async function (id, {rejectWithValue}) {
        const resp = await fetch(`https://6305e272697408f7edcd6d37.mockapi.io/todo/${id}`, {
            method: 'DELETE',
        });
        if (!resp.ok) {
            return rejectWithValue('Server Error!');
        }

        return id
    }
);

const initialState: TodosState = {
    list: [],
    loading: false,
    error: null
}

export const todoSlice = createSlice({
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

export const {addTodo, toggleComplete, deleteTodo} = todoSlice.actions;

export default todoSlice.reducer;

function Error(action: AnyAction) {
    return action.type.endsWith('rejected');
}