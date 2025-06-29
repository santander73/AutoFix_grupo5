$(document).ready(function() {

    // Al hacer clic en una tarjeta de servicio, se selecciona en el formulario
    $('.service-card').on('click', function() {
        const servicioSeleccionado = $(this).data('service');
        $('#tipoReparacion').val(servicioSeleccionado);
        
        // Opcional: Desplazar la vista hasta el formulario
        $('html, body').animate({
            scrollTop: $("#formulario-seccion").offset().top
        }, 500);
    });

    // Manejo del envío del formulario
    $('#reparacionForm').on('submit', function(event) {
        // Prevenir el envío real del formulario
        event.preventDefault();

        // Aplicar la validación de Bootstrap
        if (!this.checkValidity()) {
            event.stopPropagation();
            $(this).addClass('was-validated');
            return;
        }

        // Si el formulario es válido, continuar
        const servicio = $('#tipoReparacion').val();
        const fecha = $('#fechaCita').val();

        // Formatear la fecha para mostrarla
        const fechaObj = new Date(fecha + 'T00:00:00'); // Evitar problemas de zona horaria
        const opcionesFecha = { year: 'numeric', month: 'long', day: 'numeric' };
        const fechaFormateada = fechaObj.toLocaleDateString('es-ES', opcionesFecha);
        
        // Llenar los datos de confirmación
        $('#conf-servicio').text(servicio);
        $('#conf-fecha').text(fechaFormateada);

        // Ocultar el formulario y mostrar la confirmación
        $('#reparacionForm').fadeOut(function() {
            $('#confirmacion').fadeIn();
        });
    });
});