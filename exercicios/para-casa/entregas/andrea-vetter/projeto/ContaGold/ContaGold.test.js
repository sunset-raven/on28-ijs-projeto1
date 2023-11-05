const ContaGold = require("./ContaGold");

describe("Testes da Classe Conta Gold", () => {
  //testes de instância
  test("verificar se instância foi criada corretamente", () => {
    const conta = new ContaGold();
    expect(conta instanceof ContaGold).toBe(true);

    conta.destruir();
  });

  test("instanciar conta com valores validos", () => {
    const conta = new ContaGold("1234", "12345", 1000, 6000);
    expect(conta.getAgencia()).toBe("1234");
    expect(conta.getConta()).toBe("12345");
    expect(conta.getSaldo()).toBe(1000);
    expect(conta.renda).toBe(6000);

    conta.destruir();
  });

  test("retorna mensagem de sucesso ao criar conta", () => {
    const conta = new ContaGold();
    expect(conta.criarContaGold("1234", "12345", 1000, 6000)).toBe(
      "Conta criada com sucesso"
    );
    expect(conta.getAgencia()).toBe("1234");
    expect(conta.getConta()).toBe("12345");
    expect(conta.getSaldo()).toBe(1000);
    expect(conta.renda).toBe(6000);

    conta.destruir();
  });

  test("retorna mensagem de erro ao tentar criar conta com dados invalidos", () => {
    const conta = new ContaGold();
    expect(() => conta.criarContaGold("12345", "123", 1000, 6000)).toThrow(
      "Dados inválidos para cadastro"
    );

    conta.destruir();
  });

  test("retonar mensagem de erro ao tentar criar conta com renda errada", () => {
    const conta = new ContaGold();
    expect(() => conta.criarContaGold("1234", "12345", 1000, 4500)).toThrow(
      "Renda inválida"
    );

    contaGold.destruir();
  });

  // teste de saque
  test("retorna sucesso ao sacar 100 da conta", () => {
    const conta = new ContaGold();
    conta.criarContaGold("1234", "12345", 1000, 6000);

    conta.sacar(100);
    expect(conta.getSaldo()).toBe(900);

    conta.destruir();
  });

  test("retorna mensagem de erro ao sacar -100 reais da conta", () => {
    const conta = new ContaGold();
    conta.criarContaGold("1234", "12345", 1000, 6000);

    expect(() => conta.sacar(-100)).toThrow("Valor inválido para saque");
    expect(conta.getSaldo()).toBe(1000);

    conta.destruir();
  });

  test("retorna mensagem de erro ao sacar valor maior que o saldo da conta", () => {
    const conta = new ContaGold();
    conta.criarContaGold("1234", "12345", 100, 6000);

    expect(() => conta.sacar(110)).toThrow("Saldo insuficiente");
    expect(conta.getSaldo()).toBe(100);

    conta.destruir();
  });

  // teste de depósito
  test("retorna sucesso ao depositar 100 reais da conta", () => {
    const conta = new ContaGold();
    conta.criarContaGold("1234", "12345", 1000, 6000);

    conta.depositar(100);
    expect(conta.getSaldo()).toBe(1100);

    conta.destruir();
  });

  test("retorna mensagem de erro ao depositar -100 reais da conta", () => {
    const conta = new ContaGold();
    conta.criarContaGold("1234", "12345", 1000, 6000);

    expect(() => conta.depositar(-100)).toThrow("Valor inválido para depósito");
    expect(conta.getSaldo()).toBe(1000);

    conta.destruir();
  });

  test("retorna mensagem de erro ao depositar valor não numerico", () => {
    const conta = new ContaGold();
    conta.criarContaGold("1234", "12345", 1000, 6000);

    expect(() => conta.depositar(" ")).toThrow("Valor inválido para depósito");
    expect(conta.getSaldo()).toBe(1000);

    conta.destruir();
  });

  // teste de transferência
  test("retorna sucesso ao fazer uma transferência com valor válido, saldo suficiente, dados validos", () => {
    const contaEmissor = new ContaGold();
    const contaReceptor = new ContaGold();

    contaEmissor.criarContaGold("0001", "12345", 1000, 6000);
    contaReceptor.criarContaGold("0001", "78945", 500, 6000);

    const operacao = contaEmissor.transferir(100, "0001", "78945");

    expect(operacao).toBe("Transferência realizada");
    expect(contaEmissor.getSaldo()).toBe(900);
    expect(contaReceptor.getSaldo()).toBe(600);

    contaEmissor.destruir();
    contaReceptor.destruir();
  });

  test("retorna erro ao fazer uma transferência com valor inválido", () => {
    const contaEmissor = new ContaGold();
    const contaReceptor = new ContaGold();

    contaEmissor.criarContaGold("1234", "12345", 500, 6000);
    contaReceptor.criarContaGold("4321", "54321", 1000, 6000);

    expect(() => contaEmissor.transferir(-100, "4321", "54321")).toThrow(
      "Valor inválido para transferência"
    );

    contaEmissor.destruir();
    contaReceptor.destruir();
  });

  test("retorna erro ao fazer uma transferência com saldo insuficiente", () => {
    const contaEmissor = new ContaGold();
    const contaReceptor = new ContaGold();

    contaEmissor.criarContaGold("1234", "12345", 500, 6000);
    contaReceptor.criarContaGold("4321", "54321", 1000, 6000);

    expect(() => contaEmissor.transferir(600, "4321", "54321")).toThrow(
      "Saldo insuficiente"
    );

    contaEmissor.destruir();
    contaReceptor.destruir();
  });

  test("retorna erro ao fazer uma transferência com dados inválidos", () => {
    const contaEmissor = new ContaGold();
    const contaReceptor = new ContaGold();

    contaEmissor.criarContaGold("1234", "12345", 500, 6000);
    contaReceptor.criarContaGold("4321", "54321", 1000, 6000);

    expect(() => contaEmissor.transferir(100, "4322", "5432")).toThrow(
      "Conta não encontrada"
    );

    contaEmissor.destruir();
    contaReceptor.destruir();
  });

  // teste de criação de pix
  test("criar uma chave pix por cpf com sucesso", () => {
    const conta = new ContaGold();

    const operacao = conta.criarChavePix("40814360879", "cpf");

    expect(operacao).toBe("Chave Pix por cpf criada com sucesso");
    expect(conta.chavesPix.cpf).toBe("40814360879");

    conta.destruir();
  });

  test("retornar mensagem de erro ao tentar cadastrar chave pix com cpf invalido", () => {
    const conta = new ContaGold();

    expect(() => conta.criarChavePix("124861", "cpf")).toThrow(
      "Erro: CPF inválido"
    );

    conta.destruir();
  });

  test("criar uma chave pix por email com sucesso", () => {
    const conta = new ContaGold();

    const operacao = conta.criarChavePix("teste@email.com", "email");

    expect(operacao).toBe("Chave Pix por email criada com sucesso");
    expect(conta.chavesPix.email).toBe("teste@email.com");

    conta.destruir();
  });

  test("retornar mensagem de erro ao tentar cadastrar chave pix com email inválido", () => {
    const conta = new ContaGold();

    expect(() => conta.criarChavePix("teste.erro", "email")).toThrow(
      "Erro: Email inválido"
    );

    conta.destruir();
  });

  test("criar uma chave pix por telefone com sucesso", () => {
    const conta = new ContaGold();

    const operacao = conta.criarChavePix("11951639874", "telefone");

    expect(operacao).toBe("Chave Pix por telefone criada com sucesso");
    expect(conta.chavesPix.telefone).toBe("11951639874");

    conta.destruir();
  });

  test("retornar mensagem de erro ao tentar cadastrar chave pix com telefone inválido", () => {
    const conta = new ContaGold();

    expect(() => conta.criarChavePix("4321", "telefone")).toThrow(
      "Erro: Telefone inválido"
    );

    conta.destruir();
  });

  // teste de transferência por pix
  test("retorna sucesso ao fazer uma transferência por pix com valor válido, saldo suficiente e dados válidos", () => {
    const contaEmissor = new ContaGold();
    const contaReceptor = new ContaGold();

    contaEmissor.criarContaGold("1234", "12345", 1000, 6000);
    contaReceptor.criarContaGold("4321", "54321", 1000, 6000);
    contaReceptor.criarChavePix("teste@email.com", "email");

    expect(contaEmissor.pix(100, "teste@email.com", "email")).toBe(
      "Transferência realizada"
    );
    expect(contaEmissor.getSaldo()).toBe(900);
    expect(contaReceptor.getSaldo()).toBe(1100);

    contaEmissor.destruir();
    contaReceptor.destruir();
  });

  test("retorna erro ao fazer uma transferência por pix com valor inválido", () => {
    const contaEmissor = new ContaGold();
    const contaReceptor = new ContaGold();

    contaEmissor.criarContaGold("1234", "12345", 500, 6000);
    contaReceptor.criarContaGold("4321", "54321", 1000, 6000);
    contaReceptor.criarChavePix("teste@email.com", "email");

    expect(() => contaEmissor.pix(-100, "teste@email.com", "email")).toThrow(
      "Valor inválido para transferência"
    );

    contaEmissor.destruir();
    contaReceptor.destruir();
  });

  test("retorna erro ao fazer uma transferência por pix com saldo insuficiente", () => {
    const contaEmissor = new ContaGold();
    const contaReceptor = new ContaGold();

    contaEmissor.criarContaGold("1234", "12345", 500, 6000);
    contaReceptor.criarContaGold("4321", "54321", 1000, 6000);
    contaReceptor.criarChavePix("teste@email.com", "email");

    expect(() => contaEmissor.pix(600, "teste@email.com", "email")).toThrow(
      "Saldo insuficiente"
    );

    contaEmissor.destruir();
    contaReceptor.destruir();
  });

  test("retorna erro ao fazer uma transferência por pix com chave inválida", () => {
    const contaEmissor = new ContaGold();
    const contaReceptor = new ContaGold();

    contaEmissor.criarContaGold("1234", "12345", 500, 6000);
    contaReceptor.criarContaGold("4321", "54321", 1000, 6000);
    contaReceptor.criarChavePix("teste@email.com", "email");

    expect(() =>
      contaEmissor.pix(100, "teste.erro@email.com", "email")
    ).toThrow("Chave não encontrada");

    contaEmissor.destruir();
    contaReceptor.destruir();
  });
});
