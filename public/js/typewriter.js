const typeWriter = document.querySelector('.typeWriter'); // Select the element with the class 'typewriter'

new Typewriter('#typewriter', {
    strings: ["@ChrisG Chirped-If Ivo got beef tell him I'm a vegetarian", "@FakeElonMusk Chirped- You can tell it's real because it looks so fake.", "@ChrisG Chirped- Jeff: yes, Geoff: yeos", "@FakeElonMusk Chirped- Better than real Twitter!", "Better than real Twitter!", "@FakeJoshTaylor Chirped- Will the real Josh Taylor please stand up?", "@IvoARealOne Chirped- Why type many words when few words do trick?", "@DavidG Chirped- This for the memes ", "@DavidG Chirped- We've seen your code and it ain't as good as ours.",],
    autoStart: true,
    loop: true, 

});