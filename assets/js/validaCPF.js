class ValidaCPF {
    constructor(cpfEnviado) {
        this.cpfLimpo = cpfEnviado.replace(/\D+/g, '');
    }

    valida() {
        if(typeof this.cpfLimpo === 'undefined') return;
        if(this.cpfLimpo.length !== 11) return;

        const cpfParcial = this.cpfLimpo.slice(0, -2);
        const digito01 = this.criarDigito(cpfParcial);
        const digito02 = this.criarDigito(cpfParcial + digito01);

        const novoCpf = cpfParcial + digito01 + digito02;

        console.log(novoCpf)

        return novoCpf === this.cpfLimpo;
    }

    criarDigito(cpfParcial) {
        const cpfArray = Array.from(cpfParcial);
        let regressivo = cpfArray.length + 1;
        
        let total = cpfArray.reduce((ac, value) => {
            ac += (regressivo * Number(value))
            regressivo--;
            return ac;
        }, 0)

        const digito = 11 - (total % 11);
        return digito > 9 ? '0' : digito.toString();
    }  
}
