const bttPesquisa: HTMLButtonElement | null = document.querySelector(".btt_pesquisa");
const inputUsuario: HTMLInputElement | null = document.querySelector(".input_pesquisar_usuario");
const nome: HTMLParagraphElement | null = document.querySelector(".nome_pessoa");
const imagem: HTMLImageElement | null = document.querySelector(".imagem_perfil");
const descricao: HTMLParagraphElement | null = document.querySelector(".descricao_usuario");
const seguidores: HTMLParagraphElement | null = document.querySelector(".seguidores");
const contato: HTMLParagraphElement | null = document.querySelector(".contato");

if (bttPesquisa && inputUsuario) {
    bttPesquisa.addEventListener("click", () => {
        procurarUsuario(inputUsuario.value)
    })
}

async function procurarUsuario(username: string) {
    try {
        const response = await fetch(`https://api.github.com/users/${username}`, {
            headers: {
                Accept: "application/vnd.github+json"
            }
        });

        if (!response.ok) {
            throw new Error("Erro ao buscar usuário");
        }

        const data = await response.json();
        definirUsuario(data);
    } catch (err) {
        console.error(`Ocorreu um erro: ${err}`);
    }
}

function definirUsuario(data: { name: string | null; avatar_url: string | null; bio: string | null; followers: number | null; email: string | null }) {
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
}
