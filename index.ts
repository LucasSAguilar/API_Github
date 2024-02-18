const procurarUsuario = (username: string)=>{

const procurarUser = fetch(`https://api.github.com/users/${username}`, {
    headers: {
        Accept: "application/vnd.github+json"
    }
})
.then(response => {
    if (!response.ok) {
        throw new Error("Erro ao buscar usuário");
    }
    return response.json();
})
.then(data => {
    console.log(data);
})
.catch(err => {
    console.error(`Ocorreu um erro: ${err}`);
});
}

procurarUsuario("lucassaguilar")