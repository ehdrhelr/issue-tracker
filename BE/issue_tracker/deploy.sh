#!bin/bash

# real deploy script

# ELASTIC_IP=3.37.234.113

DNS=ec2-3-37-234-113.ap-northeast-2.compute.amazonaws.com


CURRENT_PID=$(pgrep -f issue_tracker)
if [ -z $CURRENT_PID ]; then
else
fi

echo "> 배포를 시작합니다. `date`"

JAR_NAME=$(ls $REPOSITORY/ | grep 'issue_tracker' | tail -n 1)

nohup java -jar $REPOSITORY/$JAR_NAME &

echo "> 배포를 완료했습니다. `date`"
