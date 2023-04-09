import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios'; 
import styled from 'styled-components';

const SignIn = () => {

    const [signInInputs, setSignInInputs] = useState({
        id : "",
        password : ""
    });

    const navigate = useNavigate();

    const isEnable = signInInputs.id.includes("@") && signInInputs.password.length >= 8 ? true : false

    const onChangeHandler = (e) => {
        const { name, value } = e.target
        const nextInputs = { ...signInInputs, [name]: value,}
        setSignInInputs(nextInputs);
      };

    const signInHandler = async () => {
        try {
            const resp = await axios.post(`https://www.pre-onboarding-selection-task.shop/auth/signin`, {
                email : signInInputs.id,
                password : signInInputs.password
            }, {
            Headers: {
                "Content-Type" : `application/json`
            }
        }
    )
    
    const authorization = resp.data["access_token"]
    localStorage.setItem("Authorization", authorization);
    alert("로그인 성공!")
    navigate("/todo")
    }catch(error) {
            console.log(error)
        }
    };

    useEffect(() => {
        const authorization = localStorage.getItem("Authorization");
        if (authorization) 
            navigate("/todo")
    });

    return (
        <StSignInWrapper>
            <StTitle>로그인</StTitle>
            <StInputWrapper>
                <label>이메일</label>
                <input 
                    data-testid="email-input"
                    onChange={onChangeHandler} 
                    name = "id"/>
                <StValidation>@를 포함해주세요!</StValidation>
            </StInputWrapper>
            <StInputWrapper>
                <label>비밀번호</label>
                <input 
                    data-testid="password-input"
                    type = "password"
                    onChange={onChangeHandler} 
                    name = "password" />
                    <StValidation>8자리 이상 입력해주세요!</StValidation>
            </StInputWrapper>
            <StInputWrapper>
                <button 
                    data-testid="signin-button"        
                    onClick={signInHandler} 
                    disabled={isEnable ? false : true }
                >로그인</button>
            </StInputWrapper>
            <Link to= "/signup">회원가입하기</Link>
        </StSignInWrapper>
    );
};

export default SignIn;

const StSignInWrapper = styled.div`
    display : flex;
    flex-direction : column;
    align-items: center;
    margin : 100px;
`

const StTitle = styled.div`
    font-size : 30px;
    font-weight : 600;
`

const StValidation = styled.div`
    font-size : 12.5px;
    color : blue;
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

