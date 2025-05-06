     // Inicializar AOS (Animate On Scroll)
     AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true
    });
    
    // Función para el desplazamiento suave
    function smoothScroll(event) {
        event.preventDefault();
        
        // Cerrar navbar mobile si está abierto
        const navbarCollapse = document.querySelector('.navbar-collapse.show');
        if (navbarCollapse) {
            const bsCollapse = new bootstrap.Collapse(navbarCollapse);
            bsCollapse.hide();
        }
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Actualizar la URL sin recargar la página
            history.pushState(null, null, targetId);
        }
    }
    // Función para actualizar los enlaces activos
    function updateActiveNav() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop - 200 && window.scrollY < sectionTop + sectionHeight - 200) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }
    
    // Ejecutar al cargar la página y al hacer scroll
    window.addEventListener('load', updateActiveNav);
    window.addEventListener('scroll', updateActiveNav);
    
    // Aplicar el desplazamiento suave a todos los enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        // Excluir el botón de WhatsApp y otros enlaces que no deben tener scroll suave
        if (!anchor.classList.contains('whatsapp-float')) {
            anchor.addEventListener('click', smoothScroll);
        }
    });
    
    // Cambiar navbar al hacer scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Activar tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
    
    // Validación del formulario
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validación simple
            const nombre = document.getElementById('nombre').value;
            const email = document.getElementById('email').value;
            const asunto = document.getElementById('asunto').value;
            const mensaje = document.getElementById('mensaje').value;
            
            if (nombre && email && asunto && mensaje) {
                // Aquí podrías agregar el código para enviar el formulario
                alert('Gracias por tu mensaje. Nos pondremos en contacto contigo pronto.');
                form.reset();
            } else {
                alert('Por favor complete todos los campos requeridos.');
            }
        });
    }