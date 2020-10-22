/**
 * Se parsea el resultado del query echo a la base de datos para generar un objeto accesible.
 * @param {*} result 
 */
function parseJSON(result)
{
    return Object.values(JSON.parse(JSON.stringify(result)));
}

module.exports.parseJSON = parseJSON;
