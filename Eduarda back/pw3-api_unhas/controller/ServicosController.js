const express = require('express');

/*CONFIGURAÇÃO DAS ROTAS DE SERVIÇO*/
const router = express.Router();

/* IMPORT DA MODEL DE SERVIÇO */
const modelServicos = require('../model/ServicosModel');

/* PARAMETROS DE ROTAS (QUALQUER VERBO):
1 - NOME DA ROTA - REPRESENTADO POR UMA STRING
2 - CALLBACK QUE TRATA REQUISIÇÃO (req) E RESPOSTA (res)
*/
/*ROTAS DE CRUD DE CATEGORIAS:*/
router.get('/ListarServico', (req, res)=>{

    // console.log('TESTE DE ROTA GET DE SERVIÇOS');
    // console.log('----A REQUISIÇÃO GET PASSOU PELA SERVIÇOS CONTROLLER----');
    // res.send('----TESTE DE ROTA GET DE SERVIÇOS----');

    //LISTANDO OS DADOS SEM CRITÉRIOS
    modelServicos.findAll()
        .then(
            (servicos)=>{
                return res.status(200).json(servicos);
            }
        ).catch(
            (erro)=>{
                return res.status(400).json({
                    erroStatus: true,
                    erroMessagem: 'Houve um erro ao selecionar um serviço',
                    erroBancoDados: erro
                });
            }
        );

});

//LISTANDO OS DADOS COM CRITÉRIOS
router.get('/ListarServicos/:id',(req, res)=>{

    let {id} = req.params;

    modelServicos.findByPk(id)
        .then(
            (servico)=>{
                res.status(200).json(servico);
            }
        ).catch(
            (erro)=>{
                return res.status(400).json({
                    erroStatus: true,
                    erroMessagem: 'Houve um erro ao selecionar o serviço',
                    erroBancoDados: erro
                });
            }
        );

});

router.post('/InserirServico', (req, res)=>{
    // console.log('A REQUISIÇÃO POST PASSOU PELO SERVIÇOS CONTROLLER');
    // res.send('TESTE DE ROTA POST DE SERVIÇOS');

    //RECEBER OS DADOS
    // console.log(req.body.NOME_SERVICO);
    // let nome_categoria = req.body.NOME_SERVICO;
    let {NOME_SERVICO} = req.body;
    // console.log(NOME_SERVICO);
    
    //GRAVAR OS DADOS
    modelServicos.create(
        {NOME_SERVICO}
    ).then(
        ()=>{
                return res.status(201).json({
                    erroStatus: false,
                    menssagemStatus: 'Serviço cadastrado com sucesso!'
            });
        }
    ).catch(
        (erro)=>{
                    return res.status(400).json({
                        erroStatus: true,
                        erroMessagem: 'Houve um erro cadastrar o serviço',
                        erroBancoDados: erro
                    });
        }
    );

});

router.put('/AlterarServico', (req, res)=>{

    // console.log('A REQUISIÇÃO PUT PASSOU PELO SERVIÇOS CONTROLLER');
    // res.send('TESTE DE ROTA PUT DE SERVIÇOS');

    //RECEBENDO OS DADOS:
    let {id, NOME_SERVICO} = req.body;

    //ALTERANDO OS DADOS:
    modelServicos.update(
        {NOME_SERVICO},
        {where:{id}}
    ).then( ()=>{

        return res.status(200).json({
            erroStatus: false,
            menssagemStatus: 'Serviço alterado com sucesso!'
        });

    }).catch(
        (erro)=>{
                    return res.status(400).json({
                        erroStatus: true,
                        erroMessagem: 'Houve um erro ao alterar o serviço',
                        erroBancoDados: erro
                    });
        }
    );

});

router.delete('/DeletarServico/:id', (req, res)=>{

    // console.log('A REQUISIÇÃO DELETE PASSOU PELO SERVIÇOS CONTROLLER');
    // res.send('TESTE DE ROTA DELETE DE SERVIÇOS');

    let {id} = req.params;

    modelServicos.destroy(
        {where: {id}}
    ).then( ()=>{

        return res.status(200).json({
            erroStatus: false,
            menssagemStatus: 'Serviço excluido com sucesso!'
        });

    }).catch(
        (erro)=>{
                    return res.status(400).json({
                        erroStatus: true,
                        erroMessagem: 'Houve um erro ao excluir o serviço',
                        erroBancoDados: erro
                    });
        }
    );

});

module.exports = router;