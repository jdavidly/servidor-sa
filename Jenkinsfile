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
                echo 'Creación de artefactos correcta'
            }
        }



        stage("Registro de artefactos")
        {
            steps
            {                
                dir("microservicio-usuario")
                {                    
                    echo 'Borrando ultima version del contenedor'
                    sh 'gcloud container images delete gcr.io/focal-lens-299204/microservicio-usuario-image:v1 --force-delete-tags'

                    echo 'Etiquetando contenedor'
                    sh 'docker tag image-microservicio-usuario:latest gcr.io/focal-lens-299204/microservicio-usuario-image:v1'

                    echo 'Guardando el contenedor en el registro'
                    sh 'docker push gcr.io/focal-lens-299204/microservicio-usuario-image:v1'

                    echo 'Registrando el contenedor del microservicio usuario'
                }                                                            
            }
        }
        

        stage("Aprobación de despliegue")
        {
            steps
            {
                echo 'Despliegue aprobado.'
            }
        }
        

        stage("Gestión de la configuración a través de ansible")
        {   
            steps
            {
                echo 'Configurando los servidores a través de ansible'
            }
        }   

        stage("Despliegue del sistema ")
        {
            steps
            {
                echo 'Configurando kluster en kubernetes'
            }
        }

    }
}