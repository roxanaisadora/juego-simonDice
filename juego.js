
const celeste = document.getElementById('amarillo')
const violeta = document.getElementById('guinda')
const verde = document.getElementById('verde')
const naranja = document.getElementById('naranja')
const btnEmpezar = document.getElementById('btnEmpezar')
const ultimo_nivel = 10


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
        this.colores = {
            amarillo,
            guinda,
            naranja,
            verde
        }
    }
    toggleBtnEmpezar(){
        if (btnEmpezar.classList.contains('hide')){
            btnEmpezar.classList.remove('hide')
        }else {
            btnEmpezar.classList.add('hide')
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
                    this.ganoElJuego()
                }else {
                    setTimeout(this.siguienteNivel, 2000)
                }
            }
        }else {
            this.perdioElJuego()
        }
    }
    ganoElJuego(){
        swal('Felicitaciones','ganaste el juego','success')
            .then(this.inicializar)
    }
    perdioElJuego(){
        swal('Lo sentimos','Sigue intentando','error')
        .then(() => {
            this.eliminarEventosClick()
            this.inicializar()
        })
    }
}

function empezarJuego() {
    //para visualizar el array se usa window.juego
    window.juego = new Juego()
}