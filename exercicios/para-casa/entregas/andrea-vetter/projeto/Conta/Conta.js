class Conta {
  #agencia;
  #conta;
  #saldo;
  renda;
  chavesPix;
  static listaContas = [];

  constructor(agencia, conta, saldo) {
    this.#agencia = agencia;
    this.#conta = conta;
    this.#saldo = saldo;
    this.chavesPix = {
      cpf: undefined,
      email: undefined,
      telefone: undefined,
    };

    Conta.listaContas.push(this);
  }

  destruir() {
    let index = Conta.listaContas.indexOf(this);
    Conta.listaContas.splice(index, 1);
  }

  criarConta(agencia, conta, saldo) {
    if (agencia.length === 4 && conta.length === 5 && saldo > 0) {
      this.#agencia = agencia;
      this.#conta = conta;
      this.#saldo = saldo;

      return "Conta criada com sucesso";
    } else {
      throw new Error("Dados inválidos para cadastro");
    }
  }

  sacar(valor) {
    if (valor > 0 && typeof valor === "number") {
      if (this.#saldo - valor > 0) {
        const saldoAtualizado = this.#saldo - valor;
        this.setSaldo(saldoAtualizado);
      } else {
        throw new Error("Saldo insuficiente");
      }
    } else {
      throw new Error("Valor inválido para saque");
    }
  }

  depositar(valor) {
    if (valor > 0 && typeof valor === "number") {
      const saldoAtualizado = this.#saldo + valor;
      this.setSaldo(saldoAtualizado);
    } else {
      throw new Error("Valor inválido para depósito");
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

    if (this.#saldo - valor < 0) {
      throw new Error("Saldo insuficiente");
    } else {
      const saldoAtualizado = this.#saldo - valor;
      this.setSaldo(saldoAtualizado);
      const saldoContaReceptora = contaValida.getSaldo() + valor;
      contaValida.setSaldo(saldoContaReceptora);
      return "Transferência realizada";
    }
  }

  getAgencia() {
    return this.#agencia;
  }

  setAgencia(agencia) {
    this.#agencia = agencia;
  }

  getConta() {
    return this.#conta;
  }

  setConta(conta) {
    this.#conta = conta;
  }

  getSaldo() {
    return this.#saldo;
  }

  setSaldo(novoSaldo) {
    this.#saldo = novoSaldo;
  }

  getRenda(renda) {
    this.renda = renda;
  }

  verificarRenda(renda) {
    if (renda < 5000) {
      return "standard";
    } else if (renda >= 5000 && renda < 18000) {
      return "gold";
    }
    return "premium";
  }

  validarCPF(chavePix) {
    let regexCPF =
      /([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})/;
    return regexCPF.test(chavePix);
  }

  validarEmail(chavePix) {
    let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return regexEmail.test(chavePix);
  }

  validarTelefone(chavePix) {
    let regexTelefone =
      /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/;
    return regexTelefone.test(chavePix);
  }

  criarChavePix(chavePix, tipo) {
    switch (tipo) {
      case "cpf":
        if (this.validarCPF(chavePix)) {
          this.chavesPix.cpf = chavePix;
          return "Chave Pix por cpf criada com sucesso";
        } else {
          throw new Error("Erro: CPF inválido");
        }

      case "email":
        if (this.validarEmail(chavePix)) {
          this.chavesPix.email = chavePix;
          return "Chave Pix por email criada com sucesso";
        } else {
          throw new Error("Erro: Email inválido");
        }

      case "telefone":
        if (this.validarTelefone(chavePix)) {
          this.chavesPix.telefone = chavePix;
          return "Chave Pix por telefone criada com sucesso";
        } else {
          throw new Error("Erro: Telefone inválido");
        }

      default:
        return "Chave inexistente";
    }
  }

  fazerPix(valor, chavePix, tipo) {
    let contaValida = Conta.listaContas.find(
      (conta) => conta.chavesPix[tipo] === chavePix
    );

    if (!contaValida) {
      throw new Error("Chave não encontrada");
    }

    if (valor < 0) {
      throw new Error("Valor inválido para transferência");
    }

    if (this.#saldo - valor < 0) {
      throw new Error("Saldo insuficiente");
    } else {
      const saldoAtualizado = this.#saldo - valor;
      this.setSaldo(saldoAtualizado);
      const saldoContaReceptora = contaValida.getSaldo() + valor;
      contaValida.setSaldo(saldoContaReceptora);
      return "Transferência realizada";
    }
  }
}

// let conta1 = new Conta();
// console.log(conta1.criarConta("1234", "12345", 1000));
// let conta2 = new Conta("4321", "54321", 1000);

// conta2.criarChavePix("12345678912", "cpf");
// conta1.pix(500, "12345678912", "cpf");

// console.log(conta2.getSaldo());
// console.log(conta1.getSaldo());

module.exports = Conta;
