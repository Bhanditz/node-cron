#!/bin/bash

ZONES=`find /usr/share/zoneinfo -type f | sed 's/\/usr\/share\/zoneinfo\///g' | xargs -n1 | sort -u | xargs`

OUTPUT="{"
for ZONE in $ZONES
do
  if [ $ZONE != "+VERSION" ]; then
    OFFSET=`env TZ=${ZONE} date +%z`
    NUMBER=`env TZ=${ZONE} date +%z | sed -E 's/(\+|\-)(0{0,3})//g'`
    if [[ $OFFSET == *"-"* ]]; then
      OFFSET="-$NUMBER"
    else
      OFFSET=$NUMBER
    fi
    OUTPUT="$OUTPUT\"$ZONE\": $OFFSET,"
  fi
done

OUTPUT="$OUTPUT}"
OUTPUT=`echo $OUTPUT | sed 's/,}/}/g'`
echo "$OUTPUT" > timezones.json


