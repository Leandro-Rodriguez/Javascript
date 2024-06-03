document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.getElementById('toggleDarkMode');

    // Verificar si hay una preferencia guardada en Local Storage//
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode) {
        const mode = JSON.parse(savedMode);
        document.body.classList.add(mode);
        updateButtonText(mode);
    } else {
        // Establecer modo claro por defecto//
        document.body.classList.add('light-mode');
    }

    toggleButton.addEventListener('click', () => {
        const currentMode = document.body.classList.contains('dark-mode') ? 'dark-mode' : 'light-mode';
        const newMode = currentMode === 'dark-mode' ? 'light-mode' : 'dark-mode';

        // Cambiar la clase del cuerpo//
        document.body.classList.remove(currentMode);
        document.body.classList.add(newMode);

        // Guardar la nueva preferencia en Local Storage//
        localStorage.setItem('darkMode', JSON.stringify(newMode));

        // Actualizar el texto del botón //
        updateButtonText(newMode);
    });

    function updateButtonText(mode) {
        toggleButton.textContent = mode === 'dark-mode' ? 'Cambiar a modo monocromático' : 'Cambiar a modo oscuro';
    }
});