class ValidaFormulario {
    constructor() {
        this.formulario = document.querySelector('.formulario');
        this.eventos();
    }
    eventos() {
        this.formulario.addEventListener('submit', e => {
            this.handleSubmit(e);
        });
    }

    handleSubmit(evento) {
        evento.preventDefault();
        const campo_valido = this.isValid();
        const senha_valida = this.validaSenha();

        if(campo_valido && senha_valida) {
            alert('Usuário cadastrado com sucesso!');
            this.formulario.submit();
        }

    }

    isValid() {
        let valido = true;

        for (let errorText of this.formulario.querySelectorAll('.error-text')) {
            errorText.remove();
        }

        for (let campo of this.formulario.querySelectorAll('.validar')) {
            let label = campo.previousElementSibling.innerText;

            if(!campo.value) {
                this.criaErro(campo, `O campo ${label} não pode estar em branco!`);
                valido = false;
            }

            if(campo.classList.contains('cpf')) {
                if(!this.validaCPF(campo)) valido = false;  
            }

            if(campo.classList.contains('usuario')) {
                if(!this.validaUsuario(campo)) valido = false;
            }

        }
        return valido;
    }

    validaUsuario(campo) {
        const user = campo.value;
        let valido = true;
        if(user.length > 3 || user.length > 12) {
            this.criaErro(campo, 'Usuário precisa ter entre 3 a 12 caracteres!');
            valido = false;
        }

        if(!user.match(/^[a-zA-Z-0-9]+$/g)){
            this.criaErro(campo, 'Nome do usuário deve conter apenas letras e/ou números!')
            valido = false;
        }

        return valido;
    }

    validaSenha() {
        let valido = true;

        const senha = this.formulario.querySelector('.senha');
        const confirmar_senha = this.formulario.querySelector('.confirmar_senha');

        if(senha !== confirmar_senha) {
            valido = false;
            this.criaErro(senha, 'O campo senha e confirmar senha, precisam ser identicos!');
            this.criaErro(confirmar_senha, 'O campo senha e confirmar senha, precisam ser identicos!');
        }

        if(senha.value.length < 6 || senha.value.length > 15) {
            valido = false;
            this.criaErro(senha, 'A senha precisa ter de 6 a 15 caracteres!')
        }


        return valido;
    }

    validaCPF(campo) {
        const cpf = new ValidaCPF(campo.value);
        if(!cpf.valida()) {
            this.criaErro(campo, 'CPF inválido');
            return false;
        }
        return true;
    }

    criaErro(campo, msg) {
        const div = document.createElement('div');
        div.innerHTML = msg;
        div.classList.add('error-text');
        campo.insertAdjacentElement('afterend', div);
    }
}

const form = new ValidaFormulario();
