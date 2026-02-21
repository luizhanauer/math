# MathVisual 🧮 

O **MathVisual** é uma suíte educacional interativa projetada para desmistificar a matemática básica. Em vez de simplesmente entregar o resultado final como uma calculadora tradicional, o MathVisual foca no **processo**. 

Ele simula a montagem manual de contas (o método do caderno escolar), revelando a lógica por trás de cada etapa da operação através de animações passo a passo e identificadores cromáticos. É a ferramenta ideal para alunos entenderem o "porquê" e professores demonstrarem o "como".

## 🎓 Valor Pedagógico

- **Foco no Processo:** Ensina o aluno a chegar ao resultado.
- **Cognição Visual:** Uso de cores específicas para identificar operandos, "vai um" (carry over), empréstimos, quocientes e restos, facilitando a assimilação mental.
- **Feedback Amigável:** Prevenção e explicação didática de regras matemáticas impeditivas (como a impossibilidade da divisão por zero).
- **Cartões Didáticos:** Cada operação acompanha uma explicação em texto da regra matemática em execução.

## ✨ Operações Suportadas

A suíte conta com 7 módulos de resolução visual:
- **Adição:** Demonstração do alinhamento e do transporte numérico ("vai um").
- **Subtração:** Simulação do empréstimo entre colunas.
- **Multiplicação:** Decomposição em produtos parciais e deslocamento em grade.
- **Divisão:** Algoritmo da chave com demonstração progressiva do resto e aplicação da regra dos sinais.
- **Fração:** Cálculo visual de MMC e suporte às 4 operações básicas (+, -, ×, ÷).
- **Regra de 3:** Resolução de proporções com isolamento passo a passo da incógnita.
- **Potência:** Expansão de fatores iterativos.

## 🛠️ Arquitetura e Engenharia

Para suportar a complexidade do motor de renderização passo a passo sem perder performance, o projeto foi desenhado com rigor de engenharia de software:

- **Clean Architecture & DDD (Domain-Driven Design):** A lógica matemática e a geração de passos (`core/domain`) é 100% isolada do framework visual (Vue 3). Os motores de cálculo são puros e não conhecem o DOM.
- **Object Calisthenics:** Regras rigorosas aplicadas ao código de domínio (ausência de `else`, métodos curtos, encapsulamento forte, indentação mínima).
- **TypeScript Strict:** Tipagem forte com checagem rigorosa de nulos (`strictNullChecks`) e tipagem segura em índices de arrays.
- **Design System:** Interface projetada com Tailwind CSS, focada em um tema Dark/Tech (Cyberpunk) que reduz a fadiga visual durante os estudos.

## 🚀 Como Executar Localmente

### Pré-requisitos
- Node.js (v18+)
- NPM ou Yarn

### Instalação

1. Clone o repositório:
```bash
git clone https://github.com/luizhanauer/math.git
```

2. Entre no diretório:

```bash
cd math-visual
```

3. Instale as dependências:

```bash
npm install
```

4. Execute o servidor de desenvolvimento:

```bash
npm run dev
```

## 🧪 Testes Unitários

As regras de negócio são garantidas pelo **Vitest**. Para rodar a suíte de testes do domínio (operações, regras de sinais, MMC, tratativas de erro, etc):

```bash
npm run test
```


Contribuição
------------

Contribuições são bem-vindas! Se você encontrar algum problema ou tiver sugestões para melhorar a aplicação, sinta-se à vontade para abrir uma issue ou enviar um pull request.

Se você gostou do meu trabalho e quer me agradecer, você pode me pagar um café :)

<a href="https://www.paypal.com/donate/?hosted_button_id=SFR785YEYHC4E" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style="height: 40px !important;width: 150px !important;" ></a>


Licença
-------

Este projeto está licenciado sob a Licença MIT. Consulte o arquivo LICENSE para obter mais informações.
