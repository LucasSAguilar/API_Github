"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const bttPesquisa = document.querySelector(".btt_pesquisa");
const inputUsuario = document.querySelector(".input_pesquisar_usuario");
const nome = document.querySelector(".nome_pessoa");
const imagem = document.querySelector(".imagem_perfil");
const descricao = document.querySelector(".descricao_usuario");
const seguidores = document.querySelector(".seguidores");
const contato = document.querySelector(".contato");
const bttAcessarPerfil = document.querySelector(".btt_acessarPerfil");
if (bttPesquisa && inputUsuario) {
    bttPesquisa.addEventListener("click", () => {
        procurarUsuario(inputUsuario.value);
    });
}
function procurarUsuario(username) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(`https://api.github.com/users/${username}`, {
                headers: {
                    Accept: "application/vnd.github+json"
                }
            });
            if (!response.ok) {
                throw new Error("Erro ao buscar usuário");
            }
            const data = yield response.json();
            definirUsuario(data);
        }
        catch (err) {
            console.error(`Ocorreu um erro: ${err}`);
        }
    });
}
function definirUsuario(data) {
    if (nome && data.name) {
        nome.innerText = `Nome: ${data.name}`;
    }
    if (imagem && data.avatar_url) {
        imagem.src = data.avatar_url;
        imagem.alt = "Imagem de perfil do usuário";
    }
    if (descricao && data.bio) {
        descricao.innerText = `Bio: ${data.bio}`;
    }
    if (seguidores && data.followers) {
        seguidores.innerText = `Seguidores: ${data.followers}`;
    }
    if (contato && data.email) {
        contato.innerText = `Email: ${data.email}`;
    }
    if (bttAcessarPerfil && data.html_url) {
        bttAcessarPerfil.href = data.html_url;
    }
}
