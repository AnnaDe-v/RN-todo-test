import {v4 as uuidv4} from 'uuid';

import {addTodoAsync, todoSlice,} from "./todoSlice";

const todolistsReducer = todoSlice.reducer

let todoId1: string
let todoId2: string
let startState: any = []

beforeEach(() => {
    todoId1 = uuidv4()
    todoId2 = uuidv4()
    startState = {
        list: [
            {todoId: todoId1, todoTitle: 'What to learn', tasksList: []},
            {todoId: todoId2, todoTitle: 'What to buy', tasksList: []}
        ],
        error: null,
        loading: false
    }
})


test('correct todolist should be added', () => {
    let todolist = {todoId: uuidv4(), todoTitle: 'What to read'}



    const endState = todolistsReducer(startState, addTodoAsync.fulfilled(todolist, todolist.todoId, todolist.todoTitle))

    expect(endState.list.length).toBe(3)
    expect(endState.list[2].todoTitle).toBe( 'What to read')
})
