import {AnyAction, createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {collection, doc, getDocs, onSnapshot, query, setDoc} from 'firebase/firestore';
import {db} from "../firebase";

export type todoType = {
    todoTitle: string
    todoId: string
    tasksList: tasksListType[]
}

export type tasksListType = {
    taskTitle: string
    taskId: string
    IsCompleted: boolean
}


type TodosState = {
    list: todoType[]
    loading: boolean
    error: string | null
}

function Error(action: AnyAction) {
    return action.type.endsWith('rejected');
}




export const getTodosAsync = createAsyncThunk<todoType[], undefined, { rejectValue: string }>(
    'todo/getTodosAsync',
    async function (_, {rejectWithValue}) {


        const q = query(collection(db, "todos"));
        const querySnapshot = await getDocs(q);
        const queryData = querySnapshot.docs.map((t) => ({
            ...t.data(),
        }));
        console.log(queryData);


        return  queryData
    }
);



// export const getTodosAsync = createAsyncThunk<todoType[], undefined, { rejectValue: string }>(
//     'todo/getTodosAsync',
//     async function (_, {rejectWithValue}) {
//         const resp = await fetch('https://630a5a4a324991003284bd51.mockapi.io/todolist');
//
//         if (!resp.ok) {
//             return rejectWithValue('Server Error!');
//         }
//
//         const todoFormResp = await resp.json();
//         return todoFormResp as todoType[]
//     }
// );

export const addTodoAsync = createAsyncThunk<todoType, string, { rejectValue: string }>(
    'todo/addTodoAsync',
    async function (text, {rejectWithValue, dispatch}) {

            const newTodo = doc(collection(db, 'todos'))
            const dataForTodo = {
                todoTitle: text,
                todoId: newTodo.id,
            }
            const queryData = await setDoc(newTodo, dataForTodo);

        return  queryData

    }
);
//
// export const toggleCompleteAsync = createAsyncThunk<todoType, string, { rejectValue: string, state: { todo: TodosState } }>(
//     'todo/completeTodoAsync',
//     async function (id, {rejectWithValue, dispatch, getState}) {
//         const todo = getState().todo.list.find(todo => todo.id === id)
//
//         if (todo) {
//             const resp = await fetch(`https://630a5a4a324991003284bd51.mockapi.io/todolist/${id}`, {
//                 method: 'PATCH',
//                 headers: {
//                     'Content-Type': 'application/json; charset=utf-8',
//                 },
//                 body: JSON.stringify({IsCompleted: !todo.IsCompleted}),
//             });
//
//             if (!resp.ok) {
//                 return rejectWithValue('Server Error!');
//             }
//             const data = await resp.json()
//             return data as todoType
//         }
//         return rejectWithValue('No todo');
//
//     }
// );
//
//
// export const deleteTodoAsync = createAsyncThunk<string, string, { rejectValue: string }>(
//     'todo/deleteTodoAsync',
//     async function (id, {rejectWithValue}) {
//         const resp = await fetch(`https://630a5a4a324991003284bd51.mockapi.io/todolist/${id}`, {
//             method: 'DELETE',
//         });
//         if (!resp.ok) {
//             return rejectWithValue('Server Error!');
//         }
//
//         return id
//     }
// );

const initialState: TodosState = {
    list: [
        {
            todoTitle: 'ssfs',
            todoId: 'esfsf',
            tasksList: [
                {
                    taskId: 'ese',
                    taskTitle: 'sfsf',
                    IsCompleted: false,
                },
                {
                    taskId: 'se',
                    taskTitle: 'sfsf',
                    IsCompleted: false,
                }
            ]
        },

    ],
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
            // .addCase(addTodoAsync.pending, (state) => {
            //     state.error = null
            // })
            // .addCase(addTodoAsync.fulfilled, (state, action) => {
            //     state.list.push(action.payload)
            // })
            // .addCase(toggleCompleteAsync.pending, (state) => {
            //     state.error = null
            // })
            // .addCase(toggleCompleteAsync.fulfilled, (state, action) => {
            //     const toggledTodo = state.list.find((todo) => todo.id === action.payload.id);
            //     toggledTodo.IsCompleted = !toggledTodo.IsCompleted;
            // })
            // .addCase(deleteTodoAsync.pending, (state) => {
            //     state.error = null
            // })
            // .addCase(deleteTodoAsync.fulfilled, (state, action) => {
            //     state.list = state.list.filter((todo) => todo.id !== action.payload);
            // })
            // .addMatcher(Error, (state, action: PayloadAction<string>) => {
            //     state.error = action.payload;
            //     state.loading = false;
            // });
    })
});
export default todoSlice.reducer;