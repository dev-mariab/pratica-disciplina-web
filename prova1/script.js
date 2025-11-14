let lista = document.getElementById("lista");
let total = document.getElementById("total");

function calcularTotal() {
    const itens = lista.getElementsByTagName("li");
}

document.getElementById("adicionar").addEventListener("click", function () {
    const nomeInput = document.getElementById("descricao");
    const quantidadeInput = document.getElementById("categorias");
    const precoInput = document.getElementById("valor");

    const nome = nomeInput.value.trim();
    const quantidade = parseInt(quantidadeInput.value);
    const preco = parseFloat(precoInput.value);


    const subtotal = quantidade * preco;
    const li = document.createElement("li");

    li.innerText = `${descricao} + ${categorias} + R$${valor}`;
    li.dataset.valor = subtotal;
    li.style.color = "green";


    lista.appendChild(li);

    nomeInput.value = "";
    quantidadeInput.value = "";
    precoInput.value = "";
});
