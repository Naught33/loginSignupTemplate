//Globals
const successMessage = document.getElementById('info');
   

    const DATABASE_ID = 'YOUR_DATABASE_ID';
    const TEACHERS_COLLECTION_ID = 'TABLE_ID';
    const STUDENTS_COLLECTION_ID = 'TABLE_ID';
    
    const client = new Appwrite.Client();
    client
        .setEndpoint('ENDPOINT')
        .setProject('PROJECT');




    const Database = new Appwrite.Databases(client);
    
async function signUp(username, email, accountType,password){
    try{
    if(accountType==="teacher"){
        const result = await Database.createDocument(
            DATABASE_ID,
            TEACHERS_COLLECTION_ID,
            Appwrite.ID.unique(),
            {   "username": username,
                "email": email,
                "password": password
            }
        );
        successMessage.innerText = "Sign up successful, please log in";
        successMessage.style.color = 'rgb(21, 203, 21)';
        successMessage.classList.add('alertShow');
        setTimeout(()=>{
            successMessage.classList.remove('alertShow')
        },2000);
        return await result;
    }else{
        const result = await Database.createDocument(
            DATABASE_ID,
            STUDENTS_COLLECTION_ID,
            Appwrite.ID.unique(),
            {
                "username": username,
                "email": email,
                "password": password
            }
        );
        successMessage.innerText = "Sign up successful, please log in";
        successMessage.style.color = 'rgb(21, 203, 21)';
        successMessage.classList.add('alertShow');
        setTimeout(()=>{
            successMessage.classList.remove('alertShow')
        },4000);
        return await result;
        }
    }catch(error){
        successMessage.innerText = "Sign up failed, please try again";
        successMessage.style.color = "red";
        successMessage.classList.add('alertShow');
        setTimeout(()=>{
            successMessage.classList.remove('alertShow')
        },4000);
    }
}



async function login(username, accountType, password){
    try{
        if(accountType==="teacher"){
            const result = await Database.listDocuments(
                DATABASE_ID,
                TEACHERS_COLLECTION_ID,
                [
                    Appwrite.Query.equal('username',username)
                ]
            );
            console.log(await result);
            return await result;
        }else{
            const result = await Database.listDocuments(
                DATABASE_ID,
                STUDENTS_COLLECTION_ID,
                [
                    Appwrite.Query.equal('username',username)
                ]
            );
            return await result;
        }
    }catch(error){
        successMessage.innerText = "Login failed, please try again";
        successMessage.style.color = "red";
        successMessage.classList.add('alertShow');
        setTimeout(()=>{
            successMessage.classList.remove('alertShow')
        },4000);
        return
    }
}

async function deleteUser(){
    //implement
}

async function updateUser(){
    //implement
}


export { signUp, login, deleteUser, updateUser }

