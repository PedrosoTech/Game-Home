document.addEventListener('DOMContentLoaded', function () {
    const nextButtons = document.querySelectorAll('.next-btn');
    const levels = document.querySelectorAll('.level-content');

    // Função para avançar o nível
    function goToNextLevel(nextLevelId) {
        levels.forEach(level => {
            level.classList.remove('active');
        });
        const nextLevel = document.getElementById(nextLevelId);
        nextLevel.classList.add('active');
    }

    // Função para enviar dados via AJAX para o PHP
    function checkUserOrEmail(data, callback) {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'check_user.php', true);  // Envia os dados para check_user.php
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

        xhr.onload = function () {
            if (xhr.status === 200) {
                try {
                    const response = JSON.parse(xhr.responseText);  // Recebe a resposta do PHP
                    console.log('Resposta do servidor:', response);  // Exibe a resposta no console para depuração
                    callback(response.status);  // Executa o callback com o resultado (username, email ou available)
                } catch (e) {
                    console.error('Erro ao processar a resposta:', e);  // Se ocorrer erro ao processar TXT
                }
            } else {
                console.error('Erro na requisição:', xhr.status);  // Exibe erro da requisição no console
            }
        };

        // Envia os dados do formulário (nome de usuário ou email) para o servidor
        xhr.send(`username=${data.username}&email=${data.email}`);
    }

    // Adicionar evento para os botões de "Próximo"
    nextButtons.forEach(button => {
        button.addEventListener('click', function () {
            const nextLevelId = this.getAttribute('data-next');

            if (nextLevelId === 'level-2') {
                // Verifica o nome de usuário ao avançar para o Nível 2
                const username = document.getElementById('username').value;

                if (username === "") {
                    document.getElementById('username-error').innerText = 'Por favor, preencha o nome de usuário.';
                    return;
                }

                // Verifica se o nome de usuário já existe
                checkUserOrEmail({ username: username, email: '' }, function (result) {
                    if (result === 'username') {
                        document.getElementById('username-error').innerText = 'Este nome de usuário já existe.';
                    } else {
                        goToNextLevel(nextLevelId);
                    }
                });

            } else if (nextLevelId === 'level-3') {
                // Verifica o email ao avançar para o Nível 3
                const email = document.getElementById('email').value;

                if (email === "") {
                    document.getElementById('email-error').innerText = 'Por favor, preencha o email.';
                    return;
                }

                // Verifica se o email já existe
                checkUserOrEmail({ username: '', email: email }, function (result) {
                    if (result === 'email') {
                        document.getElementById('email-error').innerText = 'Este email já existe.';
                    } else {
                        goToNextLevel(nextLevelId);
                    }
                });
            } else {
                // Se for o último nível, só avança
                goToNextLevel(nextLevelId);
            }
        });
    });
});
