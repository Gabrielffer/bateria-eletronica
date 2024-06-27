
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap-icons/font/bootstrap-icons.css';
import {useState, useRef, useEffect} from 'react';

function App(){
  const audios = [
    {
      url: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-1.mp3',
      indice: 0,
      idTecla: 'Heater-1',
      idAudio: 'Q'
    },
    {
      url: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-2.mp3',
      indice: 1,
      idTecla: 'Heater-2',
      idAudio: 'W'
    },
    {
      url: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-3.mp3',
      indice: 2,
      idTecla: 'Heater-3',
      idAudio: 'E'
    },
    {
      url: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-4_1.mp3',
      indice: 3,
      idTecla: 'Heater-4',
      idAudio: 'A'
    },
    {
      url: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-6.mp3',
      indice: 4,
      idTecla: 'Heater-6',
      idAudio: 'S'
    },
    {
      url: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Dsc_Oh.mp3',
      indice: 5,
      idTecla: 'Dsc_oh',
      idAudio: 'D'
    },
    {
      url: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Kick_n_Hat.mp3',
      indice: 6,
      idTecla: 'Kick_hat',
      idAudio: 'Z'
    },
    {
      url: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/RP4_KICK_1.mp3',
      indice: 7,
      idTecla: 'Kick-1',
      idAudio: 'X'
    },
    {
      url: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Cev_H2.mp3',
      indice: 8,
      idTecla: 'Cev_h2',
      idAudio: 'C'
    }
  ];

  const [nomeTecla, alterarNome] = useState('');

  const [status, alterarStatus] = useState({
    valor: 0,
    statusNome: 'DESLIGADO',
    btStatusClasse: 'btn btn-danger',
  });

  const [statusEventoTecla, alterarStatusEventoTecla] = useState(false);

  const [volume, alterarVolume] = useState(50);
  const configVolume = () => {
    alterarVolume(volumeRef.current.value);
  }

  const volumeRef = useRef();

  const audioRefs = useRef([]);

  const configStatus = () => {
    alterarStatus(prevStatus => {
      if(prevStatus.valor === 0){
        alterarNome('');
        alterarStatusEventoTecla(true);
        return{
          valor: 1,
          statusNome: 'LIGADO',
          btStatusClasse: 'btn btn-success'
        }
      }else{
        alterarStatusEventoTecla(false);
        return{
          valor: 0,
          statusNome: 'DESLIGADO',
          btStatusClasse: 'btn btn-danger'
        }
      }
    });
  };

  useEffect(() => {
    const teclaSom = (e) => {
      if(status.valor === 1){
        const tecla    = e.key.toUpperCase();
        const arrAudio = audios.find((obj) => obj.idAudio === tecla);
        if(arrAudio){
          const indice  = arrAudio.indice;
          const idTecla = arrAudio.idTecla;
          tocarSom(indice, idTecla, volume);
        }
      }
    }
    if(statusEventoTecla){
      document.addEventListener('keypress', teclaSom);
    }else{
      document.removeEventListener('keypress', teclaSom);
    }
    return () => {
      document.removeEventListener('keypress', teclaSom);
    }
  }, [statusEventoTecla, status.valor, volume]);

  const tocarSom = (i, idTecla) => {
    if(status.valor === 1){
      const audio = audioRefs.current[i];
      if(audio && audio.paused){
        audio.volume = volume / 100;
        audio.currentTime = 0;
        audio.play();
        alterarNome(idTecla);
      }
    }
  }

  return (
    <main className='container' id='drum-machine'>
      <div className='card'>
        <div className='card-title bg-warning'>
          <h1 className='text-white'>
            <i className='bi bi-file-music-fill'></i>
            Bateria Eletrônica
          </h1>
        </div>
        <div className='card-body bg-dark'>
          <div className='row' id='coluna'>
            <div className='col-sm-6'>
              <Teclas audios={audios} tocarSom={tocarSom} audioRefs={audioRefs} nomeTecla={nomeTecla}/>
            </div>
            <div className='col-sm-6'>
              <Configuracoes configStatus={configStatus} statusNome={status.statusNome} btStatusClasse={status.btStatusClasse} configVolume={configVolume} volumeRef={volumeRef} volume={volume}/>
              <Info/>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function Teclas({audios, tocarSom, audioRefs, nomeTecla}){
  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-sm-4'>
          <div className='drum-pad btn btn-secondary btn btn-secondary' id={audios[0].idTecla} onClick={() => tocarSom(0, audios[0].idTecla)}>
            <audio src={audios[0].url} className='clip' id={audios[0].idAudio} ref={(ref) => audioRefs.current[0] = ref}></audio>
            Q
          </div>
        </div>
        <div className='col-sm-4'>
          <div className='drum-pad btn btn-secondary' id={audios[1].idTecla} onClick={() => tocarSom(1, audios[1].idTecla)}>
            <audio src={audios[1].url} className='clip' id={audios[1].idAudio} ref={(ref) => audioRefs.current[1] = ref}></audio>
            W
          </div>
        </div>
        <div className='col-sm-4'>
          <div className='drum-pad btn btn-secondary' id={audios[2].idTecla} onClick={() => tocarSom(2, audios[2].idTecla)}>
            <audio src={audios[2].url} className='clip' id={audios[2].idAudio} ref={(ref) => audioRefs.current[2] = ref}></audio>
            E
          </div>
        </div>
      </div>
      <div className='row'>
        <div className='col-sm-4'>
          <div className='drum-pad btn btn-secondary' id={audios[3].idTecla} onClick={() => tocarSom(3, audios[3].idTecla)}>
            <audio src={audios[3].url} className='clip' id={audios[3].idAudio} ref={(ref) => audioRefs.current[3] = ref}></audio>
            A
          </div>
        </div>
        <div className='col-sm-4'>
          <div className='drum-pad btn btn-secondary' id={audios[4].idTecla} onClick={() => tocarSom(4, audios[4].idTecla)}>
            <audio src={audios[4].url} className='clip' id={audios[4].idAudio} ref={(ref) => audioRefs.current[4] = ref}></audio>
            S
          </div>
        </div>
        <div className='col-sm-4'>
          <div className='drum-pad btn btn-secondary' id={audios[5].idTecla} onClick={() => tocarSom(5, audios[5].idTecla)}>
            <audio src={audios[5].url} className='clip' id={audios[5].idAudio} ref={(ref) => audioRefs.current[5] = ref}></audio>
            D
          </div>
        </div>
      </div>
      <div className='row'>
        <div className='col-sm-4'>
          <div className='drum-pad btn btn-secondary' id={audios[6].idTecla} onClick={() => tocarSom(6, audios[6].idTecla)}>
            <audio src={audios[6].url} className='clip' id={audios[6].idAudio} ref={(ref) => audioRefs.current[6] = ref}></audio>
            Z
          </div>
        </div>
        <div className='col-sm-4'>
          <div className='drum-pad btn btn-secondary' id={audios[7].idTecla} onClick={() => tocarSom(7, audios[7].idTecla)}>
            <audio src={audios[7].url} className='clip' id={audios[7].idAudio} ref={(ref) => audioRefs.current[7] = ref}></audio>
            X
          </div>
        </div>
        <div className='col-sm-4'>
          <div className='drum-pad btn btn-secondary' id={audios[8].idTecla} onClick={() => tocarSom(8, audios[8].idTecla)}>
            <audio src={audios[8].url} className='clip' id={audios[8].idAudio} ref={(ref) => audioRefs.current[8] = ref}></audio>
            C
          </div>
        </div>
      </div>
      <div id='display' className='bg-info text-white text-center'>
        {nomeTecla}
      </div>
    </div>
  );
}

function Configuracoes({configStatus, statusNome, btStatusClasse, configVolume, volumeRef, volume}){
  return (
    <div className='container-fluid' id='div_configuracoes'>
      <div>
        <button className={btStatusClasse} id='bt_status' onClick={() => configStatus()}>
          <i className='bi bi-power'></i>&nbsp;
          {statusNome}
        </button>
      </div>
      <div id='div_config_volume'>
        <input type='range' className='form-range' id='volume' min='0' max='100' step='1' defaultValue='50' ref={volumeRef} onChange={() => configVolume()}/>
        <span className='badge bg-info text-white' id='info_volume'>{volume}%</span>
      </div>
    </div>
  );
}

function Info(){
  return (
    <aside className='text-info'>
      <p>Projeto desenvolvido por <a href='https://github.com/Gabrielffer' target='_blank' className='text-warning'>Gabriel F.F</a> no curso Front End Development Libraries do <span className='text-primary'>Free Code Camp</span>.</p>
    </aside>
  );
}

export default App;