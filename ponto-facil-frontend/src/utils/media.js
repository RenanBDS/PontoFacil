// Linha original 1: Declara a constante UPLOADS_URL e atribui a ela o valor ou resultado desta expressão.
const UPLOADS_URL = import.meta.env.VITE_UPLOADS_URL

// Linha original 3: Declara e exporta uma função que poderá ser chamada por outros arquivos.
export function getProfilePictureUrl(filename) {
    // Linha original 4: Encerra a função retornando o valor ou objeto indicado para quem a chamou.
    return `${UPLOADS_URL}/uploads/profiles/${filename}`
// Linha original 5: Fecha o bloco, objeto, lista ou chamada iniciado anteriormente.
}
