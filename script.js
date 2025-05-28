window.onload = function () {
    // Seleção dos elementos
    const title = document.getElementById('climatech-title');
    const menuLateral = document.getElementById('menu-lateral');
    const alertaDiv = document.getElementById('alerta-climatico');
    const alertasInput = document.getElementById('alertas-input');
    const alertasButton = document.getElementById('alertas-button');
    const formAjuda = document.querySelector('#formAjuda');
    const mensagemSucesso = document.getElementById('mensagem-sucesso');

    // Função para alternar a visibilidade do menu lateral
    title.addEventListener('click', () => {
        menuLateral.classList.toggle('show'); // Alterna a classe 'show' no menu
    });

    // Função para enviar o pedido de ajuda
    formAjuda.addEventListener('submit', function (e) {
        e.preventDefault();

        // Coletando os dados do formulário de ajuda
        const nome = document.getElementById('nome').value.trim();
        const email = document.getElementById('email').value.trim();
        const local = document.getElementById('local').value.trim();
        const numeroCasa = document.getElementById('numero-casa').value.trim();
        const tipoAjuda = document.getElementById('tipo-ajuda').value.trim();
        const descricao = document.getElementById('descricao').value.trim();

        // Validando os campos
        if (!nome || !email || !local || !numeroCasa || !tipoAjuda || !descricao) {
            mensagemSucesso.textContent = "Por favor, preencha todos os campos.";
            mensagemSucesso.style.color = 'red';
            mensagemSucesso.style.display = 'block';
            setTimeout(() => mensagemSucesso.style.display = 'none', 5000);
            return; // Impede o envio caso algum campo esteja vazio
        }

        // Organizando os dados em um objeto para envio via Formspree
        const formData = new FormData(formAjuda);
        
        // Envio via Formspree (usando o endpoint específico do formulário)
        fetch("https://formspree.io/f/xwpvdejn", {
            method: "POST",
            body: formData
        })
        .then(function (response) {
            if (response.ok) {
                mensagemSucesso.textContent = "Seu pedido de ajuda foi enviado com sucesso! Em breve entraremos em contato.";
                mensagemSucesso.style.color = 'green'; // Mensagem de sucesso em verde
                mensagemSucesso.style.display = 'block';
                formAjuda.reset(); // Limpa o formulário
                setTimeout(() => mensagemSucesso.style.display = 'none', 5000);
            } else {
                mensagemSucesso.textContent = "Erro ao enviar pedido de ajuda. Tente novamente.";
                mensagemSucesso.style.color = 'red'; // Mensagem de erro em vermelho
                mensagemSucesso.style.display = 'block';
                setTimeout(() => mensagemSucesso.style.display = 'none', 5000);
            }
        })
        .catch(function (error) {
            console.error("Erro ao enviar e-mail:", error); // Log do erro no console
            mensagemSucesso.textContent = "Erro ao enviar pedido de ajuda. Tente novamente.";
            mensagemSucesso.style.color = 'red'; // Mensagem de erro em vermelho
            mensagemSucesso.style.display = 'block';
            setTimeout(() => mensagemSucesso.style.display = 'none', 5000);
        });
    });

    // Função para buscar o clima utilizando a API OpenWeather
    function buscarClima(cidade) {
        const apiKey = '8c82fcea5074bdde5d56a56c8df0c123'; // Sua chave da API
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${apiKey}&lang=pt_br&units=metric`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data.cod === 200) {
                    const clima = data.weather[0].description;
                    const temperatura = data.main.temp;
                    const tempMax = data.main.temp_max;
                    const tempMin = data.main.temp_min;
                    const umidade = data.main.humidity;
                    const vento = data.wind.speed;
                    const cidadeNome = data.name;
                    const pais = data.sys.country;
                    const icon = data.weather[0].icon;
                    const horaAmanhecer = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
                    const horaPorDoSol = new Date(data.sys.sunset * 1000).toLocaleTimeString();
                    const pressao = data.main.pressure;

                    // Exibe as informações completas sobre o clima
                    alertaDiv.innerHTML = `
                        <div class="clima-container">
                            <div class="clima-header">
                                <h2>Clima em ${cidadeNome}, ${pais}</h2>
                                <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="Ícone do clima">
                            </div>
                            <div class="clima-info">
                                <div class="clima-detalhes">
                                    <p><strong>Clima:</strong> ${clima}</p>
                                    <p><strong>Temperatura:</strong> ${temperatura}°C</p>
                                    <p><strong>Máxima:</strong> ${tempMax}°C | <strong>Mínima:</strong> ${tempMin}°C</p>
                                    <p><strong>Umidade:</strong> ${umidade}%</p>
                                    <p><strong>Vento:</strong> ${vento} km/h</p>
                                    <p><strong>Pressão:</strong> ${pressao} hPa</p>
                                    <p><strong>Amanhecer:</strong> ${horaAmanhecer}</p>
                                    <p><strong>Pôr do sol:</strong> ${horaPorDoSol}</p>
                                </div>
                            </div>
                        </div>
                    `;
                } else {
                    alertaDiv.innerHTML = `<p>Não foi possível obter as informações climáticas. Tente novamente mais tarde.</p>`;
                }
            })
            .catch(err => {
                alertaDiv.innerHTML = `<p>Erro ao buscar informações climáticas. Verifique sua conexão ou tente novamente mais tarde.</p>`;
            });
    }

    // Evento de clique no botão para buscar clima
    alertasButton.addEventListener('click', function () {
        const cidade = alertasInput.value.trim();
        if (cidade) {
            buscarClima(cidade);
        } else {
            alertaDiv.innerHTML = `<p>Por favor, insira o nome de uma cidade.</p>`;
        }
    });
};
