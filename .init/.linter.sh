#!/bin/bash
cd /home/kavia/workspace/code-generation/career-navigator-platform-44337-44341/career_navigator_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

