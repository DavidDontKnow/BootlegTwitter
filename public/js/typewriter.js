const typeWriter = document.querySelector('.typeWriter'); // Select the element with the class 'typewriter'

new Typewriter('#typewriter', {
    strings: ["If Ivo got beef tell him I'm a vegetarian - @ChrisG", "You can tell it's real becuase it looks so fake. - @FakeElonMusk", "Jeff: yes, Geoff: yeos - @ChrisG", "Better than real Twitter! - @FakeElonMusk", "Better than real Twitter! - @FakeElonMusk", "Will the real Josh Taylor please stand up? - @FakeJoshTaylor", "Why type many words when few words do trick? - @IvoARealOne", "This for the memes - @DavidG", "We've seen your code and it ain't as good as ours. - @DavidG",],
    autoStart: true,
    loop: true,

});