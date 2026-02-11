window.addEventListener('load', function() {
    const form= document.querySelector('form');
    const eventtitleInput = document.getElementById('eventtitle');
    const eventdateInput = document.getElementById('eventdate');
    const eventdescriptionInput = document.getElementById('desc');
    const categoryInput = document.getElementById('event');
    // for adding new event
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const eventtitle = eventtitleInput.value;
        const eventdate = eventdateInput.value;
        const eventdescription = eventdescriptionInput.value;
        const category = categoryInput.value;
        if (!eventtitle || !eventdate || !eventdescription || !category) {
            alert('Please fill in all fields.');
            return;
        }
        const card = document.createElement('div');
        const cardContainer = document.getElementById('cards');
        
        card.classList.add('card');
        card.innerHTML = `
            <button class="cut_btn">X</button>
            <h4>${eventtitle}</h4>
            <p>🗓️ Event Date: ${eventdate}</p>
            <p>📝 Category: ${category}</p>
            <p>📥Description: ${eventdescription}</p>
        `;
        cardContainer.appendChild(card);
        card.querySelector('.cut_btn').addEventListener('click',function(){
            card.remove()
        });
        form.reset();
    });
    // for clearing all events
    document.getElementById('clear_all-events').addEventListener('click', function() {
        const cardContainer = document.getElementById('cards');
        cardContainer.innerHTML = '';
    });
    // for adding sample event
    document.getElementById('add_sample').addEventListener('click', function() {
        const cardContainer = document.getElementById('cards');
        const sampleCard = document.createElement('div');
        sampleCard.classList.add('card');
        sampleCard.innerHTML = `
            <button class="cut_btn">X</button>
            <h4>Sample Event</h4>
            <p>🗓️ Event Date: 2024-06-30</p>
            <p>📝 Category: Meetup</p>
            <p>📥Description: This is a sample event description.</p>
        `;
        cardContainer.appendChild(sampleCard);
        sampleCard.querySelector('.cut_btn').addEventListener('click',function(){
            sampleCard.remove()
        });
    });
    // for key press event
    document.addEventListener('keydown', function(e) {
        const key=document.getElementById('key');
        key.textContent = e.key;
    });
});
