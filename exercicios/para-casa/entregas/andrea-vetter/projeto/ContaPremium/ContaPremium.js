const Conta = require("../Conta/Conta");

class ContaPremium extends Conta {
  constructor(agencia, conta, saldo, renda) {
    super(agencia, conta, saldo);
    this.renda = renda;
  }

  criarContaPremium(agencia, conta, saldo, renda) {
    if (this.verificarRenda(renda) !== "premium") {
      throw new Error("Renda inválida");
    }
    this.renda = renda;

    return super.criarConta(agencia, conta, saldo);
  }
}

// let conta1 = new ContaPremium();
// console.log(conta1.criarContaPremium("1234", "12345", 1000, 18000));
// let conta2 = new ContaPremium("4321", "54321", 1000, 18000);

// conta2.criarChavePix("12345678912", "cpf");
// console.log(conta1.fazerPix(500, "12345678912", "cpf"));

// console.log(conta1.getSaldo());
// console.log(conta2.getSaldo());

module.exports = ContaPremium;
