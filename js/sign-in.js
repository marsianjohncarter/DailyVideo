'use strict';
window.addEventListener('DOMContentLoaded', () => {
    const signInForm = document.querySelector('#sign-in');
    const getResource = async (url) => {
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        return await res.json();
    };

    signInForm.addEventListener('submit', e => {
        e.preventDefault();
        const formData = new FormData(signInForm);
        const plainFormData = Object.fromEntries(formData.entries());
        const json = JSON.stringify(plainFormData);
        const userData = JSON.parse(json);
        let allAccounts = getResource('https://my-json-server.typicode.com/marsianjohncarter/DailyVideo/videos')
        .then(data => {
            data.forEach(account => {
                if (userData['username'] == account.name) {

                    //open notifictaion and show that username is taken
                    alert(`${userData['username']} is already taken!`);
                } else {
                    
                }
            });

        });
        // console.log(allAccounts[0]);
        // allAccounts.forEach(account => {
        //     if (json.name == account.name) {
        //         //open notifictaion and show that username is taken
        //         console.log(`Acount ${json.name} is already taken`);
        //     }
        // });
        // document.location = 'index.html'
        console.log(json);
        console.log('It Works!')
    });

});
