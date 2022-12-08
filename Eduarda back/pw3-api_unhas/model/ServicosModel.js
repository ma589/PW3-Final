/* IMPORT DO SEQUELIZE */
const Sequelize = require('sequelize');

/* IMPORT DA CONEXÃO */
const connection = require('../database/database');

/*
CRIAÇÃO DO MODELO DA TABELA CATEGORIA
MÉTODO: define
PARAMETROS:
1 - NOME DA TABELA - STRING
2 - JSON: REPRESENTA O CAMPO OU CAMPOS DA TABELA, SEUS TIPOS E SUAS  REGRAS.
*/
const Servico = connection.define(
    'tbl_servicos',
    {
        NOME_SERVICO:{
            type: Sequelize.STRING(100),
            allowNull: false
        }
    }
);

Servico.sync({force:true});

module.exports = Servico;





