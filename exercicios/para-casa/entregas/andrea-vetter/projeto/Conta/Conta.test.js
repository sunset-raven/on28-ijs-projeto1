/**
 * ESTRUTURA DOS TESTES
 * setup (o que a minha funcao/metodo/classe que vai ser testada precisa para funcionar?)
 * acao (execusao da funcao testada)
 * verificacao (o que eu espero que seja retornado comparado com o que de fato é retornado)
  
 */
const Conta = require("./Conta");

describe("Testes da Classe Conta", () => {
  test("verificar se instância foi criada corretamente", () => {
    const conta = new Conta();
    expect(conta instanceof Conta).toBe(true);

    // remover conta da lista de contas
    conta.destruir();
  });

  test("instanciar conta com valores validos", () => {
    /**
     * Agencia (4 digitos string) -> privado
     * Conta (5 digitos string)-> privado
     * Saldo (numero positivo) -> privado
     */
    const conta = new Conta("1234", "12345", 1000);
    expect(conta.getAgencia()).toBe("1234");
    expect(conta.getConta()).toBe("12345");
    expect(conta.getSaldo()).toBe(1000);

    // remover conta da lista de contas
    conta.destruir();
  });

  test("retorna mensagem de sucesso ao criar conta", () => {
    const conta = new Conta();
    expect(conta.criarConta("1234", "12345", 1000)).toBe(
      "Conta criada com sucesso"
    );
    expect(conta.getAgencia()).toBe("1234");
    expect(conta.getConta()).toBe("12345");
    expect(conta.getSaldo()).toBe(1000);

    // remover conta da lista de contas
    conta.destruir();
  });

  test("retorna mensagem de erro ao tentar criar conta com dados invalido", () => {
    const conta = new Conta();
    expect(() => conta.criarConta("123454", "123", 1000)).toThrow(
      "Dados inválidos para cadastro"
    );

    // remover conta da lista de contas
    conta.destruir();
  });

  test("retorna sucesso ao sacar 100 da conta", () => {
    const conta = new Conta();
    conta.criarConta("1234", "12345", 1000);

    conta.sacar(100);
    expect(conta.getSaldo()).toBe(900);

    // remover conta da lista de contas
    conta.destruir();
  });

  test("retorna mensagem de erro ao sacar -100 reais da conta", () => {
    const conta = new Conta();
    conta.criarConta("1234", "12345", 1000);

    expect(() => conta.sacar(-100)).toThrow("Valor inválido para saque");
    expect(conta.getSaldo()).toBe(1000);

    // remover conta da lista de contas
    conta.destruir();
  });

  test("retorna mensagem de erro ao sacar valor maior que o saldo da conta", () => {
    const conta = new Conta();
    conta.criarConta("1234", "12345", 100);

    expect(() => conta.sacar(110)).toThrow("Saldo insuficiente");
    expect(conta.getSaldo()).toBe(100);

    // remover conta da lista de contas
    conta.destruir();
  });

  test("retorna sucesso ao depositar 100 reais da conta", () => {
    const conta = new Conta();
    conta.criarConta("1234", "12345", 1000);

    conta.depositar(100);
    expect(conta.getSaldo()).toBe(1100);

    // remover conta da lista de contas
    conta.destruir();
  });

  test("retorna mensagem de erro ao depositar -100 reais da conta", () => {
    const conta = new Conta();
    conta.criarConta("1234", "12345", 1000);

    expect(() => conta.depositar(-100)).toThrow("Valor inválido para depósito");
    expect(conta.getSaldo()).toBe(1000);

    // remover conta da lista de contas
    conta.destruir();
  });

  test("retorna mensagem de erro ao depositar valor não numerico", () => {
    const conta = new Conta();
    conta.criarConta("1234", "12345", 1000);

    expect(() => conta.depositar(" ")).toThrow("Valor inválido para depósito");
    expect(conta.getSaldo()).toBe(1000);

    // remover conta da lista de contas
    conta.destruir();
  });

  test("criar uma chave pix por cpf com sucesso", () => {
    //setup
    const conta = new Conta();

    //acao
    const operacao = conta.criarChavePix("40814360879", "cpf");

    //verificacao
    expect(operacao).toBe("Chave Pix por cpf criada com sucesso");
    expect(conta.chavesPix.cpf).toBe("40814360879");

    // remover conta da lista de contas
    conta.destruir();
  });

  test("retornar mensagem de erro ao tentar cadastrar chave pix com cpf invalido", () => {
    //setup
    const conta = new Conta();

    //verificacao
    expect(() => conta.criarChavePix("124861", "cpf")).toThrow(
      "Erro: CPF inválido"
    );

    // remover conta da lista de contas
    conta.destruir();
  });

  test("criar uma chave pix por email com sucesso", () => {
    //setup
    const conta = new Conta();

    //acao
    const operacao = conta.criarChavePix("analu@email.com", "email");

    //verificacao
    expect(operacao).toBe("Chave Pix por email criada com sucesso");
    expect(conta.chavesPix.email).toBe("analu@email.com");

    // remover conta da lista de contas
    conta.destruir();
  });

  test("criar uma chave pix por telefone com sucesso", () => {
    //setup
    const conta = new Conta();

    //acao
    const operacao = conta.criarChavePix("11951639874", "telefone");

    //verificacao
    expect(operacao).toBe("Chave Pix por telefone criada com sucesso");
    expect(conta.chavesPix.telefone).toBe("11951639874");

    // remover conta da lista de contas
    conta.destruir();
  });

  // testes de transferência
  test("retorna sucesso ao fazer uma transferência com valor válido, saldo suficiente, dados validos", () => {
    const contaEmissor = new Conta();
    const contaReceptor = new Conta();

    contaEmissor.criarConta("0001", "12345", 1000);
    contaReceptor.criarConta("0001", "78945", 500);

    const operacao = contaEmissor.transferir(100, "0001", "78945");

    expect(operacao).toBe("Transferência realizada");
    expect(contaEmissor.getSaldo()).toBe(900);
    expect(contaReceptor.getSaldo()).toBe(600);

    contaEmissor.destruir();
    contaReceptor.destruir();
  });

  test("retorna sucesso ao fazer uma transferência por pix com valor válido, saldo suficiente e dados válidos", () => {
    const contaEmissor = new Conta();
    const contaReceptor = new Conta();

    contaEmissor.criarConta("1234", "12345", 1000);
    contaReceptor.criarConta("4321", "54321", 1000);
    contaReceptor.criarChavePix("teste@email.com", "email");

    expect(contaEmissor.fazerPix(100, "teste@email.com", "email")).toBe(
      "Transferência realizada"
    );
    expect(contaEmissor.getSaldo()).toBe(900);
    expect(contaReceptor.getSaldo()).toBe(1100);

    contaEmissor.destruir();
    contaReceptor.destruir();
  });

  test("retorna erro ao fazer uma transferência por pix com valor inválido", () => {
    const contaEmissor = new Conta();
    const contaReceptor = new Conta();

    contaEmissor.criarConta("1234", "12345", 500);
    contaReceptor.criarConta("4321", "54321", 1000);
    contaReceptor.criarChavePix("teste@email.com", "email");

    expect(() => contaEmissor.fazerPix(-100, "teste@email.com", "email")).toThrow(
      "Valor inválido para transferência"
    );

    contaEmissor.destruir();
    contaReceptor.destruir();
  });

  test("retorna erro ao fazer uma transferência por pix com saldo insuficiente", () => {
    const contaEmissor = new Conta();
    const contaReceptor = new Conta();

    contaEmissor.criarConta("1234", "12345", 500);
    contaReceptor.criarConta("4321", "54321", 1000);
    contaReceptor.criarChavePix("teste@email.com", "email");

    expect(() => contaEmissor.fazerPix(600, "teste@email.com", "email")).toThrow(
      "Saldo insuficiente"
    );

    contaEmissor.destruir();
    contaReceptor.destruir();
  });

  test("retorna erro ao fazer uma transferência por pix com chave inválida", () => {
    const contaEmissor = new Conta();
    const contaReceptor = new Conta();

    contaEmissor.criarConta("1234", "12345", 500);
    contaReceptor.criarConta("4321", "54321", 1000);
    contaReceptor.criarChavePix("teste@email.com", "email");

    expect(() =>
      contaEmissor.fazerPix(100, "teste.erro@email.com", "email")
    ).toThrow("Chave não encontrada");

    contaEmissor.destruir();
    contaReceptor.destruir();
  });
});
