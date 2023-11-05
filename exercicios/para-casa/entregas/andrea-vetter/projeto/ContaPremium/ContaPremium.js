const Conta = require("../Conta/Conta");

class ContaPremium extends Conta {
  constructor(agencia, conta, saldo, renda) {
    super(agencia, conta, saldo);
    this.renda = renda;
  }

  criarContaPremium(agencia, conta, saldo, renda) {
    if (renda < 18000) {
      throw new Error("Renda inválida");
    }

    if (agencia.length === 4 && conta.length === 5 && saldo > 0) {
      this.setAgencia(agencia);
      this.setConta(conta);
      this.setSaldo(saldo);

      this.renda = renda;

      return "Conta criada com sucesso";
    } else {
      throw new Error("Dados inválidos para cadastro");
    }
  }

  transferir(valor, agencia, conta) {
    let contaValida = Conta.listaContas.find((contaReceptora) => {
      let numeroContaReceptora = contaReceptora.getConta();
      let numeroAgenciaReceptora = contaReceptora.getAgencia();
      return (
        numeroContaReceptora === conta && numeroAgenciaReceptora === agencia
      );
    });

    if (!contaValida) {
      throw new Error("Conta não encontrada");
    }

    if (valor < 0) {
      throw new Error("Valor inválido para transferência");
    }

    if (this.getSaldo() - valor < 0) {
      throw new Error("Saldo insuficiente");
    } else {
      const saldoAtualizado = this.getSaldo() - valor;
      this.setSaldo(saldoAtualizado);
      const saldoContaReceptora = contaValida.getSaldo() + valor;
      contaValida.setSaldo(saldoContaReceptora);
      return "Transferência realizada";
    }
  }

  pix(valor, chavePix, tipo) {
    let contaValida = Conta.listaContas.find(
      (conta) => conta.chavesPix[tipo] === chavePix
    );

    if (!contaValida) {
      throw new Error("Chave não encontrada");
    }

    if (valor < 0) {
      throw new Error("Valor inválido para transferência");
    }

    if (this.getSaldo() - valor < 0) {
      throw new Error("Saldo insuficiente");
    } else {
      const saldoAtualizado = this.getSaldo() - valor;
      this.setSaldo(saldoAtualizado);
      const saldoContaReceptora = contaValida.getSaldo() + valor;
      contaValida.setSaldo(saldoContaReceptora);
      return "Transferência realizada";
    }
  }
}

module.exports = ContaPremium;
