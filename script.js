// ========================================
// CONFIGURACIÓN DE GEMINI API
// ========================================
// Reemplaza 'TU_API_KEY_AQUI' con tu API key real de Gemini
const GEMINI_API_KEY = 'AIzaSyB_AB0p1As78oz2kubh1rvCi-cJ3I71qVQ';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

// Función para llamar a la API de Gemini
async function callGeminiAPI(message) {
    if (!GEMINI_API_KEY || GEMINI_API_KEY === 'GEMINI_API_KEY') {
        // Fallback si no hay API key configurada
        return generateFallbackResponse(message);
    }

    try {
        const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: `Eres FLOY, un asistente inteligente de WhatsApp para automatización empresarial.\n\nINSTRUCCIONES:\n- Responde de manera amigable, profesional y entusiasta en español o en inglés dependiendo del idioma del usuario.\n- Si el usuario pide estadísticas o gráficas, responde primero con una breve explicación y luego proporciona SOLO el bloque de configuración JSON para Plotly (no Chart.js), delimitado por triple backtick (\`\`\`json ... \`\`\`), para que el sistema pueda graficar los datos. El objeto debe tener las claves \'data\' (array de trazas) y \'layout\' (objeto de configuración), y el layout debe tener background #1a1a1a. Ejemplo:\n\`\`\`json\n{\"data\": [...], \"layout\": {\"paper_bgcolor\": \"#1a1a1a\", ... }}\n\`\`\`\n- Si no se pide gráfica, responde normalmente.\n- No expliques el código, solo da el bloque JSON después del texto explicativo.\n- Mantén respuestas concisas pero informativas.\n\nCONTEXTO DE FLOY:\n- Plataforma de automatización de WhatsApp\n- Funcionalidades: respuestas automáticas, análisis, gestión de contactos\n- Integraciones: CRM, e-commerce, analytics\n\nEl usuario pregunta: \"${message}\"`
                    }]
                }]
            })
        });

        // Log detallado para depuración
        console.log('Gemini API status:', response.status);
        let data;
        try {
            data = await response.json();
            console.log('Gemini API response JSON:', data);
        } catch (jsonErr) {
            console.error('Error parsing Gemini API response as JSON:', jsonErr);
            throw new Error('Respuesta de la API no es JSON válido');
        }

        if (!response.ok) {
            // Mostrar mensaje de error en el chat
            let errorMsg = `❌ Error de Gemini API: ${data.error?.message || response.statusText || 'Error desconocido.'}`;
            return errorMsg;
        }

        if (data.candidates && data.candidates[0] && data.candidates[0].content) {
            return data.candidates[0].content.parts[0].text;
        } else {
            // Mostrar mensaje de error en el chat
            return '❌ La API de Gemini no devolvió una respuesta válida.';
        }
    } catch (error) {
        console.error('Error al llamar a Gemini API:', error);
        // Mostrar mensaje de error en el chat
        return '❌ Error al conectar con Gemini API. Intenta de nuevo más tarde.';
    }
}

// Theme Management
let currentTheme = localStorage.getItem('theme') || 'light';
let currentLanguage = localStorage.getItem('language') || 'es';

// Initialize theme
document.documentElement.setAttribute('data-theme', currentTheme);
updateThemeIcon();

// Theme toggle functionality
document.getElementById('themeToggle').addEventListener('click', toggleTheme);

function toggleTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const icon = themeToggle.querySelector('i');
    
    // Agregar clase de animación
    themeToggle.classList.add('theme-changing');
    
    // Cambiar tema después de un pequeño delay para la animación
    setTimeout(() => {
        currentTheme = currentTheme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', currentTheme);
        localStorage.setItem('theme', currentTheme);
        updateThemeIcon();
        
        // Remover clase de animación después de completar
        setTimeout(() => {
            themeToggle.classList.remove('theme-changing');
        }, 600);
    }, 100);
}

function updateThemeIcon() {
    const icon = document.querySelector('#themeToggle i');
    if (currentTheme === 'dark') {
        icon.className = 'fas fa-sun';
    } else {
        icon.className = 'fas fa-moon';
    }
}

// Language Management
const translations = {
    es: {
        // Navigation
        'nav.logo': 'FLOY',
        'nav.features': 'Características',
        'nav.benefits': 'Beneficios',
        'nav.pricing': 'Precios',
        'nav.demo': 'Demo',
        'nav.contact': 'Contacto',
        
        // Hero Section
        'hero.title': 'La Plataforma de Automatización de WhatsApp',
        'hero.subtitle': 'Revoluciona tu negocio con la automatización inteligente de WhatsApp. Gestiona conversaciones, respuestas automáticas y análisis avanzados con nuestra plataforma todo en uno.',
        'hero.vote': 'Votar por Floy',
        'hero.demo': 'Ver demostración',
        
        // Demo Section
        'demo.bot.name': 'FLOY Bot',
        'demo.bot.status': 'En línea',
        'demo.message1': '¡Hola! Soy FLOY, tu asistente de WhatsApp. ¿En qué puedo ayudarte hoy?',
        'demo.message2': '¿Puedes mostrarme las estadísticas de ventas de los periodos 2024 y 2025 a día de hoy?',
        'demo.message3': '¡Por supuesto! Aquí tienes la comparativa de ventas de los periodos 2024 y 2025:',
        'demo.stats.title': 'Estadísticas de Ventas',
        'demo.stats.revenue': 'Ingresos',
        'demo.stats.growth': 'Crecimiento',
        'demo.title': 'FLOY Demo',
        'demo.subtitle': 'Chat en tiempo real',
        'demo.welcome': '¡Hola! Soy FLOY, tu asistente de WhatsApp. ¿En qué puedo ayudarte hoy?',
        'demo.input.placeholder': 'Escribe tu mensaje...',
        'demo.info.title': 'Prueba FLOY Ahora',
        'demo.info.description': 'Experimenta la potencia de FLOY con nuestro demo interactivo. Haz preguntas sobre automatización, análisis o cualquier funcionalidad.',
        'demo.suggestion1': '"Muéstrame las estadísticas de ventas"',
        'demo.suggestion2': '"¿Cómo configuro respuestas automáticas?"',
        'demo.suggestion3': '"Necesito un reporte de conversiones"',
        'demo.suggestion4': '"¿Qué integraciones están disponibles?"',
        
        // Video Section
        'video.title': 'Descubre FLOY en Acción',
        'video.description': 'Mira cómo FLOY transforma la gestión de WhatsApp en tu negocio. Desde la configuración inicial hasta el análisis avanzado de datos.',
        
        // Sponsors Section
        'sponsors.title': 'Empresas que confían en FLOY',
        
        // Features Section
        'features.title': 'Características Principales',
        'features.subtitle': 'Descubre todas las herramientas que FLOY pone a tu disposición para revolucionar tu comunicación por WhatsApp.',
        'features.automation.title': 'Automatización Inteligente',
        'features.automation.description': 'Configura respuestas automáticas, flujos de conversación y triggers personalizados para optimizar tu atención al cliente.',
        'features.analytics.title': 'Análisis Avanzado',
        'features.analytics.description': 'Obtén insights detallados sobre el rendimiento de tus campañas, tiempos de respuesta y satisfacción del cliente.',
        'features.management.title': 'Gestión de Contactos',
        'features.management.description': 'Organiza y segmenta tu base de datos de contactos para campañas más efectivas y personalizadas.',
        'features.security.title': 'Seguridad Total',
        'features.security.description': 'Protege tus conversaciones con encriptación de extremo a extremo y cumplimiento de normativas de privacidad.',
        'features.integration.title': 'Integraciones',
        'features.integration.description': 'Conecta FLOY con tu CRM, herramientas de marketing y sistemas de gestión empresarial.',
        'features.support.title': 'Soporte 24/7',
        'features.support.description': 'Nuestro equipo de expertos está disponible para ayudarte en cualquier momento del día.',
        
        // Benefits Section
        'benefits.title': '¿Por qué elegir FLOY?',
        'benefits.efficiency.title': 'Eficiencia Operativa',
        'benefits.efficiency.description': 'Reduce el tiempo de respuesta en un 80% y automatiza hasta el 70% de las consultas frecuentes.',
        'benefits.roi.title': 'ROI Increíble',
        'benefits.roi.description': 'Incrementa tus ventas en un 150% y reduce costos operativos hasta en un 60%.',
        'benefits.satisfaction.title': 'Satisfacción del Cliente',
        'benefits.satisfaction.description': 'Mejora la experiencia del cliente con respuestas instantáneas y atención personalizada 24/7.',
        
        // Stats
        'stats.users': 'Usuarios Activos',
        'stats.messages': 'Mensajes Procesados',
        'stats.uptime': 'Tiempo Activo',
        
        // Contact Section
        'contact.title': '¿Listo para Revolucionar tu WhatsApp?',
        'contact.description': 'Únete a miles de empresas que ya confían en FLOY para automatizar y optimizar su comunicación por WhatsApp.',
        'contact.feature1': 'Configuración en 5 minutos',
        'contact.feature2': 'Prueba gratuita de 14 días',
        'contact.feature3': 'Soporte técnico incluido',
        'contact.form.name': 'Nombre completo',
        'contact.form.email': 'Correo electrónico',
        'contact.form.message': 'Cuéntanos sobre tu proyecto',
        'contact.form.submit': 'Enviar Mensaje',
        
        // Footer
        'footer.description': 'La plataforma líder en automatización de WhatsApp para empresas que buscan optimizar su comunicación y aumentar sus ventas.',
        'footer.product': 'Producto',
        'footer.features': 'Características',
        'footer.demo': 'Demo',
        'footer.api': 'API',
        'footer.company': 'Empresa',
        'footer.about': 'Acerca de',
        'footer.blog': 'Blog',
        'footer.careers': 'Carreras',
        'footer.press': 'Prensa',
        'footer.support': 'Soporte',
        'footer.help': 'Centro de Ayuda',
        'footer.docs': 'Documentación',
        'footer.contact': 'Contacto',
        'footer.status': 'Estado del Servicio',
        'footer.rights': 'Todos los derechos reservados.',
        'footer.powered': 'Desarrollado con ❤️ por Talento Tech',
        
        // Language
        'language.spanish': 'Español',
        'language.english': 'English',
        'language.portuguese': 'Português'
    },
    en: {
        // Navigation
        'nav.logo': 'FLOY',
        'nav.features': 'Features',
        'nav.benefits': 'Benefits',
        'nav.pricing': 'Pricing',
        'nav.demo': 'Demo',
        'nav.contact': 'Contact',
        
        // Hero Section
        'hero.title': 'The WhatsApp Automation Platform',
        'hero.subtitle': 'Revolutionize your business with intelligent WhatsApp automation. Manage conversations, automatic responses, and advanced analytics with our all-in-one platform.',
        'hero.vote': 'Vote for Floy',
        'hero.demo': 'View Demo',
        
        // Demo Section
        'demo.bot.name': 'FLOY Bot',
        'demo.bot.status': 'Online',
        'demo.message1': 'Hello! I\'m FLOY, your WhatsApp assistant. How can I help you today?',
        'demo.message2': 'Can you show me the sales statistics for the 2024 and 2025 periods to date?',
        'demo.message3': 'Of course! Here\'s the sales comparison for the 2024 and 2025 periods:',
        'demo.stats.title': 'Sales Statistics',
        'demo.stats.revenue': 'Revenue',
        'demo.stats.growth': 'Growth',
        'demo.title': 'FLOY Demo',
        'demo.subtitle': 'Real-time chat',
        'demo.welcome': 'Hello! I\'m FLOY, your WhatsApp assistant. How can I help you today?',
        'demo.input.placeholder': 'Type your message...',
        'demo.info.title': 'Try FLOY Now',
        'demo.info.description': 'Experience the power of FLOY with our interactive demo. Ask questions about automation, analytics, or any functionality.',
        'demo.suggestion1': '"Show me the sales statistics"',
        'demo.suggestion2': '"How do I configure automatic responses?"',
        'demo.suggestion3': '"I need a conversion report"',
        'demo.suggestion4': '"What integrations are available?"',
        
        // Video Section
        'video.title': 'Discover FLOY in Action',
        'video.description': 'See how FLOY transforms WhatsApp management in your business. From initial setup to advanced data analysis.',
        
        // Sponsors Section
        'sponsors.title': 'Companies that trust FLOY',
        
        // Features Section
        'features.title': 'Main Features',
        'features.subtitle': 'Discover all the tools that FLOY puts at your disposal to revolutionize your WhatsApp communication.',
        'features.automation.title': 'Intelligent Automation',
        'features.automation.description': 'Configure automatic responses, conversation flows, and custom triggers to optimize your customer service.',
        'features.analytics.title': 'Advanced Analytics',
        'features.analytics.description': 'Get detailed insights about your campaign performance, response times, and customer satisfaction.',
        'features.management.title': 'Contact Management',
        'features.management.description': 'Organize and segment your contact database for more effective and personalized campaigns.',
        'features.security.title': 'Total Security',
        'features.security.description': 'Protect your conversations with end-to-end encryption and compliance with privacy regulations.',
        'features.integration.title': 'Integrations',
        'features.integration.description': 'Connect FLOY with your CRM, marketing tools, and business management systems.',
        'features.support.title': '24/7 Support',
        'features.support.description': 'Our team of experts is available to help you at any time of the day.',
        
        // Benefits Section
        'benefits.title': 'Why choose FLOY?',
        'benefits.efficiency.title': 'Operational Efficiency',
        'benefits.efficiency.description': 'Reduce response time by 80% and automate up to 70% of frequent queries.',
        'benefits.roi.title': 'Incredible ROI',
        'benefits.roi.description': 'Increase your sales by 150% and reduce operational costs by up to 60%.',
        'benefits.satisfaction.title': 'Customer Satisfaction',
        'benefits.satisfaction.description': 'Improve customer experience with instant responses and personalized 24/7 attention.',
        
        // Stats
        'stats.users': 'Active Users',
        'stats.messages': 'Processed Messages',
        'stats.uptime': 'Uptime',
        
        // Contact Section
        'contact.title': 'Ready to Revolutionize your WhatsApp?',
        'contact.description': 'Join thousands of companies that already trust FLOY to automate and optimize their WhatsApp communication.',
        'contact.feature1': 'Setup in 5 minutes',
        'contact.feature2': '14-day free trial',
        'contact.feature3': 'Technical support included',
        'contact.form.name': 'Full name',
        'contact.form.email': 'Email',
        'contact.form.message': 'Tell us about your project',
        'contact.form.submit': 'Send Message',
        
        // Footer
        'footer.description': 'The leading WhatsApp automation platform for companies looking to optimize their communication and increase sales.',
        'footer.product': 'Product',
        'footer.features': 'Features',
        'footer.demo': 'Demo',
        'footer.api': 'API',
        'footer.company': 'Company',
        'footer.about': 'About',
        'footer.blog': 'Blog',
        'footer.careers': 'Careers',
        'footer.press': 'Press',
        'footer.support': 'Support',
        'footer.help': 'Help Center',
        'footer.docs': 'Documentation',
        'footer.contact': 'Contact',
        'footer.status': 'Service Status',
        'footer.rights': 'All rights reserved.',
        'footer.powered': 'Developed with ❤️ by Talento Tech',
        
        // Language
        'language.spanish': 'Spanish',
        'language.english': 'English',
        'language.portuguese': 'Portuguese'
    },
    pt: {
        // Navigation
        'nav.logo': 'FLOY',
        'nav.features': 'Recursos',
        'nav.benefits': 'Benefícios',
        'nav.pricing': 'Preços',
        'nav.demo': 'Demo',
        'nav.contact': 'Contato',
        
        // Hero Section
        'hero.title': 'A Plataforma de Automação do WhatsApp',
        'hero.subtitle': 'Revolucione seu negócio com automação inteligente do WhatsApp. Gerencie conversas, respostas automáticas e análises avançadas com nossa plataforma tudo-em-um.',
        'hero.vote': 'Votar pelo Floy',
        'hero.demo': 'Ver demonstração',
        
        // Demo Section
        'demo.bot.name': 'FLOY Bot',
        'demo.bot.status': 'Online',
        'demo.message1': 'Olá! Sou FLOY, seu assistente do WhatsApp. Como posso ajudá-lo hoje?',
        'demo.message2': 'Você pode me mostrar as estatísticas de vendas dos períodos 2024 e 2025 até hoje?',
        'demo.message3': 'Claro! Aqui está a comparação de vendas dos períodos 2024 e 2025:',
        'demo.stats.title': 'Estatísticas de Vendas',
        'demo.stats.revenue': 'Receita',
        'demo.stats.growth': 'Crescimento',
        'demo.title': 'FLOY Demo',
        'demo.subtitle': 'Chat em tempo real',
        'demo.welcome': 'Olá! Sou FLOY, seu assistente do WhatsApp. Como posso ajudá-lo hoje?',
        'demo.input.placeholder': 'Digite sua mensagem...',
        'demo.info.title': 'Experimente FLOY Agora',
        'demo.info.description': 'Experimente o poder do FLOY com nosso demo interativo. Faça perguntas sobre automação, análise ou qualquer funcionalidade.',
        'demo.suggestion1': '"Mostre-me as estatísticas de vendas"',
        'demo.suggestion2': '"Como configuro respostas automáticas?"',
        'demo.suggestion3': '"Preciso de um relatório de conversões"',
        'demo.suggestion4': '"Quais integrações estão disponíveis?"',
        
        // Video Section
        'video.title': 'Descubra FLOY em Ação',
        'video.description': 'Veja como FLOY transforma o gerenciamento do WhatsApp em seu negócio. Da configuração inicial à análise avançada de dados.',
        
        // Sponsors Section
        'sponsors.title': 'Empresas que confiam no FLOY',
        
        // Features Section
        'features.title': 'Recursos Principais',
        'features.subtitle': 'Descubra todas as ferramentas que FLOY coloca à sua disposição para revolucionar sua comunicação no WhatsApp.',
        'features.automation.title': 'Automação Inteligente',
        'features.automation.description': 'Configure respostas automáticas, fluxos de conversa e gatilhos personalizados para otimizar seu atendimento ao cliente.',
        'features.analytics.title': 'Análise Avançada',
        'features.analytics.description': 'Obtenha insights detalhados sobre o desempenho de suas campanhas, tempos de resposta e satisfação do cliente.',
        'features.management.title': 'Gestão de Contatos',
        'features.management.description': 'Organize e segmente sua base de dados de contatos para campanhas mais eficazes e personalizadas.',
        'features.security.title': 'Segurança Total',
        'features.security.description': 'Proteja suas conversas com criptografia de ponta a ponta e conformidade com regulamentações de privacidade.',
        'features.integration.title': 'Integrações',
        'features.integration.description': 'Conecte FLOY com seu CRM, ferramentas de marketing e sistemas de gestão empresarial.',
        'features.support.title': 'Suporte 24/7',
        'features.support.description': 'Nossa equipe de especialistas está disponível para ajudá-lo a qualquer momento do dia.',
        
        // Benefits Section
        'benefits.title': 'Por que escolher FLOY?',
        'benefits.efficiency.title': 'Eficiência Operacional',
        'benefits.efficiency.description': 'Reduza o tempo de resposta em 80% e automatize até 70% das consultas frequentes.',
        'benefits.roi.title': 'ROI Incrível',
        'benefits.roi.description': 'Aumente suas vendas em 150% e reduza custos operacionais em até 60%.',
        'benefits.satisfaction.title': 'Satisfação do Cliente',
        'benefits.satisfaction.description': 'Melhore a experiência do cliente com respostas instantâneas e atenção personalizada 24/7.',
        
        // Stats
        'stats.users': 'Usuários Ativos',
        'stats.messages': 'Mensagens Processadas',
        'stats.uptime': 'Tempo Ativo',
        
        // Contact Section
        'contact.title': 'Pronto para Revolucionar seu WhatsApp?',
        'contact.description': 'Junte-se a milhares de empresas que já confiam no FLOY para automatizar e otimizar sua comunicação no WhatsApp.',
        'contact.feature1': 'Configuração em 5 minutos',
        'contact.feature2': 'Teste gratuito de 14 dias',
        'contact.feature3': 'Suporte técnico incluído',
        'contact.form.name': 'Nome completo',
        'contact.form.email': 'Email',
        'contact.form.message': 'Conte-nos sobre seu projeto',
        'contact.form.submit': 'Enviar Mensagem',
        
        // Footer
        'footer.description': 'A plataforma líder em automação do WhatsApp para empresas que buscam otimizar sua comunicação e aumentar vendas.',
        'footer.product': 'Produto',
        'footer.features': 'Recursos',
        'footer.demo': 'Demo',
        'footer.api': 'API',
        'footer.company': 'Empresa',
        'footer.about': 'Sobre',
        'footer.blog': 'Blog',
        'footer.careers': 'Carreiras',
        'footer.press': 'Imprensa',
        'footer.support': 'Suporte',
        'footer.help': 'Central de Ajuda',
        'footer.docs': 'Documentação',
        'footer.contact': 'Contato',
        'footer.status': 'Status do Serviço',
        'footer.rights': 'Todos os direitos reservados.',
        'footer.powered': 'Desenvolvido com ❤️ por Talento Tech',
        
        // Language
        'language.spanish': 'Espanhol',
        'language.english': 'Inglês',
        'language.portuguese': 'Português'
    }
};

// Language selector functionality
document.getElementById('languageSelector').addEventListener('change', function() {
    const newLanguage = this.value;
    changeLanguage(newLanguage);
});

function changeLanguage(language) {
    currentLanguage = language;
    localStorage.setItem('language', language);
    
    // Add animation class to all translatable elements
    const elements = document.querySelectorAll('[data-translate]');
    elements.forEach(element => {
        element.classList.add('language-changing');
    });
    
    // Update all elements with data-translate attribute after a small delay
    setTimeout(() => {
        elements.forEach(element => {
            const key = element.getAttribute('data-translate');
            if (translations[language] && translations[language][key]) {
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.placeholder = translations[language][key];
                } else {
                    element.textContent = translations[language][key];
                }
            }
        });
        
        // Update chart image based on language
        updateChartImage();
        
        // Sincronizar ambos selectores
        const langSelFooter = document.getElementById('languageSelector');
        const langSelNav = document.getElementById('languageSelectorNav');
        if (langSelFooter && langSelFooter.value !== language) langSelFooter.value = language;
        if (langSelNav && langSelNav.value !== language) langSelNav.value = language;
        
        // Remove animation class after animation completes
        setTimeout(() => {
            elements.forEach(element => {
                element.classList.remove('language-changing');
            });
        }, 600);
    }, 100);
}

function updateChartImage() {
    const chartImage = document.querySelector('.sales-chart');
    if (chartImage) {
        if (currentLanguage === 'en') {
            chartImage.src = 'grafico_ingles.png';
            chartImage.alt = 'Sales chart 2024-2025';
        } else if (currentLanguage === 'pt') {
            chartImage.src = 'grafico_portugues.png';
            chartImage.alt = 'Gráfico de vendas 2024-2025';
        } else {
            chartImage.src = 'grafico_español.png';
            chartImage.alt = 'Gráfico de ventas 2024-2025';
        }
    }
}

// Initialize language
changeLanguage(currentLanguage);

// Sincronizar selectores de idioma
const langSelFooter = document.getElementById('languageSelector');
const langSelNav = document.getElementById('languageSelectorNav');
if (langSelFooter) {
    langSelFooter.addEventListener('change', function() {
        changeLanguage(this.value);
    });
}
if (langSelNav) {
    langSelNav.addEventListener('change', function() {
        changeLanguage(this.value);
    });
}



// Demo Chat Functionality
const chatMessages = document.getElementById('chatMessages');
const chatInput = document.getElementById('chatInput');
const sendButton = document.getElementById('sendButton');

// Demo suggestions click handlers
document.querySelectorAll('.demo-suggestions li').forEach(suggestion => {
    suggestion.addEventListener('click', function() {
        const text = this.textContent.replace(/"/g, '');
        sendMessage(text);
    });
});

// Send button click handler
sendButton.addEventListener('click', () => {
    const message = chatInput.value.trim();
    if (message) {
        sendMessage(message);
        chatInput.value = '';
    }
});

// Enter key handler
chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const message = chatInput.value.trim();
        if (message) {
            sendMessage(message);
            chatInput.value = '';
        }
    }
});

async function sendMessage(message) {
    // Add user message
    addMessage(message, 'user');
    
    // Show typing indicator
    showTypingIndicator();
    
    try {
        // Call Gemini API
        const response = await callGeminiAPI(message);
        hideTypingIndicator();

        // Detectar bloque de código JSON para Plotly
        const plotlyBlock = extractChartBlock(response);
        if (plotlyBlock && plotlyBlock.data && plotlyBlock.layout) {
            // Mostrar texto explicativo antes del bloque JSON
            const text = response.split('```')[0].trim();
            if (text) addMessage(text, 'bot');
            // Renderizar y mostrar la gráfica Plotly
            renderPlotlyInChat(plotlyBlock);
        } else {
            addMessage(response, 'bot');
        }
    } catch (error) {
        hideTypingIndicator();
        const fallbackResponse = generateFallbackResponse(message);
        addMessage(fallbackResponse, 'bot');
    }
}

function addMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-bubble-demo ${sender}`;
    
    const span = document.createElement('span');
    
    // Check if the text contains HTML (like chart images)
    if (text.includes('<img') || text.includes('<div')) {
        span.innerHTML = text;
    } else {
        span.textContent = text;
    }
    
    messageDiv.appendChild(span);
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function showTypingIndicator() {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'chat-bubble-demo typing';
    typingDiv.id = 'typing-indicator';
    
    const span = document.createElement('span');
    span.innerHTML = '<i class="fas fa-circle"></i><i class="fas fa-circle"></i><i class="fas fa-circle"></i>';
    typingDiv.appendChild(span);
    
    chatMessages.appendChild(typingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function hideTypingIndicator() {
    const typingIndicator = document.getElementById('typing-indicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

function generateFallbackResponse(message) {
    const lowerMessage = message.toLowerCase();
    
    // Language-specific responses
    const responses = {
        es: {
            sales: 'Aquí tienes la comparativa de ventas de los periodos 2024 y 2025:\n\n📊 [Gráfico de ventas]\n\n💰 Ingresos 2024: $45,230\n💰 Ingresos 2025: $67,890\n📈 Crecimiento: +50.1%\n\n¿Te gustaría ver más detalles?',
            automation: 'Para configurar respuestas automáticas:\n\n1. Ve a Configuración > Automatización\n2. Crea un nuevo flujo\n3. Define los triggers y respuestas\n4. Activa el flujo\n\n¿Necesitas ayuda con algún paso específico?',
            integration: 'FLOY se integra con:\n\n🔗 CRM: Salesforce, HubSpot\n📊 Analytics: Google Analytics\n🛒 E-commerce: Shopify, WooCommerce\n📧 Email: Mailchimp, SendGrid\n\n¿Qué integración te interesa?',
            report: 'Generando reporte de conversiones...\n\n📊 Conversiones: 89\n📈 Tasa de conversión: 12.3%\n💰 Valor promedio: $45.67\n⏱️ Tiempo promedio: 2.3 días\n\n¿Quieres que genere un gráfico?',
            chart: generateChart(),
            default: 'Entiendo tu consulta. ¿Te gustaría que te ayude con:\n\n📊 Estadísticas de ventas\n🤖 Configuración de automatización\n📈 Reportes y análisis\n🔗 Integraciones disponibles\n\n¿Qué te interesa más?'
        },
        en: {
            sales: 'Here\'s the sales comparison for the 2024 and 2025 periods:\n\n📊 [Sales Chart]\n\n💰 Revenue 2024: $45,230\n💰 Revenue 2025: $67,890\n📈 Growth: +50.1%\n\nWould you like to see more details?',
            automation: 'To configure automatic responses:\n\n1. Go to Settings > Automation\n2. Create a new flow\n3. Define triggers and responses\n4. Activate the flow\n\nDo you need help with any specific step?',
            integration: 'FLOY integrates with:\n\n🔗 CRM: Salesforce, HubSpot\n📊 Analytics: Google Analytics\n🛒 E-commerce: Shopify, WooCommerce\n📧 Email: Mailchimp, SendGrid\n\nWhich integration interests you?',
            report: 'Generating conversion report...\n\n📊 Conversions: 89\n📈 Conversion rate: 12.3%\n💰 Average value: $45.67\n⏱️ Average time: 2.3 days\n\nDo you want me to generate a chart?',
            chart: generateChart(),
            default: 'I understand your query. Would you like help with:\n\n📊 Sales statistics\n🤖 Automation configuration\n📈 Reports and analysis\n🔗 Available integrations\n\nWhat interests you most?'
        },
        pt: {
            sales: 'Aqui está a comparação de vendas dos períodos 2024 e 2025:\n\n📊 [Gráfico de vendas]\n\n💰 Receita 2024: $45,230\n💰 Receita 2025: $67,890\n📈 Crescimento: +50.1%\n\nGostaria de ver mais detalhes?',
            automation: 'Para configurar respostas automáticas:\n\n1. Vá para Configurações > Automação\n2. Crie um novo fluxo\n3. Defina os gatilhos e respostas\n4. Ative o fluxo\n\nPrecisa de ajuda com algum passo específico?',
            integration: 'FLOY se integra com:\n\n🔗 CRM: Salesforce, HubSpot\n📊 Analytics: Google Analytics\n🛒 E-commerce: Shopify, WooCommerce\n📧 Email: Mailchimp, SendGrid\n\nQual integração te interessa?',
            report: 'Gerando relatório de conversões...\n\n📊 Conversões: 89\n📈 Taxa de conversão: 12.3%\n💰 Valor médio: $45.67\n⏱️ Tempo médio: 2.3 dias\n\nQuer que eu gere um gráfico?',
            chart: generateChart(),
            default: 'Entendo sua consulta. Gostaria de ajuda com:\n\n📊 Estatísticas de vendas\n🤖 Configuração de automação\n📈 Relatórios e análise\n🔗 Integrações disponíveis\n\nO que mais te interessa?'
        }
    };
    
    const currentResponses = responses[currentLanguage] || responses.es;
    
    // Fallback response logic when API is not available
    if (lowerMessage.includes('venta') || lowerMessage.includes('sales') || lowerMessage.includes('venda') || lowerMessage.includes('estadística') || lowerMessage.includes('statistic')) {
        return currentResponses.sales;
    } else if (lowerMessage.includes('autom') || lowerMessage.includes('respuesta')) {
        return currentResponses.automation;
    } else if (lowerMessage.includes('integra') || lowerMessage.includes('api')) {
        return currentResponses.integration;
    } else if (lowerMessage.includes('reporte') || lowerMessage.includes('report')) {
        return currentResponses.report;
    } else if (lowerMessage.includes('gráfico') || lowerMessage.includes('chart')) {
        return currentResponses.chart;
    } else {
        return currentResponses.default;
    }
}

function generateChart() {
    let chartImage, chartAlt;
    
    if (currentLanguage === 'en') {
        chartImage = 'grafico_ingles.png';
        chartAlt = 'Sales chart 2024-2025';
    } else if (currentLanguage === 'pt') {
        chartImage = 'grafico_portugues.png';
        chartAlt = 'Gráfico de vendas 2024-2025';
    } else {
        chartImage = 'grafico_español.png';
        chartAlt = 'Gráfico de ventas 2024-2025';
    }
    
    return `<div class="chart-container">
        <img src="${chartImage}" alt="${chartAlt}" class="sales-chart">
    </div>`;
}

// Extrae el bloque JSON de configuración de Chart.js de la respuesta de Gemini
function extractChartBlock(response) {
    const regex = /```json([\s\S]*?)```/i;
    const match = response.match(regex);
    if (match && match[1]) {
        try {
            return JSON.parse(match[1]);
        } catch (e) {
            console.error('Error parsing Chart.js JSON:', e);
        }
    }
    return null;
}

// Renderiza la gráfica Plotly en el chat demo y la muestra como elemento interactivo
function renderPlotlyInChat(plotlyConfig) {
    // Crear un div único para la gráfica
    const plotId = 'plotly-' + Math.random().toString(36).substr(2, 9);
    const plotDiv = document.createElement('div');
    plotDiv.id = plotId;
    plotDiv.className = 'plotly-chat-graph';
    plotDiv.style.width = '100%';
    plotDiv.style.minWidth = '0';
    plotDiv.style.height = '180px';
    plotDiv.style.margin = '1rem 0';
    plotDiv.style.display = 'block';
    plotDiv.style.cursor = 'pointer';
    // Añadir el div al chat
    addMessage(`<div id='${plotId}' class='plotly-chat-graph' style='width:100%;min-width:0;height:180px;display:block;cursor:pointer;'></div>`, 'bot');
    // Renderizar la gráfica Plotly pequeña
    setTimeout(() => {
        if (!plotlyConfig.layout) plotlyConfig.layout = {};
        plotlyConfig.layout.paper_bgcolor = '#1a1a1a';
        plotlyConfig.layout.plot_bgcolor = '#1a1a1a';
        plotlyConfig.layout.font = plotlyConfig.layout.font || {};
        plotlyConfig.layout.font.color = '#fff';
        plotlyConfig.layout.autosize = true;
        Plotly.newPlot(plotId, plotlyConfig.data, plotlyConfig.layout, {displayModeBar: false, responsive: true});
        setTimeout(() => {
            Plotly.Plots.resize(document.getElementById(plotId));
        }, 200);
        window.addEventListener('resize', () => {
            Plotly.Plots.resize(document.getElementById(plotId));
        });
        // Hacer la gráfica clickeable para expandir en modal
        document.getElementById(plotId).onclick = () => openPlotlyModal(plotlyConfig);
    }, 100);
}

// Modal para gráfica Plotly expandida
function openPlotlyModal(plotlyConfig) {
    const modal = document.getElementById('plotlyModal');
    const container = document.getElementById('plotlyModalContainer');
    container.innerHTML = '';
    const bigId = 'plotly-modal-' + Math.random().toString(36).substr(2, 9);
    const bigDiv = document.createElement('div');
    bigDiv.id = bigId;
    bigDiv.style.width = '90vw';
    bigDiv.style.height = '70vh';
    bigDiv.style.maxWidth = '900px';
    bigDiv.style.margin = '0 auto';
    container.appendChild(bigDiv);
    // Forzar fondo oscuro y fuente blanca
    if (!plotlyConfig.layout) plotlyConfig.layout = {};
    plotlyConfig.layout.paper_bgcolor = '#1a1a1a';
    plotlyConfig.layout.plot_bgcolor = '#1a1a1a';
    plotlyConfig.layout.font = plotlyConfig.layout.font || {};
    plotlyConfig.layout.font.color = '#fff';
    plotlyConfig.layout.autosize = true;
    Plotly.newPlot(bigId, plotlyConfig.data, plotlyConfig.layout, {displayModeBar: true, responsive: true});
    setTimeout(() => {
        Plotly.Plots.resize(document.getElementById(bigId));
    }, 200);
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

// Cerrar modal de gráfica Plotly
const plotlyModal = document.getElementById('plotlyModal');
const plotlyModalClose = document.getElementById('plotlyModalClose');
plotlyModalClose.addEventListener('click', function() {
    plotlyModal.classList.remove('show');
    document.body.style.overflow = 'auto';
});
plotlyModal.addEventListener('click', function(e) {
    if (e.target === plotlyModal) {
        plotlyModal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
});

// Contact form handling
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);
    
    // Simulate form submission
    this.reset();
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('loaded');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.feature-card, .benefit-item, .stat-item, .pricing-card');
    animatedElements.forEach(el => observer.observe(el));
});

// Mobile navigation toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Chart Modal Functionality
const chartModal = document.getElementById('chartModal');
const chartModalClose = document.getElementById('chartModalClose');
const chartModalImage = document.getElementById('chartModalImage');

// Open modal when clicking on chart images
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('sales-chart')) {
        const imgSrc = e.target.src;
        const imgAlt = e.target.alt;
        
        chartModalImage.src = imgSrc;
        chartModalImage.alt = imgAlt;
        chartModal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
});

// Close modal
chartModalClose.addEventListener('click', function() {
    chartModal.classList.remove('show');
    document.body.style.overflow = 'auto';
});

// Close modal when clicking outside
chartModal.addEventListener('click', function(e) {
    if (e.target === chartModal) {
        chartModal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && chartModal.classList.contains('show')) {
        chartModal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
});

// Add CSS for typing indicator
const style = document.createElement('style');
style.textContent = `
    .typing span {
        display: flex;
        gap: 4px;
        align-items: center;
    }
    
    .typing i {
        width: 6px;
        height: 6px;
        background: var(--text-secondary);
        border-radius: 50%;
        animation: typing 1.4s infinite ease-in-out;
    }
    
    .typing i:nth-child(1) { animation-delay: -0.32s; }
    .typing i:nth-child(2) { animation-delay: -0.16s; }
    
    @keyframes typing {
        0%, 80%, 100% {
            transform: scale(0.8);
            opacity: 0.5;
        }
        40% {
            transform: scale(1);
            opacity: 1;
        }
    }
    

`;
document.head.appendChild(style); 