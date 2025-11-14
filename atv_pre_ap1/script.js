let lista = document.getElementById("lista");
let totalSpan = document.getElementById("total");

function calcularTotal() {
    const itens = lista.getElementsByTagName("li");
    let total = 0;

    for (let i = 0; i < itens.length; i++) {
        const valor = parseFloat(itens[i].dataset.valor);
        if (!isNaN(valor)) {
            total += valor;
        }
    }

    totalSpan.innerText = `Total: R$${total.toFixed(2).replace(".", ",")}`;
}

document.getElementById("adicionar").addEventListener("click", function () {
    const nomeInput = document.getElementById("nome");
    const quantidadeInput = document.getElementById("quantidade");
    const precoInput = document.getElementById("preco");

    const nome = nomeInput.value.trim();
    const quantidade = parseInt(quantidadeInput.value);
    const preco = parseFloat(precoInput.value);

    if (!nome || isNaN(quantidade) || isNaN(preco) || quantidade <= 0 || preco <= 0) {
        alert("Preencha todos os campos com valores válidos.");
        return;
    }

    const subtotal = quantidade * preco;
    const li = document.createElement("li");

    li.innerText = `${nome} - ${quantidade} x R$${preco.toFixed(2)} = R$${subtotal.toFixed(2)}`;
    li.dataset.valor = subtotal;
    li.style.color = "green";

    li.addEventListener("click", function () {
        lista.removeChild(li);
    });

    lista.appendChild(li);

    nomeInput.value = "";
    quantidadeInput.value = "";
    precoInput.value = "";
});

document.getElementById("calcular").addEventListener("click", function () {
    calcularTotal();
});

document.getElementById("limpar").addEventListener("click", function () {
    lista.innerHTML = "";
    totalSpan.innerText = "Total: R$ 0,00";
});
