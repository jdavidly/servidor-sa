pipeline
{
    agent any  
    stages
    {
        stage("Prueba de ejecución")
        {               

            steps
            {                
                echo 'Estableciendo variables de entorno para pruebas'               
                sh 'export PORTCLIENTE=9000'                
                sh 'export PORTRESTAURANTE=9100'
                sh 'export PORTREPARTIDOR=9200'
                sh 'export PORTEBS=9300'  

                echo 'Pruebas de construcción de servicio cliente'
                dir("microservicio-usuario") 
                {                    
                    sh 'npm install'                
                    sh 'npm start'
                }                                                                                                                                       
            }                                    
        }

        stage("Realización de pruebas unitarias")
        {
            steps
            {
                echo 'Realizando pruebas unitarias servicio '
                dir("microservicio-usuario")
                {
                    sh 'npm test'
                }
                sh 'forever stopall'
            }
        }

        stage("Creación de artefactos")
        {
            steps
            {
                echo 'Creando la imagen docker de microservicio usuario'
                dir("microservicio-usuario")
                {
                    sh 'docker build -t image-microservicio-usuario .'
                }
            }
        }

    }
}