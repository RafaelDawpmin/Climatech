// ===============================================
// SISTEMA DE NOTÍCIAS
// ===============================================

/**
 * Busca notícias sobre clima
 */
function searchNews() {
    const query = document.getElementById('news-search')?.value?.trim();
    const button = document.getElementById('news-button');

    setButtonLoading(button, 'Buscando...');

    // Simula busca de notícias
    setTimeout(() => {
        try {
            const news = generateNews(query);
            displayNews(news);
            
            if (query) {
                trackUserAction('news_search', query);
            }
        } catch (error) {
            console.error('❌ Erro na busca de notícias:', error);
            showNotification('Erro ao buscar notícias.', 'error');
        } finally {
            resetButton(button, '<i class="fas fa-search"></i> Buscar Notícias');
        }
    }, 1000);
}

/**
 * Gera notícias baseadas na consulta
 */
function generateNews(query = '') {
    const allNews = [
        {
            id: 1,
            icon: 'fas fa-cloud-rain',
            category: 'Tecnologia',
            title: 'Sistema de Alerta Precoce detecta chuvas fortes',
            description: 'Nova tecnologia de radar doppler permite prever tempestades com até 2 horas de antecedência, salvando vidas',
            time: '2 horas atrás',
            priority: 'high',
            tags: ['tecnologia', 'alerta', 'chuva', 'radar']
        },
        {
            id: 2,
            icon: 'fas fa-home',
            category: 'Construção',
            title: 'Técnicas de construção resiliente reduzem danos',
            description: 'Novas metodologias construtivas com materiais sustentáveis diminuem prejuízos de enchentes em 70%',
            time: '5 horas atrás',
            priority: 'medium',
            tags: ['construção', 'sustentabilidade', 'enchente']
        },
        {
            id: 3,
            icon: 'fas fa-users',
            category: 'Capacitação',
            title: 'Programa de capacitação em primeiros socorros',
            description: 'Mais de 500 famílias foram treinadas em resposta a emergências climáticas este mês',
            time: '1 dia atrás',
            priority: 'medium',
            tags: ['capacitação', 'primeiros socorros', 'emergência']
        },
        {
            id: 4,
            icon: 'fas fa-seedling',
            category: 'Meio Ambiente',
            title: 'Projeto de reflorestamento previne deslizamentos',
            description: 'Iniciativa ambiental planta 10 mil árvores nativas em áreas de risco de deslizamento',
            time: '2 dias atrás',
            priority: 'low',
            tags: ['reflorestamento', 'deslizamento', 'meio ambiente']
        },
        {
            id: 5,
            icon: 'fas fa-satellite',
            category: 'Monitoramento',
            title: 'Monitoramento por satélite ampliado',
            description: 'Cobertura de alertas climáticos expandida para 200 cidades brasileiras com tecnologia de satélite',
            time: '3 dias atrás',
            priority: 'high',
            tags: ['satélite', 'monitoramento', 'brasil']
        },
        {
            id: 6,
            icon: 'fas fa-shield-alt',
            category: 'Defesa Civil',
            title: 'Defesa Civil recebe novos equipamentos',
            description: 'Investimento em equipamentos de resgate e comunicação chega às bases regionais',
            time: '4 dias atrás',
            priority: 'medium',
            tags: ['defesa civil', 'equipamentos', 'resgate']
        },
        {
            id: 7,
            icon: 'fas fa-chart-line',
            category: 'Dados',
            title: 'Índices de preparação climática aumentam 40%',
            description: 'Pesquisa mostra melhoria significativa na preparação das comunidades para eventos climáticos extremos',
            time: '1 semana atrás',
            priority: 'low',
            tags: ['pesquisa', 'preparação', 'comunidade']
        },
        {
            id: 8,
            icon: 'fas fa-graduation-cap',
            category: 'Educação',
            title: 'Cursos online sobre resiliência climática',
            description: 'Plataforma educacional gratuita oferece certificação em gestão de riscos climáticos',
            time: '1 semana atrás',
            priority: 'medium',
            tags: ['educação', 'curso', 'certificação']
        }
    ];

    if (query) {
        const queryLower = query.toLowerCase();
        return allNews.filter(news => 
            news.title.toLowerCase().includes(queryLower) ||
            news.description.toLowerCase().includes(queryLower) ||
            news.tags.some(tag => tag.includes(queryLower)) ||
            news.category.toLowerCase().includes(queryLower)
        );
    }
    
    return allNews.sort((a, b) => {
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
    });
}

/**
 * Exibe notícias na interface
 */
function displayNews(news) {
    const newsList = document.getElementById('lista-noticias');
    if (!newsList) return;
    
    if (news.length === 0) {
        newsList.innerHTML = `
            <li style="text-align: center; color: #666; font-style: italic; padding: 2em;">
                <i class="fas fa-search" style="font-size: 2em; margin-bottom: 1em; display: block;"></i>
                Nenhuma notícia encontrada para sua busca.
                <br><br>
                <small>Tente usar termos como: clima, emergência, defesa civil, sustentabilidade</small>
            </li>
        `;
        return;
    }
    
    const htmlContent = news.map(item => `
        <li data-news-id="${item.id}" data-priority="${item.priority}">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.5em;">
                <span class="news-category" style="background: #2E7D32; color: white; padding: 0.2em 0.8em; border-radius: 12px; font-size: 0.8em; font-weight: 600;">
                    ${item.category}
                </span>
                <small style="color: #666;">(${item.time})</small>
            </div>
            <div style="display: flex; align-items: flex-start; gap: 1em;">
                <i class="${item.icon}" style="font-size: 1.5em; color: #2E7D32; margin-top: 0.2em; min-width: 20px;"></i>
                <div style="flex: 1;">
                    <strong style="color: #1B5E20; font-size: 1.1em; line-height: 1.3;">${item.title}</strong>
                    <p style="margin: 0.5em 0 0 0; color: #444; line-height: 1.4;">${item.description}</p>
                    <div style="margin-top: 0.8em;">
                        ${item.tags.map(tag => `
                            <span style="background: rgba(46, 125, 50, 0.1); color: #2E7D32; padding: 0.2em 0.6em; border-radius: 8px; font-size: 0.75em; margin-right: 0.5em;">
                                #${tag}
                            </span>
                        `).join('')}
                    </div>
                </div>
            </div>
        </li>
    `).join('');
    
    newsList.innerHTML = htmlContent;
    
    // Adiciona efeito de entrada
    const items = newsList.querySelectorAll('li');
    items.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        setTimeout(() => {
            item.style.transition = 'all 0.3s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        }, index * 100);
    });
}

// ===============================================
// SISTEMA DE FORMULÁRIOS
// ===============================================

/**
 * Configura manipuladores de formulários
 */
function setupFormHandlers() {
    const forms = {
        'formAjuda': handleEmergencyForm,
        'form-contato': handleContactForm
    };

    Object.entries(forms).forEach(([formId, handler]) => {
        const form = document.getElementById(formId);
        if (form) {
            form.addEventListener('submit', handler);
        }
    });
}

/**
 * Manipula formulário de emergência
 */
async function handleEmergencyForm(e) {
    e.preventDefault();
    
    const form = e.target;
    const submitButton = form.querySelector('button[type="submit"]');
    const messageDiv = document.getElementById('mensagem-sucesso');
    
    // Validação dos campos
    const validation = validateEmergencyForm(form);
    if (!validation.isValid) {
        showMessage(messageDiv, validation.message, 'error');
        return;
    }

    setButtonLoading(submitButton, 'Enviando Solicitação...');

    try {
        const formData = new FormData(form);
        
        // Adiciona informações extras
        formData.append('timestamp', new Date().toISOString());
        formData.append('user_agent', navigator.userAgent);
        formData.append('form_type', 'emergency');
        
        const response = await submitForm('https://formspree.io/f/xwpvdejn', formData);

        if (response.success) {
            showMessage(messageDiv, 
                '🚨 Solicitação de emergência enviada com sucesso! Nossa equipe entrará em contato em breve. Em caso de risco iminente, ligue imediatamente para os números de emergência.', 
                'success'
            );
            
            form.reset();
            trackUserAction('emergency_form_submitted');
            
            // Mostra contatos de emergência após 2 segundos
            setTimeout(() => {
                showEmergencyContacts();
            }, 2000);
            
        } else {
            throw new Error('Erro no envio do formulário');
        }
        
    } catch (error) {
        console.error('❌ Erro no formulário de emergência:', error);
        showMessage(messageDiv, 
            'Erro ao enviar solicitação. Por favor, tente novamente ou entre em contato pelos números de emergência.', 
            'error'
        );
        
        // Mostra contatos de emergência em caso de erro
        setTimeout(() => {
            showEmergencyContacts();
        }, 1000);
        
    } finally {
        resetButton(submitButton, '<i class="fas fa-paper-plane"></i> Solicitar Ajuda Emergencial');
    }
}

/**
 * Manipula formulário de contato
 */
async function handleContactForm(e) {
    e.preventDefault();
    
    const form = e.target;
    const submitButton = form.querySelector('button[type="submit"]');
    const messageDiv = document.getElementById('mensagem-contato');
    
    // Validação básica
    const validation = validateContactForm(form);
    if (!validation.isValid) {
        showMessage(messageDiv, validation.message, 'error');
        return;
    }

    setButtonLoading(submitButton, 'Enviando...');

    try {
        const formData = new FormData(form);
        formData.append('timestamp', new Date().toISOString());
        formData.append('form_type', 'contact');
        
        const response = await submitForm('https://formspree.io/f/xwpvdejn', formData);

        if (response.success) {
            showMessage(messageDiv, '✅ Mensagem enviada com sucesso! Retornaremos em breve.', 'success');
            form.reset();
            trackUserAction('contact_form_submitted');
        } else {
            throw new Error('Erro no envio do formulário');
        }
        
    } catch (error) {
        console.error('❌ Erro no formulário de contato:', error);
        showMessage(messageDiv, 'Erro ao enviar mensagem. Tente novamente mais tarde.', 'error');
    } finally {
        resetButton(submitButton, '<i class="fas fa-paper-plane"></i> Enviar Mensagem');
    }
}

/**
 * Valida formulário de emergência
 */
function validateEmergencyForm(form) {
    const requiredFields = [
        { id: 'nome', name: 'Nome Completo' },
        { id: 'email', name: 'E-mail' },
        { id: 'telefone', name: 'Telefone' },
        { id: 'local', name: 'Endereço' },
        { id: 'tipo-ajuda', name: 'Tipo de Emergência' },
        { id: 'urgencia', name: 'Nível de Urgência' },
        { id: 'descricao', name: 'Descrição' }
    ];

    for (let field of requiredFields) {
        const element = form.querySelector(`#${field.id}`);
        if (!element || !element.value.trim()) {
            return {
                isValid: false,
                message: `Por favor, preencha o campo: ${field.name}`
            };
        }
    }

    // Validação específica de email
    const email = form.querySelector('#email').value;
    if (!isValidEmail(email)) {
        return {
            isValid: false,
            message: 'Por favor, insira um e-mail válido.'
        };
    }

    // Validação específica de telefone
    const telefone = form.querySelector('#telefone').value;
    if (!isValidPhone(telefone)) {
        return {
            isValid: false,
            message: 'Por favor, insira um telefone válido (com DDD).'
        };
    }

    return { isValid: true };
}

/**
 * Valida formulário de contato
 */
function validateContactForm(form) {
    const requiredFields = [
        { id: 'nome-contato', name: 'Nome' },
        { id: 'email-contato', name: 'E-mail' },
        { id: 'assunto', name: 'Assunto' },
        { id: 'mensagem', name: 'Mensagem' }
    ];

    for (let field of requiredFields) {
        const element = form.querySelector(`#${field.id}`);
        if (!element || !element.value.trim()) {
            return {
                isValid: false,
                message: `Por favor, preencha o campo: ${field.name}`
            };
        }
    }

    // Validação de email
    const email = form.querySelector('#email-contato').value;
    if (!isValidEmail(email)) {
        return {
            isValid: false,
            message: 'Por favor, insira um e-mail válido.'
        };
    }

    return { isValid: true };
}

/**
 * Envia formulário para o servidor
 */
async function submitForm(url, formData) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), appState.settings.requestTimeout);

    try {
        const response = await fetch(url, {
            method: 'POST',
            body: formData,
            signal: controller.signal,
            headers: {
                'Accept': 'application/json'
            }
        });

        clearTimeout(timeoutId);
        
        return {
            success: response.ok,
            status: response.status,
            data: response.ok ? await response.json() : null
        };

    } catch (error) {
        clearTimeout(timeoutId);
        
        if (error.name === 'AbortError') {
            throw new Error('Tempo limite excedido');
        }
        
        throw error;
    }
}

// ===============================================
// SISTEMA DE RECURSOS E KITS
// ===============================================

/**
 * Mostra kit de emergência
 */
function showEmergencyKit() {
    const kitItems = [
        {
            category: '💧 ÁGUA E ALIMENTAÇÃO',
            items: [
                'Água potável (4 litros por pessoa)',
                'Alimentos não perecíveis (3 dias)',
                'Abrelatas manual',
                'Talheres e pratos descartáveis'
            ]
        },
        {
            category: '🔦 ILUMINAÇÃO E COMUNICAÇÃO',
            items: [
                'Lanternas com pilhas extras',
                'Rádio portátil',
                'Carregador portátil (power bank)',
                'Velas e fósforos à prova d\'água'
            ]
        },
        {
            category: '🚑 PRIMEIROS SOCORROS',
            items: [
                'Kit de primeiros socorros',
                'Medicamentos essenciais',
                'Termômetro',
                'Luvas descartáveis'
            ]
        },
        {
            category: '📄 DOCUMENTOS E DINHEIRO',
            items: [
                'Documentos em sacos plásticos',
                'Cópias de documentos importantes',
                'Dinheiro em espécie',
                'Lista de contatos de emergência'
            ]
        },
        {
            category: '🧥 ROUPAS E HIGIENE',
            items: [
                'Roupas de emergência',
                'Calçados resistentes',
                'Itens de higiene pessoal',
                'Cobertor ou saco de dormir'
            ]
        },
        {
            category: '🔧 FERRAMENTAS',
            items: [
                'Ferramentas básicas',
                'Corda resistente',
                'Fita adesiva',
                'Sacos plásticos'
            ]
        }
    ];

    const kitContent = kitItems.map(category => 
        `${category.category}\n${category.items.map(item => `• ${item}`).join('\n')}`
    ).join('\n\n');

    const message = `📋 KIT DE EMERGÊNCIA FAMILIAR\n\n${kitContent}\n\n✅ DICAS IMPORTANTES:\n• Verifique e atualize o kit a cada 6 meses\n• Mantenha em local de fácil acesso\n• Cada membro da família deve saber onde está\n• Considere necessidades especiais (bebês, idosos, pets)\n\n🔄 Revisão recomendada: ${getNextReviewDate()}`;

    alert(message);
    trackUserAction('emergency_kit_viewed');
}

/**
 * Mostra rotas de evacuação
 */
function showEvacuationRoutes() {
    const routes = [
        {
            type: '🏫 PONTOS DE ENCONTRO',
            locations: [
                'Escola Municipal - Ponto Principal',
                'Centro Comunitário - Alternativo',
                'Praça Central - Área Aberta',
                'Quadra Esportiva - Backup'
            ]
        },
        {
            type: '🏥 ASSISTÊNCIA MÉDICA',
            locations: [
                'Hospital Regional - Emergência',
                'UPA 24h - Atendimento Básico',
                'Posto de Saúde Central',
                'Cruz Vermelha Local'
            ]
        },
        {
            type: '⛪ ABRIGOS TEMPORÁRIOS',
            locations: [
                'Igreja Central - Abrigo Principal',
                'Ginásio Municipal',
                'Centro de Convenções',
                'Clube Recreativo'
            ]
        },
        {
            type: '🚌 TRANSPORTE DE EMERGÊNCIA',
            locations: [
                'Terminal Rodoviário',
                'Estação Ferroviária',
                'Aeroporto/Heliponto',
                'Porto/Marina (se aplicável)'
            ]
        }
    ];

    const routeContent = routes.map(route => 
        `${route.type}\n${route.locations.map(loc => `📍 ${loc}`).join('\n')}`
    ).join('\n\n');

    const message = `🗺️ ROTAS DE EVACUAÇÃO E PONTOS SEGUROS\n\n${routeContent}\n\n⚠️ INSTRUÇÕES IMPORTANTES:\n• Sempre siga orientações das autoridades\n• Mantenha documentos e kit de emergência prontos\n• Conheça pelo menos 2 rotas diferentes\n• Pratique as rotas com sua família\n• Em caso de evacuação, não retorne até liberação oficial\n\n📞 Central de Emergência: 199 (Defesa Civil)`;

    alert(message);
    trackUserAction('evacuation_routes_viewed');
}

/**
 * Mostra contatos de emergência
 */
function showEmergencyContacts() {
    const contacts = [
        {
            category: '🚨 EMERGÊNCIAS GERAIS',
            contacts: [
                { name: 'Bombeiros', number: '193', description: 'Incêndios, resgates, emergências' },
                { name: 'SAMU', number: '192', description: 'Emergências médicas' },
                { name: 'Polícia Militar', number: '190', description: 'Segurança pública' },
                { name: 'Polícia Civil', number: '197', description: 'Denúncias e ocorrências' }
            ]
        },
        {
            category: '🛡️ DEFESA CIVIL',
            contacts: [
                { name: 'Defesa Civil', number: '199', description: 'Emergências climáticas' },
                { name: 'Central de Emergência', number: '156', description: 'Prefeitura - emergências' }
            ]
        },
        {
            category: '🏥 SAÚDE E APOIO',
            contacts: [
                { name: 'CVV', number: '188', description: 'Apoio emocional' },
                { name: 'Disque Denúncia', number: '181', description: 'Denúncias anônimas' },
                { name: 'Procon', number: '151', description: 'Defesa do consumidor' }
            ]
        },
        {
            category: '⚡ SERVIÇOS PÚBLICOS',
            contacts: [
                { name: 'Energia Elétrica', number: '116', description: 'Falta de energia' },
                { name: 'Água e Esgoto', number: '115', description: 'Problemas no fornecimento' },
                { name: 'Gás Natural', number: '0800-xxx-xxxx', description: 'Vazamentos de gás' }
            ]
        }
    ];

    const contactContent = contacts.map(category => {
        const categoryContacts = category.contacts.map(contact => 
            `📞 ${contact.name}: ${contact.number}\n   ${contact.description}`
        ).join('\n');
        return `${category.category}\n${categoryContacts}`;
    }).join('\n\n');

    const message = `📞 CONTATOS DE EMERGÊNCIA\n\n${contactContent}\n\n🔴 IMPORTANTE:\n• Mantenha estes números sempre à mão\n• Em situações de risco iminente, ligue IMEDIATAMENTE\n• Tenha informações básicas prontas: nome, endereço, natureza da emergência\n• Mantenha a calma e fale claramente\n\n⚡ Para emergências graves: 193 (Bombeiros) ou 192 (SAMU)`;

    alert(message);
    trackUserAction('emergency_contacts_viewed');
}

/**
 * Função do botão de emergência flutuante
 */
function emergencyCall() {
    const options = [
        '🚒 Bombeiros - 193',
        '🚑 SAMU - 192',
        '👮 Polícia - 190',
        '🛡️ Defesa Civil - 199',
        '📋 Ver todos os contatos'
    ];

    const choice = prompt(`🚨 ACESSO RÁPIDO À EMERGÊNCIA\n\nEscolha uma opção:\n\n${options.map((opt, i) => `${i + 1}. ${opt}`).join('\n')}\n\nDigite o número da opção:`);

    if (choice) {
        const choiceNum = parseInt(choice);
        switch (choiceNum) {
            case 1:
                if (confirm('Ligar para os Bombeiros (193)?')) {
                    window.open('tel:193');
                }
                break;
            case 2:
                if (confirm('Ligar para o SAMU (192)?')) {
                    window.open('tel:192');
                }
                break;
            case 3:
                if (confirm('Ligar para a Polícia (190)?')) {
                    window.open('tel:190');
                }
                break;
            case 4:
                if (confirm('Ligar para a Defesa Civil (199)?')) {
                    window.open('tel:199');
                }
                break;
            case 5:
                showEmergencyContacts();
                break;
            default:
                showEmergencyContacts();
        }
    }

    trackUserAction('emergency_button_used');
}

// ===============================================
// SISTEMA DE CACHE E ARMAZENAMENTO
// ===============================================

/**
 * Obtém dados do cache
 */
function getCachedData(key) {
    if (!appState.cache.has(key)) {
        return null;
    }

    const cached = appState.cache.get(key);
    const now = Date.now();

    if (now - cached.timestamp > appState.settings.cacheTimeout) {
        appState.cache.delete(key);
        return null;
    }

    return cached.data;
}

/**
 * Armazena dados no cache
 */
function setCachedData(key, data) {
    appState.cache.set(key, {
        data,
        timestamp: Date.now()
    });

    // Limita o tamanho do cache
    if (appState.cache.size > 50) {
        const firstKey = appState.cache.keys().next().value;
        appState.cache.delete(firstKey);
    }
}

/**
 * Limpa cache antigo
 */
function cleanupOldCache() {
    const now = Date.now();
    const keysToDelete = [];

    for (let [key, value] of appState.cache.entries()) {
        if (now - value.timestamp > appState.settings.cacheTimeout) {
            keysToDelete.push(key);
        }
    }

    keysToDelete.forEach(key => appState.cache.delete(key));
    
    if (keysToDelete.length > 0) {
        console.log(`🧹 Cache limpo: ${keysToDelete.length} itens removidos`);
    }
}

// ===============================================
// UTILITÁRIOS E HELPERS
// ===============================================

/**
 * Configura botão em estado de carregamento
 */
function setButtonLoading(button, text) {
    if (!button) return;
    
    button.innerHTML = `<i class="fas fa-spinner fa-spin"></i> ${text}`;
    button.disabled = true;
    button.style.cursor = 'not-allowed';
}

/**
 * Restaura botão ao estado normal
 */
function resetButton(button, originalText) {
    if (!button) return;
    
    button.innerHTML = originalText;
    button.disabled = false;
    button.style.cursor = 'pointer';
}

/**
 * Exibe mensagem na interface
 */
function showMessage(container, text, type) {
    if (!container) return;
    
    container.className = `message ${type}`;
    container.innerHTML = `
        <div style="display: flex; align-items: center; gap: 10px;">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-triangle'}"></i>
            <span>${text}</span>
        </div>
    `;
    container.style.display = 'block';
    
    // Auto-hide após 8 segundos
    setTimeout(() => {
        if (container.style.display === 'block') {
            container.style.opacity = '0';
            setTimeout(() => {
                container.style.display = 'none';
                container.style.opacity = '1';
            }, 300);
        }
    }, 8000);
}

/**
 * Mostra notificação toast
 */
function showNotification(message, type = 'info') {
    // Remove notificação existente
    const existing = document.querySelector('.toast-notification');
    if (existing) {
        existing.remove();
    }

    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.innerHTML = `
        <div style="
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'error' ? '#f44336' : type === 'warning' ? '#ff9800' : '#2E7D32'};
            color: white;
            padding: 1em 1.5em;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            z-index: 10000;
            max-width: 300px;
            animation: slideIn 0.3s ease;
        ">
            <i class="fas fa-${type === 'error' ? 'times-circle' : type === 'warning' ? 'exclamation-triangle' : 'info-circle'}"></i>
            ${message}
        </div>
    `;

    document.body.appendChild(toast);

    // Remove após 4 segundos
    setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 4000);
}

/**
 * Mostra erro do sistema
 */
function showSystemError(message) {
    console.error('Sistema:', message);
    showNotification(`Erro do sistema: ${message}`, 'error');
}

/**
 * Valida formato de email
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Valida formato de telefone brasileiro
 */
function isValidPhone(phone) {
    const phoneRegex = /^(?:\+55\s?)?(?:\(?[1-9]{2}\)?\s?)?(?:9\s?)?[0-9]{4}-?[0-9]{4}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
}

/**
 * Carrega dados iniciais da aplicação
 */
function loadInitialData() {
    try {
        // Carrega notícias iniciais
        displayNews(generateNews());
        
        // Detecta geolocalização se disponível
        detectUserLocation();
        
        // Carrega preferências do usuário
        loadUserPreferences();
        
        console.log('📊 Dados iniciais carregados com sucesso');
    } catch (error) {
        console.error('❌ Erro ao carregar dados iniciais:', error);
    }
}

/**
 * Detecta localização do usuário
 */
function detectUserLocation() {
    if (!navigator.geolocation) {
        console.log('🌍 Geolocalização não suportada');
        return;
    }

    const options = {
        enableHighAccuracy: false,
        timeout: 5000,
        maximumAge: 600000 // 10 minutos
    };

    navigator.geolocation.getCurrentPosition(
        position => {
            const { latitude, longitude } = position.coords;
            console.log(`📍 Localização detectada: ${latitude}, ${longitude}`);
            
            // Aqui poderia buscar dados locais automaticamente
            // Por exemplo, clima da cidade mais próxima
            
            trackUserAction('location_detected');
        },
        error => {
            console.log('🚫 Localização não disponível:', error.message);
        },
        options
    );
}

/**
 * Calcula próxima data de revisão do kit
 */
function getNextReviewDate() {
    const nextReview = new Date();
    nextReview.setMonth(nextReview.getMonth() + 6);
    return nextReview.toLocaleDateString('pt-BR');
}

// ===============================================
// MONITORAMENTO DE REDE E STATUS
// ===============================================

/**
 * Configura monitoramento de rede
 */
function setupNetworkMonitoring() {
    window.addEventListener('online', handleOnlineStatus);
    window.addEventListener('offline', handleOfflineStatus);
    
    // Verifica status inicial
    appState.isOnline = navigator.onLine;
    updateNetworkStatus();
}

/**
 * Manipula status online
 */
function handleOnlineStatus() {
    appState.isOnline = true;
    updateNetworkStatus();
    showNotification('Conexão restaurada!', 'info');
    console.log('🌐 Status: Online');
}

/**
 * Manipula status offline
 */
function handleOfflineStatus() {
    appState.isOnline = false;
    updateNetworkStatus();
    showNotification('Sem conexão com a internet', 'warning');
    console.log('📱 Status: Offline');
}

/**
 * Atualiza indicador de status na interface
 */
function updateNetworkStatus() {
    const indicator = document.getElementById('network-status');
    if (indicator) {
        indicator.style.backgroundColor = appState.isOnline ? '#4CAF50' : '#f44336';
        indicator.title = appState.isOnline ? 'Online' : 'Offline';
    }
}

// ===============================================
// ATALHOS DE TECLADO
// ===============================================

/**
 * Configura atalhos de teclado
 */
function setupKeyboardShortcuts() {
    document.addEventListener('keydown', handleKeyboardShortcuts);
}

/**
 * Manipula atalhos de teclado
 */
function handleKeyboardShortcuts(e) {
    // Ctrl/Cmd + K - Foco na busca de clima
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        const climaInput = document.getElementById('alertas-input');
        if (climaInput) {
            climaInput.focus();
            climaInput.select();
        }
    }
    
    // Escape - Fecha menu
    if (e.key === 'Escape') {
        if (appState.menuOpen) {
            closeMenu();
        }
    }
    
    // Alt + E - Contatos de emergência
    if (e.altKey && e.key === 'e') {
        e.preventDefault();
        showEmergencyContacts();
    }
    
    // Alt + K - Kit de emergência
    if (e.altKey && e.key === 'k') {
        e.preventDefault();
        showEmergencyKit();
    }
    
    // Alt + R - Rotas de evacuação
    if (e.altKey && e.key === 'r') {
        e.preventDefault();
        showEvacuationRoutes();
    }
}

// ===============================================
// COMPATIBILIDADE DO NAVEGADOR
// ===============================================

/**
 * Verifica compatibilidade do navegador
 */
function checkBrowserCompatibility() {
    const features = {
        fetch: typeof fetch !== 'undefined',
        localStorage: typeof Storage !== 'undefined',
        geolocation: 'geolocation' in navigator,
        serviceWorker: 'serviceWorker' in navigator,
        notifications: 'Notification' in window
    };

    const unsupported = Object.entries(features)
        .filter(([feature, supported]) => !supported)
        .map(([feature]) => feature);

    if (unsupported.length > 0) {
        console.warn('⚠️ Recursos não suportados:', unsupported);
        
        // Fallbacks para fetch
        if (!features.fetch && typeof XMLHttpRequest !== 'undefined') {
            console.log('📡 Usando XMLHttpRequest como fallback');
        }
    } else {
        console.log('✅ Navegador totalmente compatível');
    }

    return features;
}

// ===============================================
// ANALYTICS E TRACKING
// ===============================================

/**
 * Rastreia ações do usuário (analytics simples)
 */
function trackUserAction(action, label = null) {
    try {
        const data = {
            action,
            label,
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
            url: window.location.href
        };

        // Armazena localmente para análise posterior
        const usage = getStorageData('climatech_usage') || [];
        usage.push(data);

        // Mantém apenas os últimos 100 registros
        if (usage.length > 100) {
            usage.splice(0, usage.length - 100);
        }

        setStorageData('climatech_usage', usage);

        console.log('📊 Ação rastreada:', action, label || '');
    } catch (error) {
        console.warn('⚠️ Erro no tracking:', error);
    }
}

// ===============================================
// GERENCIAMENTO DE PREFERÊNCIAS
// ===============================================

/**
 * Carrega preferências do usuário
 */
function loadUserPreferences() {
    try {
        const preferences = getStorageData('climatech_preferences') || {};
        
        // Aplica preferências carregadas
        if (preferences.lastCity) {
            const input = document.getElementById('alertas-input');
            if (input) {
                input.placeholder = `Última busca: ${preferences.lastCity}`;
            }
        }

        if (preferences.theme) {
            applyTheme(preferences.theme);
        }

        console.log('⚙️ Preferências carregadas:', preferences);
        return preferences;
    } catch (error) {
        console.warn('⚠️ Erro ao carregar preferências:', error);
        return {};
    }
}

/**
 * Salva preferências do usuário
 */
function saveUserPreferences(preferences) {
    try {
        const existing = getStorageData('climatech_preferences') || {};
        const updated = { ...existing, ...preferences };
        
        setStorageData('climatech_preferences', updated);
        console.log('💾 Preferências salvas:', preferences);
    } catch (error) {
        console.warn('⚠️ Erro ao salvar preferências:', error);
    }
}

/**
 * Aplica tema
 */
function applyTheme(theme) {
    if (theme === 'dark') {
        document.body.classList.add('dark-theme');
    } else {
        document.body.classList.remove('dark-theme');
    }
}

// ===============================================
// UTILITÁRIOS DE ARMAZENAMENTO
// ===============================================

/**
 * Obtém dados do localStorage com fallback
 */
function getStorageData(key) {
    try {
        if (typeof Storage === 'undefined') {
            return null;
        }
        
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.warn(`⚠️ Erro ao ler storage [${key}]:`, error);
        return null;
    }
}

/**
 * Define dados no localStorage com fallback
 */
function setStorageData(key, data) {
    try {
        if (typeof Storage === 'undefined') {
            console.warn('⚠️ localStorage não disponível');
            return false;
        }
        
        localStorage.setItem(key, JSON.stringify(data));
        return true;
    } catch (error) {
        console.warn(`⚠️ Erro ao salvar storage [${key}]:`, error);
        return false;
    }
}

/**
 * Remove dados do localStorage
 */
function removeStorageData(key) {
    try {
        if (typeof Storage !== 'undefined') {
            localStorage.removeItem(key);
        }
    } catch (error) {
        console.warn(`⚠️ Erro ao remover storage [${key}]:`, error);
    }
}

// ===============================================
// EVENTOS DO CICLO DE VIDA DA PÁGINA
// ===============================================

/**
 * Manipula evento antes de sair da página
 */
function handleBeforeUnload(e) {
    // Salva cidade atual se houver
    if (appState.currentCity) {
        saveUserPreferences({ 
            lastCity: appState.currentCity,
            lastVisit: new Date().toISOString()
        });
    }

    // Avisa sobre formulários não salvos
    const forms = document.querySelectorAll('form');
    const hasUnsavedData = Array.from(forms).some(form => {
        const inputs = form.querySelectorAll('input, textarea, select');
        return Array.from(inputs).some(input => input.value.trim());
    });

    if (hasUnsavedData) {
        e.preventDefault();
        e.returnValue = 'Existem dados não salvos. Deseja realmente sair?';
        return e.returnValue;
    }
}

/**
 * Manipula visibilidade da página
 */
document.addEventListener('visibilitychange', function() {
    if (document.visibilityState === 'hidden') {
        console.log('👁️ Página oculta - pausando operações');
        // Pausa operações custosas quando a página está oculta
    } else {
        console.log('👁️ Página visível - retomando operações');
        // Retoma operações quando a página volta a ser visível
        cleanupOldCache();
    }
});

// ===============================================
// SERVICE WORKER E PWA
// ===============================================

/**
 * Registra service worker se disponível
 */
function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('🔧 Service Worker registrado:', registration.scope);
            })
            .catch(error => {
                console.log('❌ Erro no Service Worker:', error);
            });
    }
}

// ===============================================
// NOTIFICAÇÕES PUSH
// ===============================================

/**
 * Solicita permissão para notificações
 */
function requestNotificationPermission() {
    if ('Notification' in window) {
        Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
                console.log('🔔 Notificações habilitadas');
                showNotification('Notificações habilitadas!', 'info');
            } else {
                console.log('🔕 Notificações não permitidas');
            }
        });
    }
}

/**
 * Mostra notificação push
 */
function showPushNotification(title, options = {}) {
    if (Notification.permission === 'granted') {
        const notification = new Notification(title, {
            icon: '/favicon.ico',
            badge: '/favicon.ico',
            tag: 'climatech-alert',
            ...options
        });

        notification.onclick = () => {
            window.focus();
            notification.close();
        };

        // Auto-fecha após 10 segundos
        setTimeout(() => notification.close(), 10000);
        
        return notification;
    }
}

// ===============================================
// FUNÇÕES DE LIMPEZA E MANUTENÇÃO
// ===============================================

/**
 * Limpa dados antigos periodicamente
 */
function setupPeriodicCleanup() {
    // Limpa cache a cada hora
    setInterval(cleanupOldCache, 3600000);
    
    // Limpa dados de usage antigos (mais de 30 dias)
    setInterval(() => {
        try {
            const usage = getStorageData('climatech_usage') || [];
            const thirtyDaysAgo = Date.now() - (30 * 24 * 60 * 60 * 1000);
            
            const filteredUsage = usage.filter(item => 
                new Date(item.timestamp).getTime() > thirtyDaysAgo
            );
            
            if (filteredUsage.length !== usage.length) {
                setStorageData('climatech_usage', filteredUsage);
                console.log(`🧹 Dados antigos removidos: ${usage.length - filteredUsage.length} registros`);
            }
        } catch (error) {
            console.warn('⚠️ Erro na limpeza periódica:', error);
        }
    }, 86400000); // A cada 24 horas
}

/**
 * Função de debug para desenvolvedores
 */
function debugClimatech() {
    return {
        version: '1.0.0',
        state: appState,
        cache: Array.from(appState.cache.entries()),
        usage: getStorageData('climatech_usage'),
        preferences: getStorageData('climatech_preferences'),
        features: checkBrowserCompatibility(),
        clearCache: () => {
            appState.cache.clear();
            console.log('🧹 Cache limpo');
        },
        clearStorage: () => {
            removeStorageData('climatech_usage');
            removeStorageData('climatech_preferences');
            console.log('🧹 Storage limpo');
        }
    };
}

// Exporta função de debug para o console global
window.debugClimatech = debugClimatech;

// ===============================================
// INICIALIZAÇÃO FINAL E LOGS
// ===============================================

// Inicia limpeza periódica
setupPeriodicCleanup();

// Registra service worker em produção
if (window.location.protocol === 'https:') {
    registerServiceWorker();
}

// Log de inicialização completa
console.log(`
🌍 ===================================
    CLIMATECH v1.0.0 
    Sistema de Resiliência Climática
    Desenvolvido por: Rafael Del Antonio
===================================

✅ Status: Pronto para uso
🌐 Conexão: ${navigator.onLine ? 'Online' : 'Offline'}
📱 Dispositivo: ${/Mobi|Android/i.test(navigator.userAgent) ? 'Mobile' : 'Desktop'}
🔧 Debug: window.debugClimatech()

Para suporte: delantoniorafael@gmail.com
GitHub: https://github.com/RafaelDawpmin/Climatech
`);

// ===============================================
// EASTER EGGS E DIVERSÃO
// ===============================================

// Konami Code easter egg
let konamiCode = [];
const konami = [38,38,40,40,37,39,37,39,66,65]; // ↑↑↓↓←→←→BA

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.keyCode);
    if (konamiCode.length > konami.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.toString() === konami.toString()) {
        console.log('🎮 KONAMI CODE ATIVADO!');
        showNotification('🎮 Modo Desenvolvedor Ativado!', 'info');
        document.body.style.filter = 'hue-rotate(45deg)';
        
        setTimeout(() => {
            document.body.style.filter = 'none';
        }, 3000);
        
        trackUserAction('konami_code_activated');
    }
});

// Console art
console.log(`
    🌍💚 CLIMATECH 💚🌍
    ╔══════════════════╗
    ║  Bem-vindo(a)!   ║
    ║  Juntos somos    ║
    ║  mais resilientes║
    ╚══════════════════╝
`);

// ===============================================
// EXPORT PARA TESTES (se necessário)
// ===============================================

// Exporta funções principais para testes
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        searchWeather,
        searchRiskAreas,
        searchNews,
        showEmergencyKit,
        showEvacuationRoutes,
        showEmergencyContacts,
        isValidEmail,
        isValidPhone,
        trackUserAction
    };
}/**
 * ===============================================
 * CLIMATECH - SISTEMA DE RESILIÊNCIA CLIMÁTICA
 * Desenvolvido por: Rafael Del Antonio
 * Versão: 1.0.0
 * ===============================================
 */

'use strict';

// ===============================================
// ESTADO GLOBAL DA APLICAÇÃO
// ===============================================

const appState = {
    menuOpen: false,
    currentCity: '',
    lastSearch: null,
    isOnline: navigator.onLine,
    emergencyContacts: {
        bombeiros: '193',
        samu: '192',
        policia: '190',
        defesaCivil: '199',
        emergenciaGeral: '911',
        centralAtendimento: '156'
    },
    apiKeys: {
        openWeather: '8c82fcea5074bdde5d56a56c8df0c123'
    },
    cache: new Map(),
    settings: {
        cacheTimeout: 300000, // 5 minutos
        requestTimeout: 10000, // 10 segundos
        maxRetries: 3
    }
};

// ===============================================
// INICIALIZAÇÃO DA APLICAÇÃO
// ===============================================

/**
 * Inicializa a aplicação quando o DOM está pronto
 */
document.addEventListener('DOMContentLoaded', function() {
    console.log('🌍 Climatech - Iniciando aplicação...');
    
    try {
        initializeApp();
        console.log('✅ Climatech - Aplicação inicializada com sucesso!');
    } catch (error) {
        console.error('❌ Erro na inicialização:', error);
        showSystemError('Erro na inicialização da aplicação');
    }
});

/**
 * Função principal de inicialização
 */
function initializeApp() {
    setupEventListeners();
    setupNavigation();
    setupFormHandlers();
    loadInitialData();
    setupNetworkMonitoring();
    setupKeyboardShortcuts();
    checkBrowserCompatibility();
    
    // Limpa cache antigo na inicialização
    cleanupOldCache();
}

// ===============================================
// CONFIGURAÇÃO DE EVENTOS
// ===============================================

/**
 * Configura todos os event listeners da aplicação
 */
function setupEventListeners() {
    // Menu toggle
    const menuToggle = document.getElementById('menu-toggle');
    const menuLateral = document.getElementById('menu-lateral');
    const overlay = document.getElementById('overlay');
    const title = document.getElementById('climatech-title');

    // Eventos do menu
    [menuToggle, title].forEach(element => {
        if (element) {
            element.addEventListener('click', toggleMenu);
        }
    });

    if (overlay) {
        overlay.addEventListener('click', toggleMenu);
    }

    // Eventos de busca
    setupSearchEvents();

    // Eventos de teclado para busca
    setupKeyboardEvents();

    // Monitoramento de conexão
    window.addEventListener('online', handleOnlineStatus);
    window.addEventListener('offline', handleOfflineStatus);

    // Prevenção de refresh acidental
    window.addEventListener('beforeunload', handleBeforeUnload);
}

/**
 * Configura eventos de busca
 */
function setupSearchEvents() {
    const searchButtons = {
        'alertas-button': searchWeather,
        'risk-search-button': searchRiskAreas,
        'news-button': searchNews
    };

    Object.entries(searchButtons).forEach(([buttonId, handler]) => {
        const button = document.getElementById(buttonId);
        if (button) {
            button.addEventListener('click', handler);
        }
    });
}

/**
 * Configura eventos de teclado
 */
function setupKeyboardEvents() {
    const keyboardEvents = {
        'alertas-input': { key: 'Enter', handler: searchWeather },
        'risk-city-input': { key: 'Enter', handler: searchRiskAreas },
        'news-search': { key: 'Enter', handler: searchNews }
    };

    Object.entries(keyboardEvents).forEach(([inputId, config]) => {
        const input = document.getElementById(inputId);
        if (input) {
            input.addEventListener('keypress', (e) => {
                if (e.key === config.key) {
                    config.handler();
                }
            });
        }
    });
}

// ===============================================
// GERENCIAMENTO DO MENU
// ===============================================

/**
 * Alterna a visibilidade do menu lateral
 */
function toggleMenu() {
    const menuLateral = document.getElementById('menu-lateral');
    const overlay = document.getElementById('overlay');
    
    if (!menuLateral || !overlay) return;
    
    appState.menuOpen = !appState.menuOpen;
    
    if (appState.menuOpen) {
        menuLateral.classList.add('show');
        overlay.classList.add('show');
        document.body.style.overflow = 'hidden';
        
        // Foco no primeiro item do menu para acessibilidade
        const firstMenuItem = menuLateral.querySelector('a');
        if (firstMenuItem) {
            firstMenuItem.focus();
        }
    } else {
        menuLateral.classList.remove('show');
        overlay.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
}

/**
 * Fecha o menu se aberto
 */
function closeMenu() {
    if (appState.menuOpen) {
        toggleMenu();
    }
}

// ===============================================
// NAVEGAÇÃO SUAVE
// ===============================================

/**
 * Configura navegação suave entre seções
 */
function setupNavigation() {
    const menuLinks = document.querySelectorAll('#menu-lateral a[href^="#"]');
    
    menuLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const target = document.querySelector(targetId);
            
            if (target) {
                smoothScrollTo(target);
                closeMenu();
                
                // Analytics simples
                trackUserAction('navigation', targetId.replace('#', ''));
            }
        });
    });
}

/**
 * Scroll suave para elemento
 */
function smoothScrollTo(element) {
    element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
    });
}

// ===============================================
// SISTEMA DE CLIMA (API OPENWEATHER)
// ===============================================

/**
 * Busca informações climáticas
 */
async function searchWeather() {
    const cidade = document.getElementById('alertas-input')?.value?.trim();
    const alertaDiv = document.getElementById('alerta-climatico');
    const button = document.getElementById('alertas-button');

    if (!cidade) {
        showMessage(alertaDiv, 'Por favor, digite o nome de uma cidade.', 'error');
        return;
    }

    if (!appState.isOnline) {
        showMessage(alertaDiv, 'Sem conexão com a internet. Verifique sua rede.', 'error');
        return;
    }

    // Verifica cache
    const cacheKey = `weather_${cidade.toLowerCase()}`;
    const cachedData = getCachedData(cacheKey);
    
    if (cachedData) {
        console.log('📦 Usando dados do cache para:', cidade);
        displayWeatherData(cachedData);
        return;
    }

    setButtonLoading(button, 'Buscando...');
    appState.currentCity = cidade;

    try {
        const data = await fetchWeatherData(cidade);
        
        if (data) {
            // Salva no cache
            setCachedData(cacheKey, data);
            displayWeatherData(data);
            trackUserAction('weather_search', cidade);
        }
    } catch (error) {
        console.error('❌ Erro na busca do clima:', error);
        handleWeatherError(alertaDiv, error);
    } finally {
        resetButton(button, '<i class="fas fa-search"></i> Buscar Clima');
    }
}

/**
 * Busca dados climáticos da API
 */
async function fetchWeatherData(cidade) {
    const apiKey = appState.apiKeys.openWeather;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${apiKey}&lang=pt_br&units=metric`;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), appState.settings.requestTimeout);

    try {
        const response = await fetch(url, {
            signal: controller.signal,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('CITY_NOT_FOUND');
            } else if (response.status === 401) {
                throw new Error('API_KEY_INVALID');
            } else {
                throw new Error(`HTTP_ERROR_${response.status}`);
            }
        }

        const data = await response.json();
        
        if (data.cod !== 200) {
            throw new Error('API_RESPONSE_ERROR');
        }

        return data;

    } catch (error) {
        clearTimeout(timeoutId);
        
        if (error.name === 'AbortError') {
            throw new Error('REQUEST_TIMEOUT');
        }
        
        throw error;
    }
}

/**
 * Exibe dados climáticos na interface
 */
function displayWeatherData(data) {
    const alertaDiv = document.getElementById('alerta-climatico');
    if (!alertaDiv) return;
    
    try {
        const weatherInfo = extractWeatherInfo(data);
        const riskAnalysis = analyzeWeatherRisk(data);
        const htmlContent = generateWeatherHTML(weatherInfo, riskAnalysis);
        
        alertaDiv.innerHTML = htmlContent;
        
        // Adiciona efeito de fade-in
        alertaDiv.style.opacity = '0';
        setTimeout(() => {
            alertaDiv.style.transition = 'opacity 0.3s ease';
            alertaDiv.style.opacity = '1';
        }, 100);
        
    } catch (error) {
        console.error('❌ Erro ao exibir dados climáticos:', error);
        showMessage(alertaDiv, 'Erro ao processar dados climáticos.', 'error');
    }
}

/**
 * Extrai informações relevantes dos dados da API
 */
function extractWeatherInfo(data) {
    const {
        name: cidadeNome,
        sys: { country: pais, sunrise, sunset },
        weather,
        main: { temp, temp_max, temp_min, humidity, pressure, feels_like },
        wind: { speed: vento },
        visibility,
        dt
    } = data;

    return {
        cidadeNome,
        pais,
        descricao: weather[0].description,
        icon: weather[0].icon,
        temp: Math.round(temp),
        tempMax: Math.round(temp_max),
        tempMin: Math.round(temp_min),
        feelsLike: Math.round(feels_like),
        humidity,
        pressure,
        windSpeed: Math.round(vento * 3.6), // Converte m/s para km/h
        visibility: Math.round(visibility / 1000), // Converte metros para km
        sunrise: new Date(sunrise * 1000).toLocaleTimeString('pt-BR'),
        sunset: new Date(sunset * 1000).toLocaleTimeString('pt-BR'),
        lastUpdate: new Date(dt * 1000).toLocaleString('pt-BR')
    };
}

/**
 * Gera HTML para exibição dos dados climáticos
 */
function generateWeatherHTML(weather, riskAnalysis) {
    return `
        <div class="clima-container">
            <div class="clima-header">
                <h3>${weather.cidadeNome}, ${weather.pais}</h3>
                <img src="https://openweathermap.org/img/wn/${weather.icon}@2x.png" 
                     alt="${weather.descricao}" 
                     loading="lazy">
                <p style="font-size: 1.1em; color: #666; text-transform: capitalize; margin-top: 0.5em;">
                    ${weather.descricao}
                </p>
            </div>
            <div class="clima-info">
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1em; margin-bottom: 1.5em;">
                    <div style="text-align: center; padding: 1em; background: rgba(46, 125, 50, 0.1); border-radius: 10px;">
                        <div style="font-size: 2.5em; font-weight: bold; color: #2E7D32;">${weather.temp}°C</div>
                        <div style="color: #666;">Temperatura Atual</div>
                    </div>
                    <div style="text-align: center; padding: 1em; background: rgba(46, 125, 50, 0.1); border-radius: 10px;">
                        <div style="font-size: 1.8em; font-weight: bold; color: #2E7D32;">${weather.feelsLike}°C</div>
                        <div style="color: #666;">Sensação Térmica</div>
                    </div>
                </div>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.5em; font-size: 0.95em;">
                    <p><strong>🌡️ Máxima:</strong> ${weather.tempMax}°C</p>
                    <p><strong>🌡️ Mínima:</strong> ${weather.tempMin}°C</p>
                    <p><strong>💧 Umidade:</strong> ${weather.humidity}%</p>
                    <p><strong>💨 Vento:</strong> ${weather.windSpeed} km/h</p>
                    <p><strong>📊 Pressão:</strong> ${weather.pressure} hPa</p>
                    <p><strong>👁️ Visibilidade:</strong> ${weather.visibility} km</p>
                    <p><strong>🌅 Amanhecer:</strong> ${weather.sunrise}</p>
                    <p><strong>🌇 Pôr do sol:</strong> ${weather.sunset}</p>
                </div>
                
                ${riskAnalysis}
                
                <div style="margin-top: 1.5em; padding: 1em; background: rgba(0, 123, 255, 0.1); border-radius: 8px; text-align: center;">
                    <small style="color: #666;">
                        <i class="fas fa-clock"></i> Última atualização: ${weather.lastUpdate}
                    </small>
                </div>
            </div>
        </div>
    `;
}

/**
 * Analisa riscos climáticos baseado nos dados
 */
function analyzeWeatherRisk(data) {
    const { main, weather, wind } = data;
    const weatherId = weather[0].id;
    const windSpeed = wind.speed * 3.6; // Converte para km/h
    
    let risks = [];
    let riskLevel = 'low';
    
    // Análise de condições climáticas
    if (weatherId >= 200 && weatherId < 300) {
        risks.push('⚡ Tempestades com raios - Evite áreas abertas');
        riskLevel = 'high';
    } else if (weatherId >= 500 && weatherId < 600) {
        risks.push('🌧️ Chuva intensa - Risco de alagamentos');
        riskLevel = 'high';
    } else if (weatherId >= 300 && weatherId < 500) {
        risks.push('🌦️ Precipitação - Atenção redobrada');
        riskLevel = 'medium';
    }
    
    // Análise de vento
    if (windSpeed > 60) {
        risks.push('💨 Ventos muito fortes - Risco de queda de árvores');
        riskLevel = 'high';
    } else if (windSpeed > 40) {
        risks.push('💨 Ventos fortes - Cuidado com objetos soltos');
        riskLevel = riskLevel === 'low' ? 'medium' : riskLevel;
    }
    
    // Análise de temperatura
    if (main.temp > 35) {
        risks.push('🔥 Calor extremo - Mantenha-se hidratado');
        riskLevel = riskLevel === 'low' ? 'medium' : riskLevel;
    } else if (main.temp < 5) {
        risks.push('❄️ Frio intenso - Proteja-se adequadamente');
        riskLevel = riskLevel === 'low' ? 'medium' : riskLevel;
    }
    
    // Análise de umidade
    if (main.humidity > 90) {
        risks.push('💧 Umidade muito alta - Possível formação de neblina');
    }
    
    return generateRiskHTML(risks, riskLevel);
}

/**
 * Gera HTML para exibição de riscos
 */
function generateRiskHTML(risks, riskLevel) {
    if (risks.length === 0) {
        return `
            <div style="margin-top: 1.5em; padding: 1em; background: rgba(76, 175, 80, 0.1); border-left: 4px solid #4CAF50; border-radius: 8px;">
                <strong style="color: #2E7D32;">✅ Condições Favoráveis</strong>
                <p style="margin-top: 0.5em; color: #388E3C;">Não há alertas climáticos para sua região no momento.</p>
            </div>
        `;
    }
    
    const riskColors = {
        low: { bg: 'rgba(255, 193, 7, 0.1)', border: '#FFC107', text: '#F57F17' },
        medium: { bg: 'rgba(255, 152, 0, 0.1)', border: '#FF9800', text: '#E65100' },
        high: { bg: 'rgba(244, 67, 54, 0.1)', border: '#F44336', text: '#C62828' }
    };
    
    const colors = riskColors[riskLevel];
    const riskLabels = {
        low: 'Atenção',
        medium: 'Cuidado',
        high: 'Alerta'
    };
    
    return `
        <div style="margin-top: 1.5em; padding: 1em; background: ${colors.bg}; border-left: 4px solid ${colors.border}; border-radius: 8px;">
            <strong style="color: ${colors.text};">⚠️ ${riskLabels[riskLevel]} - Alertas Identificados</strong>
            <ul style="margin-top: 0.5em; color: ${colors.text}; list-style: none; padding-left: 0;">
                ${risks.map(risk => `<li style="margin-bottom: 0.3em;">• ${risk}</li>`).join('')}
            </ul>
            <p style="margin-top: 0.8em; font-size: 0.9em; color: #666;">
                <i class="fas fa-info-circle"></i> Mantenha-se atento às condições e siga as orientações de segurança.
            </p>
        </div>
    `;
}

/**
 * Trata erros na busca de clima
 */
function handleWeatherError(alertaDiv, error) {
    let errorMessage = 'Erro ao buscar informações climáticas.';
    
    switch (error.message) {
        case 'CITY_NOT_FOUND':
            errorMessage = 'Cidade não encontrada. Verifique a ortografia.';
            break;
        case 'API_KEY_INVALID':
            errorMessage = 'Erro de configuração da API. Tente novamente mais tarde.';
            break;
        case 'REQUEST_TIMEOUT':
            errorMessage = 'Tempo limite excedido. Verifique sua conexão.';
            break;
        default:
            errorMessage = 'Erro de conexão. Verifique sua internet.';
    }
    
    if (alertaDiv) {
        alertaDiv.innerHTML = `
            <div style="text-align: center; color: #d32f2f; padding: 2em;">
                <i class="fas fa-exclamation-triangle" style="font-size: 2em; margin-bottom: 1em;"></i>
                <p><strong>${errorMessage}</strong></p>
                <p style="margin-top: 1em; font-size: 0.9em; color: #666;">
                    Tente novamente em alguns instantes.
                </p>
            </div>
        `;
    }
}

// ===============================================
// SISTEMA DE ÁREAS DE RISCO
// ===============================================

/**
 * Busca áreas de risco por cidade
 */
function searchRiskAreas() {
    const cidade = document.getElementById('risk-city-input')?.value?.trim();
    const container = document.getElementById('risk-areas');
    const button = document.getElementById('risk-search-button');

    if (!cidade) {
        showNotification('Por favor, digite o nome de uma cidade.', 'warning');
        return;
    }

    setButtonLoading(button, 'Buscando...');

    // Simula busca com delay realista
    setTimeout(() => {
        try {
            displayRiskAreas(cidade);
            trackUserAction('risk_search', cidade);
        } catch (error) {
            console.error('❌ Erro na busca de áreas de risco:', error);
            showNotification('Erro ao buscar áreas de risco.', 'error');
        } finally {
            resetButton(button, '<i class="fas fa-map-marked-alt"></i> Buscar Áreas de Risco');
        }
    }, 1500);
}

/**
 * Exibe áreas de risco na interface
 */
function displayRiskAreas(cidade) {
    const container = document.getElementById('risk-areas');
    if (!container) return;
    
    const riskData = generateRiskData(cidade);
    
    const htmlContent = riskData.map(risk => `
        <div class="risk-card" data-risk-type="${risk.type}">
            <h3><i class="${risk.icon}"></i> ${risk.title}</h3>
            <p>${risk.description}</p>
            <div style="margin: 1em 0;">
                <strong>Endereços de Risco:</strong>
                <ul style="margin-top: 0.5em; font-size: 0.9em; list-style: none; padding-left: 1em;">
                    ${risk.locations.map(loc => `<li style="margin-bottom: 0.2em;">📍 ${loc}</li>`).join('')}
                </ul>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 1em;">
                <span class="risk-level ${risk.levelClass}">${risk.level}</span>
                <div style="text-align: right;">
                    <small style="color: #666;">Afeta ~${risk.affectedPeople} pessoas</small>
                    <br>
                    <small style="color: #666;">Última atualização: ${risk.lastUpdate}</small>
                </div>
            </div>
            <div style="margin-top: 1em;">
                <button class="resource-button" onclick="showRiskDetails('${risk.type}')">
                    Ver Detalhes
                </button>
            </div>
        </div>
    `).join('');
    
    container.innerHTML = htmlContent;
    
    // Animação de entrada
    const cards = container.querySelectorAll('.risk-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
            card.style.transition = 'all 0.3s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

/**
 * Gera dados de risco baseados na cidade
 */
function generateRiskData(cidade) {
    const baseRisks = [
        {
            type: 'alagamento',
            title: 'Alagamentos',
            icon: 'fas fa-water',
            description: `Áreas próximas a córregos e rios em ${cidade} com histórico de alagamentos durante chuvas intensas.`,
            locations: [
                'Rua das Flores, Centro',
                'Av. Principal, Bairro Norte',
                'Rua do Comércio, Vila Sul',
                'Ponte Municipal - Área Crítica'
            ],
            level: 'Risco Alto',
            levelClass: 'risk-high',
            affectedPeople: '1.240',
            lastUpdate: '2 dias atrás'
        },
        {
            type: 'deslizamento',
            title: 'Deslizamentos',
            icon: 'fas fa-mountain',
            description: `Encostas e morros em ${cidade} com solo instável, especialmente vulneráveis durante períodos de chuva prolongada.`,
            locations: [
                'Morro do Cruzeiro',
                'Ladeira São José',
                'Rua da Cascata, Alto da Serra',
                'Vila Esperança - Área de Encosta'
            ],
            level: 'Risco Médio',
            levelClass: 'risk-medium',
            affectedPeople: '856',
            lastUpdate: '1 dia atrás'
        },
        {
            type: 'vento',
            title: 'Ventos Fortes',
            icon: 'fas fa-wind',
            description: `Áreas com construções vulneráveis e árvores de grande porte susceptíveis a danos por vendavais em ${cidade}.`,
            locations: [
                'Conjunto Habitacional Norte',
                'Vila Industrial',
                'Bairro Alto',
                'Área Rural - Fazenda São João'
            ],
            level: 'Risco Médio',
            levelClass: 'risk-medium',
            affectedPeople: '923',
            lastUpdate: '3 horas atrás'
        },
        {
            type: 'temperatura',
            title: 'Temperaturas Extremas',
            icon: 'fas fa-thermometer-half',
            description: `Áreas com maior vulnerabilidade a ondas de calor e frio extremo em ${cidade}.`,
            locations: [
                'Centro Urbano - Ilha de Calor',
                'Vila dos Idosos',
                'Acampamento Temporário',
                'Área Industrial'
            ],
            level: 'Risco Baixo',
            levelClass: 'risk-low',
            affectedPeople: '645',
            lastUpdate: '1 semana atrás'
        }
    ];
    
    return baseRisks;
}

/**
 * Mostra detalhes específicos de um tipo de risco
 */
function showRiskDetails(riskType) {
    const riskDetails = {
        alagamento: {
            title: 'Alagamentos - Orientações',
            content: `
                🚨 ANTES DA CHUVA:
                • Limpe calhas e bueiros próximos
                • Tenha kit de emergência preparado
                • Identifique rotas de fuga

                ⚡ DURANTE O ALAGAMENTO:
                • NÃO entre em águas correntes
                • Desligue energia elétrica da casa
                • Procure local mais alto

                ✅ APÓS O ALAGAMENTO:
                • Cuidado com animais peçonhentos
                • Não consuma água ou alimentos contaminados
                • Procure assistência médica se necessário
            `
        },
        deslizamento: {
            title: 'Deslizamentos - Orientações',
            content: `
                🚨 SINAIS DE ALERTA:
                • Rachaduras em paredes e solo
                • Mudança no fluxo d'água
                • Árvores e postes inclinados

                ⚡ AÇÃO IMEDIATA:
                • Saia imediatamente da área
                • Alerte vizinhos e autoridades
                • Não retorne até liberação oficial

                ✅ PREVENÇÃO:
                • Não construa em encostas
                • Não retire vegetação de morros
                • Mantenha drenagem adequada
            `
        },
        vento: {
            title: 'Ventos Fortes - Orientações',
            content: `
                🚨 ANTES DA TEMPESTADE:
                • Fixe objetos soltos
                • Pode árvores próximas
                • Reforce telhados e janelas

                ⚡ DURANTE VENTOS FORTES:
                • Permaneça em local seguro
                • Evite áreas com árvores altas
                • Desligue aparelhos eletrônicos

                ✅ APÓS A TEMPESTADE:
                • Cuidado com fios elétricos
                • Verifique estrutura da casa
                • Comunique danos às autoridades
            `
        },
        temperatura: {
            title: 'Temperaturas Extremas - Orientações',
            content: `
                🌡️ CALOR EXTREMO:
                • Hidrate-se constantemente
                • Evite exposição ao sol
                • Use roupas leves e claras

                ❄️ FRIO EXTREMO:
                • Mantenha-se aquecido
                • Evite exposição prolongada
                • Cuidado com monóxido de carbono

                ✅ GRUPOS DE RISCO:
                • Idosos e crianças precisam atenção especial
                • Monitore pessoas em situação de rua
                • Tenha medicamentos em dia
            `
        }
    };

    const details = riskDetails[riskType];
    if (details) {
        alert(`${details.title}\n\n${details.content}`);
    }
}

// ===============================================
// SISTEMA DE NOTÍCIAS
// ===============================================
