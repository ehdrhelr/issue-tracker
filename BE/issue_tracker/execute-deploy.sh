#!/bin/bash

# real deploy script

REPOSITORY=/home/ubuntu/issue-tracker

echo "> 현재 구동중인 애플리케이션 pid 확인"

CURRENT_PID=$(pgrep -f issue-tracker)

echo "$CURRENT_PID"

if [ -z $CURRENT_PID ]; then
        echo "> 현재 구동중인 애플리케이션이 없으므로 종료하지 않습니다."
else
        echo "> kill -9 $CURRENT_PID"
        kill -9 $CURRENT_PID
        sleep 5
fi

echo "> 배포를 시작합니다."

JAR_NAME=$(ls $REPOSITORY/build/libs | grep '.jar' | tail -n 1)

nohup java -jar $REPOSITORY/build/libs/$JAR_NAME &

echo "> 배포를 완료했습니다."