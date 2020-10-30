const Database = require('./db');
const saveOrphanage = require('./saveOrphanage');

Database.then(async db => { 

    // inserir dados na tabela 
    await saveOrphanage(db, {        
            id: 1,
            lat: "-23.5506634",
            lng: "-46.6484968",
            name: "Lar das meninas",
            whatsapp: "(11)9 1234-5678",
            about: "Presta assistência a crianças de 06 a 15 anos que se encontre em situação de risco e /ou vulnerabilidade social.",
            images: [
                "https://images.unsplash.com/photo-1601940816416-6e3995dcb5d1?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max",
    
                "https://images.unsplash.com/photo-1600631414623-955b235113f5?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max"    
            ].toString(),
            instructions: "Venha como se sentir a vontade e traga muito amor e paciência para dar.",
            opening_hours: "Horário de visitas Das 18h até 8h",
            open_on_weekends: "0"
    })

    //consultar dados da tabela
    const selectedOrphanages = await db.all("SELECT * FROM orphanages")
    console.log(selectedOrphanages)


    //consultar somente 1 orfanato, pelo id
    //const orphanage = await db.all('SELECT * FROM orphanages WHERE id = "2"')
    //console.log(orphanage)

    //deletar dado especifico da tabela
    //console.log(await db.run("DELETE FROM orphanages WHERE ID='10'"))   //where é muito importante , se não deleta tudo
    
})