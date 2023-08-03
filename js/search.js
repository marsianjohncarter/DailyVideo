window.addEventListener('DOMContentLoaded', () => {
  const foundVideosWrap = document.querySelector('.main-video-content');

  function getTimePassed(timestamp) {
    const currentDate = new Date();
    const timeDiff = currentDate.getTime() - timestamp;
    const years = Math.round(timeDiff / (1000 * 60 * 60 * 24 * 365));
    const months = Math.round(timeDiff / (1000 * 60 * 60 * 24 * 30));
    const days = Math.round(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.round(timeDiff / (1000 * 60 * 60));
    const minutes = Math.round(timeDiff / (1000 * 60));
    const seconds = Math.round(timeDiff / 1000);

    if (years >= 1) {
      return [years, years === 1 ? 'Year' : 'Years'];
    } else if (months >= 1) {
      return [months, months === 1 ? 'Month' : 'Months'];
    } else if (days >= 1) {
      return [days, days === 1 ? 'Day' : 'Days'];
    } else if (hours >= 1) {
      return [hours, hours === 1 ? 'Hour' : 'Hours'];
    } else if (minutes >= 1) {
      return [minutes, minutes === 1 ? 'Minute' : 'Minutes'];
    } else {
      return [seconds, seconds === 1 ? 'Second' : 'Seconds'];
    }
  }

  let videos = [];
  const getResource = async (url) => {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    return await res.json();
  };
  let videoData = getResource('https://my-json-server.typicode.com/marsianjohncarter/DailyVideo/videos')
    .then(data => {
      videos = data;
    });


  const divClass = 'col-lg-7 col-md-7 col-sm-7 p-2';
  const videoParent = document.querySelector('.main-video-content');
  document.querySelector('#searchBtn').addEventListener('click', function (event) {
    event.preventDefault();
    let searchValue = document.querySelector('#vid-search').value;
    if (searchValue == 'admin:delete') {
      alert('Password Sent.');
      let pass = '';
      var str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' +
      'abcdefghijklmnopqrstuvwxyz0123456789@#$';
      for (let i = 1; i <= 8; i++) {
        var char = Math.floor(Math.random() *
          str.length + 1);

        pass += str.charAt(char)
      }
      emailjs.init('nqIxTen4w1LCPdO_H');
      let templateParams = {
        from_name: 'Daily Video',
        to_name: 'Admin',
        message: `Your password is ${pass}`,
      };
      emailjs.send('service_a5v9oyn', 'template_4gc56rp', templateParams) //use your Service ID and Template ID
        .then(function (response) {
          console.log('SUCCESS!', response.status, response.text);
        }, function (error) {
          console.log('FAILED...', error);
        });
      document.querySelector('#searchBtn').addEventListener('click', function (event) {
        event.preventDefault();
        searchValue = document.querySelector('#vid-search').value;
        if (searchValue == `admin:delete:pass:${pass}`) {
          alert('This password is correct.');
          let videos = document.querySelectorAll('.videos-wrap');
          
        } else {
          let templateParams = {
            from_name: 'Daily Video',
            to_name: 'Admin',
            message: 'Daily video has detected strange activity on your site. If it was not you, you should lock the site.',
          };
          emailjs.send('service_a5v9oyn', 'template_4gc56rp', templateParams) //use your Service ID and Template ID
            .then(function (response) {
              console.log('SUCCESS!', response.status, response.text);
            }, function (error) {
              console.log('FAILED...', error);
            });
        }
      });
    } else if (searchValue != '' || searchValue != ' ') {
      foundVideosWrap.innerHTML = '';
      let searchResults = videos.filter(video => video.name.includes(searchValue)).slice(0, 10);
      let resultIds = searchResults.map(video => video.id);
      resultIds.forEach(id => {

        let name = videos[id - 1].name,
          poster = videos[id - 1].poster,
          watched = videos[id - 1].watched,
          date = videos[id - 1].date,
          link = videos[id - 1].link,
          posted = getTimePassed(date);


        let views;
        if (posted[1] == 'Seconds') {
          posted = ['A couple seconds', '']
        }
        if (watched == 1) {
          views = 'Veiw';
        } else {
          views = 'Veiws';
        }
        let wrapper = document.createElement('div');
        wrapper.setAttribute('class', divClass);

        let video = document.createElement('video');
        let videoAttr = document.createElement('div');

        videoAttr.classList.add("vidAttr");

        videoAttr.innerHTML += `<div class="details"><div class="author"></div><div class="title"><h3>${name}</h3><a href=""><img class="desc" src="user_icons/Programmer.png" alt="" />${poster}</a><span> ${watched} ${views} • ${posted[0]} ${posted[1]} ago </span></div></div>`;
        video.setAttribute('data-src', link);
        video.src = `${link}`
        video.setAttribute('id', id);
        video.setAttribute('class', 'main-videos');
        video.addEventListener('click', function () {
          // console.log(this.id);
          videoParent.innerHTML = '';
          let mainVid = document.createElement('video');
          let mainVidWrapper = document.createElement('div');
          let mainvideowrapperwrapper = document.createElement('div');
          mainVidWrapper.classList.add('main-video-wrapper', 'col-lg-2', 'col-md-4', 'col-small-6');
          mainvideowrapperwrapper.classList.add('row');
          mainvideowrapperwrapper.append(mainVidWrapper);
          mainVid.classList.add('main-video');
          getResource('http://localhost:3000/videos')
            .then(data => {
              data.forEach(element => {
                if (element['id'] === +this.id) {
                  data = element;
                  videoAttr = document.createElement('div');
                  videoAttr.classList.add("vidAttr");
                  let posted = getTimePassed(element.date);
                  if (posted[1] == 'Seconds') {
                    posted = ['A couple seconds', '']
                  }
                  if (element.watched == 1) {
                    views = 'Veiw';
                  } else {
                    views = 'Veiws';
                  }
                  videoAttr.innerHTML += `<div class="details"><div class="author"></div><div class="title"><h3>${element.name}</h3><a href=""><img class="desc" src="user_icons/Programmer.png" alt="" />${element.poster}</a><span> ${element.watched} ${views} • ${posted[0]} ${posted[1]} ago </span></div></div>`;

                  mainVid.src = `${data.link}`;
                  let videoSrc = mainVid.src;
                  const videoName = videoSrc.substring(videoSrc.lastIndexOf('/') + 1);
                  mainVid.controls = true;

                  // mainVid.addEventListener("play", startPlaying);

                  // mainVid.addEventListener("pause", pausePlaying);
                  mainVidWrapper.append(mainVid);
                  mainVidWrapper.append(videoAttr);
                  videoParent.append(mainvideowrapperwrapper);
                } else {
                  // pass
                }
              })
            });
        })
        wrapper.appendChild(video);
        wrapper.append(videoAttr);

        videoParent.appendChild(wrapper);
      });
    } else {
      window.location.href = '/Daily Video/index.html';
    }

  });
});
