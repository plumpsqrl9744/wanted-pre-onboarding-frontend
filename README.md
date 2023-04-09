## wanted-pre-onboarding-frontend 과제
배포링크 : https://wanted-pre-onboarding-frontend-seven-rho.vercel.app/

## 🔥 실행
프로젝트 설치 및 실행방법
$ git clone https://github.com/plumpsqrl9744/wanted-pre-onboarding-frontend.git
$ npm install
$ npm start

## 🔨 기능설명 및 경로
### 1. 메인 ( / )
로그인 화면으로 바로 이동할 수 있습니다.

### 2. 회원가입 ( /signup )
회원가입을 할 수 있습니다.

### 3. 로그인( /signin )
로그인을 할 수 있습니다. 회원가입으로 넘어갈 수 있는 링크가 있습니다.

* 회원가입, 로그인 유효성 검사
  * e-mail : "@"를 포함
  * password : 문자 상관없이 8자 이상
### 4. 할 일 목록 ( /todo )
todo list를 작성할 수 있습니다. 할 일 별로 삭제, 수정, 완료여부 체크를 할 수 있습니다.


## 💁 세부설명
### 1. 환경변수 사용
* api 주소가 보이지 않도록 .env 파일에 따로 환경변수로 등록했습니다.
* 등록된 주소가 보이지 않도록 .gitignore에 환경변수 디렉토리를 추가했습니다.
### 2. git convention
* git convention에 맞게 commit 하였습니다.
### 3. refactoring
* console.log와 같은 불필요한 코드를 제거했습니다.
* 사용하지 않는 변수, 매개변수, 함수 등을 모두 제거했습니다.