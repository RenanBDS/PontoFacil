/**
* Camada de acesso a dados do módulo de busca.
*
* Hoje (Aula 02) ainda não existe conexão com banco de dados — por isso
* esta função devolve sempre listas vazias. A partir da trilha da Aula 13,
* este é o único arquivo que vai mudar para consultar o banco de verdade
* por itens e usuários que combinem com o termo buscado.
*/

// Declara a função de busca global do módulo legado.
function globalSearch(query) {
// Devolve listas vazias; este módulo ainda não consulta dados reais do banco.
return { politicians: [], users: [] };
// Fecha o bloco de código ou objeto atual.
}

// Exporta este valor para que outros arquivos possam importá-lo com require().
module.exports = { globalSearch };
