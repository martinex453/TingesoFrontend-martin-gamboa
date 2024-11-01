pipeline {
    agent any
    tools {
        nodejs 'node_20_17_0' 
    }
    stages {
        stage('Checkout') {
            steps {
                checkout scmGit(branches: [[name: '*/main']], extensions: [], userRemoteConfigs: [[url: 'https://github.com/martinex453/TingesoFrontend-martin-gamboa.git']])
            }
        }

        stage('Install dependencies') {
            steps {
                bat 'npm install --legacy-peer-deps'
            }
        }

        stage('Build React app') {
            steps {
                bat 'npm run build'
            }
        }

        stage('Build Docker image') {
            steps {
                script {
                    bat 'docker build -t martinex453/front-martin-gamboa:latest .'
                }
            }
        }

        stage('Push Docker Images to Docker Hub') {
            steps {
                script {
                    withCredentials([string(credentialsId: 'mgvkC', variable: 'mgvk')]) {
                        bat 'docker login -u martinex453 -p %mgvk%'
                    }
                    bat 'docker push martinex453/front-martin-gamboa:latest'
                }
            }
        }
    }
}
