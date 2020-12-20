var assert = require('assert');
const { json } = require('body-parser');
var expect = require('expect');
var Request = require("request");
describe('Pruebas unitarias sobre el servidor de backend', ()=>
{
    it('Prueba de login: Correcto. El intento de logeo debe ser exitoso', (done)=>
    {
        Request.post(            
        {
            url:"http://localhost:3000/user/login",
            form:
            {
                email: 'jorge@gmail.com',
                password:'123'
            },
        },
        function(error, response, body)
        {
            if(!error)
            {
                expect(JSON.parse(response.body)['auth']).toBe(true);                                  
                done();
            }
            else
            {
                console.log(error);
            }
        }        
        );
    });

    it('Prueba de login: Incorrecto. El intento de logeo debe fallar', (done)=>
    {
        Request.post(            
        {
            url:"http://localhost:3000/user/login",
            form:
            {
                email: 'jorge@gmail.com',
                password:'1234'
            },
        },
        function(error, response, body)
        {
            if(!error)
            {
                expect(JSON.parse(response.body)['auth']).toBe(false);                                  
                done();
            }
            else
            {
                console.log(error);
            }
        }        
        );
    });

    it('Prueba de login: Usuario innexistente, debe devolver autorización = false. ', (done)=>
    {
        Request.post(            
        {
            url:"http://localhost:3000/user/login",
            form:
            {
                email: 'xxxxxx@gmail.com',
                password:'1234'
            },
        },
        function(error, response, body)
        {
            if(!error)
            {
                expect(JSON.parse(response.body)['auth']).toBe(false);                                  
                done();
            }
            else
            {
                console.log(error);
            }
        }        
        );
    });    

});