<?php 
$host="localhost";
$user="root";
$pass="";
$banco="payroll_database";

$conexao = mysqli_connect($host, $user, $pass) or die(mysql_error());
mysqli_select_db($conexao,$banco) or die(mysql_error());

$array = array();

$sql = 'SELECT nome FROM funcionarios ORDER BY nome ASC';

$result = mysqli_query($conexao, $sql );

while ($row = mysqli_fetch_array($result)) {
	$array[]= array('nome'=> $row['nome']);
}

echo json_encode($array);

?>



