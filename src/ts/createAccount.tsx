import React, { useState } from "react";
import ReactDOM from "react-dom";

class User {
    private nome: string = "";
    private email: string = "";
    private senha: string = "";

    constructor(nome: string, email: string, senha: string) {
        this.setEmail(email);
        this.setSenha(senha);
        this.setNome(nome)
    }

    getFormData(): FormData {
        const formData = new FormData();
        formData.append("nome", this.nome);
        formData.append("email", this.email);
        formData.append("senha", this.senha);
        return formData;
    }

    //getters
    getNome(): string {
        return this.nome;
    }

    getEmail(): string {
        return this.email;
    }

    getSenha(): string {
        return this.senha;
    }

    //setters
    private setNome(nome:string): void{
        this.nome = nome;
    }

    private setEmail(email:string): void{
        this.email = email;
    }

    private setSenha(senha:string): void{
        this.senha = senha;
    }
}

const App: React.FC = () => {
    const [nome, setNome] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [senha, setSenha] = useState<string>("");
    const [error, setError] = useState<string>("");

    async function criarConta() {
        let user = new User(nome, email, senha);
        if (user.getNome().trim() !== "" && user.getEmail().trim() !== "" && user.getSenha().trim() !== "") {
            setError("");

            let reponse = await fetch("/src/php/createAccount.php", {
                method: "POST",
                body: user.getFormData()
            }
            ).then(res => res.json());

            if(reponse.error) {
                setError(reponse.status);
            }else {
                location.href = "/public/main.php";
            }
        } else {
            setError("Faltam informações");
        }
    }

    return (
        <div>
            <input placeholder="Nome" onChange={e => { setNome(e.target.value) }}></input>
            <input placeholder="Email" onChange={e => { setEmail(e.target.value) }}></input>
            <input placeholder="Senha" onChange={e => { setSenha(e.target.value) }}></input>
            <label>{error}</label>
            <button onClick={criarConta}>Criar conta</button>
        </div>
    );
}

ReactDOM.render(<App></App>, document.body);