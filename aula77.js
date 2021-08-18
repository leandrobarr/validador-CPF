// 037.583.747.74 051.654.167.63
/*
0x  3x  7x  5x  8x  3x  7x  4x  7x  
10  9   8   7   6   5   4   3   2   
0   27  56  35  48  15  28  12  14 = 235

11 - (235 % 11) = 7 (Primeiro digito)
Se o resultado for maior que 9, consideramos 0.

0x  3x  7x  5x  8x  3x  7x  4x  7x  7x
11  10  9   8   7   6   5   4   3   2
0   30  63  40  56  18  35  16  21  14 = 294

11 - (293 % 11) = 4 (segundo dígito)
Se o valor do cálculo final for 9, consideramos 0.

let cpf = '051.654.167-63'
let cpfLimpo = cpf.replace(/\D+/g, '')
cpfArray = Array.from(cpfLimpo)
console.log(cpfArray.reduce((ac, val) => ac + Number(val), 0))
*/
function ValidaCPF(cpfEnviado) {
   Object.defineProperty(this, 'cpfLimpo', {
       enumerable: true,
       get: function() {
           return cpfEnviado.replace(/\D+/g, '')
       }
   })
}

ValidaCPF.prototype.valida = function() {
    if(typeof this.cpfLimpo === 'undefined') return false
    if(this.cpfLimpo.length !== 11) return false
    if(this.isSequencia()) return false

    const cpfParcial = this.cpfLimpo.slice(0, -2)
    const digito1 = this.criaDigito(cpfParcial)
    const digito2 = this.criaDigito(cpfParcial + digito1)
    
    const novoCpf = cpfParcial + digito1 + digito2
    return novoCpf === this.cpfLimpo
}

ValidaCPF.prototype.criaDigito = function(cpfParcial) {
    const cpfArray = Array.from(cpfParcial)
    
    let regressivo = cpfArray.length + 1
    const total = cpfArray.reduce((ac, val) => {
        ac += (regressivo * Number(val))
        regressivo --
        return ac
    }, 0)
    const digito = 11 - (total % 11)
    return digito > 9 ? '0' : String(digito)
}

ValidaCPF.prototype.isSequencia = function() {
    const sequencia = this.cpfLimpo[0].repeat(this.cpfLimpo.length)
    return sequencia === this.cpfLimpo
}

const cpf = new ValidaCPF('051.654.167-63')

if (cpf.valida()) {
    console.log('CPF válido')
} else {
    console.log('CPF inválido')
}




