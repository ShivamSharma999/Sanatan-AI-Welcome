gsap.to('div.main', {
    x: 350,
    scale: 1.5,
    rotate: 360,
    duration: 2,
    borderRadius: '20px',
    delay: 1,
    opacity: 1,
});

gsap.to('div.a', {
    x: 415,
    y: -50,
    scale: 1.5,
    rotate: 405,
    duration: 2,
    delay: 1,
    opacity: 1
});

gsap.to('div#a', {
    x: 350,
    y: -100,
    scale: 1.5,
    rotate: 360,
    duration: 2,
    borderRadius: '50%',
    delay: 1,
    opacity: 1
});

gsap.from('h1', {
    opacity: 0,
    top: '300px',
    delay: 0.9
});