const daySelect = document.getElementById("dob-day");
        for (let i = 1; i <= 31; i++) {
            const option = document.createElement("option");
            option.value = i;
            option.textContent = i;
            daySelect.appendChild(option);
        }

        // Populate the month dropdown
        const monthSelect = document.getElementById("dob-month");
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        months.forEach((month, index) => {
            const option = document.createElement("option");
            option.value = index + 1;
            option.textContent = month;
            monthSelect.appendChild(option);
        });

        // Populate the year dropdown
        const yearSelect = document.getElementById("dob-year");
        const currentYear = new Date().getFullYear();
        for (let i = currentYear - 100; i <= currentYear; i++) {
            const option = document.createElement("option");
            option.value = i;
            option.textContent = i;
            yearSelect.appendChild(option);
        }