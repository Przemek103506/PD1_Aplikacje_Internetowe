document.addEventListener("DOMContentLoaded", () => {
    // OBSŁUGA MENU MOBILNEGO

    const mobileMenuBtn = document.getElementById("mobile-menu-btn");
    const navLinks = document.querySelector(".nav-links");

    mobileMenuBtn.addEventListener("click", () => {
        // Przełącza klasę 'aktywne' (która w CSS zmienia display: none na flex)
        navLinks.classList.toggle("aktywne");
    });

    // Zamknięcie menu po kliknięciu w dowolny link (przydatne na telefonie)
    const links = document.querySelectorAll(".nav-links a");
    links.forEach(link => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("aktywne");
        });
    });

    // ZMIANA MOTYWU (JASNY / CIEMNY)

    const themeBtn = document.getElementById("theme-btn");
    const body = document.body;

    // Sprawdzenie, czy użytkownik miał już zapisany ciemny motyw przy poprzedniej wizycie
    if (localStorage.getItem("motyw") === "ciemny") {
        body.classList.add("dark-theme");
        themeBtn.textContent = "☀️";
    }

    themeBtn.addEventListener("click", () => {
        body.classList.toggle("dark-theme"); // Dodaje lub usuwa klasę .dark-theme

        // Zapisanie wyboru w pamięci przeglądarki i zmiana ikony
        if (body.classList.contains("dark-theme")) {
            localStorage.setItem("motyw", "ciemny");
            themeBtn.textContent = "☀️";
        } else {
            localStorage.setItem("motyw", "jasny");
            themeBtn.textContent = "🌙";
        }
    });

    // WALIDACJA FORMULARZA KONTAKTOWEGO

    const form = document.getElementById("formularz-kontaktowy");
    const errorDiv = document.getElementById("komunikaty-bledow");

    form.addEventListener("submit", (e) => {
        // Zatrzymanie domyślnego wysyłania formularza (żeby strona się nie przeładowała)
        e.preventDefault();
        
        // Czyszczenie starych błędów
        errorDiv.innerHTML = "";
        let błędy = [];

        // Pobranie wartości wpisanych przez użytkownika (usunięcie spacji na końcach)
        const imie = document.getElementById("imie").value.trim();
        const nazwisko = document.getElementById("nazwisko").value.trim();
        const email = document.getElementById("email").value.trim();
        const wiadomosc = document.getElementById("wiadomosc").value.trim();

        // Proste sprawdzanie warunków
        if (imie === "") {
            błędy.push("Pole 'Imię' nie może być puste");
        }
        
        if (nazwisko === "") {
            błędy.push("Pole 'Nazwisko' nie może być puste");
        }

        // Proste sprawdzenie, czy e-mail ma znak @ i kropkę
        if (email === "" || !email.includes("@") || !email.includes(".")) {
            błędy.push("Podaj poprawny adres e-mail");
        }

        if (wiadomosc.length < 10) {
            błędy.push("Opis usterki musi mieć co najmniej 10 znaków");
        }

        // Jeśli są błędy - wyświetlamy je. Jeśli nie - wysyłamy formularz.
        if (błędy.length > 0) {
            // Łączymy wszystkie komunikaty o błędach w jeden tekst (oddzielony znakiem nowej linii)
            errorDiv.innerHTML = błędy.join("<br>");
        } else {
            errorDiv.style.color = "green";
            errorDiv.innerHTML = "Zgłoszenie wysłane poprawnie! Odezwiemy się wkrótce.";
            form.reset(); // Czyszczenie formularza po sukcesie
            
            // Przywracamy kolor błędów na czerwony, tak na wszelki wypadek
            setTimeout(() => {
                errorDiv.innerHTML = "";
                errorDiv.style.color = "var(--kolor-akcent)"; 
            }, 5000);
        }
    });
});