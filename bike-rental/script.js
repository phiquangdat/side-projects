fetch('https://www.cc.puv.fi/~hmh/fed/fedApi/bikes/')
    .then(response => {
        if (!response.ok) {
            throw new Error('Error fetching bikes');
        }
        return response.json();
    })
    .then(bikes => {
        const bikeContainer = document.createElement('div');
        bikeContainer.id = 'bikes-container';
        document.querySelector("main").appendChild(bikeContainer);

        bikes.forEach(bike => {
            const bikeDiv = document.createElement('div');
            bikeDiv.classList.add('bike-item');
            const img_url = bike.img_url;
            bikeDiv.innerHTML = `
                <img src="${img_url}" 
                     class="bike-img" 
                     alt="${bike.model}" 
                     data-model="${bike.model}" 
                     data-manuf="${bike.manuf}" 
                     data-gear="${bike.gear}" 
                     data-gear-manuf="${bike.gear_manuf}" 
                     data-size="${bike.size}" 
                     data-details="${bike.details}">
            `;
            bikeContainer.appendChild(bikeDiv);
        });

        const modal = document.getElementById("modal");
        const modalImg = document.getElementById("modal-img");
        const modalDescription = document.getElementById("modal-description");
        const closeModal = document.querySelector(".close");

        document.querySelectorAll(".bike-img").forEach(img => {
            img.addEventListener("click", (event) => {
                modal.style.display = "block"; 
                modalImg.src = event.target.src;

                modalDescription.innerHTML = `
                    <h3>${event.target.dataset.model}</h3>
                    <p><strong>Manufacturer:</strong> ${event.target.dataset.manuf}</p>
                    <p><strong>Gears:</strong> ${event.target.dataset.gear} (${event.target.dataset.gear_manuf})</p>
                    <p><strong>Size:</strong> ${event.target.dataset.size}</p>
                    <p><strong>Details:</strong> ${event.target.dataset.details}</p>
                `;
            });
        });

        closeModal.addEventListener("click", () => {
            modal.style.display = "none";
        });

        window.addEventListener("click", (event) => {
            if (event.target === modal) {
                modal.style.display = "none";
            }
        });
    })
    .catch(error => {
        console.error('Error fetching bikes: ', error);
    });



    document.querySelector('form').addEventListener('submit', function(event) {
        // Prevent the form from submitting in the traditional way
        event.preventDefault();
    
        // Collect data from the form
        const bikeType = document.getElementById('bike-type').value;
        const rentalDuration = document.getElementById('rental-duration').value;
        const pickupTime = document.getElementById('pickup-time').value;
    
        console.log('Bike Type:', bikeType);
        console.log('Rental Duration:', rentalDuration);
        console.log('Pick-up Time:', pickupTime);
    
        // Optionally, handle the data (e.g., display a confirmation)
        alert(`Thank you! You are renting a ${bikeType} for ${rentalDuration} hours, to be picked up at ${pickupTime}.`);
    
        // Reset form after submission
        this.reset();
    });
    