<?php
	session_start();
	require_once '../Models/Usuario.php';
?>
<!DOCTYPE html>
<html>
<head>
	<title>Final</title>
	<meta charset="utf-8">
</head>
<body>
	<p><?php echo $_SESSION['mensaje']; ?></p>
</body>
</html>