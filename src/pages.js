const Database = require('./database/db');
const saveOrphanage = require('./database/saveOrphanage');

module.exports = {

    index(req, res) {                         //arrow function que liga o servidor criado e já configurado com o diretório da página(html) inicial                           
        return res.render('index')
    },

    async orphanage(req, res) {
        const id = req.query.id

        try {
            const db = await Database;
            const results = await db.all(`SELECT * FROM orphanages WHERE id = "${id}"`)
            const orphanage = results[0]

            orphanage.images = orphanage.images.split(",")
            orphanage.firstImage = orphanage.images[0]

            if (orphanage.open_on_weekends == "0") {
                orphanage.open_on_weekends = true
            } else {
                orphanage.open_on_weekends = false
            }

            return res.render('orphanage', { orphanage })
        } catch (error) {
            console.log(error);
            return res.send('Erro no banco de dados!')
        }
    },

    async orphanages(req, res) {                                    //não pode esquecer do async e do bloco try catch
        try {
            const db = await Database;                                    //uso sem o .then
            const orphanages = await db.all("SELECT * FROM orphanages")  //colocando o orphanage pelo banco
            return res.render('orphanages', { orphanages })
        } catch (error) {
            console.log(error);
            return res.send('Erro no banco de dados!')
        }
    },

    createOrphanage(req, res) {
        return res.render('create-orphanage')
    },

    async saveOrphanage(req, res) {
        const fields = req.body

        //validar se todos os campos estão preenchidos
        if (Object.values(fields).includes('')) {
            return res.send('Todos os campos devem ser preenchidos!')
        }


        try {
            //salvar um orfanato
            const db = await Database
            await saveOrphanage(db, {
                lat: fields.lat,
                lng: fields.lng,
                name: fields.name,
                about: fields.about,
                whatsapp: fields.whatsapp,
                images: fields.images.toString(),
                instructions: fields.instructions,
                opening_hours: fields.opening_hours,
                open_on_weekends: fields.open_on_weekends,
            })

            //redirecionamento
            return res.redirect('/orphanages')
        } catch (error) {
            console.log(error)
            return res.send('Erro no banco de dados!')
        }
    },
};
