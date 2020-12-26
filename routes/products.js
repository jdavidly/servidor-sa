const express = require("express");
const router = express.Router();
const conn = require('../conexion');

router.get('/categorias', (req, res) => {
    const sql = `SELECT id_categoria as categoria, nombre FROM categoria`;
    const query = conn.query(sql, (err, results) => {
        if (err) {
            res.send([]);
        } else {
            res.send(results);
        }
    });
});


router.get('/products', (req, res) => {
    const sql = `SELECT * FROM producto`;
    const query = conn.query(sql, (err, results) => {
        if (err) {
            res.send([]);
        } else {
            res.send(results);
        }
    });
});

router.get('/products/:category', (req, res) => {
    const category = req.params['category'];
    const sql = `SELECT * FROM producto WHERE categoria=${category}`;
    const query = conn.query(sql, (err, results) => {
        if (err) {
            res.send([]);
        } else {
            res.send(results);
        }
    });
});

router.post('/addProduct', (req, res) => {
    //console.log("agregando un producto")
    const { nombre, precio, cantidad, categoria, imagen, user, descripcion,forma } = req.body;
    let sql = `CALL Nuevo_Producto(?,?,?,?,?,?,?,?)`;
    let sqlParams = [nombre,descripcion,imagen,precio,user,categoria,cantidad,forma];
    let query = conn.query(sql, sqlParams, (err, results) => {
        if (err) {
            console.log("error: ", err);
            res.send({ auth: false });
        } else {
            //console.log("no es error: ", results);
            res.send(results);
        }
    });
    /*console.log("agregando un producto")
    const { nombre, precio, cantidad, categoria, imagen, user, descripcion,forma } = req.body;
    console.log(nombre, precio, cantidad, categoria, imagen, user, forma);
    //let sql = `INSERT INTO producto (nombre, precio, cantidad, categoria, url, proveedor, descripcion) VALUES ('${nombre}','${precio}','${cantidad}','${categoria}','${imagen}','${user}','${descripcion}')`;
    let sql = `EXEC Nuevo_Producto('${nombre}','${descripcion}'','${imagen}','${precio}','${user}','${categoria}','${cantidad}','${forma})`;
    let query = conn.query(sql, (err, results) => {
        if (err) {
            console.log(err);
            res.send({ auth: false });
        } else {
            console.log(results);
            //res.send({ auth: true });
            res.send(results);
        }
    });*/
});

//Retorna los productos que perteneces a un proveedor
router.post('/proveedor', (req, res) => {
    const { user } = req.body;
    const sql = `select p.id_producto as producto, p.nombre, p.precio_unitario as precio, p.inventario as cantidad, p.categoria_id_categoria as categoria, p.url_ as url, p.descripcion from usuario u, producto p
        where u.id_usuario = '${user}'
        and u.id_usuario = p.usuario_id_usuario;`;
    const query = conn.query(sql, (err, results) => {
        
        if (err) {
            res.send([]);
        } else {
            res.send(results);
        }
    });
});

router.post('/delete', (req, res) => {
    const { producto } = req.body;
    
    const sql = `delete from producto where producto = '${producto}';`;
    const query = conn.query(sql, (err, results) => {
        if (err) {
            console.log(err);
            res.send({ auth: false });
        } else {
            console.log(results);
            res.send({ auth: true });
        }
    });
});

router.post('/update-price', (req, res) => {
    const { producto, precio, cantidad } = req.body;
    const sql = `
        UPDATE producto
        SET precio = '${precio}', cantidad = '${cantidad}'
        WHERE producto = '${producto}';`;
        const query = conn.query(sql, (err, results) => {
        if (err) {
            console.log(err);
            res.send({ auth: false });
        } else {
            console.log(results);
            res.send({ auth: true });
        }
    });
});


router.post('/addSubasta', (req, res) => {
    
    const { producto, fecha_inicio, fecha_fin, valor_inicial} = req.body;
    console.log(producto, fecha_inicio, fecha_fin, valor_inicial)

    let sql = `CALL Crear_Subasta(?,?,?,?)`;
    let sqlParams = [producto,fecha_inicio,fecha_fin,valor_inicial];
    let query = conn.query(sql, sqlParams, (err, results) => {
        if (err) {
            console.log("error: ", err);
            res.send({ auth: false });
        } else {
            //console.log("no es error: ", results);
            res.send({ auth: false });
        }
    });

});

router.post('/subasta', (req, res) => {
    let sql = `CALL mostrar_subastas();`;
    let query = conn.query(sql, (err, results) => {
        if (err) {
            console.log("error: ", err);
            res.send({ auth: false });
        } else {
            res.send(results);
        }
    });
});

router.get('/formas-pago', (req, res) => {
    const sql = `SELECT * FROM forma_pago`;
    const query = conn.query(sql, (err, results) => {
        if (err) {
            res.send([]);
        } else {
            res.send(results);
        }
    });
});

router.post('/ofertarSubasta', (req, res) => {
    
    const { user, forma, producto, oferta} = req.body;
    let sql = `CALL Nueva_Oferta_Subasta(?,?,?,?)`;
    let sqlParams = [user,forma,producto,oferta];
    let query = conn.query(sql, sqlParams, (err, results) => {
        if (err) {
            console.log("error: ", err);
            res.send({ auth: false });
        } else {
            //console.log("no es error: ", results);
            res.send({ auth: true });
        }
    });

});

module.exports = router;