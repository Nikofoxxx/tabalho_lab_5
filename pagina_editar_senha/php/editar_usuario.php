<?php
$host="localhost";
$user="root";
$pass="";
$banco="payroll_database";

$conexao = mysqli_connect($host, $user, $pass) or die(mysql_error());
mysqli_select_db($conexao,$banco) or die(mysql_error());


$id=$_POST['id'];
$login=$_POST['login'];
$senha=$_POST['senha'];


$sql = mysqli_query ($conexao,"UPDATE usuarios SET login='$login', senha='$senha' WHERE id='$id'") or die(mysql_error());

?>