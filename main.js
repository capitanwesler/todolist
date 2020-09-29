/* This is the JavaScript Client Side of the Todo List*/

//We first start for loading all the HTML, then we load the JS
document.addEventListener("DOMContentLoaded", initLoad);

//We do the init function
function initLoad() {

    if (document.location.pathname === "/singup.html") {
        /* Handler for the sing-up */
        if (!localStorage.getItem("logged")) {
            const formSingUp = document.getElementById("form-singup");

            //We add the event
            formSingUp.addEventListener("submit", singUp);

            function singUp(e) {
                //We prevent the default of the submit
                e.preventDefault();

                //We first prevent the form
                const firstName = document.getElementById("fname");
                const lastName = document.getElementById("lname");
                const emailSingup = document.getElementById("email-singup");
                const passwordSingup = document.getElementById("password-singup");

                if ((firstName.value !== "" && firstName.value.length > 0)
                    && (lastName.value !== "" && lastName.value.length > 0)
                    && (emailSingup.value !== "" && emailSingup.value.length > 0 && isValidEmail(emailSingup.value))
                    && (passwordSingup.value !== "" && passwordSingup.value.length > 0)) {
                        //We replace the input-error if there is any
                        firstName.classList.replace("input-error", "input-default");
                        lastName.classList.replace("input-error", "input-default");
                        emailSingup.classList.replace("input-error", "input-default");
                        passwordSingup.classList.replace("input-error", "input-default");

                        //Then we form the object
                        let user = {
                            "firstName": firstName.value,
                            "lastName": lastName.value,
                            "email": emailSingup.value,
                            "password": passwordSingup.value,
                            "lists": []
                        };
                        
                        //We check if already exist a user with that email
                        if (!localStorage.getItem(user.email)) {
                            //If the user does not exists, then we create that user
                            localStorage.setItem(user.email, JSON.stringify(user));
                            alert("You finally register, go back and log in !");
                        }else {
                            alert("A user with that email already exists !");
                        }

                }else {
                    if (firstName.value === "" || firstName.value.length === 0) {
                        //If there is any input-error
                        firstName.classList.replace("input-default", "input-error");
                    }else {
                        firstName.classList.replace("input-error", "input-default");
                    }

                    if (lastName.value === "" || lastName.value.length === 0) {
                        //If there is any input-error
                        lastName.classList.replace("input-default", "input-error");
                    }else {
                        lastName.classList.replace("input-error", "input-default");
                    }

                    if (emailSingup.value === "" || emailSingup.value.length === 0 || !isValidEmail(emailSingup.value)) {
                        //If there is any input-error
                        emailSingup.classList.replace("input-default", "input-error");
                    }else {
                        emailSingup.classList.replace("input-error", "input-default");
                    }

                    if (passwordSingup.value === "" || passwordSingup.value.length === 0) {
                        //If there is any input-error
                        passwordSingup.classList.replace("input-default", "input-error");
                    }else {
                        passwordSingup.classList.replace("input-error", "input-default");
                    }
                }
            }
        }else {
            alert("You are already log in, log out if you want to create a new account !");
            document.location.href = "/dashboard.html";
        }
        
    }else if (document.location.pathname === "/login.html") {
        /* Handler for the Log In */
        if (!localStorage.getItem("logged")) {
            const formLogin = document.getElementById("form-login");

            formLogin.addEventListener("submit", logIn);
    
            function logIn(e) {
                //We prevent the default of the submit
                e.preventDefault();
    
                //Get the inputs
                const emailLogin = document.getElementById("login-email");
                const passwordLogin = document.getElementById("password-login");
    
                if (isValidEmail(emailLogin.value) && passwordLogin.value) {
                    //We reset
                    emailLogin.classList.replace("input-error", "input-default");
                    passwordLogin.classList.replace("input-error", "input-default");
    
                    //We check if there is a user with that email
                    if (localStorage.getItem(emailLogin.value)) {
                        //If there is, we check if is password provided is the valid password of the user
                        if (passwordLogin.value === JSON.parse(localStorage.getItem(emailLogin.value)).password) {
                            localStorage.setItem("logged", JSON.parse(localStorage.getItem(emailLogin.value)).email);
                            document.location.href = "/dashboard.html";
                        }else {
                            alert("Wrong password");
                        }
                    }else {
                        alert("There is no user with that email");
                    }
                }else {
                    if (isValidEmail(emailLogin.value)) {
                        //If there is any input-error
                        emailLogin.classList.replace("input-error", "input-default");
                    }else {
                        emailLogin.classList.replace("input-default", "input-error");
                    }
    
                    if (passwordLogin.value !== "" && passwordLogin.value.length > 0) {
                        //If there is any input-error
                        passwordLogin.classList.replace("input-error", "input-default");
                    }else {
                        passwordLogin.classList.replace("input-default", "input-error");
                    }
                }
            }
        }else {
            alert("You are already logged in !");
            document.location.href = "/dashboard.html";
        }
    }else if (document.location.pathname === "/dashboard.html") {
        /* Handler for the dashboard */
        //If there is created a localStorage item Logged, then we can go to the dashboard
        if (localStorage.getItem("logged")) {
            //We store the logOutButton
            const logOutButton = document.getElementById("logout-dashboard");
            const listToDo = document.getElementById("list");
            const userLogged = JSON.parse(localStorage.getItem(localStorage.getItem("logged")));
            const welcomeUser = document.getElementById("name-user");
            const createTodoList = document.getElementById("create-todo");
            const inputToDo = document.getElementById("to-do");

            //Then we add a event listener
            logOutButton.addEventListener("click", logOut);
            createTodoList.addEventListener("click", createToDo);

            function logOut(e) {
                //We prevent the redirect
                e.preventDefault();

                localStorage.removeItem("logged");
                document.location.href = "/index.html";
            }

            function createToDo(e) {
                if (inputToDo.value.length > 0 && inputToDo.value) {
                    userLogged.lists.push(inputToDo.value);
                    localStorage.setItem(userLogged.email, JSON.stringify(userLogged));
                    location.reload();
                }else {
                    alert("That's not right, try again!");
                }
            }

            //We create a p element
            let newP = document.createElement("p");
            newP.innerText = "Welcome back " + userLogged.firstName + ", here is your To Do Lists: ";
            welcomeUser.appendChild(newP);

            //We check if there is any content in the list
            if (userLogged.lists.length > 0) {
                let newUl = document.createElement("ul");
                for (const item of userLogged.lists) {
                    let newLi = document.createElement("li");
                    newLi.innerHTML = "<p>To Do: " + item + "</p>";
                    newUl.appendChild(newLi);
                }

                //After that we append the UL to the listToDo
                listToDo.appendChild(newUl);
            }else {
                let newP = document.createElement("p");
                newP.innerText = "There is no items in the lists of To Do Lists";
                listToDo.appendChild(newP);
            }


        }else {
            alert("You can't go here if you aren't logged in !");
            window.location.href = "/login.html";
        }
    }else if (document.location.pathname === "/index.html") {
        if (localStorage.getItem("logged")) {
            const mainIndex = document.getElementById("main-index");
            const mainDivs = mainIndex.querySelectorAll("div");
            const newA = document.createElement("a");
            newA.classList.add("logout-button-index");
            newA.innerText = "Log Out";
            mainIndex.appendChild(newA);

            mainIndex.style.marginTop = "180px";
            
            //Then we add a event listener
            newA.addEventListener("click", logOut);

            function logOut(e) {
                //We prevent the redirect
                e.preventDefault();

                localStorage.removeItem("logged");
                document.location.href = "/index.html";
            }

            for (const div of mainDivs) {
                div.style.display = "none";
            }

            
        }
    }
}

//Function to validate an email
function isValidEmail(email) {
    let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (email.match(regex)) {
        return true;
    }else {
        return false;
    }
}