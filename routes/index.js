const express = require("express");
const router = express.Router();
const conn = require('../conexion');

router.get('/', (req, res) => {
    res.send("Inicio");
});

// --------------- CONEXION AL BUS DE INTEGRACION ---------------
router.post('/crear-producto-cliente', (req, res) => {
    const { id_cliente, nombre, descripcion, stock, precio_venta, foto, fecha_subasta, precio_inicial_subasta, precio_compralo_ahora } = req.body;
    console.log('CLIENT: ', id_cliente, nombre, descripcion, stock, precio_venta, foto, fecha_subasta, precio_inicial_subasta, precio_compralo_ahora);
    let sql = `CALL Nuevo_Producto(?,?,?,?,?,?,?,?)`;
    let sqlParams = [nombre, descripcion, foto, precio_venta, id_cliente, 1, stock, 0];
    let query = conn.query(sql, sqlParams, (err, results) => {
        if (err) {
            res.send({
                status: 'fail',
                message: `Se esperaba obtener 'precio_venta' o 'fecha_subasta', 'precio_inicial_subasta' y 'precio_compralo_ahora'.`
            });
        } else {
            res.send({
                status: 'success',
                data: {
                    id_producto: 1,
                    nombre: nombre,
                    descripcion: descripcion,
                    stock: stock,
                    precio_venta: precio_venta,
                    foto: foto,
                    fecha_subasta: fecha_subasta,
                    precio_inicial_subasta: null,
                    precio_compralo_ahora: null
                },
                message: 'Producto creado de manera exitosa.'
            });
        }
    });
});

router.post('/crear-producto-proveedor', (req, res) => {
    const { id_proveedor, nombre, descripcion, stock, precio_venta, foto, fecha_subasta, precio_inicial_subasta, precio_compralo_ahora } = req.body;
    console.log('PROVIDER: ', id_proveedor, nombre, descripcion, stock, precio_venta, foto, fecha_subasta, precio_inicial_subasta, precio_compralo_ahora);
    let sql = `CALL Nuevo_Producto(?,?,?,?,?,?,?,?)`;
    let sqlParams = [nombre, descripcion, foto, precio_venta, id_proveedor, 1, stock, 0];
    let query = conn.query(sql, sqlParams, (err, results) => {
        if (err) {
            //res.send({ auth: false });
            res.send({
                status: 'fail',
                message: `Se esperaba obtener 'precio_venta' o 'fecha_subasta', 'precio_inicial_subasta' y 'precio_compralo_ahora'.`
            });
        } else {
            //res.send(results);
            res.send({
                status: 'success',
                data: {
                    id_producto: 1,
                    nombre: nombre,
                    descripcion: descripcion,
                    stock: stock,
                    precio_venta: precio_venta,
                    foto: foto,
                    fecha_subasta: fecha_subasta,
                    precio_inicial_subasta: null,
                    precio_compralo_ahora: null
                },
                message: 'Producto creado de manera exitosa.'
            });
        }
    });
});

router.get('/ver-productos', (req, res) => {
    const sql = `
    select Id_Producto as id_producto, 
    nombre, 
    descripcion, 
    Inventario as stock, 
    Precio_Unitario as precio_venta,
    Url_ as foto,
    NOW() as fecha_subasta,
    Id_Producto as precio_inicial_subasta,
    Id_Producto as precio_compralo_ahora
    from producto;
        `;
    const query = conn.query(sql, (err, results) => {
        if (err) {
            res.send({
                status: 'fail',
                message: 'Error en la consulta'
            });
        } else {
            res.send({
                status: 'success',
                data: results
            });
        }
    });
});

router.get('/ver-producto', (req, res) => { ///ver-producto?id_producto=val
    const id_producto = req.params['id_producto'];
    const sql = `
        select Id_Producto as id_producto, nombre, descripcion, Inventario as stock, Precio_Unitario as precio,
		       Url_ as foto, Id_Producto as precio_inicial_subasta, Id_Producto as precio_inicial_subasta
               from producto where Id_Producto = ${id_producto};
        `;
    const query = conn.query(sql, (err, results) => {
        if (err) {
            res.send({
                status: 'error',
                message: 'Ocurrio un error inesperado.'
            });
        } else {
            if (!results) {
                res.send({
                    status: 'fail',
                    message: 'No existe producto.'
                });
            } else {
                res.send({
                    status: 'success',
                    data: results
                });
            }
        }
    });
});

router.post('/realizar-compra', (req, res) => {
    const { id_cliente, productos } = req.body;
    //--------------- Creando carrito -------------------
    let sql = `CALL Insertar_Carrito(?)`;
    let sqlParams = [id_cliente];
    let id_Carrito;
    let query = conn.query(sql, sqlParams, (err, results) => {
        if (err) {
            res.send({
                status: 'fail',
                message: `Error en la conexion.`
            });
        } else {
            id_Carrito = results[0][0]['LAST_INSERT_ID()'];
            //console.log('ID_CARRITO', id_Carrito);
            //res.send(results);
            
            for (let x = 0; x < productos.length; x++) {
                let p = productos[x];
                let sql2 = `CALL Insertar_Detalle_Carrito(?,?,?)`;
                let sqlParams2 = [id_Carrito, p.id_producto, p.cantidad];
                const query2 = conn.query(sql2, sqlParams2, (err1, results1) => {
                    if (err1) {
                        
                    }
                });
            }      
            res.send({
                status: 'success',
                message: 'Se ha relizado la compra de manera exitosa.'
            });  


        }
    });
    


    

    // console.log('PARAMS: ', id_cliente, productos);

});

module.exports = router;