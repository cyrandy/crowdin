#!/bin/bash

for d in resources/*/ ; do
	pofile=$d"LC_MESSAGES/messages.po"
	jsonfile=$d"translations.json"
	lang=`echo "${d#*/}" | sed 's/\/$//'`
	if [ ! -f $pofile ]
	then
		pybabel init -i translations/translations.pot -d resources/ -l ${lang}
	else
		pybabel update -N -i translations/translations.pot -d resources/ -l ${lang}
	fi
	./node_modules/.bin/po2json -f mf -p --fallback-to-msgid $pofile $jsonfile
done