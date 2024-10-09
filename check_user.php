<?php
// Função para verificar se o nome de usuário ou email já existem
function checkUserExists($username, $email) {
    $file = fopen("users.txt", "r");  // Abre o arquivo para leitura

    if ($file) {
        while (($line = fgets($file)) !== false) {
            // Verifica se a linha contém o nome de usuário ou o email
            if (!empty($username) && strpos($line, "Nome de Usuário: $username") !== false) {
                fclose($file);  // Fecha o arquivo antes de retornar
                return 'username';  // Se o nome de usuário existir, retorna 'username'
            } elseif (!empty($email) && strpos($line, "E-mail: $email") !== false) {
                fclose($file);  // Fecha o arquivo antes de retornar
                return 'email';  // Se o email existir, retorna 'email'
            }
        }
        fclose($file);  // Fecha o arquivo após a leitura completa
    }
    return 'available';  // Se não encontrar, retorna 'available'
}

// Verifica se foi enviado um nome de usuário ou email para verificação
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = htmlspecialchars($_POST['username']);
    $email = htmlspecialchars($_POST['email']);

    // Chama a função para verificar se o nome de usuário ou email já existem
    $result = checkUserExists($username, $email);

    // Adicionando depuração no PHP
    echo json_encode(array('status' => $result, 'debug' => ['username' => $username, 'email' => $email]));
}
?>