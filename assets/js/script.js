// GamersConnect - Script de validação do formulário

// Quando a página carregar, executa tudo
window.onload = function() {
    console.log('Página carregada! Vamos validar esse formulário!');
    
    // Pega o formulário e os campos
    let form = document.querySelector('form');
    let botaoEnviar = document.querySelector('.continue-button button');
    let campos = document.querySelectorAll('input[required]');
    
    // Configura a máscara do telefone
    let campoTelefone = document.getElementById('phone');
    if (campoTelefone) {
        campoTelefone.addEventListener('input', function(e) {
            let valor = e.target.value.replace(/\D/g, '');
            let valorFormatado = '';
            
            if (valor.length > 0) {
                valorFormatado = '(' + valor.substring(0, 2);
            }
            if (valor.length > 2) {
                valorFormatado += ') ' + valor.substring(2, 7);
            }
            if (valor.length > 7) {
                valorFormatado += '-' + valor.substring(7, 11);
            }
            
            e.target.value = valorFormatado;
        });
    }
    
    // Validação da senha
    let senha = document.getElementById('password');
    let confirmarSenha = document.getElementById('confirmPassword');
    
    function verificarSenhas() {
        if (senha.value !== confirmarSenha.value) {
            mostrarErro(confirmarSenha, 'As senhas não são iguais!');
            return false;
        } else {
            limparErro(confirmarSenha);
            return true;
        }
    }
    
    if (senha && confirmarSenha) {
        senha.addEventListener('input', verificarSenhas);
        confirmarSenha.addEventListener('input', verificarSenhas);
    }
    
    // Validação do email (bem simples)
    let email = document.getElementById('email');
    if (email) {
        email.addEventListener('blur', function() {
            let valor = email.value.trim();
            if (valor && !valor.includes('@')) {
                mostrarErro(email, 'Coloca um email válido, com @!');
            } else {
                limparErro(email);
            }
        });
    }
    
    // Validação do nome de usuário
    let username = document.getElementById('username');
    if (username) {
        username.addEventListener('blur', function() {
            let valor = username.value.trim();
            if (valor.length < 3) {
                mostrarErro(username, 'Nome muito curto! Mínimo 3 letras.');
            } else if (valor.length > 20) {
                mostrarErro(username, 'Nome muito longo! Máximo 20 letras.');
            } else {
                limparErro(username);
            }
        });
    }
    
    // Função para mostrar erro
    function mostrarErro(campo, mensagem) {
        // Remove erro anterior
        limparErro(campo);
        
        // Cria div de erro
        let erroDiv = document.createElement('div');
        erroDiv.className = 'erro-campo';
        erroDiv.textContent = mensagem;
        erroDiv.style.color = '#ff4444';
        erroDiv.style.fontSize = '12px';
        erroDiv.style.marginTop = '5px';
        
        campo.parentNode.appendChild(erroDiv);
        campo.style.border = '2px solid #ff4444';
    }
    
    // Função para limpar erro
    function limparErro(campo) {
        let erroAntigo = campo.parentNode.querySelector('.erro-campo');
        if (erroAntigo) {
            erroAntigo.remove();
        }
        campo.style.border = '';
    }
    
    // Verifica se todos os campos obrigatórios estão preenchidos
    function verificarCampos() {
        let todosPreenchidos = true;
        
        campos.forEach(function(campo) {
            if (!campo.value.trim()) {
                todosPreenchidos = false;
            }
        });
        
        // Verifica também as senhas
        if (senha && confirmarSenha) {
            if (!verificarSenhas()) {
                todosPreenchidos = false;
            }
        }
        
        // Atualiza o botão
        if (botaoEnviar) {
            if (todosPreenchidos) {
                botaoEnviar.disabled = false;
                botaoEnviar.style.opacity = '1';
                botaoEnviar.style.cursor = 'pointer';
            } else {
                botaoEnviar.disabled = true;
                botaoEnviar.style.opacity = '0.6';
                botaoEnviar.style.cursor = 'not-allowed';
            }
        }
        
        return todosPreenchidos;
    }
    
    // Adiciona verificação em todos os campos
    campos.forEach(function(campo) {
        campo.addEventListener('input', verificarCampos);
        campo.addEventListener('blur', verificarCampos);
    });
    
    // Quando enviar o formulário
    form.addEventListener('submit', function(e) {
        e.preventDefault(); // Impede de enviar pra algum lugar
        
        console.log('Tentando enviar formulário...');
        
        if (verificarCampos()) {
            // Mostra loading
            if (botaoEnviar) {
                botaoEnviar.textContent = 'Cadastrando...';
                botaoEnviar.disabled = true;
            }
            
            // Simula uma requisição (como se fosse pro servidor)
            setTimeout(function() {
                // Mensagem de sucesso
                alert('🎉 Cadastro feito com sucesso! Bem-vindo ao GamersConnect!');
                
                // Limpa o formulário
                form.reset();
                
                // Reseta o botão
                if (botaoEnviar) {
                    botaoEnviar.textContent = '🎮 Juntar-se Agora';
                    botaoEnviar.disabled = false;
                }
                
                console.log('Cadastro simulado com sucesso!');
            }, 2000); // 2 segundos de "loading"
        } else {
            alert('❌ Preencha todos os campos corretamente!');
        }
    });
    
    // Efeito nas plataformas (radio buttons)
    let plataformas = document.querySelectorAll('input[name="platform"]');
    plataformas.forEach(function(plataforma) {
        plataforma.addEventListener('change', function() {
            // Remove a seleção anterior
            plataformas.forEach(function(p) {
                let label = p.closest('.gender-input');
                if (label) {
                    label.style.background = '';
                    label.style.border = '';
                }
            });
            
            // Destaca a selecionada
            let labelSelecionada = this.closest('.gender-input');
            if (labelSelecionada) {
                labelSelecionada.style.background = 'rgba(108, 99, 255, 0.2)';
                labelSelecionada.style.border = '2px solid #6C63FF';
            }
        });
    });
    
    // Contador de gamers online (só pra ficar legal)
    function atualizarContadorOnline() {
        let contador = Math.floor(Math.random() * 4000) + 1000; // Entre 1000 e 5000
        console.log(contador + ' gamers online agora!');
        
        // Poderia mostrar em algum lugar da página se quisesse
        // let contadorElemento = document.createElement('div');
        // contadorElemento.textContent = contador + ' gamers online';
        // contadorElemento.style.position = 'fixed';
        // contadorElemento.style.bottom = '10px';
        // contadorElemento.style.right = '10px';
        // contadorElemento.style.background = '#6C63FF';
        // contadorElemento.style.color = 'white';
        // contadorElemento.style.padding = '5px 10px';
        // contadorElemento.style.borderRadius = '10px';
        // contadorElemento.style.fontSize = '12px';
        // document.body.appendChild(contadorElemento);
    }
    
    // Chama a função quando a página carrega
    atualizarContadorOnline();
    
    // Verifica campos logo no início
    verificarCampos();
    
    console.log('Script carregado! Agora é só testar o formulário! 🚀');
};

// Função extra pra ver o que tá acontecendo nos campos
function debugCampo(campo) {
    campo.addEventListener('focus', function() {
        console.log('Focou no campo: ' + campo.name);
    });
    
    campo.addEventListener('blur', function() {
        console.log('Saiu do campo: ' + campo.name + ' | Valor: ' + campo.value);
    });
}

// Aplica debug em todos os campos (opcional)
// document.querySelectorAll('input').forEach(debugCampo);