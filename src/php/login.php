<?php

require_once "connection.php";
session_start();

try {
    $user = [
        "email" => $_POST["email"],
        "senha" => $_POST["senha"]
    ];

    $sql = "SELECT email,senha FROM user WHERE email = :email";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(":email", $user["email"]);
    $stmt->execute();
    $result = $stmt->fetch();

    if ($result && password_verify($user["senha"],$result["senha"])) {
        $output = [
            "status" => "Sucesso no login",
            "error" => false
        ];
        $_SESSION["user"] = [
            "email" => $user["email"]
        ];
        echo json_encode($output);
    } else {
        $output = [
            "status" => "Login falho informações incorretas",
            "error" => true
        ];
        echo json_encode($output);
    }
} catch (Error $error) {
    $output = [
        "status" => "Error : " . $error->getMessage()
    ];
    echo json_encode($output);
}
