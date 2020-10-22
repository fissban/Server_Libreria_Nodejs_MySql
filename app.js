const util = require('./util/util.js');
//const UtilInstance = new Util();
// necesario para el servidor --------------------------------------------------- //
const express = require('express');

const app = express();
// en el body recibimos informacion estilo json (POST)
app.use(express.json());

app.use((req, res, next) =>
{
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// necesario para generar el token del login
const crypto = require('crypto');

// necesario para la coneccion a la DB ------------------------------------------ //
const mysql = require('mysql');

var DB_CONFIG =
{
    host: "localhost",
    user: "root",
    password: "",
    database: "libreria",
};

const PORT = 3000;

const STATUS_OK = 200;
const STATUS_ERROR = 404;
//  --------------------------------------------------------------------------------------------------- //
/**
 * GET 200
 * -
 {
    "msj": "ok",
    "size": 4,
    "data":
    [
        {
            "id": 5,
            "fullname": "Marco Faccio",
            "email": "marco.faccio@gmail.com",
            "phone": "2995952183",
            "address": "Ameghino 169 ",
            "state": "Neuquen",
            "city": "Plottier",
            "dni": 30967798,
            "date": "2020-08-31T03:00:00.000Z"
        },
     ]
    }
 */
app.get('/user/:page', async (req, res) =>
{
    try
    {
        let page = req.params.page;
        if (checkEmptyValue(page)) throw new Error('empty page');

        // cantidad de registros por pag
        const PAGE_SIZE = 50;

        let search1 = (page - 1) * PAGE_SIZE;
        let search2 = search1 + PAGE_SIZE;

        let msj = '';
        let data = '';

        // se usara el dni para verificar si ya se registro este usuario.
        let query = `SELECT * FROM users ORDER BY fullname DESC LIMIT ${search2} OFFSET ${search1} `;
        connection.query(query, (err, result) => 
        {
            if (err) throw err;

            msj = 'ok';
            data = util.parseJSON(result);
        });

        // se obtiene la cantidad de registros
        query = `SELECT COUNT(*) AS count FROM users`;
        connection.query(query, (err, result) =>
        {
            if (err) throw err;
            //setSize(util.parseJSON(result).count);
            q = util.parseJSON(result);
            // finalmente se envia la info
            res.status(STATUS_OK).send(
                {
                    msj: msj,
                    size: q[0].count,
                    data: data,
                });
        });



    }
    catch (e)
    {
        res.status(STATUS_ERROR).send({ msj: error });
        console.log(error);
    }
});
//  --------------------------------------------------------------------------------------------------- //
app.get('/user/:id', (req, res) =>
{
    try
    {
        let id = req.params.id;
        if (checkEmptyValue(name)) throw new Error('empty id');

        // se usara el dni para verificar si ya se registro este usuario.
        let query = `SELECT * FROM users WHERE id='${id}'`;
        connection.query(query, (err, result) =>
        {
            if (err) throw err;

            let json =
            {
                msj: 'ok',
                data: result
            }
            res.status(STATUS_OK).send(json);
        });

    }
    catch (e)
    {
        res.status(STATUS_ERROR).send({ msj: error });
        console.log(error);
    }
});
//  --------------------------------------------------------------------------------------------------- //
//TODO se podria mejorar indicando que empleado esta realizando esta accion
/**
 * POST ('/newuser')
 * Requiere parametros en formato JSON
 * - name
 * - email
 * - state
 * - city
 * - address
 * - dni
 * 
 * Si existe un user con el 'dni' 
 * - 200 -> 'There is already a registered user with this DNI.'
 * - 200 -> 'successful registration.'
 * 
 * Si un valor no se ingresoo esta vacio.
 * - 404 -> empty 'value'
 */
app.post('/newuser', (req, res) =>
{
    try
    {
        // XXX prevent sql inject -> ???
        let name = req.body.name;
        let email = req.body.email;
        let state = req.body.state;
        let city = req.body.city;
        let address = req.body.address;
        let phone = req.body.phone;
        let dni = req.body.dni;

        if (checkEmptyValue(name)) throw new Error('empty name');
        if (checkEmptyValue(email)) throw new Error('empty email');
        if (checkEmptyValue(state)) throw new Error('empty state');
        if (checkEmptyValue(city)) throw new Error('empty city');
        if (checkEmptyValue(address)) throw new Error('empty address');
        if (checkEmptyValue(phone)) throw new Error('empty phone');
        if (checkEmptyValue(dni)) throw new Error('empty dni');

        // se usara el dni para verificar si ya se registro este usuario.
        let query = `SELECT * FROM users WHERE dni='${dni}'`;
        let finishProgram = false;
        connection.query(query, (err, result) =>
        {
            if (err) throw err;

            let data = util.parseJSON(result);
            if (data.length > 0)
            {
                res.status(STATUS_OK).send({ register: 'There is already a registered user with this DNI.' });
                finishProgram = true;
            }
        });

        // se ejecuta aqui el return porq dentro de connection.query solo termina esa secuencia
        // y no la ejecucion del programa.
        if (finishProgram)
        {
            return;
        }
        query = `INSERT INTO users (fullname,email,phone,address,state,city,dni) VALUES ('${name}','${email}','${phone}','${address}','${state}','${city}','${dni}')`;
        connection.query(query, (err, result) =>
        {
            if (err) throw err;

            let data = util.parseJSON(result);
            if (data.length > 0)
            {
                res.status(STATUS_OK).send({ register: 'successful registration.' });
                return;
            }
        });
    }
    catch (error)
    {
        res.status(STATUS_ERROR).send({ register: error });
        console.log(error);
    }
});
/**
 * GET ('/getBooksBy/:type/:value')
 * Obtiene todos los libros de acuerdo a un campo(type) y un valor(value) especifico.
 * - 200 -> json
 * - 404 -> 'empty type' or 'empty type'
 */
app.get('/getBooksBy/:type/:value', (req, res) =>
{
    try
    {
        let type = req.params.type;
        let value = req.params.value;

        if (checkEmptyValue(type)) new Error('empty type');
        if (checkEmptyValue(value)) new Error('empty value');

        let query = `SELECT * FROM books WHERE ${type}='${value}'`;

        connection.query(query, (err, result) =>
        {
            if (err) throw err;

            res.status(STATUS_OK).send(result);
        });
    }
    catch (error)
    {
        console.log(error);
        res.status(STATUS_ERROR).send({ response: 'fail' });
    }
});
//  --------------------------------------------------------------------------------------------------- //
/**
 * Obtiene la cantidad de libros por target (author, gender, etc, etc)
 * STATUS: 200 - OK
 *  return array json
 * {
 *    "author": "Astromostra",
 *    "cantidad": 1
 *  },
 */
app.get('/count/:target', (req, res) =>
{
    try
    {
        let target = req.params.target;

        if (checkEmptyValue(target)) new Error('empty target');

        let query = `SELECT ${target}, count(*) AS count FROM books GROUP BY ${target}`;

        connection.query(query, (err, result) =>
        {
            if (err) throw err;

            res.status(STATUS_OK).send(result);
        });

    }
    catch (error)
    {
        console.log(error);
        res.status(STATUS_ERROR).send({ response: 'fail' });
    }
});

//  --------------------------------------------------------------------------------------------------- //
app.post('/login', (req, res) =>
{
    try
    {
        let user = req.body.user;
        let password = req.body.password;

        if (checkEmptyValue(user)) new Error('empty user');
        if (checkEmptyValue(password)) new Error('empty password');

        let query = `SELECT * FROM employee WHERE user='${user}' AND password='${password}'`;

        connection.query(query, (err, result) =>
        {
            if (err) throw err;

            let row = util.parseJSON(result);

            if (row.length > 0)
            {
                res.status(STATUS_OK).send({ response: 'ok' });
            }
        });

    }
    catch (error)
    {
        console.log(error);
        res.status(STATUS_ERROR).send({ response: 'fail' });
    }
});

app.post('/register', (req, res) =>
{
    //
});


// ---------------------------------------------------------------------------------------------- //
/**
 * Solucion para las caidas del servidor.
 */
function handleDisconnect()
{
    connection = mysql.createConnection(DB_CONFIG); // Recreate the connection, since
    // the old one cannot be reused.

    connection.connect(function (err)
    {   // The server is either down
        if (err)
        {                                       // or restarting (takes a while sometimes).
            console.log('error when connecting to db:', err);
            setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
        }                                       // to avoid a hot loop, and to allow our node script to
    });                                         // process asynchronous requests in the meantime.
    // If you're also serving http, display a 503 error.
    connection.on('error', function (err)
    {
        console.log('db error', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST')
        { // Connection to the MySQL server is usually
            handleDisconnect();                         // lost due to either server restart, or a
        }
        else
        {                                               // connnection idle timeout (the wait_timeout
            throw err;                                  // server variable configures this)
        }
    });
}

handleDisconnect();
// ------------------------------------------------------------------------------- //
// Se abre el listener de escucha de nuestra aplicacion
// ------------------------------------------------------------------------------- //

/**
 * Funcion para chequear si un valor es 'undefined' o 'empty'
 * @param {*} value 
 * @returns true or false
 */
function checkEmptyValue(value)
{
    if (value == undefined || value == '')
    {
        console.log('empty value: ' + value);
        return true;
    }
    return false;
}

app.listen(PORT, () =>
{
    console.log('Server start in port ' + PORT);
});
