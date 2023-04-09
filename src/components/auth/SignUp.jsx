import React, { useState } from 'react'
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
      }
  
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
    }

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
            </StInputWrapper>
            <StInputWrapper>
                <label>비밀번호</label>
                <input 
                    data-testid="password-input"
                    type = "password"
                    onChange={onChangeHandler} 
                    name = "password" 
                    />
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
    align-items: center;
    margin : 20px;
    width : 400px;
`