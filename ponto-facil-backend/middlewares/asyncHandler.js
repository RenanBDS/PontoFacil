// Exporta uma função que envolve controllers assíncronos e encaminha erros ao Express.
module.exports = (fn) => (req, res, next) => {
    // Executa a função assíncrona e envia qualquer erro rejeitado para o próximo middleware de erro.
    Promise.resolve(fn(req, res, next)).catch(next);
// Fecha a estrutura iniciada nas linhas anteriores.
};
