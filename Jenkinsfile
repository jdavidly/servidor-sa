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
                    //echo 'Borrando ultima version del contenedor'
                    //sh 'gcloud container images delete gcr.io/focal-lens-299204/microservicio-usuario-image:v1 --force-delete-tags'
                    sh 'export PROJECT_ID=focal-lens-299204'

                    echo 'Etiquetando contenedor'
                    sh 'docker tag image-microservicio-usuario:latest gcr.io/focal-lens-299204/microservicio-usuario-image:latest'

                    echo 'Guardando el contenedor en el registro'
                    sh 'docker push gcr.io/focal-lens-299204/microservicio-usuario-image:latest'

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
                echo 'Configurando kluster en kubernetes'

                sh 'export PROJECT_ID=focal-lens-299204'
                sh 'gcloud config set project $PROJECT_ID'
                sh 'gcloud config set compute/zone us-west3-b'
                //sh 'gcloud container clusters create cluster-grupo14  --machine-type=g1-small --disk-size=20G'
                
                //sh 'kubectl create deployment app-grupo14 --image=gcr.io/focal-lens-299204/microservicio-usuario-image:v1'
                //sh 'kubectl scale deployment app-grupo14 --replicas=3'
                //sh 'kubectl autoscale deployment app-grupo14 --cpu-percent=80 --min=1 --max=4'
                //sh 'kubectl expose deployment app-grupo14 --name=app-grupo14-service --type=LoadBalancer --port 80 --target-port 3000'   
                //sh 'kubectl get service'             

            }
        }   

        stage("Despliegue del sistema ")
        {
            steps
            {
                echo 'Desplegando nueva versión'
                //sh 'kubectl set image deployment/app-grupo14 app-grupo14=gcr.io/focal-lens-299204/microservicio-usuario-image:v1'            
                sh 'kubectl set image deployment/app-grupo14 microservicio-usuario-image=gcr.io/focal-lens-299204/microservicio-usuario-image:v1'    

                echo 'Se ha desplegado un nueva versión.'
            }
        }

    }
}