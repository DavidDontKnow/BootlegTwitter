const deletHandler = async (event) => {
    event.preventDefault();
    const id = document.querySelector('#chirp-id').value.trim();
    if (id) {
        const response = await fetch(`/api/chirps/${id}`, {
            method: 'DELETE',
        });
        if (response.ok) {
            document.location.replace('/');
        } else {
            alert(response.statusText);
        }
    }
};

