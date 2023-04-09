import React,{ useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

const Todo = () => {

    const [todoInputs, setTodoInputs] = useState("")
    const [todos, setTodos] = useState([]);
    const [editTarget, setEditTarget] = useState(-1);
    const [editedTodo, setEditedTodo] = useState("");
    const [refreshKey, setRefreshKey] = useState(0);

    const navigate = useNavigate();
    const authorization = localStorage.getItem("Authorization");

    const createTodos = async () => {

        try {
            await axios.post(`${process.env.REACT_APP_API_URL}todos`, {
                todo : todoInputs
            }, {
            headers: {
                    Authorization: `Bearer ${authorization}`,
                    'Content-Type': 'application/json'
                }
            })
            setRefreshKey(prevKey => prevKey + 1)
            setTodoInputs("")

        }catch(error) {
            console.log(error)
        }
    };

    const getTodos = useCallback(async () => {

        const resp = await axios.get(`${process.env.REACT_APP_API_URL}todos`, {
                headers: {
                    Authorization: `Bearer ${authorization}`,
                }
            })
        setTodos(resp.data);
    }
    ,[authorization]);

    const updateTodo = (index) => {
        
        setEditTarget(index);
        setEditedTodo(todos[index].todo);
    };

    const deleteTodo = async (data) => {

        await axios.delete(`${process.env.REACT_APP_API_URL}todos/${data}`, {
            headers: {
                Authorization: `Bearer ${authorization}`
            }
        })
        getTodos();
    };

    const checkboxHandler = (index) => {

        const newTodos = [...todos];
        newTodos[index].isCompleted = !todos[index].isCompleted
        setTodos(newTodos);

        axios.put(`${process.env.REACT_APP_API_URL}todos/${todos[index].id}`, {
                todo : todos[index].todo,
                isCompleted : todos[index].isCompleted
            },{ 
            headers: {
                    Authorization: `Bearer ${authorization}`,
                    "Content-Type": "application/json"
                }
            });
    };

    const editHandler = async (index) => {

        setEditTarget(-1);
        try {
            await axios.put(`${process.env.REACT_APP_API_URL}todos/${todos[index].id}`, {
                todo : editedTodo,
                isCompleted : todos[index].isCompleted
            },{ 
            headers: {
                    Authorization: `Bearer ${authorization}`,
                    "Content-Type": "application/json"
                }
            });
            getTodos(); // 수정 후 데이터 최신화
        } catch (error) {
            console.log(error)
        }
    };

    const cancleHandler = () => {
        setEditTarget(-1)
    };

    useEffect (() => {
        !authorization ? navigate("/signin") : getTodos()
    },[refreshKey])

    return (
        <div>
            <div>
                <input data-testid="new-todo-input" value = {todoInputs} onChange={(e) => setTodoInputs(e.target.value)} />
                <button data-testid="new-todo-add-button" onClick={() => createTodos()}>추가</button>
            </div>
            {todos.map((data, index) => 
                <li key={index}>
                    <label>
                        <input type="checkbox" checked={todos.isCompleted} onChange={() => checkboxHandler(index)}/>
                    </label>
                    {editTarget === index ? 
                        <StUpdateBox>
                            <input data-testid="modify-input" value={editedTodo} onChange={(e) => setEditedTodo(e.target.value)}/>
                            <button data-testid="submit-button" onClick={() => editHandler(index)}>제출</button>
                            <button data-testid="cancel-button" onClick={() => cancleHandler()}>취소</button>
                        </StUpdateBox>
                        :
                        <span>
                            <StTodo>{data.todo}</StTodo>
                            <StUpdateBox>
                                <button data-testid="modify-button" onClick={() => updateTodo(index)}>수정</button>
                                <button data-testid="delete-button" onClick={() => deleteTodo(data.id)}>삭제</button>
                            </StUpdateBox>
                        </span>
                     }
                </li>
            )}
        </div>
    );
};

export default Todo;
const StTodo = styled.span`
margin-right : 10px;
`

const StUpdateBox = styled.span`
    button, input {
        margin-right : 10px;
    }
`