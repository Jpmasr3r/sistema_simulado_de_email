import React, { useState } from "react";
import ReactDOM from "react-dom";

class User {
    private email: string = "";
    private senha: string = "";

    constructor(email: string, senha: string) {
        this.setEmail(email)
        this.setSenha(senha);
    }

    getFormData(): FormData {
        const formData = new FormData();
        formData.append("email", this.getEmail());
        formData.append("senha", this.getSenha());
        return formData;
    }

    //getters
    getEmail(): string {
        return this.email;
    }

    getSenha(): string {
        return this.senha;
    }

    //setters
    private setEmail(email: string): void {
        this.email = email;
    }

    private setSenha(senha: string): void {
        this.senha = senha;
    }
}

const App: React.FC = () => {
    const [email, setEmail] = useState<string>("");
    const [senha, setSenha] = useState<string>("");
    const [error, setError] = useState<string>("");

    async function logar() {
        const user = new User(email, senha);

        const response = await fetch(`/src/php/login.php`, {
            method: "POST",
            body: user.getFormData(),
        }).then((res) => res.json());

        if (!response.error) {
            location.href = "/public/main.php";
        } else {
            setError(response.status);
        }
    }

    return (
        <div>
            <input
                placeholder="Email"
                onChange={(e) => {
                    setEmail(e.target.value);
                }}
            ></input>

            <input
                placeholder="Senha"
                type="password"
                onChange={(e) => {
                    setSenha(e.target.value);
                }}
            ></input>

            <label>{error}</label>

            <button onClick={logar}>Logar</button>

            <button
                onClick={() => {
                    location.href = "/public/createAccount.php";
                }}
            >
                Não possui conta? Crie uma!
            </button>
        </div>
    );
};

ReactDOM.render(<App></App>, document.body);
