
document.addEventListener('DOMContentLoaded', function() {
    const params = new URLSearchParams(window.location.search);
    const jalsahId = params.get('id');
    const description = decodeURIComponent(params.get('desc') || '');
    const time = decodeURIComponent(params.get('time') || '');

    if (jalsahId) {
        loadJalsahDetails(jalsahId, description, time);
    } else {
        console.error('Jalsah ID is required');
        // Optionally redirect to a default page or display an error
    }
});

function loadJalsahDetails(id, description, time) {
    document.querySelector('.jalsa-serial span').textContent = 'Jalsa Serial: ' + id;
    document.querySelector('.jalsa-description p').textContent = 'Description: ' + description;
    document.querySelector('.jalsa-info .jalsah-time').textContent = 'Time: ' + time;
}

