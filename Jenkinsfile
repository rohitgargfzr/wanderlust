pipeline {
    agent any
    
    stages {
        stage('Install dependencies') {
            steps {
                sh 'npm install'
            }
        }
        
        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv('sonar-server') {
                    sh '''
                    npx sonarqube-scanner \
                      -Dsonar.exclusions=node_modules/**,dist/** \
                      -Dsonar.projectKey=sonar-scan-learning \
                      -Dsonar.sources=.
                    '''
                }
            }
        }
        
        stage('Quality Gate') {
            steps {
                // Wait for the SonarQube server to process the report and return a Pass/Fail status
                timeout(time: 1, unit: 'HOURS') {
                    waitForQualityGate abortPipeline: true
                }
            }
        } // 👈 Added this missing brace to close the "Quality Gate" stage
    } // 👈 Added this brace to properly close the "stages" block

    post { // 👈 Moved "post" out to its own clean block at the root of the pipeline
        failure {
            // Send Slack message
            slackSend(color: 'danger', message: "🚨 Pipeline Failed: ${env.JOB_NAME} [${env.BUILD_NUMBER}]\nView logs: ${env.BUILD_URL}")
        }
        success {
            // Updated text from "Failed" to "Passed" for clarity
            slackSend(color: 'good', message: "✅ Pipeline Passed: ${env.JOB_NAME} [${env.BUILD_NUMBER}]\nView logs: ${env.BUILD_URL}")
        }
    }
}
