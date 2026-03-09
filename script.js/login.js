document.getElementById('signin-button')
        .addEventListener('click', ()=>{
            
            const userName = document.getElementById('username');
            const nameValue = userName.value;
            
            const password = document.getElementById('pass');
            const pin = password.value;
              
            if(nameValue === 'admin' && pin === 'admin123'){
                alert("Sign In Successful.");
                 window.location.assign("home.html");
            }
            else{
                alert("Your Username or Password is Invalid.");
                return;
            }

        })


