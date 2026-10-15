import re
import subprocess
import sys

FREEZE_YDIF = 0.08
FREEZE_FRAMES = 6

if len(sys.argv) != 2:
    sys.exit('usage: python3 -I motion-qa.py <video.mp4>')

stats = subprocess.run(
    [
        'ffmpeg', '-loglevel', 'error', '-i', sys.argv[1], '-vf',
        'scale=640:-1,signalstats,metadata=print:key=lavfi.signalstats.YDIF:file=-',
        '-f', 'null', '-',
    ],
    capture_output=True, text=True, check=True,
).stdout
values = [float(match.group(1)) for match in re.finditer(r'YDIF=([0-9.]+)', stats)]
count = len(values)
print(f'frames {count}')
if count < 8:
    sys.exit('too few frames to analyse')

freezes, run = [], []
for index, value in enumerate(values[1:], start=1):
    if value < FREEZE_YDIF:
        run.append(index)
        continue
    if len(run) >= FREEZE_FRAMES:
        freezes.append((run[0], run[-1]))
    run = []
print(f'freeze runs (>= {FREEZE_FRAMES} still frames, excluding final hold):', freezes or 'none')
if len(run) >= FREEZE_FRAMES:
    print(f'final hold from frame {run[0]}')

cuts = [
    (index, round(values[index], 2))
    for index in range(2, count - 2)
    if values[index] > 4
    and values[index] > 6 * max(0.25, (values[index - 1] + values[index + 1]) / 2)
]
print('hard cuts:', cuts or 'none')

spikes = []
for index in range(3, count - 3):
    neighbours = sorted(values[index - 3:index] + values[index + 1:index + 4])
    if values[index] > 2 and values[index] > 2.5 * max(0.4, neighbours[3]):
        spikes.append((index, round(values[index], 2)))
print('motion spikes (stutter risk):', spikes[:40] or 'none')

peak = max(values[1:])
print('max per-frame change:', round(peak, 2), 'at frame', values.index(peak))
