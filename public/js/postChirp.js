const newChirp = async (event) => {
    event.preventDefault();

    const chirp = document.querySelector('#chirp').value.trim();

    if (chirp) {
        const response = await fetch('/api/chirps/', {
            method: 'POST',
            body: JSON.stringify({ chirp }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/');
        } else {
            alert(response.statusText);
        }
    }
};