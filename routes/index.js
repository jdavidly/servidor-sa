const express = require("express");
const router = express.Router();
const conn = require('../conexion');

router.get('/', (req, res) => {
    res.send("Inicio");
});

// --------------- CONEXION AL BUS DE INTEGRACION ---------------
router.post('/crear-producto-cliente', (req, res) => {
    //console.log("agregando un producto")
    console.log(req.query);
    /*const { id_cliente, nombre, descripcion, stock, precio_venta, foto, fecha_subasta, precio_inicial_subasta, precio_compralo_ahora} = req.body;
    console.log('PARAMS: ',id_cliente, nombre, descripcion, stock, precio_venta, foto, fecha_subasta, precio_inicial_subasta, precio_compralo_ahora);
    */
    /*
    let sql = `CALL Nuevo_Producto(?,?,?,?,?,?,?,?)`;
    let sqlParams = [nombre,descripcion,imagen,precio,user,categoria,cantidad,forma];
    let query = conn.query(sql, sqlParams, (err, results) => { 
        
        if (err) {
            console.log("error: ", err);
            res.send({ auth: false });
        } else {*/
            res.send([]);
        /*}
    });*/
});

router.post('/crear-producto-proveedor', (req, res) => {
    /*const { id_proveedor, nombre, descripcion, stock, precio_venta, foto, fecha_subasta, precio_inicial_subasta, precio_compralo_ahora} = req.body;
    console.log('PARAMS: ',id_proveedor, nombre, descripcion, stock, precio_venta, foto, fecha_subasta, precio_inicial_subasta, precio_compralo_ahora);
    */
    console.log(req.query);
    res.send([]);
});

router.get('/ver-productos', (req, res) => {
    
    /*[
        {
        "id_producto": 1,
        "nombre": "Monitor LGU32",
        "descripcion": "Monitor LG de 32 pulgadas 4k@240HZ",
        "stock": 50,
        "precio": 2000,
        "foto": "https://www.lg.com/us/images/monitors/md05602277/gallery/1100-1.jpg",
        "fecha_subasta": null,
        "precio_inicial_subasta": null,
        "precio_compralo_ahora": null
        },
        {
        "id_producto": 10,
        "nombre": "Teclado TUF gaming-7",
        "descripcion": "Teclado mecánico óptico de gaming TUF Gaming K7 con resistencia IP56 contra polvo y líquidos, aluminio aeronáutico e iluminación Aura Sync",
        "stock": 60,
        "precio": null,
        "foto": "https://www.asus.com/media/global/products/VhfjeAw84tomuPVC/P_setting_xxx_0_90_end_500.png",
        "fecha_subasta": 1608886800,
        "precio_inicial_subasta": 150,
        "precio_compralo_ahora": 500
        }
    ]*/

    res.send([]);
    
});

router.get('/ver-productos-fase-3', (req, res) => {
    /*[
        {
        "id_producto": 1,
        "nombre": "Monitor LGU32",
        "descripcion": "Monitor LG de 32 pulgadas 4k@240HZ",
        "stock": 50,
        "precio": 2000,
        "foto": "https://www.lg.com/us/images/monitors/md05602277/gallery/1100-1.jpg",
        "fecha_subasta": null,
        "precio_inicial_subasta": null,
        "precio_compralo_ahora": null
        },
        {
        "id_producto": 10,
        "nombre": "Teclado TUF gaming-7",
        "descripcion": "Teclado mecánico óptico de gaming TUF Gaming K7 con resistencia IP56 contra polvo y líquidos, aluminio aeronáutico e iluminación Aura Sync",
        "stock": 60,
        "precio": null,
        "foto": "https://www.asus.com/media/global/products/VhfjeAw84tomuPVC/P_setting_xxx_0_90_end_500.png",
        "fecha_subasta": 1608886800,
        "precio_inicial_subasta": 150,
        "precio_compralo_ahora": 500
        }
    ]*/
    res.send(['FASE3']);
});

router.get('/ver-producto', (req, res) => { ///ver-producto?id_producto=val
    /*{
        "id_producto": 10,
        "nombre": "Teclado TUF gaming-7",
        "descripcion": "Teclado mecánico óptico de gaming TUF Gaming K7 con resistencia IP56 contra polvo y líquidos, aluminio aeronáutico e iluminación Aura Sync",
        "stock": 60,
        "precio": null,
        "foto": "https://www.asus.com/media/global/products/VhfjeAw84tomuPVC/P_setting_xxx_0_90_end_500.png",
        "fecha_subasta": 1608886800,
        "precio_inicial_subasta": 150,
        "precio_compralo_ahora": 500
        }*/
    const sql = `SELECT * FROM forma_pago`;
    const query = conn.query(sql, (err, results) => {
        if (err) {
            res.send([]);
        } else {
            res.send(results);
        }
    });
});

router.post('/realizar-compra', (req, res) => {
    const { id_cliente, productos} = req.body;
    console.log('PARAMS: ',id_cliente, productos);
    
});

module.exports = router;