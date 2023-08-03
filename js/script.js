'use strict';
window.addEventListener('DOMContentLoaded', () => {
  const videoParent = document.querySelector('.main-video-content');


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

  function openNotification(body) {
    notification.classList.remove('hide');
    notification.classList.add('show');
    notificationBody.innerHTML = `<p>${body}</p>`

  }

  function closeNotification() {
    notification.classList.remove('show');
    notification.classList.add('hide');
  }
  const getResource = async (url) => {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    return await res.json();
  };

  const divClass = 'col-lg-4 col-md-6 col-sm-7 p-2 videos-wrap';
  const jsondata = getResource('https://marsianjohncarter.github.io/DailyVideo/videoDB.json/videos')
    .then(jsondata => jsondata.reverse()).then(data => {
      data.forEach(({
        id,
        link,
        poster,
        name,
        watched,
        date
      }) => {
        let posted = getTimePassed(date);
        if (posted[1] == 'Seconds') {
          posted = ['A couple seconds', '']
        }
        let views;
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
          getResource('https://marsianjohncarter.github.io/DailyVideo/videoDB.json/videos')
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
      })
    });

  function lazyLoadVideos() {
    let videos = document.querySelectorAll('video[data-src]');
    videos.forEach(function (video) {
      if (video.getBoundingClientRect().top <= window.innerHeight) {
        video.setAttribute('src', video.getAttribute('data-src'));
        video.removeAttribute('data-src');
      }
    });
  }
  window.addEventListener('scroll', lazyLoadVideos);
  window.addEventListener('load', lazyLoadVideos);

});
