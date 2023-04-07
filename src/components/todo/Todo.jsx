import React,{ useState } from 'react';
import axios from 'axios';

const Todo = () => {

    const [todoInputs, setTodoInputs] = useState("")
    const [todos, setTodos] = useState([
        {
            todo : "",
            userID : 1,
            id : 1,
            isCompleted : false
        }
    ])

    const onChangeHandler = (e) => {
        setTodoInputs(e.target.value)
    }

    const onClickHandler = async (text) => {

        let authorization = localStorage.getItem("Authorization");

        try {
            const resp = await axios.post(`https://www.pre-onboarding-selection-task.shop/todos`, {
                todo : todoInputs
            }, {
            headers: {
                    Authorization: `Bearer ${authorization}`
                }
            }
            )
            console.log("resp",resp)
            setTodos([...todos, resp.data])
            console.log(todos)

        }catch(error) {
            console.log(error)
        }
    }
    return (
        <div>
            <input data-testid="new-todo-input" onChange={onChangeHandler} />
            <button data-testid="new-todo-add-button" onClick={onClickHandler}>추가</button>

            {todos.map((data, index) => 
                <li key={index}>
                    <label>
                        <input type="checkbox" />
                        <span>{data.todo}</span>
                    </label>
                </li>
            )}
        </div>
    );
};

export default Todo;