#!/bin/bash

for d in resources/*/ ; do
	pofile=$d"messages.po"
	jsonfile=$d"translations.json"
	lang=`echo "${d#*/}" | sed 's/\/$//'`
	if [ ! -f $pofile ]
	then
		pybabel init -i translations/translations.pot -d resources/ -l ${lang} -o resources/${lang}/messages.po
	else
		pybabel update -N -i translations/translations.pot -d resources/ -l ${lang} -o resources/${lang}/messages.po
	fi
	./node_modules/.bin/po2json -f mf -p --fallback-to-msgid $pofile $jsonfile
done