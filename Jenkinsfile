pipeline{
  agent any
  stages {
    stage('Install dependencies'){
      steps {
        sh 'npm install'
      }
    }
    stage('SonarQube Analysis'){
      steps {
        withSonarQubeEnv('Sonar-server'){
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
  }
}}