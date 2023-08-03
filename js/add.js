'use strict';


window.addEventListener('DOMContentLoaded', () => {


    const videoAddForm = document.querySelector('#vidAdd'),
        chooseFileInput = document.querySelector('#videoUpload'),
        closeNotificationbtn = document.querySelector('.closebtn'),
        notification = document.querySelector('.notification'),
        notificationBody = document.querySelector('.notiBody');
    const getResource = async (url) => {
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        return await res.json();
    };

    function openNotification(body) {
        notification.classList.remove('hide');
        notification.classList.add('show');
        notificationBody.innerHTML = `<p>${body}</p>`

    }

    function closeNotification() {
        notification.classList.remove('show');
        notification.classList.add('hide');
    }
    const postData = (url, data) => {
        const res = fetch(url, {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: data

        })
        .catch(() => {
            openNotification('Oops... Your video has was not uploaded succes fully. Please try again in a few minutes.');
        });

    };
    function showlastId () {
        const jsonData = getResource('https://my-json-server.typicode.com/marsianjohncarter/DailyVideo/videos')
        .then(data => {
            // data = data.json();
            let name = data[data.length -1].id;
            return name;
        });
    }
    function uploadVideo() {
        const spinner = document.createElement('img');
        spinner.style.height = '10px'
        spinner.src = 'static/loading.gif';
        openNotification('Your video is being uploaded.');
        notificationBody.appendChild(spinner);
        let file = chooseFileInput.files[0];
        let fileName = file.name;
        const jsonData = getResource('https://my-json-server.typicode.com/marsianjohncarter/DailyVideo/videos')
        .then(data => {
            // data = data.json();
            const name = data.seats[data.seats.length-1].id;
            console.log(name);
        })
        
        const fileExtension = fileName.split('.').pop();
        let fileType = 'video/mp4';

        const newFileName = `${showlastId()}.mp4`;
        const newFile = new File([file], newFileName, {
            type: fileType
        });
        let formData = new FormData();
        formData.append('file', newFile);

        fetch('upload.php', {
                method: 'Post',
                body: formData
            })
            .then(response => response.text())
            .then(data => console.log(data))
            .catch(error => console.error(error));

        return showlastId();



    }
    videoAddForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(videoAddForm);
        const vidname = Object.fromEntries(formData.entries())['vidName'];
        console.log(vidname);
        let filename = uploadVideo(vidname);
        let date = new Date;
        date = date.getTime();
        const json = JSON.stringify({
            "name": `${vidname}`,
            "poster": "Programmer",
            "watched": 1,
            "link": `videos/${filename}`,
            "date": `${date}`,
        });
        postData('https://my-json-server.typicode.com/marsianjohncarter/DailyVideo/videos', json)
     

        console.log(json);
        openNotification('Your video has been uploaded.')

    });


    closeNotificationbtn.addEventListener('click', function () {
        closeNotification();
    });

    // Obj = {

    // }



});
