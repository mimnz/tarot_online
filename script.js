// script.js
const btnEmbaralhar = document.getElementById("btn-embaralhar");
const btnSalvarTiragem = document.getElementById("btn-salvar-tiragem");
const tipoBaralhoSelect = document.getElementById("tipo-baralho");
const deckDisplayDiv = document.getElementById("deck-display"); // Área para as cartas iniciais
const mesaDiv = document.getElementById("mesa"); // Área para as cartas tiradas
const tiragemCardsTextarea = document.getElementById("tiragem-cards-text"); // Nova textarea
const btnCopyTiragemCards = document.getElementById("btn-copy-tiragem-cards"); // Novo botão de copiar

const cardDescriptionOverlay = document.getElementById("card-description-overlay");
const overlayCardName = document.getElementById("overlay-card-name");
const overlayCardDescription = document.getElementById("overlay-card-description");
const overlayCardStudyLink = document.getElementById("overlay-card-study-link");
const closeOverlayBtn = cardDescriptionOverlay.querySelector(".close-overlay");

const saveTiragemOverlay = document.getElementById("save-tiragem-overlay");
const tiragemNomeInput = document.getElementById("tiragem-nome");
const confirmarSalvarTiragemBtn = document.getElementById("confirmar-salvar-tiragem");
const closeSaveOverlayBtn = saveTiragemOverlay.querySelector("[data-overlay='save-tiragem-overlay']");

const dailyCardLimitMessage = document.getElementById("daily-card-limit-message");

const btnDoarPix = document.getElementById("btn-doar-pix"); // Novo botão Pix
const pixDonationOverlay = document.getElementById("pix-donation-overlay"); // Novo overlay Pix
const closePixOverlayBtn = pixDonationOverlay.querySelector("[data-overlay='pix-donation-overlay']");
const copyPixKeyBtn = document.getElementById("copy-pix-key-btn");
const pixKeyDisplay = document.getElementById("pix-key");


const ARCANOS_MAIORES = [
    { id: 0, nome: "O Louco", imagem: "o_louco.webp", significado: "Início, potencial puro, liberdade. Representa o espírito livre, novas jornadas e a fé no desconhecido. Pode indicar imprudência ou um salto de fé." },
    { id: 1, nome: "O Mago", imagem: "o_mago.webp", significado: "Iniciativa, poder pessoal, manifestação. Simboliza a capacidade de transformar ideias em realidade, utilizando ferramentas e recursos disponíveis. Domínio e foco." },
    { id: 2, nome: "A Sacerdotisa", imagem: "a_sacerdotisa.webp", significado: "Intuição, mistério, sabedoria interior. Representa o conhecimento oculto, a voz interior e a necessidade de introspecção. Segredos e verdades reveladas internamente." },
    { id: 3, nome: "A Imperatriz", imagem: "a_imperatriz.webp", significado: "Criatividade, fertilidade, abundância. Simboliza a natureza, a nutrição, a beleza e a prosperidade. Conexão com o feminino e a criação." },
    { id: 4, nome: "O Imperador", imagem: "o_imperador.webp", significado: "Autoridade, estrutura, controle. Representa o poder, a disciplina, a ordem e a liderança. Foco na lógica e na construção de bases sólidas." },
    { id: 5, nome: "O Hierofante", imagem: "o_hierofante.webp", significado: "Tradição, ensinamento, fé. Simboliza a sabedoria convencional, instituições espirituais ou de aprendizado. Busca por orientação e conformidade." },
    { id: 6, nome: "Os Amantes", imagem: "os_amantes.webp", significado: "Escolha, união, amor. Representa decisões importantes, relacionamentos e a harmonia entre opostos. Conflitos de valores e atração." },
    { id: 7, nome: "O Carro", imagem: "o_carro.webp", significado: "Vitória, autocontrole, ambição. Simboliza o triunfo, a superação de obstáculos e a determinação em seguir em frente. Direção e progresso." },
    { id: 8, nome: "A Força", imagem: "a_forca.webp", significado: "Coragem, paciência, compaixão. Representa a força interior, a capacidade de dominar impulsos e a resiliência. Força gentil e persistência." },
    { id: 9, nome: "O Eremita", imagem: "o_eremita.webp", significado: "Introspecção, busca interior, solidão. Simboliza a necessidade de reflexão, autoconhecimento e isolamento para encontrar respostas. Orientação e sabedoria." },
    { id: 10, nome: "A Roda da Fortuna", imagem: "a_roda_da_fortuna.webp", significado: "Mudança, destino, ciclos. Representa reviravoltas, sorte e os altos e baixos da vida. Oportunidades e karma." },
    { id: 11, nome: "A Justiça", imagem: "a_justica.webp", significado: "Equilíbrio, verdade, lei. Simboliza imparcialidade, decisões justas e responsabilidade pelas ações. Consequências e integridade." },
    { id: 12, nome: "O Enforcado", imagem: "o_enforcado.webp", significado: "Sacrifício, perspectiva, rendição. Representa um período de suspensão, desistência de velhos hábitos para ganhar nova visão. Iluminação e paciência." },
    { id: 13, nome: "A Morte", imagem: "a_morte.webp", significado: "Fim de ciclo, transformação, renovação. Simboliza o término necessário de algo para que o novo possa surgir. Não é necessariamente morte física, mas mudança profunda." },
    { id: 14, nome: "A Temperança", imagem: "a_temperanca.webp", significado: "Harmonia, equilíbrio, moderação. Representa a paciência, a fusão de opostos e a busca por um meio-termo. Cura e adaptação." },
    { id: 15, nome: "O Diabo", imagem: "o_diabo.webp", significado: "Vício, materialismo, escravidão. Simboliza apego a desejos materiais, obsessões e padrões destrutivos. Despertar para a liberdade." },
    { id: 16, nome: "A Torre", imagem: "a_torre.webp", significado: "Ruptura, caos, revelação. Representa colapso de estruturas antigas, choque e liberação súbita. Quebra de ilusões e libertação." },
    { id: 17, nome: "A Estrela", imagem: "a_estrela.webp", significado: "Esperança, inspiração, renovação. Simboliza fé, serenidade, cura e a conexão com o divino. Orientação e otimismo." },
    { id: 18, nome: "A Lua", imagem: "a_lua.webp", significado: "Ilusão, intuição, inconsciente. Representa sonhos, medos, mistérios e a necessidade de confiar na intuição. Enganos e verdades ocultas." },
    { id: 19, nome: "O Sol", imagem: "o_sol.webp", significado: "Alegria, sucesso, vitalidade. Simboliza clareza, otimismo, realização e felicidade. Iluminação e crescimento." },
    { id: 20, nome: "O Julgamento", imagem: "o_julgamento.webp", significado: "Renascimento, avaliação, perdão. Representa um chamado para a autolibertação, perdão e uma nova fase de vida. Despertar e julgamento final." },
    { id: 21, nome: "O Mundo", imagem: "o_mundo.webp", significado: "Realização, conclusão, totalidade. Simboliza a plenitude, o sucesso, a integração e a celebração de um ciclo completo. Harmonia e êxito." }
];

const ARCANOS_MENORES = [
    // Paus
    { id: 22, nome: "Ás de Paus", imagem: "as_de_paus.webp", significado: "Novo começo, inspiração, potencial criativo." },
    { id: 23, nome: "Dois de Paus", imagem: "dois_de_paus.webp", significado: "Planejamento, progresso, decisões futuras." },
    { id: 24, nome: "Três de Paus", imagem: "tres_de_paus.webp", significado: "Expansão, visão de futuro, parceria." },
    { id: 25, nome: "Quatro de Paus", imagem: "quatro_de_paus.webp", significado: "Celebração, segurança, lar." },
    { id: 26, nome: "Cinco de Paus", imagem: "cinco_de_paus.webp", significado: "Conflito, competição, desafio." },
    { id: 27, nome: "Seis de Paus", imagem: "seis_de_paus.webp", significado: "Vitória, reconhecimento, sucesso." },
    { id: 28, nome: "Sete de Paus", imagem: "sete_de_paus.webp", significado: "Defesa, desafio, resistência." },
    { id: 29, nome: "Oito de Paus", imagem: "oito_de_paus.webp", significado: "Velocidade, ação, movimento." },
    { id: 30, nome: "Nove de Paus", imagem: "nove_de_paus.webp", significado: "Resiliência, perseverança, cautela." },
    { id: 31, nome: "Dez de Paus", imagem: "dez_de_paus.webp", significado: "Sobrecarga, fardo, responsabilidade." },
    { id: 32, nome: "Valete de Paus", imagem: "valete_de_paus.webp", significado: "Notícias, inspiração, entusiasmo." },
    { id: 33, nome: "Cavaleiro de Paus", imagem: "cavaleiro_de_paus.webp", significado: "Ação, aventura, impulso." },
    { id: 34, nome: "Rainha de Paus", imagem: "rainha_de_paus.webp", significado: "Energia, carisma, confiança." },
    { id: 35, nome: "Rei de Paus", imagem: "rei_de_paus.webp", significado: "Liderança, visão, criatividade." },
    // Copas
    { id: 36, nome: "Ás de Copas", imagem: "as_de_copas.webp", significado: "Novo começo emocional, amor, intuição." },
    { id: 37, nome: "Dois de Copas", imagem: "dois_de_copas.webp", significado: "União, parceria, conexão emocional." },
    { id: 38, nome: "Três de Copas", imagem: "tres_de_copas.webp", significado: "Celebração, amizade, comunidade." },
    { id: 39, nome: "Quatro de Copas", imagem: "quatro_de_copas.webp", significado: "Descontentamento, apatia, reavaliação." },
    { id: 40, nome: "Cinco de Copas", imagem: "cinco_de_copas.webp", significado: "Perda, arrependimento, tristeza." },
    { id: 41, nome: "Seis de Copas", imagem: "seis_de_copas.webp", significado: "Nostalgia, passado, inocência." },
    { id: 42, nome: "Sete de Copas", imagem: "sete_de_copas.webp", significado: "Escolhas, ilusões, desejos." },
    { id: 43, nome: "Oito de Copas", imagem: "oito_de_copas.webp", significado: "Abandono, partida, busca espiritual." },
    { id: 44, nome: "Nove de Copas", imagem: "nove_de_copas.webp", significado: "Realização de desejos, satisfação." },
    { id: 45, nome: "Dez de Copas", imagem: "dez_de_copas.webp", significado: "Felicidade familiar, harmonia, plenitude." },
    { id: 46, nome: "Valete de Copas", imagem: "valete_de_copas.webp", significado: "Notícias emocionais, sensibilidade, intuição." },
    { id: 47, nome: "Cavaleiro de Copas", imagem: "cavaleiro_de_copas.webp", significado: "Romance, proposta, mensageiro de emoções." },
    { id: 48, nome: "Rainha de Copas", imagem: "rainha_de_copas.webp", significado: "Empatia, intuição, compaixão." },
    { id: 49, nome: "Rei de Copas", imagem: "rei_de_copas.webp", significado: "Maturidade emocional, controle, sabedoria." },
    // Espadas
    { id: 50, nome: "Ás de Espadas", imagem: "as_de_espadas.webp", significado: "Nova ideia, clareza mental, verdade." },
    { id: 51, nome: "Dois de Espadas", imagem: "dois_de_espadas.webp", significado: "Impasse, decisão difícil, negação." },
    { id: 52, nome: "Três de Espadas", imagem: "tres_de_espadas.webp", significado: "Magoas, dor, tristeza, traição." },
    { id: 53, nome: "Quatro de Espadas", imagem: "quatro_de_espadas.webp", significado: "Descanso, recuperação, meditação." },
    { id: 54, nome: "Cinco de Espadas", imagem: "cinco_de_espadas.webp", significado: "Derrota, conflito, desonra." },
    { id: 55, nome: "Seis de Espadas", imagem: "seis_de_espadas.webp", significado: "Transição, mudança, superação de dificuldades." },
    { id: 56, nome: "Sete de Espadas", imagem: "sete_de_espadas.webp", significado: "Engano, segredos, tática." },
    { id: 57, nome: "Oito de Espadas", imagem: "oito_de_espadas.webp", significado: "Restrição, medo, impotência." }, // Corrigido aqui
    { id: 58, nome: "Nove de Espadas", imagem: "nove_de_espadas.webp", significado: "Preocupação, ansiedade, pesadelos." },
    { id: 59, nome: "Dez de Espadas", imagem: "dez_de_espadas.webp", significado: "Fim doloroso, exaustão, ponto final." },
    { id: 60, nome: "Valete de Espadas", imagem: "valete_de_espadas.webp", significado: "Curiosidade, vigilância, novos conhecimentos." },
    { id: 61, nome: "Cavaleiro de Espadas", imagem: "cavaleiro_de_espadas.webp", significado: "Ação rápida, ambição, confronto." },
    { id: 62, nome: "Rainha de Espadas", imagem: "rainha_de_espadas.webp", significado: "Independência, honestidade, clareza mental." },
    { id: 63, nome: "Rei de Espadas", imagem: "rei_de_espadas.webp", significado: "Autoridade, intelecto, lógica." },
    // Ouros
    { id: 64, nome: "Ás de Ouros", imagem: "as_de_ouros.webp", significado: "Nova oportunidade material, prosperidade, segurança." },
    { id: 65, nome: "Dois de Ouros", imagem: "dois_de_ouros.webp", significado: "Equilíbrio, flexibilidade, gerenciamento." },
    { id: 66, nome: "Três de Ouros", imagem: "tres_de_ouros.webp", significado: "Colaboração, trabalho em equipe, aprendizado." },
    { id: 67, nome: "Quatro de Ouros", imagem: "quatro_de_ouros.webp", significado: "Segurança, controle, possessividade." },
    { id: 68, nome: "Cinco de Ouros", imagem: "cinco_de_ouros.webp", significado: "Pobreza, privação, dificuldades materiais." },
    { id: 69, nome: "Seis de Ouros", imagem: "seis_de_ouros.webp", significado: "Generosidade, doação, recebimento." },
    { id: 70, nome: "Sete de Ouros", imagem: "sete_de_ouros.webp", significado: "Paciência, investimento, colheita tardia." },
    { id: 71, nome: "Oito de Ouros", imagem: "oito_de_ouros.webp", significado: "Dedicação, maestria, trabalho árduo." },
    { id: 72, nome: "Nove de Ouros", imagem: "nove_de_ouros.webp", significado: "Independência, luxo, autossuficiência." },
    { id: 73, nome: "Dez de Ouros", imagem: "dez_de_ouros.webp", significado: "Herança, riqueza familiar, legado." },
    { id: 74, nome: "Valete de Ouros", imagem: "valete_de_ouros.webp", significado: "Novas oportunidades financeiras, estudo prático." },
    { id: 75, nome: "Cavaleiro de Ouros", imagem: "cavaleiro_de_ouros.webp", significado: "Trabalho duro, responsabilidade, paciência." },
    { id: 76, nome: "Rainha de Ouros", imagem: "rainha_de_ouros.webp", significado: "Nutrição, praticidade, segurança material." },
    { id: 77, nome: "Rei de Ouros", imagem: "rei_de_ouros.webp", significado: "Estabilidade, prosperidade, segurança financeira." }
];

const BARALHO_COMPLETO_DADOS = [...ARCANOS_MAIORES, ...ARCANOS_MENORES];

let baralhoParaSelecao = []; // O baralho que será exibido no deck-display
let cartasJaTiradas = []; // Cartas que o usuário já clicou e moveu para a mesa

const MAX_CARTAS_TIRAGEM = 12; // Limite de cartas na mesa (você disse "até 12")

const DAILY_CARD_LIMIT = 12000; // Limite de cartas diárias
let cardsDrawnToday = 0; // Contador de cartas tiradas hoje

// --- Funções de Limite Diário ---
function getDailyCardCount() {
    const today = new Date().toDateString();
    const storedData = JSON.parse(localStorage.getItem('tarotDailyLimit')) || {};
    if (storedData.date === today) {
        cardsDrawnToday = storedData.count;
    } else {
        cardsDrawnToday = 0;
        localStorage.setItem('tarotDailyLimit', JSON.stringify({ date: today, count: 0 }));
    }
}

function incrementDailyCardCount() {
    cardsDrawnToday++;
    const today = new Date().toDateString();
    localStorage.setItem('tarotDailyLimit', JSON.stringify({ date: today, count: cardsDrawnToday }));
    updateDailyCardLimitMessage();
}

function updateDailyCardLimitMessage() {
    const remaining = DAILY_CARD_LIMIT - cardsDrawnToday;
    if (remaining <= 0) {
        dailyCardLimitMessage.textContent = `Você tirou ${DAILY_CARD_LIMIT} cartas hoje. Talvez seja hora de deixar o inconsciente processar. Respire, anote, reflita e volte amanhã.`;
        btnEmbaralhar.disabled = true; // Desabilita embaralhar se o limite for atingido
    } else {
        dailyCardLimitMessage.textContent = `Você pode tirar mais ${remaining} cartas hoje.`;
        btnEmbaralhar.disabled = false;
    }
}

// --- FUNÇÕES UTILS ---

// Algoritmo Fisher-Yates para embaralhar
function embaralharArray(array) {
    let currentIndex = array.length, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }
    return array;
}

// MODIFICADO: Cria o elemento HTML de uma carta
function criarElementoCarta(cartaData, flipped = false) {
    const cartaWrapper = document.createElement("div");
    cartaWrapper.classList.add("carta-wrapper");
    if (flipped) {
        cartaWrapper.classList.add("flipped");
    }
    // Adiciona a classe 'inverted' se a carta deve estar invertida
    if (cartaData.invertida) {
        cartaWrapper.classList.add("inverted");
    }
    cartaWrapper.dataset.id = cartaData.id;
    cartaWrapper.dataset.nome = cartaData.nome;
    cartaWrapper.dataset.invertida = cartaData.invertida;

    const cartaInner = document.createElement("div");
    cartaInner.classList.add("carta-inner");

    const cartaFrente = document.createElement("div");
    cartaFrente.classList.add("carta-frente");
    cartaFrente.style.backgroundImage = `url('img/${cartaData.imagem}')`;
    // A classe 'inverted' no wrapper já cuida da rotação da imagem e texto

    const cartaVerso = document.createElement("div");
    cartaVerso.classList.add("carta-verso"); // Utiliza o background-image definido no CSS

    const cartaNome = document.createElement("div");
    cartaNome.classList.add("carta-nome");
    cartaNome.textContent = cartaData.nome;

    cartaInner.appendChild(cartaVerso);
    cartaInner.appendChild(cartaFrente);
    cartaInner.appendChild(cartaNome);
    cartaWrapper.appendChild(cartaInner);

    return cartaWrapper;
}

// MODIFICADO: Prepara o baralho inicial para exibição no deck-display
function prepararBaralhoParaExibicao() {
    mesaDiv.innerHTML = ""; // Limpa a mesa de cartas tiradas
    cartasJaTiradas = []; // Reseta as cartas tiradas
    tiragemCardsTextarea.value = ""; // Limpa a caixa de texto das cartas tiradas
    btnSalvarTiragem.style.display = "none";

    const tipo = parseInt(tipoBaralhoSelect.value);
    const baseDeck = tipo === 22 ? [...ARCANOS_MAIORES] : [...BARALHO_COMPLETO_DADOS];

    // Adiciona a inversão (50% de chance)
    baralhoParaSelecao = baseDeck.map(carta => {
        const invertida = Math.random() < 0.5; // 50% de chance
        return { ...carta, invertida: invertida };
    });

    embaralharArray(baralhoParaSelecao); // Embaralha as cartas
    mostrarCartasNoDeckDisplay(baralhoParaSelecao);
}

// MODIFICADO: Exibe as cartas embaralhadas na área de `deck-display`
function mostrarCartasNoDeckDisplay(cartas) {
    deckDisplayDiv.innerHTML = ""; // Limpa a exibição anterior
    deckDisplayDiv.style.minHeight = '280px'; // Garante que o container não encolha

    if (cartas.length === 0) {
        deckDisplayDiv.textContent = "Nenhuma carta disponível para seleção.";
        return;
    }

    // Adiciona a classe de animação para espalhar
    deckDisplayDiv.classList.add('animating-spread');

    cartas.forEach((cartaData, index) => {
        const cartaWrapper = criarElementoCarta(cartaData, false); // Carta inicial virada para o verso
        cartaWrapper.dataset.originalIndex = index; // Para controle de remoção

        // Adiciona um delay para o efeito de "espalhar"
        cartaWrapper.style.setProperty('--card-delay', `${index * 0.05}s`);

        // AQUI: O evento de clique para SELECIONAR (mover para a mesa)
        cartaWrapper.addEventListener("click", () => puxarCartaParaMesa(cartaWrapper, cartaData));
        deckDisplayDiv.appendChild(cartaWrapper);
    });

    // Remove a classe de animação após a conclusão da animação
    setTimeout(() => {
        deckDisplayDiv.classList.remove('animating-spread');
    }, cartas.length * 50 + 500); // Pequeno atraso após a animação da última carta
}

// NOVA FUNÇÃO: Lógica para puxar e mover uma carta para a mesa
function puxarCartaParaMesa(cartaElement, cartaData) {
    // Verifica se a carta já foi puxada para a mesa (já está virada)
    // Isso evita que cliques repetidos em cartas já reveladas na mesa contem para o limite.
    if (cartaElement.classList.contains("flipped")) {
        mostrarDescricaoCartaParaCartaNaMesa(cartaElement); // Se já está virada, apenas mostra a descrição
        return;
    }

    if (cardsDrawnToday >= DAILY_CARD_LIMIT) {
        alert(`Você tirou ${DAILY_CARD_LIMIT} cartas hoje. Talvez seja hora de deixar o inconsciente processar. Respire, anote, reflita e volte amanhã.`);
        return;
    }

    if (cartasJaTiradas.length >= MAX_CARTAS_TIRAGEM) {
        alert(`Você já selecionou o máximo de ${MAX_CARTAS_TIRAGEM} cartas para esta tiragem.`);
        return;
    }

    // Remove a carta do deck-display
    cartaElement.remove();

    // Adiciona a carta na mesa e a vira
    cartaElement.classList.add("pulled"); // Adiciona a classe "pulled" para iniciar a animação
    setTimeout(() => {
        cartaElement.classList.remove("pulled");
        cartaElement.classList.add("flipped"); // Vira a carta para mostrar a frente
    }, 50); // Pequeno delay para permitir o início da transição "pulled"

    mesaDiv.appendChild(cartaElement);
    cartasJaTiradas.push(cartaData);
    incrementDailyCardCount(); // Incrementa apenas ao puxar uma nova carta
    updateTiragemCardsTextarea(); // Atualiza a caixa de texto

    btnSalvarTiragem.style.display = "inline-block"; // Mostra o botão de salvar tiragem

    // Remove o event listener de puxar/mover após a carta ser selecionada
    cartaElement.removeEventListener("click", () => puxarCartaParaMesa(cartaElement, cartaData));
    // E adiciona o event listener para mostrar a descrição quando a carta já estiver na mesa
    cartaElement.addEventListener("click", () => mostrarDescricaoCartaParaCartaNaMesa(cartaElement));
}

// Nova função para atualizar a caixa de texto das cartas tiradas
function updateTiragemCardsTextarea() {
    tiragemCardsTextarea.value = cartasJaTiradas.map(c => c.nome + (c.invertida ? ' (Invertida)' : '')).join(', ');
}

// --- Event Listeners ---
btnEmbaralhar.addEventListener("click", prepararBaralhoParaExibicao);
tipoBaralhoSelect.addEventListener("change", prepararBaralhoParaExibicao);

btnCopyTiragemCards.addEventListener("click", () => {
    tiragemCardsTextarea.select();
    document.execCommand('copy');
    alert("Cartas copiadas para a área de transferência!");
});


// Funções de Overlay de Descrição da Carta
function mostrarDescricaoCarta(carta) {
    overlayCardName.textContent = carta.nome;
    overlayCardDescription.textContent = carta.significado;
    overlayCardStudyLink.href = `estudo.html#${carta.nome.toLowerCase().replace(/ /g, '_').replace(/[áéíóúçãõ]/g, (match) => {
        const map = { 'á': 'a', 'é': 'e', 'í': 'i', 'ó': 'o', 'ú': 'u', 'ç': 'c', 'ã': 'a', 'õ': 'o' };
        return map[match];
    })}`; // Gera link para estudo
    cardDescriptionOverlay.classList.add("active");
}

// NOVA FUNÇÃO: Lidar com o clique em cartas JÁ NA MESA para mostrar descrição
function mostrarDescricaoCartaParaCartaNaMesa(cartaElement) {
    const cartaId = parseInt(cartaElement.dataset.id);
    const cartaOriginal = BARALHO_COMPLETO_DADOS.find(c => c.id === cartaId);
    if (cartaOriginal) {
        // Encontra a carta com o estado de inversão correto entre as já tiradas
        const cartaComInversao = cartasJaTiradas.find(c => c.id === cartaId && c.invertida == (cartaElement.dataset.invertida === 'true'));
        if (cartaComInversao) {
            // Se a carta estiver invertida, adicione o prefixo "Invertida: " ao significado
            let significadoAjustado = cartaComInversao.significado;
            if (cartaComInversao.invertida) {
                significadoAjustado = "Invertida: " + significadoAjustado; // Ou um significado oposto, se houver
            }
            mostrarDescricaoCarta({ ...cartaOriginal, significado: significadoAjustado });
        } else {
            mostrarDescricaoCarta(cartaOriginal);
        }
    }
}

function fecharDescricaoCarta() {
    cardDescriptionOverlay.classList.remove("active");
}


// Event listeners para o overlay de salvar tiragem
btnSalvarTiragem.addEventListener("click", () => {
    saveTiragemOverlay.classList.add("active");
});

closeSaveOverlayBtn.addEventListener("click", () => {
    saveTiragemOverlay.classList.remove("active");
});

saveTiragemOverlay.addEventListener("click", (e) => {
    if (e.target === saveTiragemOverlay) {
        saveTiragemOverlay.classList.remove("active");
    }
});

confirmarSalvarTiragemBtn.addEventListener("click", () => {
    const nomeTiragem = tiragemNomeInput.value.trim();
    if (nomeTiragem === "") {
        alert("Por favor, dê um nome para a sua tiragem.");
        return;
    }

    const tiragemSalva = {
        nome: nomeTiragem,
        data: new Date().toLocaleString(),
        cartas: cartasJaTiradas.map(c => ({
            id: c.id,
            nome: c.nome,
            invertida: c.invertida // Salva o estado de inversão da carta
        }))
    };

    let tiragensSalvas = JSON.parse(localStorage.getItem("tiragensTarot")) || [];
    tiragensSalvas.push(tiragemSalva);
    localStorage.setItem("tiragensTarot", JSON.stringify(tiragensSalvas));

    alert("Tiragem salva com sucesso!");
    saveTiragemOverlay.classList.remove("active");
    tiragemNomeInput.value = ""; // Limpa o campo
});

// Listeners para fechar overlays
closeOverlayBtn.addEventListener("click", fecharDescricaoCarta);
cardDescriptionOverlay.addEventListener("click", (e) => {
    if (e.target === cardDescriptionOverlay) {
        fecharDescricaoCarta();
    }
});

// Event listeners para o novo overlay de Doação Pix
btnDoarPix.addEventListener("click", () => {
    pixDonationOverlay.classList.add("active");
});

closePixOverlayBtn.addEventListener("click", () => {
    pixDonationOverlay.classList.remove("active");
});

pixDonationOverlay.addEventListener("click", (e) => {
    if (e.target === pixDonationOverlay) {
        pixDonationOverlay.classList.remove("active");
    }
});

copyPixKeyBtn.addEventListener("click", () => {
    const pixKey = pixKeyDisplay.textContent;
    navigator.clipboard.writeText(pixKey).then(() => {
        alert("Chave Pix copiada para a área de transferência!");
    }).catch(err => {
        console.error('Erro ao copiar a chave Pix: ', err);
        alert("Não foi possível copiar a chave Pix automaticamente. Por favor, copie manualmente: " + pixKey);
    });
});


// Inicialização
document.addEventListener("DOMContentLoaded", () => {
    getDailyCardCount();
    updateDailyCardLimitMessage(); // Atualiza a mensagem do limite diário
    prepararBaralhoParaExibicao(); // Carrega as cartas iniciais
});