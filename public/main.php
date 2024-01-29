<?php
session_start();
if(!$_SESSION["user"]) {
    header("Location: login.php");
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="./dist/main.js" async></script>
    <title>Main</title>
</head>

<body>
</body>

</html>