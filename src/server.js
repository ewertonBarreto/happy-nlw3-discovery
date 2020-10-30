//importar dependência do servidor
const express = require('express');
const path = require('path');
const pages = require('./pages.js')

//iniciando o express
const server = express()
server
    //utilizar body do req
    .use(express.urlencoded({extended: true}))

    //utilizando arquivos estáticos
    .use(express.static('public'))     //tudo que esta em public é estático, então com esse comando ele cria 
                                        //todas as rotas para estes arquivos estáticos, puxando só do index, olha a rota ai em baixo.

    //configurar template engine - no caso o hbs
    .set('views', path.join(__dirname, "views"))
    .set('view engine', 'hbs')

    //rotas da aplicação
    .get('/', pages.index)                                
    .get('/orphanage', pages.orphanage)
    .get('/orphanages', pages.orphanages)
    .get('/create-orphanage', pages.createOrphanage)
    .post('/save-orphanage', pages.saveOrphanage)      

//ligar o servidor
server.listen(5500)


    