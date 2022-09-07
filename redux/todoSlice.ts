import {AnyAction, createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {collection, deleteDoc, doc, getDocs, query, setDoc, updateDoc} from 'firebase/firestore';
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



export const getTodosAsync = createAsyncThunk<todoType[], undefined, { rejectValue: string }>(
    'todo/getTodosAsync',
    async function (_, {rejectWithValue}) {

        const q = query(collection(db, "todos"));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            return rejectWithValue('Not any todo, yet')

        } else {
            return querySnapshot.docs.map((t) => ({
                ...t.data()
            }))
        }
    }
);


export const getTasksAsync = createAsyncThunk<tasksListType[], undefined, { rejectValue: string }>(
    'todo/getTasksAsync',
    async function (todoId: string, {rejectWithValue}) {

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
    async function (text, {rejectWithValue}) {

        const newTodo = doc(collection(db, 'todos'))
        const dataForTodo = {
            todoTitle: text,
            todoId: newTodo.id,
        }
        const queryData = await setDoc(newTodo, dataForTodo);

        const newTodoId = newTodo.id

        return {newTodoId, dataForTodo}
    }
);

export const addTaskAsync = createAsyncThunk<tasksListType, {string},  { rejectValue: string }>(
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


export const toggleCompleteAsync = createAsyncThunk<string, { rejectValue: string}>(
    'todo/completeTodoAsync',
    async function ({routeTodoId, taskId, IsCompleted}, {rejectWithValue}) {
        const refTask = doc(db, `todos`, `${routeTodoId}/tasksList/${taskId}`)
        await updateDoc(refTask, {
            'IsCompleted': !IsCompleted
        });
        return {routeTodoId, taskId, IsCompleted}
    }
);


export const deleteTodoAsync = createAsyncThunk<string , string, { rejectValue: string }>(
    'todo/deleteTodoAsync',
    async function (todoId, {rejectWithValue}) {

        const resp = await deleteDoc(doc(db, `todos`, todoId));
        return todoId
    }
);

export const deleteTaskAsync = createAsyncThunk<string, string, { rejectValue: string }>(
    'todo/deleteTaskAsync',
    async function ({routeTodoId, taskId}, {rejectWithValue}) {

        const resp = await deleteDoc(doc(db, `todos`, `${routeTodoId}/tasksList/${taskId}`));

        return {routeTodoId, taskId}
    }
);


const initialState: TodosState = {
    list: [
        // {
        //     todoTitle: 'Tools store',
        //     todoId: '58958u5494',
        //     tasksList: [
        //         {
        //             taskId: '1',
        //             taskTitle: 'Hammer',
        //             IsCompleted: false,
        //         },
        //         {
        //             taskId: '2',
        //             taskTitle: 'WD-40',
        //             IsCompleted: false,
        //         }
        //     ]
        // },
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
                if(state.list !== action.payload) {
                    state.list.unshift(...action.payload)
                }
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
                state.loading = false
            })
            .addCase(addTodoAsync.pending, (state) => {
                state.error = null
            })
            .addCase(addTodoAsync.fulfilled, (state, action) => {
                state.list.push({...action.payload.dataForTodo})
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
                const todo = state.list.find(todo => todo.todoId === action.payload.routeTodoId)
                const task = todo.tasksList.find(task => task.taskId === action.payload.taskId)
                task.IsCompleted = !action.payload.IsCompleted
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
                const todoDelete = state.list.find(t => t.todoId === action.payload.routeTodoId)
                const tasksDelete = todoDelete.tasksList
                console.log('tasksDelete', tasksDelete)
                const index = tasksDelete.findIndex(t => t.taskId === action.payload.taskId)
                if (index > -1) {
                    tasksDelete.splice(index, 1)
                }
            })
        .addMatcher(isError, (state, action: PayloadAction<string>) => {
            state.error = action.payload;
            state.loading = false;
        });
    })
});
export default todoSlice.reducer;



function isError(action: AnyAction) {
    return action.type.endsWith('rejected');
}