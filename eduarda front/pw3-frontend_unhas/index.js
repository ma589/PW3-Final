const express = require('express');

const app = express();
const axios = require('axios').default;

app.use(express.json());
app.use(express.urlencoded({extended:true}));

//MAPEAMENTO DA PASTA PUBLIC
app.use(express.static('public'));

//CONFIGURA O EJS COMO VIEW ENGINE (REDENRIZA AS PÁGINAS DE FRONT-END)
app.set('view engine', 'ejs');


//ROTA DE CADASTRO DE SERVIÇOS
app.get('/InserirServico', (req, res)=>{
    res.render('servico/index');

});

//ROTA DE LISTAGEM DE SERVIÇOS
app.get('/ListarServico', (req, res)=>{
    
    const urlListarServico = 'http://localhost:3000/ListarServico';

    /*
    CHAMADA PELO AXIOS:
    1 - URL DA ROTA (urlListarServico)
    2 - CALLBACK DA RESPOSTA DA CHAMADA
    */
    axios.get(urlListarServico)
        .then(
            (response)=>{
                // console.log(response.data);
                // res.send(response.data);
                let servicos = response.data;
                res.render('servico/ListarServicos', {servicos});

        }); 
    });

    //ROTA DE LISTAGEM DE SERVIÇOS
    app.get('/ListarServicos/:id', (req, res)=>{
        
        //RECEBE O ID DO SERVIÇO QUE VAI SER EDITADO
        let {id} = req.params;
        // console.log(id);

        //CHAMADA DO AXIOS PARA A API:
        const urlListarServicos = `http://localhost:3000/ListarServicos/${id}`;
        
        axios.get(urlListarServicos)
        .then(
            (response)=>{

                let servico = response.data;
                res.render('servico/editarServico', {servico});

            }
        )
    });

    //ROTA DE EDIÇÃO
    app.post('/AlterarServico', (req, res)=>{

        const urlAlterarServico = 'http://localhost:3000/AlterarServico';
        console.log(req.body);

        axios.put(urlAlterarServico, req.body)
        .then(
            res.send('ALTERADO!')
        )

    });

    app.get('/DeletarServico/:id', (req, res)=>{

        // console.log('ROTA DE EXCLUSÃO - ID: ' + req.params.id);

        let {id} = req.params;

        const urlExcluirServico = `http://localhost:3000/DeletarServico/${id}`;       

        /*
        PARAMETROS DO AXIOS:
        1 - URL (ROTA)
        */

        axios.delete(urlExcluirServico)

        .then((response)=>{

            console.log(response);

            const urlListarServico ='http://localhost:3000/ListarServico';

            /*
            PARAMETROS DO AXIOS:
            1 - URL (ROTA)
            */

            axios.get(urlListarServico)

            .then((response)=>{

                let servicos = response.data;

                res.render('servico/ListarServicos', {servicos});
            });
        })
    });
   

app.listen(3001, ()=>{
    console.log('SERVIDOR RODANDO EM: http://localhost:3001');
});