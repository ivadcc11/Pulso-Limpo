<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
include('conexao.php');


// Verifica se o formulário foi enviado
if ($_SERVER["REQUEST_METHOD"] == "POST") {

  // Sanitiza os dados recebidos
  $nome = htmlspecialchars($_POST['name']);
  $telefone = htmlspecialchars($_POST['phone']);
  $email = htmlspecialchars($_POST['email']);
  $idade = intval($_POST['age']);
  $substancia = htmlspecialchars($_POST['substance']);
  $tempo_uso = htmlspecialchars($_POST['duration']);
  $cidade = htmlspecialchars($_POST['city']);
  $urgencia = htmlspecialchars($_POST['urgency']);
  $mensagem = htmlspecialchars($_POST['message']);

  // Prepara o SQL
  $sql = "INSERT INTO solicitacoes 
          (nome, telefone, email, idade, substancia, tempo_uso, cidade, urgencia, mensagem)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";

  $stmt = $conn->prepare($sql);
  $stmt->bind_param("sssisssss", $nome, $telefone, $email, $idade, $substancia, $tempo_uso, $cidade, $urgencia, $mensagem);

  if ($stmt->execute()) {
    echo "<h3>✅ Solicitação enviada com sucesso!</h3>";
  } else {
    echo "<h3>❌ Erro ao enviar: " . $stmt->error . "</h3>";
  }

  $stmt->close();
  $conn->close();
}
?>
