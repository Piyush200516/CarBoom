pipeline {
    agent any

    environment {
        // Jenkins Credentials IDs (configure in Jenkins UI)
        NEON_DB_URL = credentials('neon-db-url') // Secret text
        JWT_SECRET   = credentials('jwt-secret')   // Secret text
        // Add other credentials as needed, e.g., S3 keys, deployment tokens
    }

    options {
        // Keep build logs for 30 days
        timeout(time: 30, unit: 'MINUTES')
        timestamps()
        ansiColor('xterm')
    }

    stages {
        stage('Clone Repository') {
            steps {
                // Checkout the main branch
                checkout([$class: 'GitSCM', branches: [[name: '*/main']],
                           userRemoteConfigs: [[url: 'https://github.com/Piyush200516/CarBoom.git']]])
            }
        }

        stage('Install Dependencies') {
            parallel {
                stage('Install Frontend') {
                    steps {
                        dir('client') {
                            sh 'npm ci'
                        }
                    }
                }
                stage('Install Backend') {
                    steps {
                        dir('server') {
                            sh 'npm ci'
                        }
                    }
                }
            }
        }

        stage('Prisma Generate') {
            steps {
                dir('server') {
                    sh 'npx prisma generate'
                }
            }
        }

        stage('Lint') {
            parallel {
                stage('Lint Frontend') {
                    steps {
                        dir('client') {
                            sh 'npm run lint || true'
                        }
                    }
                }
                stage('Lint Backend') {
                    steps {
                        dir('server') {
                            sh 'npm run lint || true'
                        }
                    }
                }
            }
        }

        stage('Test') {
            parallel {
                stage('Test Frontend') {
                    steps {
                        dir('client') {
                            // Run tests only if a test script exists
                            sh '''if npm run | grep -q "test"; then npm test; else echo "No frontend tests"; fi'''
                        }
                    }
                }
                stage('Test Backend') {
                    steps {
                        dir('server') {
                            sh '''if npm run | grep -q "test"; then npm test; else echo "No backend tests"; fi'''
                        }
                    }
                }
            }
        }

        stage('Build Frontend') {
            steps {
                dir('client') {
                    sh 'npm run build'
                }
            }
        }

        stage('Build Backend') {
            steps {
                dir('server') {
                    sh 'npm run build'
                }
            }
        }

        stage('Verify Build Success') {
            steps {
                // Simple sanity checks for expected artifact directories
                dir('client') {
                    sh 'if [ -d dist ]; then echo "Frontend build present"; else exit 1; fi'
                }
                dir('server') {
                    sh 'if [ -d dist ]; then echo "Backend build present"; else exit 1; fi'
                }
            }
        }
    }

    post {
        always {
            // Archive the built artifacts for later use
            archiveArtifacts artifacts: 'client/dist/**', fingerprint: true
            archiveArtifacts artifacts: 'server/dist/**', fingerprint: true
        }
        success {
            echo 'Jenkins pipeline completed successfully.'
        }
        failure {
            echo 'Jenkins pipeline failed.'
        }
    }
}
