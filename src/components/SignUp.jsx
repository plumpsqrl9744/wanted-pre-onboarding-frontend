import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';  
import styled from 'styled-components';

const SignUp = () => {

    const [signUpInputs, setSignUpInputs] = useState({
        id : "",
        password : ""
    });

    const navigate = useNavigate();

    const isEnable = signUpInputs.id.includes("@") && signUpInputs.password.length >= 8 ? true : false

    const onChangeHandler = (e) => {
        const { name, value } = e.target
        const nextInputs = { ...signUpInputs,  [name]: value,}
        setSignUpInputs(nextInputs);
      };
  
    const signUpHandler  = async () => {
        try {
             await axios.post(`https://www.pre-onboarding-selection-task.shop/auth/signup`, {
                    email : signUpInputs.id,
                    password : signUpInputs.password
                }, {
                Headers: {
                    "Content-Type" : `application/json`
                }
            }
        )
        alert("회원가입 성공!");
        navigate("/signin");
        }catch(error) {
            alert(error.response.data.message)
        }
    };

    useEffect(() => {
        const authorization = localStorage.getItem("Authorization");
        if (authorization) 
            navigate("/todo")
    });

    return (
        <StSignUpWrapper>
            <StTitle>회원가입</StTitle>
            <StInputWrapper>
                <label>이메일</label>
                <input 
                    data-testid="email-input" 
                    onChange={onChangeHandler} 
                    name = "id" 
                    />
                    <StValidation>@를 포함해주세요!</StValidation>
            </StInputWrapper>
            <StInputWrapper>
                <label>비밀번호</label>
                <input 
                    data-testid="password-input"
                    type = "password"
                    onChange={onChangeHandler} 
                    name = "password" 
                    />
                    <StValidation>8자리 이상 입력해주세요!</StValidation>
            </StInputWrapper>
            <StInputWrapper>
                <button 
                    data-testid="signup-button" 
                    onClick={signUpHandler} 
                    disabled={isEnable ? false : true }
                    >회원가입</button>
            </StInputWrapper>
        </StSignUpWrapper>
    );
};

export default SignUp;

const StSignUpWrapper = styled.div`
    display : flex;
    flex-direction : column;
    align-items: center;
    margin : 100px;
`
const StTitle = styled.div`
    font-size : 30px;
    font-weight : 600;
`
const StInputWrapper = styled.div`
    margin : 10px;
    display : flex;
    flex-direction : column;
    label {
        font-size : 20px;
        margin-bottom : 5px;
    }
    input {
        border : 1px solid gray;
        width : 200px;
        height : 20px;
        margin-bottom : 5px;
    }
    button {
        border : 0px;
        width : 100px;
        height : 30px;
        border-radius : 10px;
        background-color : blue;
        font-size : 15px;
        color : white;
    }
`
const StValidation = styled.div`
    font-size : 12.5px;
    color : blue;
`