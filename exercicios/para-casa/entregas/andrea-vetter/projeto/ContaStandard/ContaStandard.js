const Conta = require("../Conta/Conta");

class ContaStandard extends Conta {
  #limiteTransacional;

  constructor(agencia, conta, saldo, renda) {
    super(agencia, conta, saldo);
    this.renda = renda;
    this.#limiteTransacional = 1000;
  }

  criarContaStandard(agencia, conta, saldo, renda) {
    if (this.verificarRenda(renda) !== "standard") {
      throw new Error("Renda inválida");
    }
    this.renda = renda;

    return super.criarConta(agencia, conta, saldo);
  }

  transferir(valor, agencia, conta) {
    if (valor > this.#limiteTransacional) {
      throw new Error("Limite transacional ultrapassado");
    }

    return super.transferir(valor, agencia, conta);
  }

  fazerPix(valor, chavePix, tipo) {
    if (valor > this.#limiteTransacional) {
      throw new Error("Limite transacional ultrapassado");
    }

    return super.fazerPix(valor, chavePix, tipo);
  }
}

// let conta1 = new ContaStandard();
// console.log(conta1.criarContaStandard("1234", "12345", 1000, 1000));
// let conta2 = new ContaStandard("4321", "54321", 1000, 1000);

// // conta2.criarChavePix("12345678912", "cpf");
// console.log(conta1.transferir(500, "4321", "54321"));

// console.log(conta1.getSaldo());
// console.log(conta2.getSaldo());

module.exports = ContaStandard;
