Use sa_dic_2020;
-- -------------------------------Consultas DE PERFIL DE USUARIO --------------------------

-- Insertar un Producto desde el usuario
-- Al momento de Crear un producto se debe seleccionar insertar en Forma_Venta 
-- 0 para venta normal y 1 para subasta 
-- ALTER TABLE producto MODIFY id_producto int NOT NULL AUTO_INCREMENT;
DELIMITER $$
CREATE PROCEDURE Nuevo_Producto
(
	IN _Nombre VARCHAR (250) , 
	IN _Descripcion VARCHAR (500) , 
	IN _Url_ VARCHAR (500) , 
    IN _Precio_Unitario DECIMAL (10,2) , 
	IN _USUARIO_Id_Usuario INTEGER, 
    IN _Categoria_Id_Categoria INTEGER, 
    IN _Inventario INTEGER , 
    IN _Forma_Venta INTEGER 
)
BEGIN
  INSERT INTO Producto
	(Nombre,Descripcion,Url_,Precio_Unitario,USUARIO_Id_Usuario,Categoria_Id_Categoria,Inventario,Forma_Venta)
	VALUES
	(_Nombre, _Descripcion, _Url_, _Precio_Unitario, _USUARIO_Id_Usuario, _Categoria_Id_Categoria,
    _Inventario, _Forma_Venta);
END$$
DELIMITER ;

-- ---------------------------------------------------------------------------------------
DELIMITER $$
CREATE FUNCTION LogIn(_Email VARCHAR(50), _contrasena VARCHAR(150)) 
RETURNS INTEGER
DETERMINISTIC
BEGIN
    DECLARE id_User INTEGER;
    SET id_User = (SELECT Id_Usuario FROM usuario WHERE Email = _Email AND Contrasena = _contrasena);
    IF id_User IS NULL THEN
		RETURN (-1);
    ELSE
		RETURN (id_User);
	END IF;
END$$
DELIMITER ;

-- ---------- NUEVO USUARIO------------------------------
/*DELIMITER $$
CREATE FUNCTION Nuevo_Usuario
(
	_Nombres VARCHAR (500), 
	_NIT VARCHAR (15), 
	_Edad INTEGER, 
	_Correo VARCHAR (50) , 
	_Telefono VARCHAR (8) , 
	_Tipo_Usuario INTEGER , 
	_Direccion VARCHAR (150) , 
	_Pass VARCHAR (10) 
)
RETURNS INTEGER
DETERMINISTIC
BEGIN
	DECLARE user_ INTEGER;
    SET user_ = (SELECT LogIn(_Correo, _Pass));
    
    IF user_ = -1 THEN
		INSERT INTO Usuario(Id_Usuario, Nombres, NIT, Edad, Correo, Telefono, Tipo_Usuario, Direccion, Pass)
        VALUE (_Nombres,_NIT,_Edad,_Correo,_Telefono,_Tipo_Usuario,_Direccion,_Pass);
		RETURN (1);
	ELSE
		RETURN (-1);
    END IF;
END$$
DELIMITER ;*/
DELIMITER $$
CREATE FUNCTION Nuevo_Usuario
(
	_Nombre VARCHAR (500), 
	_Apellido VARCHAR (15), 
	_Email VARCHAR (50) ,
	_Contrasena VARCHAR (150),	
	_Celular INTEGER, 
	_Tipo_Usuario INTEGER
)
RETURNS INTEGER
DETERMINISTIC
BEGIN
	DECLARE user_ INTEGER;
    SET user_ = (SELECT LogIn(_Email, _Contrasena));
    
    IF user_ = -1 THEN
		INSERT INTO Usuario(Nombre, Apellido, Email, Contrasena, Celular, Tipo_Usuario)
        VALUE (_Nombre,_Apellido,_Email,_Contrasena,_Celular,_Tipo_Usuario);
		RETURN (1);
	ELSE
		RETURN (-1);
    END IF;
END$$
DELIMITER ;

DELIMITER $$
CREATE FUNCTION Nueva_Categoria
(
	_Nombre VARCHAR (45), 
    _Descripcion VARCHAR (500) 
)
RETURNS INTEGER
DETERMINISTIC
BEGIN
	DECLARE categ_ INTEGER;
    SET categ_ = (SELECT Id_categoria From Categoria Where Nombre = _Nombre);
    
    IF categ_ IS NULL THEN
		INSERT INTO Categoria(Nombre,Descripcion)
        VALUE (_Nombre,_Descripcion);
		RETURN (1);
	ELSE
		RETURN (-1);
    END IF;
END$$
DELIMITER ;

-- INSERT INTO FORMA_PAGO(Nombre) VALUES('Tarjeta de Credito');
-- INSERT INTO FORMA_PAGO(Nombre) VALUES('Tarjeta de Debito');

-- -------------------------------- Ver Productos Por Categoria --------------------------------------
DELIMITER $$
CREATE PROCEDURE Ver_Productos_Categoria
(
	IN _Categoria INTEGER -- codigo de categoria
)
BEGIN
	SELECT pr.*
		FROM categoria cat 
			INNER JOIN producto pr ON pr.Categoria_Id_Categoria = cat.Id_categoria
		WHERE cat.Id_Categoria = _Categoria
			OR _Categoria = -1;
END$$
DELIMITER ;

-- -------------------------------- Agregar al Carrito --------------------------------------
DELIMITER $$
CREATE PROCEDURE Agregar_Producto_Carrito
(
	IN _Usuario INTEGER,  -- codigo de usuario
	IN _Producto INTEGER, -- codigo de producto
    IN _Cantidad INTEGER 
)
BEGIN	 
    DECLARE _id_carrito INTEGER;
    DECLARE _id_carrito_nuevo INTEGER;
    DECLARE _id_producto INTEGER;
    DECLARE _monto DECIMAL(10,2);
    
    -- Verificamos si hay carrito vigente (con estado 0)   
    SET _id_carrito = (SELECT Id_Carrito FROM carrito WHERE Estado = 0 AND USUARIO_Id_Usuario = _Usuario);
    SET _monto = (SELECT Precio_Unitario FROM Producto WHERE Id_producto = _Producto);
	
    IF _id_carrito IS NOT NULL THEN		
        -- tiene un carrito
        -- verificamos si el producto ya existe en la lista del carrito        
        SET _id_producto = (SELECT Producto_Id_Producto FROM DETALLE_CARRITO WHERE CARRITO_Id_Carrito = _id_carrito AND Producto_Id_Producto = _Producto);
        
        -- Si ya existe solo se modifica el monto y la cantidad
        IF _id_producto IS NOT NULL THEN
			UPDATE DETALLE_CARRITO, Producto
            SET DETALLE_CARRITO.Monto = (_Cantidad * Producto.Precio_Unitario) + DETALLE_CARRITO.Monto, 
				DETALLE_CARRITO.Cantidad = DETALLE_CARRITO.Cantidad +  _Cantidad
			WHERE DETALLE_CARRITO.Producto_Id_Producto = Producto.Id_Producto;
        ELSE
			-- Si no existe solo se agrega al detalle del carrito						
			INSERT INTO DETALLE_CARRITO(CARRITO_Id_Carrito, Producto_Id_Producto, Monto, Cantidad)
			VALUES(_id_carrito, _Producto, (_monto*_Cantidad), _Cantidad);
        END IF;        
    ELSE
		-- Se crea nuevo carrito
        INSERT INTO CARRITO(Fecha_Ingreso, Estado, USUARIO_Id_Usuario)
		VALUES(CURDATE(),0,_Usuario);
        
        SET _id_carrito_nuevo = (SELECT LAST_INSERT_ID('CARRITO'));
        
        INSERT INTO DETALLE_CARRITO(CARRITO_Id_Carrito, Producto_Id_Producto, Monto, Cantidad)
        VALUES(_id_carrito_nuevo, _Producto, (_monto*_Cantidad), _Cantidad);
    END IF;
END$$
DELIMITER ;

-- -------------------------------- Obtener Carrito Usuario --------------------------------------
DELIMITER $$
CREATE PROCEDURE Obtener_Carrito_Usuario
(
	IN _Usuario INTEGER
)
BEGIN            
	SELECT 
		car.Id_Carrito,
		pr.Id_Producto, 
		pr.Nombre, 
        pr.Descripcion, 
        pr.Url_, 
        pr.Precio_Unitario, 
        usu.Nombre as proveedor,
		cat.Nombre as categoria, 
        pr.Inventario as stock,
        dc.Cantidad, 
        dc.Monto
		FROM carrito car
			INNER JOIN DETALLE_CARRITO dc ON car.Id_Carrito = dc.CARRITO_Id_Carrito
			INNER JOIN Producto pr ON pr.Id_Producto = dc.Producto_Id_Producto
            INNER JOIN usuario usu ON usu.Id_Usuario = pr.USUARIO_Id_Usuario
            INNER JOIN categoria cat ON cat.Id_Categoria = pr.Categoria_Id_Categoria
        WHERE car.Estado = 0 
            AND car.USUARIO_Id_Usuario = _Usuario
			AND dc.Cantidad > 0;
END$$
DELIMITER ;


-- -------------------------------- Quita un producto del carrito --------------------------------------
DELIMITER $$
CREATE PROCEDURE Quitar_Producto_Carrito
(
    IN _Usuario INTEGER,
    IN _Producto INTEGER
)
BEGIN            
	DECLARE _id_carrito INTEGER;
    DECLARE _monto DECIMAL(10,2);
    DECLARE _cantidad_actual INTEGER;
    
    -- obtenemos el id_del carrito del usuario
    SET _id_carrito = (SELECT Id_Carrito FROM carrito WHERE Estado = 0 AND USUARIO_Id_Usuario = _Usuario);
    SET _monto = (SELECT Precio_Unitario FROM Producto WHERE Id_producto = _Producto);
    SET _cantidad_actual = (SELECT Cantidad FROM DETALLE_CARRITO WHERE CARRITO_Id_Carrito = _id_carrito);
	
    UPDATE DETALLE_CARRITO
		SET Monto = DETALLE_CARRITO.Monto - _monto,
			Cantidad = DETALLE_CARRITO.Cantidad - 1
		WHERE CARRITO_Id_Carrito = _id_carrito
			AND Cantidad > 0;
END$$
DELIMITER ;









