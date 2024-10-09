<?php
// Inclui o arquivo que contém a função checkUserExists
include('check_user.php');

// Verifica se o formulário foi enviado
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Coletar os dados do formulário
    $username = htmlspecialchars($_POST['username']);
    $email = htmlspecialchars($_POST['email']);
    $password = htmlspecialchars($_POST['password']);
    
    // Verifica se o nome de usuário ou email já existem
    $result = checkUserExists($username, $email);
    
    if ($result == 'available') {
        // Se o nome de usuário e email estiverem disponíveis, salvar os dados no arquivo
        $file = fopen("users.txt", "a");  // Abre o arquivo para anexar os dados
        $data = "Nome de Usuário: $username, E-mail: $email, Senha: $password\n";
        fwrite($file, $data);  // Escreve os dados no arquivo
        fclose($file);  // Fecha o arquivo
        
        // Redireciona para a página de sucesso
        header('Location: success.html');
        exit();
    } else {
        // Se o nome de usuário ou email já existir, exibe uma mensagem de erro
        echo "<script>alert('Erro: Nome de usuário ou email já existe.'); window.location.href = 'index.html';</script>";
        exit();  // Encerra o script
    }
} else {
    // Se o método não for POST, redirecionar para a página principal
    header("Location: index.html");
    exit();
}
?>
