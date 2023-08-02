window.addEventListener('DOMContentLoaded', () => {
    function lazyLoadVideos() {
        let videos = document.querySelectorAll('video[data-src]');
        videos.forEach(function(video) {
            if (video.getBoundingClientRect().top <= window.innerHeight) {
                video.setAttribute('src', video.getAttribute('data-src'));
                video.removeAttribute('data-src');
            }
        });
    }
    window.addEventListener('scroll', lazyLoadVideos);
    window.addEventListener('load', lazyLoadVideos);
});
