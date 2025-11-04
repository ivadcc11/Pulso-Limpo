<?php
include('conexao.php');

if ($conn) {
  echo "✅ Conectado com sucesso ao banco de dados!";
} else {
  echo "❌ Falha na conexão.";
}
?>
