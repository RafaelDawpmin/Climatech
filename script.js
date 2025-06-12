window.onload = function () {
    const title = document.getElementById('climatech-title');
    const menuLateral = document.getElementById('menu-lateral');
    const alertaDiv = document.getElementById('alerta-climatico');
    const alertasInput = document.getElementById('alertas-input');
    const alertasButton = document.getElementById('alertas-button');
    const formAjuda = document.querySelector('#formAjuda');
    const mensagemSucesso = document.getElementById('mensagem-sucesso');

    function exibirMensagem(texto, cor = 'red', tempo = 5000) {
        mensagemSucesso.textContent = texto;
        mensagemSucesso.style.color = cor;
        mensagemSucesso.style.display = 'block';
        setTimeout(() => mensagemSucesso.style.display = 'none', tempo);
    }

    title.addEventListener('click', () => {
        menuLateral.classList.toggle('show');
    });

    formAjuda.addEventListener('submit', function (e) {
        e.preventDefault();

        const campos = ['nome', 'email', 'local', 'numero-casa', 'tipo-ajuda', 'descricao'];
        const dados = campos.reduce((acc, id) => {
            acc[id] = document.getElementById(id).value.trim();
            return acc;
        }, {});

        const camposVazios = Object.values(dados).some(valor => !valor);

        if (camposVazios) {
            exibirMensagem("Por favor, preencha todos os campos.");
            return;
        }

        const formData = new FormData(formAjuda);

        fetch("https://formspree.io/f/xwpvdejn", {
            method: "POST",
            body: formData
        })
        .then(response => {
            if (response.ok) {
                exibirMensagem("Seu pedido de ajuda foi enviado com sucesso! Em breve entraremos em contato.", 'green');
                formAjuda.reset();
            } else {
                exibirMensagem("Erro ao enviar pedido de ajuda. Tente novamente.");
            }
        })
        .catch(error => {
            console.error("Erro ao enviar formulário:", error);
            exibirMensagem("Erro ao enviar pedido de ajuda. Verifique sua conexão.");
        });
    });

    function buscarClima(cidade) {
        const apiKey = '8c82fcea5074bdde5d56a56c8df0c123';
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${apiKey}&lang=pt_br&units=metric`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data.cod !== 200) {
                    alertaDiv.innerHTML = `<p>Não foi possível obter as informações climáticas. Verifique o nome da cidade.</p>`;
                    return;
                }

                const {
                    name: cidadeNome,
                    sys: { country: pais, sunrise, sunset },
                    weather,
                    main: { temp, temp_max, temp_min, humidity, pressure },
                    wind: { speed: vento }
                } = data;

                const descricao = weather[0].description;
                const icon = weather[0].icon;
                const horaAmanhecer = new Date(sunrise * 1000).toLocaleTimeString();
                const horaPorDoSol = new Date(sunset * 1000).toLocaleTimeString();

                alertaDiv.innerHTML = `
                    <div class="clima-container">
                        <div class="clima-header">
                            <h2>Clima em ${cidadeNome}, ${pais}</h2>
                            <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="Ícone do clima">
                        </div>
                        <div class="clima-info">
                            <div class="clima-detalhes">
                                <p><strong>Clima:</strong> ${descricao}</p>
                                <p><strong>Temperatura:</strong> ${temp}°C</p>
                                <p><strong>Máxima:</strong> ${temp_max}°C | <strong>Mínima:</strong> ${temp_min}°C</p>
                                <p><strong>Umidade:</strong> ${humidity}%</p>
                                <p><strong>Vento:</strong> ${vento} km/h</p>
                                <p><strong>Pressão:</strong> ${pressure} hPa</p>
                                <p><strong>Amanhecer:</strong> ${horaAmanhecer}</p>
                                <p><strong>Pôr do sol:</strong> ${horaPorDoSol}</p>
                            </div>
                        </div>
                    </div>
                `;
            })
            .catch(error => {
                console.error("Erro ao buscar clima:", error);
                alertaDiv.innerHTML = `<p>Erro ao buscar informações climáticas. Verifique sua conexão.</p>`;
            });
    }

    alertasButton.addEventListener('click', function () {
        const cidade = alertasInput.value.trim();
        if (cidade) {
            buscarClima(cidade);
        } else {
            alertaDiv.innerHTML = `<p>Por favor, insira o nome de uma cidade.</p>`;
        }
    });
};
