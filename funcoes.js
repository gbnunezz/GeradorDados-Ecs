import { SalvarFirebase } from "./comunicacao.js";
let consumo = [0, 0, 0, 0, 0,0,0,0,0];

const equipamentos = [
    { nome: "TV", index: 0, consumo: 13.5 },
    { nome: "Motor", index: 1, consumo: 1500 },
    { nome: "LED", index: 2, consumo: 100 },
    { nome: "Compressor", index: 3, consumo: 3000 },
    { nome: "Camara", index: 4, consumo: 5000 },
    { nome: "Lâmpada", index: 5, consumo: 50},
    { nome: "Monitor", index: 6, consumo: 30},
    { nome: "CPU", index: 7, consumo: 150},
    { nome: "Frigobar", index: 8, consumo: 50},
];

equipamentos.forEach(({ nome, index }) => {
    const display = document.getElementById(`display${nome}`);
    const botaoMais = document.getElementById(`buttonMais${nome}`);
    const botaoMenos = document.getElementById(`buttonMenos${nome}`);

    if (!display || !botaoMais || !botaoMenos) return;

    display.value = consumo[index];

    botaoMais.addEventListener("click", () => {
        consumo[index]++;
        display.value = consumo[index];
    });

    botaoMenos.addEventListener("click", () => {
        if (consumo[index] > 0) {
            consumo[index]--;
            display.value = consumo[index];
        }
    });
});

const salvar = document.getElementById("salvarBnt");
if (salvar) {
    salvar.addEventListener("click", async () => {
        let consumoTotal = 0;
        equipamentos.forEach(({ index, consumo: consumoPorUnidade }) => {
            consumoTotal += consumo[index] * consumoPorUnidade;
        });
        await SalvarFirebase(consumoTotal);
        alert(`Consumo total: ${consumoTotal.toFixed(2)} watts/h`);
    });
}
