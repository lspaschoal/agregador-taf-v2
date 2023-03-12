// Grupos de localidades. Cada grupo gera um fieldset com o nome da propriedade, onde são criados os inputs para cada aerodromo

const briefing = {
    'tma-rj': [
        'SBGL.GIG.principal',
        'SBRJ.SDU.principal'
    ],
    'tma-sp': [
        'SBGR.GRU.principal',
        'SBSP.CGH.principal',
        'SBKP.VCP.principal'
    ],
    'fir-az': [
        'SBSL.SLZ.principal',
        'SBIZ.IMP.principal',
        'SBBE.BEL.principal',
        'SBSN.STM.principal',
        'SBMA.MAB',
        'SBHT.ATM',
        'SBCJ.CKS',
        'SBMQ.MCP.principal',
        'SBEG.MAO.principal',
        'SBTT.TBT',
        'SBTF.TFF',
        'SBBV.BVB.principal',
        'SBPV.PVH.principal',
        'SBRB.RBR.principal',
        'SBCZ.CZS',
        'SBCY.CGB.principal',
        'SBSI.OPS',
        'SBRD.ROO',
        'SBAT.AFL'
    ],
    'fir-re': [
        'SBVT.VIX.principal',
        'SBPS.BPS',
        'SBIL.IOS',
        'SBTC.UMA',
        'SBVC.VDC',
        'SBSV.SSA.principal',
        'SBAR.AJU.principal',
        'SBMO.MCZ.principal',
        'SBRF.REC.principal',
        'SBFN.FEN',
        'SBPL.PNZ',
        'SBJP.JPA.principal',
        'SBKG.CPV',
        'SBSG.NAT.principal',
        'SBFZ.FOR.principal',
        'SBJU.JDO',
        'SBJE.JJD',
        'SBAC.ARX',
        'SBTE.THE.principal',
        'SBPB.PHB'
    ],
    'fir-bs': [
        'SBBR.BSB.principal',
        'SBGO.GYN.principal',
        'SBPJ.PMW.principal',
        'SBCN.CLV',
        'SBCF.CNF.principal',
        'SBBH.PLU.principal',
        'SBLS.SBLS',
        'SBUL.UDI',
        'SBUR.UBA',
        'SBMK.MOC',
        'SBRP.RAO',
        'SBSR.SJP',
        'SBAE.JTC',
        'SDSC.QSC',
    ],
    'fir-cw': [
        'SBME.MEA',
        'SBDN.PPB',
        'SBZM.IZA',
        'SBPA.POA.principal',
        'SBCX.CXJ',
        'SBUG.URG',
        'SBBG.BGX',
        'SBPK.PET',
        'SBFL.FLN.principal',
        'SBNF.NVT.principal',
        'SBJV.JOI',
        'SBCH.XAP',
        'SBJA.JJG',
        'SBCT.CWB.principal',
        'SBBI.BFH',
        'SBFI.IGU.principal',
        'SBLO.LDB',
        'SBMG.MGF',
        'SBCA.CAC',
        'SBCG.CGR.principal',
        'SBDB.BYO',
        'SBDO.DOU',
    ]
}
// Cria o array para iteração dos grupos e aeródromos
const GRUPOS = Object.entries(briefing);

// Métodos úteis na exibição dos dados
// Retorna o codigo icao de uma localidade selecionada
const icao = localidade => localidade.substring(0, 4);
// Retorna o codigo iata de uma localidade selecionada
const iata = localidade => localidade.substring(5, 8);

// Retorna a lista de ICAOs cadastrados
const getAllICAO = () => {
    let icaos = [];
    for (let ads of Object.values(briefing)) {
        let aerodromos = ads.map(item => icao(item));
        icaos = [...icaos, ...aerodromos];
    }
    return icaos;
}

const horaUTC = new Date().getUTCHours();
let horas_inicio, horas_meio, horas_fim;
if(horaUTC >= 3 && horaUTC < 9){
    horas_inicio = '09:00-11:00';
    horas_meio = '11:00-13:00';
    horas_fim = '13:00-15:00';
}else if(horaUTC >= 9 && horaUTC < 15){
    horas_inicio = '15:00-17:00';
    horas_meio = '17:00-19:00';
    horas_fim = '19:00-21:00';
}else if(horaUTC >= 15 && horaUTC < 21){
    horas_inicio = '21:00-23:00';
    horas_meio = '23:00-01:00';
    horas_fim = '01:00-03:00';
}else{
    horas_inicio = '03:00-05:00';
    horas_meio = '05:00-07:00';
    horas_fim = '07:00-09:00';
}

function getData(url) {
    return new Promise((resolve, reject) => {
        fetch(url)
            .then((resp) => resp.json())
            .then((data) => {
                resolve(data);
            });
    })
}

// Edita os TAFS para exibição
const tabulaTAF = (taf) => {
    return taf.replace('TN', '<BR>TN').replaceAll('BECMG', '<BR>BECMG').replaceAll('TEMPO', '<BR>TEMPO').replaceAll('PROB', '<BR>PROB').replaceAll('RMK', '<BR>RMK').replaceAll('FM', '<BR>FM');
}

// Gera os campos para inserir a informação
const gerarCampos = function () {
    for (let i = 0; i < GRUPOS.length; i++) {
        //Cria os fieldsets com as legendas de cada grupo
        let fs = document.createElement('fieldset');
        let leg = document.createElement('legend');
        leg.textContent = GRUPOS[i][0].toUpperCase();
        fs.appendChild(leg);
        document.getElementById('formulario').appendChild(fs);

        // Cria os campos para preenchimento
        for (let j = 0; j < GRUPOS[i][1].length; j++) {
            //Cria uma div pra cada aerodromo
            let div = document.createElement('div');
            div.classList.add('div_ad');
            fs.appendChild(div);
            // Cria a para o TAF
            let div_taf = document.createElement('div');
            div_taf.classList.add('div_taf');
            div_taf.id = `taf${icao(GRUPOS[i][1][j])}`;
            div.appendChild(div_taf);
            // Cria a label de cada aerodromo
            let label = document.createElement('label');
            label.textContent = icao(GRUPOS[i][1][j]);
            label.classList.add('label_icao')
            div.appendChild(label);
            // Cria o input de cada aerodromo
            div.appendChild(document.createElement("br"));
            let label_inicio = document.createElement('label');
            label_inicio.classList.add('horarios');
            label_inicio.textContent = horas_inicio;
            div.appendChild(label_inicio);
            let input_inicio = document.createElement('input');
            input_inicio.type = 'text';
            input_inicio.id = GRUPOS[i][1][j]+'_inicio';
            input_inicio.setAttribute('placeholder','Início');
            div.appendChild(input_inicio);
            div.appendChild(document.createElement("br"));
            let label_meio = document.createElement('label');
            label_meio.classList.add('horarios');
            label_meio.textContent = horas_meio;
            div.appendChild(label_meio);
            let input_meio = document.createElement('input');
            input_meio.type = 'text';
            input_meio.id = GRUPOS[i][1][j]+'_meio';
            input_meio.setAttribute('placeholder','Meio');
            div.appendChild(input_meio);
            div.appendChild(document.createElement("br"));
            let label_fim = document.createElement('label');
            label_fim.classList.add('horarios');
            label_fim.textContent = horas_fim;
            div.appendChild(label_fim);
            let input_fim = document.createElement('input');
            input_fim.type = 'text';
            input_fim.id = GRUPOS[i][1][j]+'_fim';
            input_fim.setAttribute('placeholder','Fim');
            div.appendChild(input_fim);
        }

        let requisicoes = [];

        // Gerando as urls para as promises
        getAllICAO().forEach(icao => {
            requisicoes.push(getData(`https://api-redemet.decea.mil.br/mensagens/taf/${icao}?api_key=6vmvTQDP1t8thEEAUkCCj4z4TRjrJLcb561p1SRi`));
        });

        // Buscando os TAF no REDEMET
        Promise.all(requisicoes)
            .then(dados => {
                // Inserindo os TAF nos  campos
                dados.forEach(resposta => {
                    if (resposta.data.data[0]) {
                        let div_taf = document.getElementById(`taf${resposta.data.data[0].id_localidade}`);
                        const msg = tabulaTAF(resposta.data.data[0].mens);
                        div_taf.innerHTML = msg;
                    }
                });
                // inserindo os campos dos TAF não dinponíveis
                getAllICAO().forEach(icao => {
                    let div_taf = document.getElementById(`taf${icao}`);
                    if (div_taf.textContent === '') {
                        div_taf.textContent = `Mensagem TAF de ${icao} não localizada na base de dados da REDEMET`;
                        div_taf.style.setProperty('color', 'red');
                    };
                })
            })
    }
}

// Chamada da função ao carregar a página
gerarCampos();

const gerarBriefing = function (periodo) {
    let briefing = {};
    // Cria as chaves para os briefings de cada grupo
    for (let i = 0; i < GRUPOS.length; i++) {
        briefing[GRUPOS[i][0]] = {
            'nao_significativa': []
        };
        // Lê cada input e se não for nulo insere o briefing pago se não existir, ou se já existir outro adiciona o aerodromo igual
        for (let j = 0; j < GRUPOS[i][1].length; j++) {
            // Se não houver briefing para o aerodromo iterado, o próximo é avaliado
            let input = document.getElementById(GRUPOS[i][1][j]+'_'+periodo);
            if (!input.value) {
                if (GRUPOS[i][1][j].indexOf('principal') > -1) briefing[GRUPOS[i][0]]['nao_significativa'].push(input.id);
                continue;
            }
            // Verifica se o briefing pago já existe nesse grupo. Se não existir insere o briefing e o areodromo, se existir adiciona o aerodromo
            let condicao = input.value.toLowerCase();
            if (condicao in briefing[GRUPOS[i][0]]) {
                let el = briefing[GRUPOS[i][0]];
                let elCondicao = el[condicao];
                elCondicao.push(input.id);
            } else {
                let el = briefing[GRUPOS[i][0]];
                el[condicao] = [input.id];
            }
        }
    }
    return briefing;
}

// const imprimePeriodo = function (periodo) {
//     document.getElementById('resultado')
//     // Gera o briefing
//     let briefing = gerarBriefing(periodo);
//     // Cria a tabela para exibição
//     let tabela = document.createElement('table');
//     tabela.classList.add('coordenacao');
//     // Criar cabeçalho
//     let cabecalho = document.createElement('tr');
//     let th1 = document.createElement('th');
//     th1.textContent = 'TMA/FIR';
//     cabecalho.appendChild(th1);
//     let th2 = document.createElement('th');
//     let horarios = '';
//     if (periodo === 'inicio') horarios = horas_inicio;
//     if (periodo === 'meio') horarios = horas_meio;
//     if (periodo === 'fim') horarios = horas_fim;
//     horarios = horarios.replace('-',' UTC ÀS ');
//     th2.textContent = 'PREVISÕES - ' + horarios + ' UTC';
//     cabecalho.appendChild(th2);
//     let aviso = document.createElement('p');
//     aviso.textContent = 'PREVISÕES OBTIDAS ATRAVÉS DE PROGNÓSTICOS DIVULGADOS (TAF) E DO PREVISOR DO CGNA, PODENDO HAVER ALTERAÇÕES, AS QUAIS SERÃO INFORMADAS PELA MENSAGEM DE TEMPO REAL';
//     aviso.classList.add('aviso_de_responsabilidade')
//     th2.appendChild(aviso);
//     tabela.appendChild(cabecalho);
//     // Cria as linhas baseadas em cada grupo. O índice começa em 1 pois pula a chave 'nao_significativa' para gerar a string de
//     // "Sem previsão significativa" corretamente
//     for (let i = 0; i < GRUPOS.length; i++) {
//         // nova linha
//         let tr = document.createElement('tr');
//         tabela.appendChild(tr);
//         // celula com o nome do grupo
//         let td1 = document.createElement('td');
//         td1.classList.add('coluna_fir')
//         let grupo = GRUPOS[i][0].toUpperCase();
//         td1.textContent = grupo;
//         tr.appendChild(td1);
//         // celula com a condição meteorológica
//         let td2 = document.createElement('td');
//         let condicoes_localidades = Object.entries(briefing[GRUPOS[i][0]]);
//         for (let j = 0; j < condicoes_localidades.length; j++) {
//             if (condicoes_localidades[j][0] === 'nao_significativa' && condicoes_localidades[j][1].length === 0) continue
//             let p = document.createElement('p');
//             (condicoes_localidades[j][0] === 'nao_significativa') ? p.textContent = 'Sem previsão significativa para ': p.textContent = 'Previsão de ' + condicoes_localidades[j][0] + ' para ';
//             for (let k = 0; k < condicoes_localidades[j][1].length; k++) {
//                 p.textContent += iata(condicoes_localidades[j][1][k]);
//                 if (k < condicoes_localidades[j][1].length - 1) {
//                     p.textContent += '/';
//                 }
//             }
//             td2.appendChild(p);
//             tr.appendChild(td2);
//         }
//     }
//     document.getElementById('resultado').appendChild(tabela);
// }


const imprimeTabela = function(fir,previsao1,previsao2,previsao3){
    let tabela = document.createElement('table');
    tabela.classList.add('coordenacao');
    // cabeçalho
    let cabecalho = document.createElement('tr');
    let th = document.createElement('th');
    th.setAttribute('colspan',3);
    th.textContent = 'PREVISÕES'
    cabecalho.appendChild(th);
    tabela.appendChild(cabecalho);
    // linhas
    let tr1 = document.createElement('tr');
    let tr2 = document.createElement('tr');
    let tr3 = document.createElement('tr');
    // fir
    let td_fir = document.createElement('td');
    td_fir.setAttribute('rowspan',3);
    td_fir.classList.add('td_fir');
    td_fir.textContent = fir;
    tr1.appendChild(td_fir);
    // periodo 1
    let td_horarios1 = document.createElement('td')
    td_horarios1.textContent = horas_inicio;
    tr1.appendChild(td_horarios1);
    let td_previsao1 = document.createElement('td');
    td_previsao1.classList.add('previsoes');
    td_previsao1.innerHTML = previsao1;
    tr1.appendChild(td_previsao1);
    tabela.appendChild(tr1);
    //periodo 2
    let td_horarios2 = document.createElement('td')
    td_horarios2.textContent = horas_meio;
    tr2.appendChild(td_horarios2);
    let td_previsao2 = document.createElement('td');
    td_previsao2.classList.add('previsoes');
    td_previsao2.innerHTML = previsao2;
    tr2.appendChild(td_previsao2);
    tabela.appendChild(tr2);
    //periodo 3
    let td_horarios3 = document.createElement('td')
    td_horarios3.textContent = horas_fim;
    tr3.appendChild(td_horarios3);
    let td_previsao3 = document.createElement('td');
    td_previsao3.classList.add('previsoes');
    td_previsao3.innerHTML = previsao3;
    tr3.appendChild(td_previsao3);
    tabela.appendChild(tr3);
    // adicionando ao resultado
    document.getElementById('resultado').appendChild(tabela);
}

const imprimeBriefing = function (){
    limpaTabela();
    const previsoes = [gerarBriefing('inicio') ,gerarBriefing('meio'), gerarBriefing('fim')];
    //TMA-RJ
    let previsao_tmarj_1 = [];
    if(previsoes[0]['tma-rj'].nao_significativa.length > 0){
        let bases = []
        previsoes[0]['tma-rj'].nao_significativa.forEach(base => bases.push(iata(base)))
        bases = bases.join('/');
        previsao_tmarj_1.push('Sem previsão significativa para ' + bases);
    }
    for(let[previsao,localidades] of Object.entries(previsoes[0]['tma-rj'])){
        if(previsao !== 'nao_significativa'){
            let bases = [];
            localidades.forEach(localidade => bases.push(iata(localidade)));
            bases = bases.join('/');
            previsao_tmarj_1.push('Previsão de ' + previsao + ' para ' + bases);
        }
    }
    previsao_tmarj_1 = previsao_tmarj_1.join('<br>');
    let previsao_tmarj_2 = [];
    if(previsoes[1]['tma-rj'].nao_significativa.length > 0){
        let bases = []
        previsoes[1]['tma-rj'].nao_significativa.forEach(base => bases.push(iata(base)))
        bases = bases.join('/');
        previsao_tmarj_2.push('Sem previsão significativa para ' + bases);
    }
    for(let[previsao,localidades] of Object.entries(previsoes[1]['tma-rj'])){
        if(previsao !== 'nao_significativa'){
            let bases = [];
            localidades.forEach(localidade => bases.push(iata(localidade)));
            bases = bases.join('/');
            previsao_tmarj_2.push('Previsão de ' + previsao + ' para ' + bases);
        }
    }
    previsao_tmarj_2 = previsao_tmarj_2.join('<br>');
    let previsao_tmarj_3 = [];
    if(previsoes[2]['tma-rj'].nao_significativa.length > 0){
        let bases = []
        previsoes[2]['tma-rj'].nao_significativa.forEach(base => bases.push(iata(base)))
        bases = bases.join('/');
        previsao_tmarj_3.push('Sem previsão significativa para ' + bases);
    }
    for(let[previsao,localidades] of Object.entries(previsoes[2]['tma-rj'])){
        if(previsao !== 'nao_significativa'){
            let bases = [];
            localidades.forEach(localidade => bases.push(iata(localidade)));
            bases = bases.join('/');
            previsao_tmarj_3.push('Previsão de ' + previsao + ' para ' + bases);
        }
    }
    previsao_tmarj_3 = previsao_tmarj_3.join('<br>');
    imprimeTabela('TMA-RJ',previsao_tmarj_1,previsao_tmarj_2,previsao_tmarj_3);

    //TMA-SP
    let previsao_tmasp_1 = [];
    if(previsoes[0]['tma-sp'].nao_significativa.length > 0){
        let bases = []
        previsoes[0]['tma-sp'].nao_significativa.forEach(base => bases.push(iata(base)))
        bases = bases.join('/');
        previsao_tmasp_1.push('Sem previsão significativa para ' + bases);
    }
    for(let[previsao,localidades] of Object.entries(previsoes[0]['tma-sp'])){
        if(previsao !== 'nao_significativa'){
            let bases = [];
            localidades.forEach(localidade => bases.push(iata(localidade)));
            bases = bases.join('/');
            previsao_tmasp_1.push('Previsão de ' + previsao + ' para ' + bases);
        }
    }
    previsao_tmasp_1 = previsao_tmasp_1.join('<br>');
    let previsao_tmasp_2 = [];
    if(previsoes[1]['tma-sp'].nao_significativa.length > 0){
        let bases = []
        previsoes[1]['tma-sp'].nao_significativa.forEach(base => bases.push(iata(base)))
        bases = bases.join('/');
        previsao_tmasp_2.push('Sem previsão significativa para ' + bases);
    }
    for(let[previsao,localidades] of Object.entries(previsoes[1]['tma-sp'])){
        if(previsao !== 'nao_significativa'){
            let bases = [];
            localidades.forEach(localidade => bases.push(iata(localidade)));
            bases = bases.join('/');
            previsao_tmasp_2.push('Previsão de ' + previsao + ' para ' + bases);
        }
    }
    previsao_tmasp_2 = previsao_tmasp_2.join('<br>');
    let previsao_tmasp_3 = [];
    if(previsoes[2]['tma-sp'].nao_significativa.length > 0){
        let bases = []
        previsoes[2]['tma-sp'].nao_significativa.forEach(base => bases.push(iata(base)))
        bases = bases.join('/');
        previsao_tmasp_3.push('Sem previsão significativa para ' + bases);
    }
    for(let[previsao,localidades] of Object.entries(previsoes[2]['tma-sp'])){
        if(previsao !== 'nao_significativa'){
            let bases = [];
            localidades.forEach(localidade => bases.push(iata(localidade)));
            bases = bases.join('/');
            previsao_tmasp_3.push('Previsão de ' + previsao + ' para ' + bases);
        }
    }
    previsao_tmasp_3 = previsao_tmasp_3.join('<br>');
    imprimeTabela('TMA-SP',previsao_tmasp_1,previsao_tmasp_2,previsao_tmasp_3);

    //fir-az
    let previsao_firaz_1 = [];
    if(previsoes[0]['fir-az'].nao_significativa.length > 0){
        let bases = []
        previsoes[0]['fir-az'].nao_significativa.forEach(base => bases.push(iata(base)))
        bases = bases.join('/');
        previsao_firaz_1.push('Sem previsão significativa para ' + bases);
    }
    for(let[previsao,localidades] of Object.entries(previsoes[0]['fir-az'])){
        if(previsao !== 'nao_significativa'){
            let bases = [];
            localidades.forEach(localidade => bases.push(iata(localidade)));
            bases = bases.join('/');
            previsao_firaz_1.push('Previsão de ' + previsao + ' para ' + bases);
        }
    }
    previsao_firaz_1 = previsao_firaz_1.join('<br>');
    let previsao_firaz_2 = [];
    if(previsoes[1]['fir-az'].nao_significativa.length > 0){
        let bases = []
        previsoes[1]['fir-az'].nao_significativa.forEach(base => bases.push(iata(base)))
        bases = bases.join('/');
        previsao_firaz_2.push('Sem previsão significativa para ' + bases);
    }
    for(let[previsao,localidades] of Object.entries(previsoes[1]['fir-az'])){
        if(previsao !== 'nao_significativa'){
            let bases = [];
            localidades.forEach(localidade => bases.push(iata(localidade)));
            bases = bases.join('/');
            previsao_firaz_2.push('Previsão de ' + previsao + ' para ' + bases);
        }
    }
    previsao_firaz_2 = previsao_firaz_2.join('<br>');
    let previsao_firaz_3 = [];
    if(previsoes[2]['fir-az'].nao_significativa.length > 0){
        let bases = []
        previsoes[2]['fir-az'].nao_significativa.forEach(base => bases.push(iata(base)))
        bases = bases.join('/');
        previsao_firaz_3.push('Sem previsão significativa para ' + bases);
    }
    for(let[previsao,localidades] of Object.entries(previsoes[2]['fir-az'])){
        if(previsao !== 'nao_significativa'){
            let bases = [];
            localidades.forEach(localidade => bases.push(iata(localidade)));
            bases = bases.join('/');
            previsao_firaz_3.push('Previsão de ' + previsao + ' para ' + bases);
        }
    }
    previsao_firaz_3 = previsao_firaz_3.join('<br>');
    imprimeTabela('FIR-AZ',previsao_firaz_1,previsao_firaz_2,previsao_firaz_3);

    //fir-bs
    let previsao_firbs_1 = [];
    if(previsoes[0]['fir-bs'].nao_significativa.length > 0){
        let bases = []
        previsoes[0]['fir-bs'].nao_significativa.forEach(base => bases.push(iata(base)))
        bases = bases.join('/');
        previsao_firbs_1.push('Sem previsão significativa para ' + bases);
    }
    for(let[previsao,localidades] of Object.entries(previsoes[0]['fir-bs'])){
        if(previsao !== 'nao_significativa'){
            let bases = [];
            localidades.forEach(localidade => bases.push(iata(localidade)));
            bases = bases.join('/');
            previsao_firbs_1.push('Previsão de ' + previsao + ' para ' + bases);
        }
    }
    previsao_firbs_1 = previsao_firbs_1.join('<br>');
    let previsao_firbs_2 = [];
    if(previsoes[1]['fir-bs'].nao_significativa.length > 0){
        let bases = []
        previsoes[1]['fir-bs'].nao_significativa.forEach(base => bases.push(iata(base)))
        bases = bases.join('/');
        previsao_firbs_2.push('Sem previsão significativa para ' + bases);
    }
    for(let[previsao,localidades] of Object.entries(previsoes[1]['fir-bs'])){
        if(previsao !== 'nao_significativa'){
            let bases = [];
            localidades.forEach(localidade => bases.push(iata(localidade)));
            bases = bases.join('/');
            previsao_firbs_2.push('Previsão de ' + previsao + ' para ' + bases);
        }
    }
    previsao_firbs_2 = previsao_firbs_2.join('<br>');
    let previsao_firbs_3 = [];
    if(previsoes[2]['fir-bs'].nao_significativa.length > 0){
        let bases = []
        previsoes[2]['fir-bs'].nao_significativa.forEach(base => bases.push(iata(base)))
        bases = bases.join('/');
        previsao_firbs_3.push('Sem previsão significativa para ' + bases);
    }
    for(let[previsao,localidades] of Object.entries(previsoes[2]['fir-bs'])){
        if(previsao !== 'nao_significativa'){
            let bases = [];
            localidades.forEach(localidade => bases.push(iata(localidade)));
            bases = bases.join('/');
            previsao_firbs_3.push('Previsão de ' + previsao + ' para ' + bases);
        }
    }
    previsao_firbs_3 = previsao_firbs_3.join('<br>');
    imprimeTabela('FIR-BS',previsao_firbs_1,previsao_firbs_2,previsao_firbs_3);

    //fir-cw
    let previsao_fircw_1 = [];
    if(previsoes[0]['fir-cw'].nao_significativa.length > 0){
        let bases = []
        previsoes[0]['fir-cw'].nao_significativa.forEach(base => bases.push(iata(base)))
        bases = bases.join('/');
        previsao_fircw_1.push('Sem previsão significativa para ' + bases);
    }
    for(let[previsao,localidades] of Object.entries(previsoes[0]['fir-cw'])){
        if(previsao !== 'nao_significativa'){
            let bases = [];
            localidades.forEach(localidade => bases.push(iata(localidade)));
            bases = bases.join('/');
            previsao_fircw_1.push('Previsão de ' + previsao + ' para ' + bases);
        }
    }
    previsao_fircw_1 = previsao_fircw_1.join('<br>');
    let previsao_fircw_2 = [];
    if(previsoes[1]['fir-cw'].nao_significativa.length > 0){
        let bases = []
        previsoes[1]['fir-cw'].nao_significativa.forEach(base => bases.push(iata(base)))
        bases = bases.join('/');
        previsao_fircw_2.push('Sem previsão significativa para ' + bases);
    }
    for(let[previsao,localidades] of Object.entries(previsoes[1]['fir-cw'])){
        if(previsao !== 'nao_significativa'){
            let bases = [];
            localidades.forEach(localidade => bases.push(iata(localidade)));
            bases = bases.join('/');
            previsao_fircw_2.push('Previsão de ' + previsao + ' para ' + bases);
        }
    }
    previsao_fircw_2 = previsao_fircw_2.join('<br>');
    let previsao_fircw_3 = [];
    if(previsoes[2]['fir-cw'].nao_significativa.length > 0){
        let bases = []
        previsoes[2]['fir-cw'].nao_significativa.forEach(base => bases.push(iata(base)))
        bases = bases.join('/');
        previsao_fircw_3.push('Sem previsão significativa para ' + bases);
    }
    for(let[previsao,localidades] of Object.entries(previsoes[2]['fir-cw'])){
        if(previsao !== 'nao_significativa'){
            let bases = [];
            localidades.forEach(localidade => bases.push(iata(localidade)));
            bases = bases.join('/');
            previsao_fircw_3.push('Previsão de ' + previsao + ' para ' + bases);
        }
    }
    previsao_fircw_3 = previsao_fircw_3.join('<br>');
    imprimeTabela('FIR-CW',previsao_fircw_1,previsao_fircw_2,previsao_fircw_3);

    //fir-re
    let previsao_firre_1 = [];
    if(previsoes[0]['fir-re'].nao_significativa.length > 0){
        let bases = []
        previsoes[0]['fir-re'].nao_significativa.forEach(base => bases.push(iata(base)))
        bases = bases.join('/');
        previsao_firre_1.push('Sem previsão significativa para ' + bases);
    }
    for(let[previsao,localidades] of Object.entries(previsoes[0]['fir-re'])){
        if(previsao !== 'nao_significativa'){
            let bases = [];
            localidades.forEach(localidade => bases.push(iata(localidade)));
            bases = bases.join('/');
            previsao_firre_1.push('Previsão de ' + previsao + ' para ' + bases);
        }
    }
    previsao_firre_1 = previsao_firre_1.join('<br>');
    let previsao_firre_2 = [];
    if(previsoes[1]['fir-re'].nao_significativa.length > 0){
        let bases = []
        previsoes[1]['fir-re'].nao_significativa.forEach(base => bases.push(iata(base)))
        bases = bases.join('/');
        previsao_firre_2.push('Sem previsão significativa para ' + bases);
    }
    for(let[previsao,localidades] of Object.entries(previsoes[1]['fir-re'])){
        if(previsao !== 'nao_significativa'){
            let bases = [];
            localidades.forEach(localidade => bases.push(iata(localidade)));
            bases = bases.join('/');
            previsao_firre_2.push('Previsão de ' + previsao + ' para ' + bases);
        }
    }
    previsao_firre_2 = previsao_firre_2.join('<br>');
    let previsao_firre_3 = [];
    if(previsoes[2]['fir-re'].nao_significativa.length > 0){
        let bases = []
        previsoes[2]['fir-re'].nao_significativa.forEach(base => bases.push(iata(base)))
        bases = bases.join('/');
        previsao_firre_3.push('Sem previsão significativa para ' + bases);
    }
    for(let[previsao,localidades] of Object.entries(previsoes[2]['fir-re'])){
        if(previsao !== 'nao_significativa'){
            let bases = [];
            localidades.forEach(localidade => bases.push(iata(localidade)));
            bases = bases.join('/');
            previsao_firre_3.push('Previsão de ' + previsao + ' para ' + bases);
        }
    }
    previsao_firre_3 = previsao_firre_3.join('<br>');
    imprimeTabela('FIR-RE',previsao_firre_1,previsao_firre_2,previsao_firre_3);
}

// Limpa a tabela para nova exibição
const limpaTabela = function () {
    while (document.getElementById('resultado').firstChild) {
        document.getElementById('resultado').removeChild(document.getElementById('resultado').firstChild);
    }
}

// Escolha de estilo da tabela
document.getElementById('formato-abr').addEventListener('click', () => {
    const tabelas = document.querySelectorAll('table');
    tabelas.forEach(tabela => {
        tabela.setAttribute('class', 'abr');
    });
});
document.getElementById('formato-coordenacao').addEventListener('click', () => {
    const tabelas = document.querySelectorAll('table');
    tabelas.forEach(tabela => {
        tabela.setAttribute('class', 'coordenacao');
    });
});
