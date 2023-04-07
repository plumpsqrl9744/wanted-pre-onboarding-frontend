import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import styled from 'styled-components';

const SignIn = () => {

    const navigate = useNavigate();

    const [signInInputs, setSignInInputs] = useState({
        id : "",
        password : ""
    });

    const isEnable = signInInputs.id.includes("@") && signInInputs.password.length >= 8 ? true : false

    const onChangeHandler = (e) => {
        const { name, value } = e.target
        const nextInputs = { ...signInInputs,  [name]: value,}
        setSignInInputs(nextInputs);
      };

    const signInHandler = async () => {
        try {
            await axios.post(`https://www.pre-onboarding-selection-task.shop/auth/signin`, {
                email : signInInputs.id,
                password : signInInputs.password
            }, {
            Headers: {
                "Content-Type" : `application/json`
            }
        }
    )
    alert("로그인 성공!")
    navigate("/todo")
    }catch(error) {
            console.log(error)
        }
    }

    return (
        <StSignInWrapper>
            <StInputWrapper>
                <label>이메일</label>
                <input 
                    data-testid="email-input"
                    onChange={onChangeHandler} 
                    name = "id"/>
            </StInputWrapper>
            <StInputWrapper>
                <label>비밀번호</label>
                <input 
                    data-testid="password-input"
                    type = "password"
                    onChange={onChangeHandler} 
                    name = "password" />
            </StInputWrapper>
            <StInputWrapper>
                <button 
                    data-testid="signin-button"        
                    onClick={signInHandler} 
                    disabled={isEnable ? false : true }
                >로그인</button>
            </StInputWrapper>
        </StSignInWrapper>
    );
};

export default SignIn;

const StSignInWrapper = styled.div``
const StInputWrapper = styled.div``
// const StSignInWrapper = styled.div``
// const StSignInWrapper = styled.div``
// const StSignInWrapper = styled.div``
// const StSignInWrapper = styled.div``
// const StSignInWrapper = styled.div``
// const StSignInWrapper = styled.div``
