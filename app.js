document.addEventListener('DOMContentLoaded', () => {
  // Vehicle Database Mock
  const vehicles = {
    onix: {
      title: 'Onix Plus 1.0 Turbo',
      year: '2022',
      plate: 'BRA2E19',
      vin: 'VIN MATCH OK',
      odometer: '84.700 km',
      oilLife: '18% (Alerta)',
      oilWarning: true,
      ecuHealth: 'Nominal',
      revisaoTag: '80K KM',
      databaseText: 'BASE GM ATUALIZADA • COMPATIBILIDADE DE PEÇAS OEM ATIVA',
      oilSpec: 'Óleo Dexos1 Gen2 5W30 Sintético (3,5 Litros) + Filtro de Óleo ACDelco',
      faqs: [
        { text: 'Luz de injeção acesa no Onix Turbo', icon: '⚠️' },
        { text: 'Qual óleo correto utilizar?', icon: '💧' },
        { text: 'Barulho na correia dentada banhada a óleo', icon: '🔊' }
      ]
    },
    golf: {
      title: 'Golf GTI 2.0 Turbo',
      year: '2020',
      plate: 'GFK7120',
      vin: 'VIN MATCH OK',
      odometer: '62.400 km',
      oilLife: '65%',
      oilWarning: false,
      ecuHealth: 'Nominal',
      revisaoTag: '60K KM',
      databaseText: 'BASE VW ATUALIZADA • COMPATIBILIDADE DE PEÇAS OEM ATIVA',
      oilSpec: 'Óleo VW 508.00 / 509.00 0W20 ou 502.00 5W40 + Filtro Mann Filter',
      faqs: [
        { text: 'Pressão de turbo reduzida (Código P0299)', icon: '⚠️' },
        { text: 'Troca de óleo do câmbio DSG 6 marchas', icon: '⚙️' },
        { text: 'Barulho de estalo na bomba d\'água', icon: '🔊' }
      ]
    },
    hb20: {
      title: 'HB20 1.0 TGDI',
      year: '2023',
      plate: 'HB2X202',
      vin: 'VIN MATCH OK',
      odometer: '35.100 km',
      oilLife: '82%',
      oilWarning: false,
      ecuHealth: 'Nominal',
      revisaoTag: '40K KM',
      databaseText: 'BASE HYUNDAI ATUALIZADA • COMPATIBILIDADE DE PEÇAS OEM ATIVA',
      oilSpec: 'Óleo 5W30 API SP / ILSAC GF-6 Sintético + Filtro Hyundai OEM',
      faqs: [
        { text: 'Falha de ignição no cilindro 2 (P0302)', icon: '⚠️' },
        { text: 'Intervalo de troca das velas Iridium', icon: '🔧' },
        { text: 'Ruído frio na corrente de distribuição', icon: '🔊' }
      ]
    },
    civic: {
      title: 'Civic Touring 1.5 Turbo',
      year: '2021',
      plate: 'CIV1010',
      vin: 'VIN MATCH OK',
      odometer: '51.000 km',
      oilLife: '40%',
      oilWarning: false,
      ecuHealth: 'Nominal',
      revisaoTag: '50K KM',
      databaseText: 'BASE HONDA ATUALIZADA • COMPATIBILIDADE DE PEÇAS OEM ATIVA',
      oilSpec: 'Óleo Honda Type 2.0 0W20 Sintético + Filtro de Óleo Honda Genuine',
      faqs: [
        { text: 'Alerta de ar condicionado sem gelar', icon: '❄️' },
        { text: 'Especificação do fluido CVT HCF-2', icon: '💧' },
        { text: 'Vibração ao frear em alta velocidade', icon: '🛑' }
      ]
    }
  };

  let currentVehicleKey = 'onix';

  // DOM Elements
  const dashboardView = document.getElementById('dashboardView');
  const chatView = document.getElementById('chatView');
  const vehicleSelectDropdown = document.getElementById('vehicleSelectDropdown');
  const changeVehicleBtn = document.getElementById('changeVehicleBtn');
  const backToDashBtn = document.getElementById('backToDashBtn');

  // Dynamic elements
  const cardVehicleTitle = document.getElementById('cardVehicleTitle');
  const cardVehicleYear = document.getElementById('cardVehicleYear');
  const cardVehiclePlate = document.getElementById('cardVehiclePlate');
  const cardVehicleVin = document.getElementById('cardVehicleVin');
  const statOdometer = document.getElementById('statOdometer');
  const statOilLife = document.getElementById('statOilLife');
  const statEcuHealth = document.getElementById('statEcuHealth');
  const revisaoTagBadge = document.getElementById('revisaoTagBadge');
  const faqChipsContainer = document.getElementById('faqChipsContainer');
  const databaseStatusText = document.getElementById('databaseStatusText');
  const chatVehicleInfoTag = document.getElementById('chatVehicleInfoTag');

  // Input elements
  const chatInput = document.getElementById('chatInput');
  const sendBtn = document.getElementById('sendBtn');
  const cameraInputBtn = document.getElementById('cameraInputBtn');
  const barcodeInputBtn = document.getElementById('barcodeInputBtn');
  const micInputBtn = document.getElementById('micInputBtn');
  const chatMessages = document.getElementById('chatMessages');

  // Function to update UI for selected vehicle
  function updateVehicleUI(key) {
    currentVehicleKey = key;
    const v = vehicles[key];
    if (!v) return;

    cardVehicleTitle.textContent = v.title;
    cardVehicleYear.textContent = v.year;
    cardVehiclePlate.textContent = v.plate;
    cardVehicleVin.textContent = v.vin;
    statOdometer.textContent = v.odometer;
    statOilLife.textContent = v.oilLife;

    if (v.oilWarning) {
      statOilLife.parentElement.className = 'telemetry-value text-alert';
    } else {
      statOilLife.parentElement.className = 'telemetry-value text-success';
    }

    statEcuHealth.textContent = v.ecuHealth;
    revisaoTagBadge.textContent = v.revisaoTag;
    databaseStatusText.textContent = v.databaseText;
    chatVehicleInfoTag.textContent = `${v.title} (${v.year})`;
    vehicleSelectDropdown.value = key;

    // Render FAQs
    faqChipsContainer.innerHTML = '';
    v.faqs.forEach(faq => {
      const btn = document.createElement('button');
      btn.className = 'faq-chip';
      btn.dataset.faq = faq.text;
      btn.innerHTML = `<span class="chip-icon">${faq.icon}</span><span class="chip-text">${faq.text}</span>`;
      btn.addEventListener('click', () => {
        handleUserQuery(faq.text);
      });
      faqChipsContainer.appendChild(btn);
    });
  }

  // Switch View Helper
  function showView(viewName) {
    if (viewName === 'chat') {
      dashboardView.classList.remove('active');
      chatView.classList.add('active');
    } else {
      chatView.classList.remove('active');
      dashboardView.classList.add('active');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Vehicle Select Event listeners
  vehicleSelectDropdown.addEventListener('change', (e) => {
    updateVehicleUI(e.target.value);
  });

  changeVehicleBtn.addEventListener('click', () => {
    vehicleSelectDropdown.focus();
    vehicleSelectDropdown.click();
  });

  backToDashBtn.addEventListener('click', () => {
    showView('dashboard');
  });

  // Action Cards Event listeners
  document.querySelectorAll('.action-card').forEach(card => {
    card.addEventListener('click', () => {
      const action = card.dataset.action;
      const vehicle = vehicles[currentVehicleKey];

      if (action === 'obd') {
        handleUserQuery(`Código OBD-II: Qual a causa provável para o erro P0300 no ${vehicle.title}?`);
      } else if (action === 'audio') {
        handleUserQuery(`[Gravação de Áudio enviada] Análise acústica de ruído no motor do ${vehicle.title}`);
      } else if (action === 'visual') {
        handleUserQuery(`[Foto do Painel/Peça enviada] Scanner visual para diagnosticar alerta no ${vehicle.title}`);
      } else if (action === 'revisao') {
        handleUserQuery(`Plano de Revisão de ${vehicle.revisaoTag} para o ${vehicle.title} com ${vehicle.odometer}`);
      }
    });
  });

  // Quick Chat Send Logic
  function handleSendMessage() {
    const text = chatInput.value.trim();
    if (text) {
      handleUserQuery(text);
      chatInput.value = '';
    }
  }

  sendBtn.addEventListener('click', handleSendMessage);
  chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  });

  // Media Button Simulators
  cameraInputBtn.addEventListener('click', () => {
    const v = vehicles[currentVehicleKey];
    handleUserQuery(`📷 [Foto Anexada] Escanear componente/luz de alerta do ${v.title}`);
  });

  barcodeInputBtn.addEventListener('click', () => {
    const v = vehicles[currentVehicleKey];
    handleUserQuery(`🔍 [Código de Peça Escaneado] Verificar compatibilidade do filtro/peça para o veículo Placa ${v.plate}`);
  });

  micInputBtn.addEventListener('click', () => {
    const v = vehicles[currentVehicleKey];
    handleUserQuery(`🎙️ [Áudio Gravado] "Estou ouvindo um barulho estridente ao acelerar meu ${v.title}"`);
  });

  // Process User Query and generate response
  function handleUserQuery(userText) {
    showView('chat');

    // Add User Message
    appendMessage(userText, 'user');

    // Show bot typing indicator
    const typingId = appendTypingIndicator();

    setTimeout(() => {
      removeTypingIndicator(typingId);
      const botResponse = generateAIResponse(userText, currentVehicleKey);
      appendMessage(botResponse.text, 'bot', botResponse.partRecommendation);
    }, 1000);
  }

  function appendMessage(text, sender, partRecommendation = null) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `msg-bubble msg-${sender}`;

    if (sender === 'bot') {
      let contentHtml = `
        <div class="msg-bot-header">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="11" width="18" height="10" rx="2"></rect>
            <circle cx="12" cy="5" r="2"></circle>
            <path d="M12 7v4"></path>
          </svg>
          <span>AutoPeças PRO IA</span>
        </div>
        <div>${text}</div>
      `;

      if (partRecommendation) {
        contentHtml += `
          <div class="part-recommendation">
            <h4>📦 Peça Recomendada (Compatibilidade Garantida)</h4>
            <p><strong>Item:</strong> ${partRecommendation.name}</p>
            <p><strong>Código OEM:</strong> ${partRecommendation.code}</p>
            <p><strong>Status:</strong> ${partRecommendation.status}</p>
          </div>
        `;
      }

      msgDiv.innerHTML = contentHtml;
    } else {
      msgDiv.textContent = text;
    }

    chatMessages.appendChild(msgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function appendTypingIndicator() {
    const typingDiv = document.createElement('div');
    const id = 'typing_' + Date.now();
    typingDiv.id = id;
    typingDiv.className = 'msg-bubble msg-bot';
    typingDiv.innerHTML = `
      <div class="msg-bot-header">
        <span>AutoPeças PRO IA analisando telemetria...</span>
      </div>
      <div style="color: #64748b; font-style: italic;">Consultando base de dados técnica e códigos de peças...</div>
    `;
    chatMessages.appendChild(typingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    return id;
  }

  function removeTypingIndicator(id) {
    const el = document.getElementById(id);
    if (el) el.remove();
  }

  // Response Generator Logic
  function generateAIResponse(query, vehicleKey) {
    const v = vehicles[vehicleKey];
    const q = query.toLowerCase();

    if (q.includes('p0300') || q.includes('código obd') || q.includes('dtc') || q.includes('falha')) {
      return {
        text: `Análise do Código DTC <strong>P0300 (Falha de Ignição Múltipla/Cilindros Aleatórios)</strong> para seu <strong>${v.title}</strong>:<br><br>
        • <strong>Causas Prováveis:</strong> Velas de ignição desgastadas, bobina de ignição com fuga de corrente ou bicos injetores sujos/com vazamento.<br>
        • <strong>Diagnóstico Recomendado:</strong> Testar resistência da bobina e medir compressão dos cilindros.<br>
        • <strong>Gravidade:</strong> Moderada a Alta (pode danificar o catalisador se persistir).`,
        partRecommendation: {
          name: `Jogo de Velas Iridium + Bobina de Ignição Original`,
          code: `OEM-${v.plate.substring(0, 3)}-9921`,
          status: `Em estoque com frete grátis`
        }
      };
    }

    if (q.includes('óleo') || q.includes('oleo') || q.includes('lubrificante')) {
      return {
        text: `Especificação Técnica de Óleo e Lubrificante para <strong>${v.title}</strong>:<br><br>
        • <strong>Especificação Oficial:</strong> ${v.oilSpec}.<br>
        • <strong>Capacidade do Cárter:</strong> Aproximadamente 3,5L a 4,2L (com troca de filtro).<br>
        • <strong>Intervalo Recomendado:</strong> A cada 10.000 km ou 12 meses (o que ocorrer primeiro).<br>
        • <strong>Alerta Atual de Vida Útil:</strong> ${v.oilLife}.`,
        partRecommendation: {
          name: `Kit Troca de Óleo Completa (Óleo Sintético + Filtro de Óleo + Anel do Cárter)`,
          code: `KIT-OIL-${vehicleKey.toUpperCase()}-2024`,
          status: `Compatibilidade 100% Garantida`
        }
      };
    }

    if (q.includes('áudio') || q.includes('audio') || q.includes('ruído') || q.includes('ruido') || q.includes('barulho')) {
      return {
        text: `Análise Acústica Processada para o <strong>${v.title}</strong>:<br><br>
        • <strong>Padrão Sonoro Detectado:</strong> Ruído de fricção metálica / agudo em baixa rotação.<br>
        • <strong>Diagnóstico da IA:</strong> 85% de probabilidade de ser desgaste na correia de acessórios / tensor ou ressecamento da correia banhada a óleo.<br>
        • <strong>Recomendação:</strong> Verificar tensão da correia e estado do rolamento do alternador.`,
        partRecommendation: {
          name: `Kit Correia Poly-V + Tensor Automático`,
          code: `BELT-KIT-${vehicleKey.toUpperCase()}-OEM`,
          status: `Disponível para envio imediato`
        }
      };
    }

    if (q.includes('foto') || q.includes('scanner visual') || q.includes('visão') || q.includes('painel')) {
      return {
        text: `Análise de Imagem Concluída para <strong>${v.title}</strong>:<br><br>
        • <strong>Símbolo Identificado:</strong> Luz do Sistema de Injeção Eletrônica e Gestão de Emissões.<br>
        • <strong>Status da ECU:</strong> Código de anomalia registrado na memória recente.<br>
        • <strong>Ação Recomendada:</strong> Conectar scanner OBD-II para leitura precisa do parâmetro de mistura ar/combustível.`,
        partRecommendation: {
          name: `Scanner Diagnóstico Automotivo OBD2 Bluetooth Pro`,
          code: `DIAG-OBD2-PRO`,
          status: `Pronta Entrega`
        }
      };
    }

    if (q.includes('revisão') || q.includes('revisao') || q.includes('plano')) {
      return {
        text: `Plano de Revisão Preventiva (<strong>${v.revisaoTag}</strong> - Odômetro: ${v.odometer}) para seu <strong>${v.title}</strong>:<br><br>
        1. <strong>Substituição de Fluidos:</strong> Óleo do motor, fluido de freio DOT4 e líquido de arrefecimento.<br>
        2. <strong>Sistema de Ignição:</strong> Inspeção/troca das velas de ignição.<br>
        3. <strong>Filtros:</strong> Ar do motor, combustível e ar condicionado (cabine).<br>
        4. <strong>Segurança:</strong> Verificação de espessura de pastilhas e discos de freio.`,
        partRecommendation: {
          name: `Kit Revisão Completa dos ${v.revisaoTag}`,
          code: `REV-KIT-${v.revisaoTag.replace(' ', '')}`,
          status: `Kit Original Recomendado`
        }
      };
    }

    // Default Fallback Response
    return {
      text: `Entendi sua dúvida sobre o <strong>${v.title}</strong> ("${query}").<br><br>
      Com base na telemetria e na base de dados técnica do veículo (Placa ${v.plate}), verificamos que o sistema está operacional.<br>
      Para um diagnóstico mais aprofundado, você pode nos enviar um código OBD-II específico (ex: P0171, P0420) ou gravar um áudio do funcionamento do motor.`,
      partRecommendation: {
        name: `Peças Originais e Acessórios para ${v.title}`,
        code: `OEM-GENUINE-PARTS`,
        status: `Verificado por VIN`
      }
    };
  }

  // Initialize UI with default vehicle (onix)
  updateVehicleUI('onix');
});
