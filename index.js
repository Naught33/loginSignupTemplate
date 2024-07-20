import { signUp, login } from "./appwrite.js";


const switchSignUp = document.getElementById('clickable_1');
const switchLogin = document.getElementById('clickable_2');
const loginForm = document.getElementById('Login');
const signupForm = document.getElementById('Signup');
const entryScreen = document.getElementById('forms');
const mainScreen = document.getElementById('container');
const loginButton = document.getElementById('loginButton');
const signupButton = document.getElementById('signupButton');
const logoutButton = document.getElementById('logout');
const loginMessage = document.getElementById('messageLogin');
const signupMessage = document.getElementById('messageSignup');
const welcomeMessage = document.getElementById('welcomeText');
const accountInfo = document.getElementById('accountType');
let LoginIsVisible = true;




async function validateLogin(){
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    let account = document.getElementById('account_type').value;
    if(username == "" || password == ""){
        loginMessage.innerText = "please fill in all fields";
        loginMessage.style.opacity = '1';
        loginMessage.style.color = 'red';
        loginForm.style.borderColor = 'red';
        loginForm.classList.add('shakeForm');

        setTimeout(()=>{
            loginForm.classList.remove('shakeForm');
        },4000);
        return
    }
    let returnedCredentials = await login(username, account,password);
    console.log(await returnedCredentials);

    if(await returnedCredentials.documents.length === 0){
        loginMessage.innerText = "Invalid username or password";
        loginMessage.style.opacity = '1';
        loginMessage.style.color = 'red';
        loginForm.style.borderColor = 'red';
        loginForm.classList.add('shakeForm');
        setTimeout(()=>{
            loginForm.classList.remove('shakeForm');
            },4000);
            return
    }


    if(await returnedCredentials.documents[0].password===password){
        welcomeMessage.innerHTML = `Welcome ${username}`;
        accountInfo.innerHTML = `${account} account`;
        loginForm.reset();
        exitEntryScreen();
        return
    }else{
        loginMessage.innerText = "wrong username or password";
        loginMessage.style.opacity = '1';
        loginMessage.style.color = 'red';
        loginForm.style.borderColor = 'red';
        loginForm.classList.add('shakeForm');
        setTimeout(()=>{
            loginForm.classList.remove('shakeForm');
            },4000);

        return
    }   
    
}

async function checkValidUser(){
    let username = document.getElementById('cusername').value;
    let password = document.getElementById('cpassword').value;
    let account = document.getElementById('caccount_type').value;

    let returnedCredentials = await login(username, account,password);
    console.log(await returnedCredentials);
    if(await returnedCredentials.documents.length == 0){
        return true;
    }

    return false;
}

async function validateSignUp(){
    let username = document.getElementById('cusername').value;
    let password = document.getElementById('cpassword').value;
    let email = document.getElementById('email').value;
    let account = document.getElementById('caccount_type').value

    if(username=="" || password=="" || email==""){
        signupMessage.innerText = "please fill in all fields";
        signupMessage.style.opacity = '1';
        signupMessage.style.color = 'red';
        signupForm.style.borderColor = 'red';
        signupForm.classList.add('shakeSignup');
        setTimeout(()=>{
            signupForm.classList.remove('shakeSignup');
            },4000);
            return
            }

            let validUserState = await checkValidUser();
            if(!validUserState){
                signupMessage.innerText = "username already exists";
                signupMessage.style.opacity = '1';
                signupMessage.style.color = 'red';
                signupForm.style.borderColor = 'red';
                signupForm.classList.add('shakeSignup');
                setTimeout(()=>{
                    signupForm.classList.remove('shakeSignup');
                    },4000);
                    return

            }
            await signUp(username,email,account,password);
            signupForm.reset();
            switchEntryState();
    }



function switchEntryState(){
    if(LoginIsVisible == true){
        loginForm.classList.add('loginhidden');
        signupForm.classList.add('signupopen');
        LoginIsVisible = false;
    }else{
        loginForm.classList.remove('loginhidden');
        signupForm.classList.remove('signupopen');
        LoginIsVisible = true;
    }
}

function exitEntryScreen(){
    entryScreen.style.display = 'none';
    mainScreen.style.display = 'block';
}

function logOut(){
    entryScreen.style.display = 'flex';
    mainScreen.style.display = 'none';
}


switchSignUp.addEventListener('click',()=>{
    switchEntryState();
});

switchLogin.addEventListener('click',()=>{
    switchEntryState();
    console.log('clicked')
});

loginButton.addEventListener('click',(e)=>{
    e.preventDefault()
    validateLogin();
});

signupButton.addEventListener('click',(e)=>{
    e.preventDefault();
    validateSignUp();
});

logoutButton.addEventListener('click',()=>{
    logOut();
});