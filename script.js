
/* ==============================
   TERRARIUM
   Controle da interface
============================== */

// Estado inicial da aplicação

const state = {
    mode: "automatic",

    devices: {
        pump: false,
        fan: false,
        light: false
    }
};


// Elementos da interface

const autoButton = document.getElementById("auto-mode");
const manualButton = document.getElementById("manual-mode");

const currentMode = document.getElementById("current-mode");

const manualControls = document.getElementById("manual-controls");

const lastUpdate = document.getElementById("last-update");


// ==============================
// ATUALIZAÇÃO DO HORÁRIO
// ==============================

function updateClock() {

    const now = new Date();

    lastUpdate.textContent = now.toLocaleTimeString("pt-BR");

}

updateClock();

setInterval(updateClock, 1000);


// ==============================
// MODO AUTOMÁTICO / MANUAL
// ==============================

function setMode(mode) {

    state.mode = mode;

    const isManual = mode === "manual";

    currentMode.textContent = isManual
        ? "Manual"
        : "Automático";

    autoButton.classList.toggle("active", !isManual);
    manualButton.classList.toggle("active", isManual);

    // Habilita ou desabilita os controles

    document.querySelectorAll(".toggle-button").forEach(button => {

        button.disabled = !isManual;

    });

    // Atualiza os controles visuais

    updateDevices();

}

autoButton.addEventListener("click", () => {

    setMode("automatic");

});

manualButton.addEventListener("click", () => {

    setMode("manual");

});


// ==============================
// CONTROLE DOS EQUIPAMENTOS
// ==============================

function toggleDevice(device) {

    if (state.mode !== "manual") {
        return;
    }

    state.devices[device] = !state.devices[device];

    updateDevices();

}


// Atualiza o estado visual dos equipamentos

function updateDevices() {

    const devices = ["pump", "fan", "light"];

    devices.forEach(device => {

        const isOn = state.devices[device];

        const button = document.querySelector(
            `[data-device="${device}"]`
        );

        const status = document.getElementById(
            `${device}-status`
        );

        const indicator = document.getElementById(
            `${device}-indicator`
        );

        button.textContent = isOn ? "ON" : "OFF";

        button.classList.toggle("active", isOn);

        status.textContent = isOn
            ? "Ligada"
            : "Desligada";

        indicator.classList.toggle("on", isOn);

    });

}


// Eventos dos botões

document.querySelectorAll(".toggle-button").forEach(button => {

    button.addEventListener("click", () => {

        const device = button.dataset.device;

        toggleDevice(device);

    });

});


// ==============================
// INTEGRAÇÃO FUTURA COM ESP32
// ==============================

/*
    A comunicação real será implementada posteriormente.

    O ESP32 deverá disponibilizar os dados do sistema
    através de uma API HTTP.

    Exemplo de estrutura futura:

    {
        "temperature": 25,
        "airHumidity": 65,
        "soilHumidity": 48,
        "luminosity": 320,
        "pump": false,
        "fan": true,
        "light": false,
        "reservoir": "available",
        "mode": "automatic"
    }

    Os campos acima são apenas um exemplo de contrato
    de comunicação, não dados reais do projeto.
*/


// ==============================
// INICIALIZAÇÃO
// ==============================

setMode("automatic");

updateDevices();

console.log("Terrarium iniciado em modo de demonstração.");
