<?php

require_once "connection.php";
session_start();

$newUser = [
    "nome" => $_POST["nome"],
    "email" => $_POST["email"],
    "senha" => $_POST["senha"]
];

function is_email($email) {
    return filter_var($email,FILTER_VALIDATE_EMAIL);
}

if (strlen($_POST["senha"]) < 8) {
    $output = [
        "status" => "Senha muito curta. Mínimo 8 caracteres",
        "error" => true
    ];
    echo json_encode($output);
    exit();
}

if(is_email($newUser["email"])) {
    try {
        $sql = "SELECT email FROM user WHERE email = :email OR nome = :nome";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(":email",$newUser["email"]);
        $stmt->bindParam(":nome",$newUser["nome"]);
        $stmt->execute();
        $result = $stmt->fetch();

        if($result) {
            $output = [
                "status" => "O usuario fornecido já foi cadastrado",
                "error" => true
            ];
            echo json_encode($output);
            exit();
        }
    } catch (Error $error) {
        $output = [
            "status" => "Error:" . $error->getMessage(),
            "error" => true
        ];
        echo json_encode($output);
        exit();
    }

    try {
        $sql = "INSERT INTO user(nome,email,senha) VALUES (:nome,:email,:senha)";
        $stmt = $conn->prepare($sql);
        $stmt->execute($newUser);

        $_SESSION["user"] = [
            "email" => $newUser["email"]
        ];

        $output = [
            "status" => "Sucesso em criar a conta",
            "error" => false
        ];
        echo json_encode($output);

    } catch (Error $error) {
        $output = [
            "status" => "Error:" . $error->getMessage(),
            "error" => true
        ];
        echo json_encode($output);
        exit();
    }
}else {
    $output = [
        "status" => "O email fornecido não possui o formato de um email",
        "error" => true
    ];
    echo json_encode($output);
    exit();
}
