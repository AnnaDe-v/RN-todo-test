import {AnyAction, createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {addDoc, collection, deleteDoc, doc, getDocs, query, setDoc} from 'firebase/firestore';
import {db} from "../firebase";
import { v4 as uuidv4 } from 'uuid';

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
            ...t.data()
        }));


        console.log(queryData)
        return queryData
    }
);


export const getTasksAsync = createAsyncThunk<tasksListType[], undefined, { rejectValue: string }>(
    'todo/getTasksAsync',
    async function (todoId: string,  {rejectWithValue}) {

        const q = query(collection(db, `todos/${todoId}/tasksList`));
        const querySnapshot = await getDocs(q);
        const queryData = querySnapshot.docs.map((t) => (
            {
                ...t.data()
            }
        ));


        return {queryData, todoId}
    }
);


export const addTodoAsync = createAsyncThunk<todoType, string, { rejectValue: string }>(
    'todo/addTodoAsync',
    async function (text, {rejectWithValue, dispatch}) {

        const newTodo = doc(collection(db, 'todos'))
        const dataForTodo = {
            todoTitle: text,
            todoId: newTodo.id,
        }
        const queryData = await setDoc(newTodo, dataForTodo);

        const newTodoId = newTodo.id
        /////////////////
        const refTaskList = doc(collection(db, `todos/${newTodoId}/tasksList`))

        const dataForTask = {}

         await setDoc(refTaskList, dataForTask);
        //////////////////

        console.log('queryData', queryData, dataForTask, newTodoId)

        return dataForTodo
    }
);

export const addTaskAsync = createAsyncThunk<todoType, string>(
    'todo/addTaskAsync',
    async function ({text, routeTodoId}) {

        const todoRef = await doc(db, "todos", routeTodoId);
        const colRef = collection(todoRef, "tasksList")
        const newTask = doc(collection(db, `todos/${routeTodoId}/tasksList`))

        const dataForTask = {
            taskTitle: text,
            taskId: newTask.id,
            IsCompleted: false
        }

        const queryData = await setDoc(newTask, dataForTask);



        return {dataForTask, routeTodoId}


    }
)


export const toggleCompleteAsync = createAsyncThunk<todoType, string, { rejectValue: string, state: { todo: TodosState } }>(
    'todo/completeTodoAsync',
    async function ({routeTodoId, taskId}, {rejectWithValue, dispatch, getState}) {
        const todo = getState().todo.list.find(todo => todo.todoId === routeTodoId)
        const task = todo.tasksList.find(task => task.taskId === taskId)

        console.log('todo:', todo.tasksList)





        // if (todo) {
        //     const resp = await fetch(`https://630a5a4a324991003284bd51.mockapi.io/todolist/${id}`, {
        //         method: 'PATCH',
        //         headers: {
        //             'Content-Type': 'application/json; charset=utf-8',
        //         },
        //         body: JSON.stringify({IsCompleted: !todo.IsCompleted}),
        //     });
        //
        //     if (!resp.ok) {
        //         return rejectWithValue('Server Error!');
        //     }
        //     const data = await resp.json()
        //     return data as todoType
        // }
        // return rejectWithValue('No todo');

    }
);


export const deleteTodoAsync = createAsyncThunk<string, string, { rejectValue: string }>(
    'todo/deleteTodoAsync',
    async function (todoId, {rejectWithValue}) {

        const resp = await deleteDoc(doc(db, `todos`, todoId));
        return todoId
    }
);

export const deleteTaskAsync = createAsyncThunk<string, string, { rejectValue: string }>(
    'todo/deleteTaskAsync',
    async function ({routeTodoId, taskId}) {


        const resp = await deleteDoc(doc(db, `todos`, `${routeTodoId}/tasksList/${taskId}`));

        const q = await query(collection(db, `todos`, `${routeTodoId}/tasksList/${taskId}`));

        const querySnapshot = await getDocs(q);
        const queryData = querySnapshot.docs.map((t) => (
            {
                ...t.data()
            }
        ));

        console.log('queryDataDelete', queryData)


        return {routeTodoId, taskId, queryData}
    }
);



const initialState: TodosState = {
    list: [
        {
            todoTitle: 'Grocery store',
            todoId: '14',
            tasksList: [
                {
                    taskId: '1',
                    taskTitle: 'Apple',
                    IsCompleted: false,
                },
                {
                    taskId: '2',
                    taskTitle: 'Pineapple',
                    IsCompleted: false,
                }
            ]
        },
        {
            todoTitle: 'Tools store',
            todoId: '15',
            tasksList: [
                {
                    taskId: '221',
                    taskTitle: 'Hammer',
                    IsCompleted: false,
                },
                {
                    taskId: 'se',
                    taskTitle: 'WD',
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
            .addCase(getTasksAsync.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(getTasksAsync.fulfilled, (state, action) => {
                state.list = state.list.map(t => t.todoId === action.payload.todoId ? {
                    ...t,
                    tasksList: [...action.payload.queryData]
                } : t)
                // state.list = state.list.map(t => t.todoId === action.payload.todoId ? t.tasksList?.push(action.payload.queryData) : t)


                state.loading = false
            })
            .addCase(addTodoAsync.pending, (state) => {
                state.error = null
            })
            .addCase(addTodoAsync.fulfilled, (state, action) => {
                state.list.push(action.payload)

                // state.list.map(todo => todo.todoId === action.payload.newTodoId ? {...todo, taskList: action.payload.dataForTask} : todo)

            })
            .addCase(addTaskAsync.pending, (state) => {
                state.error = null
            })
            .addCase(addTaskAsync.fulfilled, (state, action) => {
                state.list = state.list.filter(t => t.todoId === action.payload.routeTodoId ? t.tasksList.push(action.payload.dataForTask) : t)

            })
            .addCase(toggleCompleteAsync.pending, (state) => {
                state.error = null
            })
            .addCase(toggleCompleteAsync.fulfilled, (state, action) => {

                // const toggledTodo = state.list.find((todo) => todo.id === action.payload.id);
                // toggledTodo.IsCompleted = !toggledTodo.IsCompleted;
            })
            .addCase(deleteTodoAsync.pending, (state) => {
                state.error = null
            })
            .addCase(deleteTodoAsync.fulfilled, (state, action) => {
                state.list = state.list.filter((todo) => todo.todoId !== action.payload);
            })
            .addCase(deleteTaskAsync.pending, (state) => {
                state.error = null
            })
            .addCase(deleteTaskAsync.fulfilled, (state, action) => {
                console.log(action.payload.queryData)

                state.list = state.list.map(todo => todo.todoId === action.payload.routeTodoId ? todo.tasksList = action.payload.queryData : todo)

            })
        // .addMatcher(Error, (state, action: PayloadAction<string>) => {
        //     state.error = action.payload;
        //     state.loading = false;
        // });
    })
});
export default todoSlice.reducer;