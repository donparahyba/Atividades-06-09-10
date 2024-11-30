
let aluno = {
    nome: "João Silva",
    idade: 20,
    curso: "Engenharia de Software",
    notas: [8.5, 7.0, 9.0]
};

console.log("Nome do aluno:", aluno.nome);
console.log("Nota da primeira disciplina:", aluno.notas[0]);

aluno.idade = 22;
aluno.notas.push(10.0);

let alunoString = JSON.stringify(aluno);
console.log("Objeto aluno como string JSON:", alunoString);

let alunoObjeto = JSON.parse(alunoString);
console.log("String JSON convertida de volta para objeto:", alunoObjeto);

console.log("Propriedades do objeto aluno:");
for (let propriedade in aluno) {
    console.log(`${propriedade}: ${aluno[propriedade]}`);
}

let somaNotas = aluno.notas.reduce((acc, nota) => acc + nota, 0);
let mediaNotas = somaNotas / aluno.notas.length;
console.log("Média das notas:", mediaNotas.toFixed(2));

aluno.endereco = {
    rua: "Rua das Flores",
    cidade: "São Paulo",
    estado: "SP"
};

console.log("Cidade do aluno:", aluno.endereco.cidade);
console.log("Estado do aluno:", aluno.endereco.estado);

let alunos = [
    { nome: "João Silva", idade: 22, curso: "Engenharia de Software", notas: [8.5, 7.0, 9.0] },
    { nome: "Maria Oliveira", idade: 21, curso: "Ciência da Computação", notas: [9.5, 8.0, 8.5] },
    { nome: "Pedro Souza", idade: 23, curso: "Sistemas de Informação", notas: [6.5, 7.0, 6.0] },
    { nome: "Ana Santos", idade: 20, curso: "Engenharia de Software", notas: [10.0, 9.5, 9.0] }
];

let alunosComMediaAlta = alunos.filter((aluno) => {
    let soma = aluno.notas.reduce((acc, nota) => acc + nota, 0);
    let media = soma / aluno.notas.length;
    return media > 8;
});
console.log("Alunos com média superior a 8:", alunosComMediaAlta);
