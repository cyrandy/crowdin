#!/bin/bash

for d in resources/*/ ; do
	lang=`echo "${d#*/}" | sed 's/\/$//'`
	mkdir -p "build/"${lang}
	node scripts/build.js src build -l ${lang}
done