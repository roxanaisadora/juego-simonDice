
const celeste = document.getElementById('amarillo')
const violeta = document.getElementById('guinda')
const verde = document.getElementById('verde')
const naranja = document.getElementById('naranja')
const nombre = document.getElementById("name");
const nivel = document.getElementById("level");
const tiempo = document.getElementById("time");
const btnEmpezar = document.getElementById('btnEmpezar')
const instructions = document.getElementById('instructions')
const ultimo_nivel = 2

class Juego {
    constructor() {
        this.inicializar = this.inicializar.bind(this)
        this.inicializar()
        this.generarSecuencia()
        setTimeout(this.siguienteNivel, 1000)
        }
    inicializar() {
        this.elegirColor = this.elegirColor.bind(this)
        this.siguienteNivel = this.siguienteNivel.bind(this)
        this.toggleBtnEmpezar()
        this.nivel = 1
        this.datos();
        this.colores = {
            amarillo,
            guinda,
            naranja,
            verde
        }
    }
    datos() {
        Swal.fire({
            title: '¡Simon Dice!', 
            text: 'Ingresa Tu Nombre:',
            input: 'text', 
          })
        .then((result) => {
        if (result.value) {
            nombre.innerHTML = JSON.stringify(result.value);
        } else {
            nombre.innerHTML = "Anónimo";
        }
        nivel.innerHTML = this.nivel = 1;
        tiempo.innerHTML = this.counter = 15;
        this.generarSecuencia();
        setTimeout(this.siguienteNivel, 500);
        this.temporizador();
        });
      }
    temporizador() {
        this.timer = setInterval(() => {
          this.counter--;
          if (this.counter < 0) {
            clearInterval(this.timer);
            this.perdioElJuego();
          } else {
            tiempo.innerText = this.counter;
          }
        }, 1000);
    }
    toggleBtnEmpezar(){
        if (btnEmpezar.classList.contains('hide')){
            btnEmpezar.classList.remove('hide')
            instructions.classList.remove('hide')
        }else {
            btnEmpezar.classList.add('hide')
            instructions.classList.add('hide')
        }
    }
    generarSecuencia(){
        this.secuencia = new Array(10).fill(0).map( n => Math.floor(Math.random() * 4))
    }
    siguienteNivel(){
        this.subnivel = 0
        this.iluminarSecuencia()
        this.agregarEventoClick()
    }
    transformarNumeroAColor(numero){
        switch (numero){
            case 0:
                return 'amarillo'
            case 1:
                return 'guinda'
            case 2:
                return 'verde'
            case 3:
                return 'naranja'
        }
    }
    transformarColorANumero(color){
        switch (color){
            case 'amarillo':
                return 0
            case 'guinda':
                return 1
            case 'verde':
                return 2
            case 'naranja':
                return 3
        }
    }
    iluminarSecuencia(){
        for(let i = 0; i < this.nivel; i++){
            // var color se sobrescribe sobre color, se queda repitiendo el ultimo color.
            const color = this.transformarNumeroAColor(this.secuencia[i])
            setTimeout(() => this.iluminarColor(color),1000 * i)
        }
    }
    iluminarColor(color){
        this.colores[color].classList.add('light')
        setTimeout(()=> this.apagarColor(color),350)
    }
    apagarColor(color){
        this.colores[color].classList.remove('light')
    }
    agregarEventoClick(){
        this.colores.amarillo.addEventListener('click', this.elegirColor)
        this.colores.guinda.addEventListener('click', this.elegirColor)
        this.colores.verde.addEventListener('click', this.elegirColor)
        this.colores.naranja.addEventListener('click', this.elegirColor)
    }
    eliminarEventosClick(){
        this.colores.amarillo.removeEventListener('click', this.elegirColor)
        this.colores.guinda.removeEventListener('click', this.elegirColor)
        this.colores.verde.removeEventListener('click', this.elegirColor)
        this.colores.naranja.removeEventListener('click', this.elegirColor)
    }
    
    elegirColor(ev){
        const nombreColor = ev.target.dataset.color
        const numeroColor = this.transformarColorANumero(nombreColor)
        this.iluminarColor(nombreColor)
        if(numeroColor === this.secuencia[this.subnivel]){
            this.subnivel++
            if(this.subnivel == this.nivel){
                this.nivel++
                this.eliminarEventosClick()
                if(this.nivel === (ultimo_nivel+1))
                {
                    clearInterval(this.timer);
                    this.ganoElJuego()
                }else {
                    clearInterval(this.timer);
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: `Muy bien!, nivel: ${this.nivel}!`,
                        showConfirmButton: false,
                        timer: 1000
                      })
                    .then(() => {
                        nivel.innerHTML = this.nivel
                        tiempo.innerHTML = this.counter = 15;
                        this.temporizador();
                        setTimeout(this.siguienteNivel(), 1500);
                      })
                }
            }
        }else {
            clearInterval(this.timer);
            this.perdioElJuego()
        }
    }
    ganoElJuego(){
        Swal.fire({
            icon: 'success',
            title: 'Felicitaciones',
            text: 'Ganaste el juego!'
          })
        .then(() => {
            this.eliminarEventosClick();
            nombre.innerHTML = "Anónimo";
            nivel.innerHTML = "--";
            tiempo.innerHTML = "--";
            this.toggleBtnEmpezar();
          });
    }
    perdioElJuego(){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Lo sentimos, sigue intentando!'
          })
        .then(() => {
            this.eliminarEventosClick();
            nombre.innerHTML = "Anónimo";
            nivel.innerHTML = "--";
            tiempo.innerHTML = "--";
            this.toggleBtnEmpezar();
        });
    }
}

function empezarJuego() {
    window.juego = new Juego()
}