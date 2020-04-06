const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const { page = 1 } = request.query;

        const [count] = await connection('incidents').count();
// variável count está entre [] pois pode retornar um array e quero pegar somente o primeiro ou count[0]
        
        response.header('X-Total-Count', count['count(*)']);
// no cabeçalho da resposta da requisição colocar o total de registros
        const incidents = await connection('incidents')
        .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
// join para trazer algumas colunas da tabela ongs
        .limit(5)
        .offset((page -1)* 5)
// lógica para paginar de 5 em 5 registros da tab incidents
        .select([
            'incidents.*',
            'ongs.name',
            'ongs.email',
            'ongs.whatsapp',
            'ongs.city', 
            'ongs.uf'
        ]);
// selecionar quais campos retornar da tab ongs, nomear os campos
        return response.json(incidents);
    },
    async create(request, response) {
        const { title, description, value} = request.body;
        const ong_id = request.headers.authorization;

        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id,
        });

        return response.json({ id });
    },
    async delete(request, response) {
        const { id } = request.params;
        const ong_id = request.headers.authorization;

        const incident = await connection('incidents')
            .where('id', id)
            .select('ong_id')
            .first();

        if (incident.ong_id != ong_id) {
            return response.status(401).json({ error: 'Operation not permitted.' });
        }

        await connection('incidents').where('id', id).delete();

        return response.status(204).send();
    }
};