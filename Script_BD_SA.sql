-- Generado por Oracle SQL Developer Data Modeler 20.3.0.283.0710
--   en:        2020-12-18 15:41:14 CST
--   sitio:      SQL Server 2000
--   tipo:      SQL Server 2000



CREATE TABLE CARRITO 
    (
     Id_Carrito INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
     Fecha_Ingreso DATETIME NOT NULL ,
     Estado INTEGER NOT NULL , -- 1 comprado 0 vigente 
     USUARIO_Id_Usuario INTEGER NOT NULL 
    );

-- ALTER TABLE CARRITO ADD CONSTRAINT CARRITO_PK PRIMARY KEY CLUSTERED (Id_Carrito);

CREATE TABLE Categoria 
    (
     Id_Categoria INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY, 
     Nombre VARCHAR (45) NOT NULL , 
     Descripcion VARCHAR (500) 
    );

-- ALTER TABLE Categoria ADD CONSTRAINT Categoria_PK PRIMARY KEY CLUSTERED (Id_Categoria);

CREATE TABLE DETALLE_CARRITO 
    (
     CARRITO_Id_Carrito INTEGER NOT NULL , 
     Producto_Id_Producto INTEGER NOT NULL , 
     Monto DECIMAL (10,2) NOT NULL , 
     Cantidad INTEGER NOT NULL 
    );

ALTER TABLE DETALLE_CARRITO ADD CONSTRAINT DETALLE_CARRITO_PK PRIMARY KEY CLUSTERED (CARRITO_Id_Carrito, Producto_Id_Producto);

CREATE TABLE Detalle_Favoritos 
    (
     Producto_Id_Producto INTEGER NOT NULL , 
     FAVORITOS_Id_Favoritos INTEGER NOT NULL 
    );

ALTER TABLE Detalle_Favoritos ADD CONSTRAINT Detalle_Favoritos_PK PRIMARY KEY CLUSTERED (Producto_Id_Producto, FAVORITOS_Id_Favoritos);

CREATE TABLE FACTURA 
    (
     Id_Factura INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY, 
     Total DECIMAL (10,2) NOT NULL , 
     FORMA_PAGO_USUARIO_Id_Forma_Pago_usuario INTEGER NOT NULL , 
     Fecha_compra DATETIME NOT NULL 
    );

-- ALTER TABLE FACTURA ADD CONSTRAINT FACTURA_PK PRIMARY KEY CLUSTERED (Id_Factura);

CREATE TABLE FACTURACION 
    (
     FACTURA_Id_Factura INTEGER NOT NULL , 
     SUBASTA_Id_Subasta INTEGER , 
     CARRITO_Id_Carrito INTEGER 
    );

ALTER TABLE FACTURACION ADD CONSTRAINT FACTURACION_PK PRIMARY KEY CLUSTERED (FACTURA_Id_Factura);

CREATE TABLE FAVORITOS 
    (
     Id_Favoritos INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY, 
     USUARIO_Id_Usuario INTEGER NOT NULL , 
     Nombre_Lista VARCHAR (35) NOT NULL , 
     Fecha_Creacion DATETIME NOT NULL 
    );

-- ALTER TABLE FAVORITOS ADD CONSTRAINT FAVORITOS_PK PRIMARY KEY CLUSTERED (Id_Favoritos);

CREATE TABLE FORMA_PAGO 
    (
     Id_Forma_Pago INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY, 
     Nombre VARCHAR (20) NOT NULL 
    );

-- ALTER TABLE FORMA_PAGO ADD CONSTRAINT FORMA_PAGO_PK PRIMARY KEY CLUSTERED (Id_Forma_Pago);

CREATE TABLE FORMA_PAGO_USUARIO 
    (
     Id_Forma_Pago_usuario INTEGER NOT NULL , 
     Numeracion_Tarjeta VARCHAR (16) NOT NULL , 
     USUARIO_Id_Usuario INTEGER NOT NULL , 
     Predeterminado INTEGER NOT NULL , 
     FORMA_PAGO_Id_Forma_Pago INTEGER NOT NULL 
    );

ALTER TABLE FORMA_PAGO_USUARIO ADD CONSTRAINT FORMA_PAGO_USUARIO_PK PRIMARY KEY CLUSTERED (Id_Forma_Pago_usuario);

CREATE TABLE NOTIFICACION 
    (
     Id_Notificacion INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY, 
     Mensaje VARCHAR (150) NOT NULL , 
     FACTURA_Id_Factura INTEGER NOT NULL 
    );

-- ALTER TABLE NOTIFICACION ADD CONSTRAINT NOTIFICACION_PK PRIMARY KEY CLUSTERED (Id_Notificacion);

CREATE TABLE OFERTA_SUBASTA 
    (
     Id_Oferta INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY, 
     Monto_Oferta DECIMAL (10,2) , 
     USUARIO_Id_Usuario INTEGER NOT NULL , 
     SUBASTA_Id_Subasta INTEGER NOT NULL , 
     Fecha_Oferta DATETIME 
    );

-- ALTER TABLE OFERTA_SUBASTA ADD CONSTRAINT OFERTA_SUBASTA_PK PRIMARY KEY CLUSTERED (Id_Oferta);

CREATE TABLE Producto 
    (
     Id_Producto INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY, 
     Nombre VARCHAR (250) , 
     Descripcion VARCHAR (500) , 
     Url_ VARCHAR (500) , 
     Precio_Unitario DECIMAL (10,2) , 
     USUARIO_Id_Usuario INTEGER NOT NULL , 
     Categoria_Id_Categoria INTEGER NOT NULL , 
     Inventario INTEGER , 
     Forma_Venta INTEGER -- 1 Subasta 0 Venta Directa
    );

-- ALTER TABLE Producto ADD CONSTRAINT Producto_PK PRIMARY KEY CLUSTERED (Id_Producto);

CREATE TABLE SUBASTA 
    (
     Id_Subasta INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY, 
     Fecha_Hora_Inicio DATETIME , 
     Fecha_Hora_Fin DATETIME , 
     Producto_Id_Producto INTEGER NOT NULL , 
     Valor_Inicial DECIMAL (10,2) , 
     Valor_Final DECIMAL (10,2) 
    );

-- ALTER TABLE SUBASTA ADD CONSTRAINT SUBASTA_PK PRIMARY KEY CLUSTERED (Id_Subasta);

/*CREATE TABLE USUARIO 
    (
     Id_Usuario INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY, 
     Nombres VARCHAR (500) NOT NULL , 
     NIT VARCHAR (15) , 
     Edad INTEGER , 
     Correo VARCHAR (50) , 
     Telefono VARCHAR (8) , 
     Tipo_Usuario INTEGER , 
     Direccion VARCHAR (150) , 
     Pass VARCHAR (10) NOT NULL 
    );*/

CREATE TABLE USUARIO 
    (
     Id_Usuario INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY, 
     nombre VARCHAR (500) NOT NULL , 
     apellido VARCHAR (15) ,  
	 empresa VARCHAR (150),
     email VARCHAR (50) NOT NULL,
	 contrasena VARCHAR (150) NOT NULL,	 
     celular INTEGER, 
	 direccion VARCHAR (250),
     Tipo_Usuario INTEGER
      
    );
	
-- ALTER TABLE USUARIO ADD CONSTRAINT USUARIO_PK PRIMARY KEY CLUSTERED (Id_Usuario);

ALTER TABLE CARRITO 
    ADD CONSTRAINT CARRITO_USUARIO_FK FOREIGN KEY 
    ( 
     USUARIO_Id_Usuario
    ) 
    REFERENCES USUARIO 
    ( 
     Id_Usuario 
    ) 
    ON DELETE CASCADE 
    ON UPDATE NO ACTION ;

ALTER TABLE DETALLE_CARRITO 
    ADD CONSTRAINT DETALLE_CARRITO_CARRITO_FK FOREIGN KEY 
    ( 
     CARRITO_Id_Carrito
    ) 
    REFERENCES CARRITO 
    ( 
     Id_Carrito 
    ) 
    ON DELETE CASCADE 
    ON UPDATE NO ACTION ;

ALTER TABLE DETALLE_CARRITO 
    ADD CONSTRAINT DETALLE_CARRITO_Producto_FK FOREIGN KEY 
    ( 
     Producto_Id_Producto
    ) 
    REFERENCES Producto 
    ( 
     Id_Producto 
    ) 
    ON DELETE CASCADE 
    ON UPDATE NO ACTION ;

ALTER TABLE Detalle_Favoritos 
    ADD CONSTRAINT Detalle_Favoritos_FAVORITOS_FK FOREIGN KEY 
    ( 
     FAVORITOS_Id_Favoritos
    ) 
    REFERENCES FAVORITOS 
    ( 
     Id_Favoritos 
    ) 
    ON DELETE CASCADE 
    ON UPDATE NO ACTION ;

ALTER TABLE Detalle_Favoritos 
    ADD CONSTRAINT Detalle_Favoritos_Producto_FK FOREIGN KEY 
    ( 
     Producto_Id_Producto
    ) 
    REFERENCES Producto 
    ( 
     Id_Producto 
    ) 
    ON DELETE CASCADE 
    ON UPDATE NO ACTION ;

ALTER TABLE FACTURA 
    ADD CONSTRAINT FACTURA_FORMA_PAGO_USUARIO_FK FOREIGN KEY 
    ( 
     FORMA_PAGO_USUARIO_Id_Forma_Pago_usuario
    ) 
    REFERENCES FORMA_PAGO_USUARIO 
    ( 
     Id_Forma_Pago_usuario 
    ) 
    ON DELETE CASCADE 
    ON UPDATE NO ACTION ;

ALTER TABLE FACTURACION 
    ADD CONSTRAINT FACTURACION_CARRITO_FK FOREIGN KEY 
    ( 
     CARRITO_Id_Carrito
    ) 
    REFERENCES CARRITO 
    ( 
     Id_Carrito 
    ) 
    ON DELETE CASCADE 
    ON UPDATE NO ACTION ;

ALTER TABLE FACTURACION 
    ADD CONSTRAINT FACTURACION_FACTURA_FK FOREIGN KEY 
    ( 
     FACTURA_Id_Factura
    ) 
    REFERENCES FACTURA 
    ( 
     Id_Factura 
    ) 
    ON DELETE CASCADE 
    ON UPDATE NO ACTION ;

ALTER TABLE FACTURACION 
    ADD CONSTRAINT FACTURACION_SUBASTA_FK FOREIGN KEY 
    ( 
     SUBASTA_Id_Subasta
    ) 
    REFERENCES SUBASTA 
    ( 
     Id_Subasta 
    ) 
    ON DELETE CASCADE 
    ON UPDATE NO ACTION ;

ALTER TABLE FAVORITOS 
    ADD CONSTRAINT FAVORITOS_USUARIO_FK FOREIGN KEY 
    ( 
     USUARIO_Id_Usuario
    ) 
    REFERENCES USUARIO 
    ( 
     Id_Usuario 
    ) 
    ON DELETE CASCADE 
    ON UPDATE NO ACTION ;

ALTER TABLE FORMA_PAGO_USUARIO 
    ADD CONSTRAINT FORMA_PAGO_USUARIO_FORMA_PAGO_FK FOREIGN KEY 
    ( 
     FORMA_PAGO_Id_Forma_Pago
    ) 
    REFERENCES FORMA_PAGO 
    ( 
     Id_Forma_Pago 
    ) 
    ON DELETE CASCADE 
    ON UPDATE NO ACTION ;

ALTER TABLE FORMA_PAGO_USUARIO 
    ADD CONSTRAINT FORMA_PAGO_USUARIO_USUARIO_FK FOREIGN KEY 
    ( 
     USUARIO_Id_Usuario
    ) 
    REFERENCES USUARIO 
    ( 
     Id_Usuario 
    ) 
    ON DELETE CASCADE 
    ON UPDATE NO ACTION ;

ALTER TABLE NOTIFICACION 
    ADD CONSTRAINT NOTIFICACION_FACTURA_FK FOREIGN KEY 
    ( 
     FACTURA_Id_Factura
    ) 
    REFERENCES FACTURA 
    ( 
     Id_Factura 
    ) 
    ON DELETE CASCADE 
    ON UPDATE NO ACTION ;

ALTER TABLE OFERTA_SUBASTA 
    ADD CONSTRAINT OFERTA_SUBASTA_SUBASTA_FK FOREIGN KEY 
    ( 
     SUBASTA_Id_Subasta
    ) 
    REFERENCES SUBASTA 
    ( 
     Id_Subasta 
    ) 
    ON DELETE CASCADE 
    ON UPDATE NO ACTION ;

ALTER TABLE OFERTA_SUBASTA 
    ADD CONSTRAINT OFERTA_SUBASTA_USUARIO_FK FOREIGN KEY 
    ( 
     USUARIO_Id_Usuario
    ) 
    REFERENCES USUARIO 
    ( 
     Id_Usuario 
    ) 
    ON DELETE CASCADE 
    ON UPDATE NO ACTION ;

ALTER TABLE Producto 
    ADD CONSTRAINT Producto_Categoria_FK FOREIGN KEY 
    ( 
     Categoria_Id_Categoria
    ) 
    REFERENCES Categoria 
    ( 
     Id_Categoria 
    ) 
    ON DELETE CASCADE 
    ON UPDATE NO ACTION ;

ALTER TABLE Producto 
    ADD CONSTRAINT Producto_USUARIO_FK FOREIGN KEY 
    ( 
     USUARIO_Id_Usuario
    ) 
    REFERENCES USUARIO 
    ( 
     Id_Usuario 
    ) 
    ON DELETE CASCADE 
    ON UPDATE NO ACTION ;

ALTER TABLE SUBASTA 
    ADD CONSTRAINT SUBASTA_Producto_FK FOREIGN KEY 
    ( 
     Producto_Id_Producto
    ) 
    REFERENCES Producto 
    ( 
     Id_Producto 
    ) 
    ON DELETE CASCADE 
    ON UPDATE NO ACTION ;



-- Informe de Resumen de Oracle SQL Developer Data Modeler: 
-- 
-- CREATE TABLE                            14
-- CREATE INDEX                             0
-- ALTER TABLE                             50
-- CREATE VIEW                              0
-- ALTER VIEW                               0
-- CREATE PACKAGE                           0
-- CREATE PACKAGE BODY                      0
-- CREATE PROCEDURE                         0
-- CREATE FUNCTION                          0
-- CREATE TRIGGER                           0
-- ALTER TRIGGER                            0
-- CREATE DATABASE                          0
-- CREATE DEFAULT                           0
-- CREATE INDEX ON VIEW                     0
-- CREATE ROLLBACK SEGMENT                  0
-- CREATE ROLE                              0
-- CREATE RULE                              0
-- 
-- DROP DATABASE                            0
-- 
-- ERRORS                                   0
-- WARNINGS                                 0
