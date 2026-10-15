#!/usr/bin/env bash
set -euo pipefail

if [ "$#" -ne 4 ]; then
  echo "usage: contact-sheet.sh <video.mp4> <out.png> <first-frame> <last-frame>" >&2
  exit 1
fi

video="$1"
output="$2"
first="$3"
last="$4"
count=$((last - first + 1))
columns=6
rows=$(((count + columns - 1) / columns))

ffmpeg -loglevel error -y -i "$video" \
  -vf "select='between(n\,${first}\,${last})',scale=480:-1,tile=${columns}x${rows}" \
  -frames:v 1 -fps_mode passthrough "$output"
echo "saved $output: frames $first to $last, left to right, ${columns} per row"
