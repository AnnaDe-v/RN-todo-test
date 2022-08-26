import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export type todoType = {
    id: string
    title: string
    IsCompleted: boolean
}


export const getTodosAsync = createAsyncThunk(
    'todo/getTodosAsync',
    async () => {
        const resp = await fetch('https://6305e272697408f7edcd6d37.mockapi.io/todo');
        if (resp.ok) {
            const todoFormResp = await resp.json();
            return { todo: todoFormResp };
        }
    }
);

export const addTodoAsync = createAsyncThunk(
    'todo/addTodoAsync',
    async (payload) => {
        console.log(payload)
        const resp = await fetch('https://6305e272697408f7edcd6d37.mockapi.io/todo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
            body: JSON.stringify({ title: payload }),
        });
        if (resp.ok) {
            const todoFormResp = await resp.json();
            return { todoFormResp };
        }
    }
);

export const toggleCompleteAsync = createAsyncThunk(
    'todo/completeTodoAsync',
    async function({id}, {rejectWithValue, dispatch, getState}) {
        const todo = getState().todo.find(todo => todo.id === id)

        try {
            const resp = await fetch(`https://6305e272697408f7edcd6d37.mockapi.io/todo/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                },
                body: JSON.stringify({ IsCompleted: !todo.IsCompleted }),
            });

            if (!resp.ok) {
                throw new Error(("Server error. Toggle status can't change"))
            }
            dispatch(toggleComplete({id}))

        } catch (error) {
            return rejectWithValue(error.message)
        }


    }
);

export const deleteTodoAsync = createAsyncThunk(
    'todo/deleteTodoAsync',
    async (payload: any) => {
        console.log(payload)
        const resp = await fetch(`https://6305e272697408f7edcd6d37.mockapi.io/todo/${payload}`, {
            method: 'DELETE',
        });

        if (resp.ok) {
            return { id: payload };
        }
    }
);


export const todoSlice = createSlice({
    name: 'todo',
    initialState: [
        { id: 1, title: 'todo1', IsCompleted: true },
        { id: 2, title: 'todo2', IsCompleted: false },
        { id: 3, title: 'todo3', IsCompleted: true },
        { id: 4, title: 'todo4', IsCompleted: false },
        { id: 5, title: 'todo5', IsCompleted: true },
    ],
    reducers: {
        addTodo: (state, action) => {
            const todoItem = {
                id: Date.now(),
                title: action.payload.title,
                isCompleted: false,
            };
            // @ts-ignore
            state.push(todoItem);
        },
        toggleComplete: (state, action) => {
            const toggledTodo = state.find((todo) => todo.id === action.payload.id);
            toggledTodo.IsCompleted = !toggledTodo.IsCompleted;
        },
        deleteTodo: (state, action) => {
            return state.filter((todo) => todo.id !== action.payload.id);
        },
    },

    extraReducers: {
        [getTodosAsync.fulfilled]: (state, action) => {
            return action.payload.todo;
        },
        [addTodoAsync.fulfilled]: (state, action) => {
            state.push(action.payload.todo);
        },
        [toggleCompleteAsync.fulfilled]: (state, action) => {
            const index = state.findIndex(
                (todo) => todo.id === action.payload.todo.id
            );
            return state[index].IsCompleted = action.payload.IsCompleted;
        },
        [deleteTodoAsync.fulfilled]: (state, action) => {
            return state.filter((todo) => todo.id !== action.payload.id);
        },
    },
});

export const { addTodo, toggleComplete, deleteTodo } = todoSlice.actions;

export default todoSlice.reducer;