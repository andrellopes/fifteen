import React, { Component } from 'react';
import '../page/css/animation.css';
import '../page/css/main.css';

export default class Main extends Component {
    //Declara variaveis globais
    state = {
        titulo: "Game Fifteen",
        subTitulo: "Ordene os campos",
        win: "jogando",
        box: [],
        contagem: 0,
    };
    //Metodo que executa ao carregar componente
    componentDidMount() {
        //Inicia o metodo
        this.loadBox();
    }

    //Metodo que gerar embaralhando
    loadBox = () => {
        //Carrega variaveis do state
        let { contagem, win } = this.state;
        const box = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, " "];
        // eslint-disable-next-line
        var change, min = 500, max = 1500, i = 1, pos, pass, move, x;
        //Gera posicoes aleatorias
        change = Math.floor(Math.random() * (max - min + 1)) + min;

        //Converte numeros em string e preenche 16 como vazio.
        box.map((value, index) => box[index] = ((value < 10) && (value !== " ")) ? ("0" + parseInt(value)) : String(value));

        while (i <= change) {
            pass = 0; move = 0;
            pos = box.findIndex(value => value === " ");

            while (pass === 0) {
                //Gera movimento aleatorio
                pass = 0;
                move = Math.floor(Math.random() * 4) + 1;
                //move: 1=box[-1], 2=box[+1], 3=box[-4], 4=box[+4] 
                //Autoriza movimento
                ((pos === 0) && ((move !== 1) && (move !== 3))) ? pass++ : x = false;
                ((pos === 3) && ((move !== 2) && (move !== 3))) ? pass++ : x = false;
                ((pos === 12) && ((move !== 1) && (move !== 4))) ? pass++ : x = false;
                ((pos === 15) && ((move !== 2) && (move !== 4))) ? pass++ : x = false;

                (((pos === 4) || (pos === 8)) && (move !== 1)) ? pass++ : x = false;
                (((pos === 7) || (pos === 11)) && (move !== 2)) ? pass++ : x = false;
                (((pos === 1) || (pos === 2)) && (move !== 3)) ? pass++ : x = false;
                (((pos === 13) || (pos === 14)) && (move !== 4)) ? pass++ : x = false;

                (((pos === 5) || (pos === 6) || (pos === 9) || (pos === 10))) ? pass++ : x = false;
            }

            // Realizando o movimento autorizado
            if (move === 1) {
                box[pos] = box[pos - 1];
                box[pos - 1] = String(" ");
            }
            if (move === 2) {
                box[pos] = box[pos + 1];
                box[pos + 1] = String(" ");
            }
            if (move === 3) {
                box[pos] = box[pos - 4];
                box[pos - 4] = String(" ");
            }
            if (move === 4) {
                box[pos] = box[pos + 4];
                box[pos + 4] = String(" ");
            }
            //Passa para o proximo CHANGE
            i++;
        }
        //Zera contagem (Jogadas)
        contagem = 0;
        win = "jogando";
        //Salva state das variaveis
        this.setState({ box, contagem, win });

    };

    //Metodo de jogar
    playBox = ({ currentTarget }) => {
        if (currentTarget.disabled === false) {
            //Carrega variaveis do state
            const { box } = this.state;
            let { contagem } = this.state;
            //Carrega propriedades do elemento clicado
            var id = parseInt(currentTarget.id), value = currentTarget.innerHTML, pass = 0, x;

            //Remove elemento <strong>
            value = value.replace("<strong>", "");
            value = value.replace("</strong>", "");
            value = value.replace(/amp;/g, "");
            value = value.replace(/&nbsp;/g, "");
            //Localiza posicao do campo de valor vazio
            // box.find((value, index) => (value === " ") ? pos = index : false);
            var pos = box.findIndex((value) => (value === " "));

            // Valida de a jogada eh possivel 
            //(somente campos anterior, proximo, superior e inferior podem jogar)
            ((pos === 0) && ((id === (pos + 1)) || (id === (pos + 4)))) ? pass++ : x = false;
            ((pos === 3) && ((id === (pos - 1)) || (id === (pos + 4)))) ? pass++ : x = false;
            ((pos === 12) && ((id === (pos + 1)) || (id === (pos - 4)))) ? pass++ : x = false;
            ((pos === 15) && ((id === (pos - 1)) || (id === (pos - 4)))) ? pass++ : x = false;

            (((pos === 1) || (pos === 2)) && ((id === (pos - 1)) || (id === (pos + 1)) || (id === (pos + 4)))) ? pass++ : x = false;
            (((pos === 4) || (pos === 8)) && ((id === (pos + 1)) || (id === (pos - 4)) || (id === (pos + 4)))) ? pass++ : x = false;
            (((pos === 7) || (pos === 11)) && ((id === (pos - 1)) || (id === (pos - 4)) || (id === (pos + 4)))) ? pass++ : x = false;
            (((pos === 13) || (pos === 14)) && ((id === (pos + 1)) || (id === (pos - 1)) || (id === (pos - 4)))) ? pass++ : x = false;

            (((pos === 5) || (pos === 6) || (pos === 9) || (pos === 10)) && ((id === (pos - 1)) || (id === (pos + 1)) || (id === (pos - 4)) || (id === (pos + 4)))) ? pass++ : x = false;

            //Desabilitar botao
            (pass > 0) ? document.querySelectorAll('.box')[pos].disabled = true : x = false;
            if (pass > 0) {
                //Salva novos valores do campo jogado
                box[id] = " ";
                box[pos] = value;
                contagem++;
                //Cria Animacao
                ((pos - 4) === id) ? document.getElementById(pos).classList.add('fadeOutUp') : x = false;
                ((pos + 1) === id) ? document.getElementById(pos).classList.add('fadeInLeft') : x = false;
                ((pos - 1) === id) ? document.getElementById(pos).classList.add('fadeInRight') : x = false;
                ((pos + 4) === id) ? document.getElementById(pos).classList.add('fadeOutDown') : x = false;

                ((pos - 4) === id) ? document.getElementById(id).classList.add('fadeOutDown') : x = false;
                ((pos + 1) === id) ? document.getElementById(id).classList.add('fadeInRight') : x = false;
                ((pos - 1) === id) ? document.getElementById(id).classList.add('fadeInLeft') : x = false;
                ((pos + 4) === id) ? document.getElementById(id).classList.add('fadeOutUp') : x = false;


                setTimeout(() => {
                    for (x = 0; x <= 15; x++) {
                        document.getElementById(x).classList.remove('fadeOutUp');
                        document.getElementById(x).classList.remove('fadeInLeft');
                        document.getElementById(x).classList.remove('fadeInRight');
                        document.getElementById(x).classList.remove('fadeOutDown');
                    }
                    //Salva novo state das variaveis
                    this.setState({ box, contagem });
                    this.winBox();
                    document.querySelectorAll('.box')[pos].disabled = false;
                }, 180);
                pass = 0;
            }
            document.querySelectorAll('.box')[id].disabled = false;
        }
    }


    //Verifica se Ganhou
    winBox = () => {
        //Importa variaveis de state
        const { box } = this.state;
        let { win } = this.state;
        let corretos = 0;
        //Cria jogo campeao
        const full = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", " "];
        //Conta os campos corretos
        box.map((value, index) => value === full[index] ? corretos++ : false);
        //Verifica se todos so 16 campos estiverem na posicao
        win = corretos === 16 ? win = "congrats" : "jogando";
        //Salva variavel ganhar
        this.setState({ win });
        // this.render();
    }

    //Win automatico
    autoBox = () => {
        //Carrega variaveis do state e declara novas
        const { box } = this.state;
        let { contagem } = this.state;
        let vazio, num, pos = 0, fifteen = 1, dif, go = "Num", lvazio, lnum, lpos;
        (fifteen < 10) ? fifteen = String("0" + fifteen) : fifteen = String(fifteen);
        // eslint-disable-next-line
        num = box.findIndex(value => value === fifteen);
        vazio = box.findIndex(value => value === " ");
        // Converte variavel em string
        // Recebe posicao de NUM e VAZIO
        // go = num;
        // go = pos;
        fifteen = parseInt(fifteen);
        let delay = setInterval(() => {
            //Verifica se todos os 15 estao corretos
            if (fifteen !== pos) {
                //Carrega nova posicao do VAZIO
                (fifteen < 10) ? fifteen = String("0" + fifteen) : fifteen = String(fifteen);
                num = box.findIndex(value => value === fifteen);
                fifteen = parseInt(fifteen);
                vazio = box.findIndex(value => value === " ");

                //Vai para o NUM
                if (go === "Num") {
                    // Recebe linha do NUM
                    dif = vazio - num;
                    if (num <= 3) {
                        lnum = 1;
                    } else if ((num >= 4) && (num <= 7)) {
                        lnum = 2;
                    } else if ((num >= 8) && (num <= 11)) {
                        lnum = 3;
                    } else if (num >= 12) {
                        lnum = 4;
                    }
                    //Recebe linha do VAZIO
                    if (vazio <= 3) {
                        lvazio = 1;
                    } else if ((vazio >= 4) && (vazio <= 7)) {
                        lvazio = 2;
                    } else if ((vazio >= 8) && (vazio <= 11)) {
                        lvazio = 3;
                    } else if (vazio >= 12) {
                        lvazio = 4;
                    }
                    //Se LNUM <> LVAZIO - move para CIMA ou BAIXO
                    if (lnum !== lvazio) {
                        if (dif < 0) {
                            box[vazio] = box[vazio + 4];
                            box[vazio + 4] = " ";
                            contagem++;
                            if (dif === -4) {
                                go = "Pos";
                            }
                        } else if (dif > 0) {
                            box[vazio] = box[vazio - 4];
                            box[vazio - 4] = " ";
                            contagem++;
                        }
                        //SE LNUM = LVAZIO - move para os LADOS
                    } else {
                        if (dif < -1) {
                            box[vazio] = box[vazio + 1];
                            box[vazio + 1] = " ";
                            contagem++;
                        } else if (dif > 1) {
                            box[vazio] = box[vazio - 1];
                            box[vazio - 1] = " ";
                            contagem++;
                        } else if (dif === -1) {
                            box[vazio] = box[vazio + 1];
                            box[vazio + 1] = " ";
                            contagem++;
                            go = "Pos";
                        } else if ((dif === 1) && ((vazio !== 1) || (vazio !== 2) || (vazio !== 3))) {
                            box[vazio] = box[vazio - 4];
                            box[vazio - 4] = " ";
                            contagem++;
                        } else if ((dif === 1) && ((vazio !== 13) || (vazio !== 14) || (vazio !== 15))) {
                            box[vazio] = box[vazio - 4];
                            box[vazio - 4] = " ";
                            contagem++;
                        }

                    }
                    console.log("1- LNUM: " + lnum + " LVAZIO: " + lvazio + " go: " + go + " VAZIO: " + vazio + " NUM: " + num + " DIF: " + dif + " C: " + contagem + " BOX: " + box);
                    //Vai para a POS
                } else {
                    if (go === "Pos") {
                        dif = vazio - pos;
                        //Recebe linha da POS CORRETA
                        if (pos <= 3) {
                            lpos = 1;
                        } else if ((pos >= 4) && (pos <= 7)) {
                            lpos = 2;
                        } else if ((pos >= 8) && (pos <= 11)) {
                            lpos = 3;
                        } else if (pos >= 12) {
                            lpos = 4;
                        }
                        //Recebe linha do VAZIO (atualiza)
                        if (vazio <= 3) {
                            lvazio = 1;
                        } else if ((vazio >= 4) && (vazio <= 7)) {
                            lvazio = 2;
                        } else if ((vazio >= 8) && (vazio <= 11)) {
                            lvazio = 3;
                        } else if (vazio >= 12) {
                            lvazio = 4;
                        }
                        //Se LNUM <> LVAZIO - move para CIMA ou BAIXO
                        if (lpos !== lvazio) {
                            if (dif < 0) {
                                box[vazio] = box[vazio + 4];
                                box[vazio + 4] = " ";
                                contagem++;
                            } else if (dif > 0) {
                                //Se estiver em VAZIO abaixo de NUM - MOVE para o LADO >
                                if (((vazio - num) === 4) && ((vazio !== 3) || (vazio !== 7) || (vazio !== 11))) {
                                    box[vazio] = box[vazio + 1];
                                    box[vazio + 1] = " ";
                                    contagem++;
                                    //Se estiver em VAZIO abaixo de NUM - MOVE para o LADO <
                                } else if (((vazio - num) === 4) && ((vazio === 3) || (vazio === 7) || (vazio === 11))) {
                                    box[vazio] = box[vazio - 1];
                                    box[vazio - 1] = " ";
                                    contagem++;
                                    //Se nao move pra cima
                                } else {
                                    box[vazio] = box[vazio - 4];
                                    box[vazio - 4] = " ";
                                    contagem++;
                                }
                            }
                            //SE LPOS = LVAZIO - move para os LADOS
                        } else {
                            if (dif < 0) {
                                box[vazio] = box[vazio + 1];
                                box[vazio + 1] = " ";
                                contagem++;
                            } else if ((dif > 0) && (num !== pos)) {
                                box[vazio] = box[vazio - 1];
                                box[vazio - 1] = " ";
                                contagem++;
                            } else if (num === pos) {
                                fifteen++;
                                (fifteen < 10) ? fifteen = String("0" + fifteen) : fifteen = String(fifteen);
                                num = box.findIndex(value => value === fifteen);
                                fifteen = parseInt(fifteen);
                                pos++;
                                go = "Num";
                            } else {
                                go = "Num";
                            }
                        }
                        console.log("2- LPOS: " + lpos + " LVAZIO: " + lvazio + " go: " + go + " VAZIO: " + vazio + " POS: " + pos + " DIF: " + dif + " C: " + contagem + " BOX: " + box);
                    }
                }
                //Atualiza state
                this.setState({ box, contagem });
                //Converte valor em numero
            } else {

                clearInterval(delay);
            }
            // this.winBox();
        }, 500);
    }

    //Metodo para carregar(renderizar) a pagina
    render() {
        //Carrega variaveis do state
        const { titulo, subTitulo, box, win, contagem } = this.state;
        // Cria a pagina
        return (
            <div>
                <div className="border border-0">
                    <h1> {titulo} </h1>
                    <h3> {subTitulo} </h3>
                    <div className={win}></div>
                    {box.map((values, index) => (
                        <button key={index} id={index} className="box animated" onClick={this.playBox}>
                            <strong>{values}</strong>
                        </button>
                    ))}
                    <button className="ml-5 my-3 float-left" onClick={this.loadBox}><strong>Reiniciar</strong></button>
                    <button className="mr-5 my-3 float-right" onClick={this.autoBox} disabled={win === "congrats" || '1=1'}>
                        <div className="d-flex">
                            <i className="fas fa-cogs fa-lg align-self-center"></i>
                            <strong> Auto</strong>
                        </div>
                    </button>
                    <span>Jogadas: {contagem}</span>
                </div>
            </div>
        )
    }
}
