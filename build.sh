#!/bin/bash

BUILD_LOGFILE=build.log

cd $(dirname "$0")
rm -f ${BUILD_LOGFILE}
git --version 2>&1 | tee -a ${BUILD_LOGFILE}
git pull 2>&1 | tee -a ${BUILD_LOGFILE}
node --version 2>&1 | tee -a ${BUILD_LOGFILE}
npm --version 2>&1 | tee -a ${BUILD_LOGFILE}
npm install 2>&1 | tee -a ${BUILD_LOGFILE}
npm run build 2>&1 | tee -a ${BUILD_LOGFILE}