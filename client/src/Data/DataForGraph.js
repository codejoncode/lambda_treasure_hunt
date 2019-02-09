import graph from "./Data";
    const coor = {
    0:  [60, 60],
    1:  [59, 60],
    2:  [60, 59],
    3:  [61, 59],
    4:  [61, 60],
    5:  [62, 59],
    6:  [60, 58],
    7:  [59, 58],
    8:  [59, 59],
    9:  [61, 58],
    10:  [60, 61],
    11:  [62, 58],
    12:  [61, 57],
    13:  [62, 60],
    14:  [62, 57],
    15:  [63, 60],
    16:  [58, 59],
    17:  [63, 58],
    18:  [61, 56],
    19:  [60, 62],
    20:  [60, 63],
    21:  [60, 57],
    22:  [61, 55],
    23:  [61, 61],
    24:  [63, 59],
    25:  [60, 56],
    26:  [62, 61],
    27:  [61, 63],
    28:  [61, 62],
    29:  [59, 57],
    30:  [62, 63],
    31:  [62, 62],
    32:  [63, 63],
    33:  [63, 62],
    34:  [62, 56],
    35:  [63, 56],
    36:  [60, 55],
    37:  [63, 57],
    38:  [64, 62],
    39:  [63, 64],
    40:  [61, 64],
    41:  [62, 64],
    42:  [64, 58],
    43:  [59, 61],
    44:  [64, 59],
    45:  [59, 56],
    46:  [59, 63],
    47:  [58, 61],
    48:  [60, 54],
    49:  [58, 57],
    50:  [62, 55],
    51:  [64, 64],
    52:  [63, 55],
    53:  [63, 65],
    54:  [64, 63],
    55:  [63, 61],
    56:  [58, 58],
    57:  [65, 64],
    58:  [58, 60],
    59:  [64, 61],
    60:  [59, 55],
    61:  [57, 58],
    62:  [58, 63],
    63:  [60, 64],
    64:  [58, 64],
    65:  [57, 60],
    66:  [65, 62],
    67:  [57, 59],
    68:  [63, 54],
    69:  [64, 65],
    70:  [58, 55],
    71:  [58, 62],
    72:  [60, 65],
    73:  [59, 64],
    74:  [57, 61],
    75:  [64, 55],
    76:  [59, 65],
    77:  [59, 62],
    78:  [61, 54],
    79:  [58, 56],
    80:  [64, 57],
    81:  [64, 56],
    82:  [57, 64],
    83:  [59, 66],
    84:  [57, 63],
    85:  [65, 55],
    86:  [65, 57],
    87:  [57, 62],
    88:  [62, 65],
    89:  [62, 54],
    90:  [66, 57],
    91:  [56, 63],
    92:  [65, 61],
    93:  [62, 53],
    94:  [64, 66],
    95:  [63, 66],
    96:  [65, 56],
    97:  [66, 56],
    98:  [57, 55],
    99:  [55, 63],
    100:  [64, 54],
    101:  [56, 62],
    102:  [57, 56],
    103:  [65, 65],
    104:  [64, 60],
    105:  [60, 53],
    106:  [64, 53],
    107:  [65, 60],
    108:  [61, 53],
    109:  [56, 55],
    110:  [58, 65],
    111:  [64, 52],
    112:  [65, 54],
    113:  [55, 62],
    114:  [55, 61],
    115:  [62, 66],
    116:  [62, 67],
    117:  [61, 52],
    118:  [65, 58],
    119:  [63, 67],
    120:  [65, 59],
    121:  [66, 60],
    122:  [61, 65],
    123:  [66, 62],
    124:  [61, 66],
    125:  [58, 66],
    126:  [57, 54],
    127:  [66, 59],
    128:  [66, 61],
    129:  [57, 53],
    130:  [60, 66],
    131:  [61, 51],
    132:  [62, 68],
    133:  [60, 52],
    134:  [63, 68],
    135:  [63, 53],
    136:  [57, 57],
    137:  [66, 58],
    138:  [60, 51],
    139:  [56, 60],
    140:  [66, 54],
    141:  [65, 53],
    142:  [56, 56],
    143:  [67, 60],
    144:  [64, 68],
    145:  [66, 64],
    146:  [54, 63],
    147:  [63, 69],
    148:  [56, 57],
    149:  [59, 54],
    150:  [63, 52],
    151:  [62, 69],
    152:  [64, 67],
    153:  [64, 69],
    154:  [66, 55],
    155:  [65, 68],
    156:  [66, 53],
    157:  [61, 67],
    158:  [65, 52],
    159:  [55, 56],
    160:  [65, 66],
    161:  [56, 61],
    162:  [56, 59],
    163:  [58, 54],
    164:  [67, 53],
    165:  [58, 67],
    166:  [62, 52],
    167:  [65, 51],
    168:  [66, 52],
    169:  [65, 63],
    170:  [56, 53],
    171:  [56, 58],
    172:  [62, 70],
    173:  [59, 52],
    174:  [66, 65],
    175:  [55, 55],
    176:  [54, 61],
    177:  [54, 62],
    178:  [67, 57],
    179:  [54, 55],
    180:  [56, 64],
    181:  [67, 56],
    182:  [60, 67],
    183:  [55, 54],
    184:  [67, 59],
    185:  [56, 54],
    186:  [66, 63],
    187:  [65, 67],
    188:  [55, 60],
    189:  [67, 61],
    190:  [55, 64],
    191:  [57, 65],
    192:  [66, 66],
    193:  [67, 55],
    194:  [58, 53],
    195:  [59, 51],
    196:  [54, 56],
    197:  [53, 56],
    198:  [62, 51],
    199:  [63, 51],
    200:  [63, 70],
    201:  [66, 67],
    202:  [59, 53],
    203:  [58, 68],
    204:  [57, 67],
    205:  [67, 63],
    206:  [64, 70],
    207:  [61, 69],
    208:  [59, 67],
    209:  [67, 58],
    210:  [61, 68],
    211:  [60, 50],
    212:  [68, 60],
    213:  [53, 55],
    214:  [58, 52],
    215:  [54, 64],
    216:  [56, 67],
    217:  [67, 54],
    218:  [55, 67],
    219:  [57, 68],
    220:  [67, 64],
    221:  [68, 59],
    222:  [54, 57],
    223:  [67, 66],
    224:  [67, 65],
    225:  [58, 51],
    226:  [57, 52],
    227:  [63, 71],
    228:  [59, 50],
    229:  [55, 53],
    230:  [63, 50],
    231:  [61, 70],
    232:  [53, 57],
    233:  [54, 54],
    234:  [56, 68],
    235:  [52, 57],
    236:  [54, 53],
    237:  [57, 66],
    238:  [53, 54],
    239:  [62, 50],
    240:  [69, 59],
    241:  [67, 62],
    242:  [54, 67],
    243:  [68, 57],
    244:  [61, 50],
    245:  [56, 66],
    246:  [54, 65],
    247:  [68, 54],
    248:  [60, 70],
    249:  [69, 60],
    250:  [55, 52],
    251:  [68, 55],
    252:  [55, 68],
    253:  [68, 58],
    254:  [56, 65],
    255:  [68, 61],
    256:  [69, 57],
    257:  [53, 63],
    258:  [69, 58],
    259:  [54, 66],
    260:  [66, 51],
    261:  [69, 54],
    262:  [65, 50],
    263:  [55, 66],
    264:  [54, 52],
    265:  [69, 61],
    266:  [68, 62],
    267:  [62, 71],
    268:  [58, 69],
    269:  [63, 72],
    270:  [70, 61],
    271:  [61, 71],
    272:  [53, 58],
    273:  [53, 52],
    274:  [54, 51],
    275:  [53, 67],
    276:  [52, 56],
    277:  [69, 53],
    278:  [58, 50],
    279:  [69, 62],
    280:  [59, 70],
    281:  [59, 49],
    282:  [70, 60],
    283:  [67, 67],
    284:  [55, 69],
    285:  [62, 72],
    286:  [62, 73],
    287:  [54, 68],
    288:  [64, 71],
    289:  [56, 52],
    290:  [60, 69],
    291:  [61, 73],
    292:  [55, 57],
    293:  [68, 56],
    294:  [55, 51],
    295:  [53, 59],
    296:  [60, 71],
    297:  [64, 50],
    298:  [68, 53],
    299:  [59, 68],
    300:  [57, 51],
    301:  [55, 58],
    302:  [55, 70],
    303:  [54, 69],
    304:  [55, 59],
    305:  [54, 58],
    306:  [70, 58],
    307:  [63, 49],
    308:  [53, 51],
    309:  [60, 49],
    310:  [53, 66],
    311:  [60, 68],
    312:  [57, 69],
    313:  [68, 67],
    314:  [55, 65],
    315:  [69, 55],
    316:  [66, 68],
    317:  [58, 49],
    318:  [59, 48],
    319:  [63, 73],
    320:  [53, 64],
    321:  [62, 49],
    322:  [70, 54],
    323:  [70, 53],
    324:  [68, 52],
    325:  [59, 71],
    326:  [61, 49],
    327:  [70, 57],
    328:  [57, 70],
    329:  [65, 69],
    330:  [52, 58],
    331:  [67, 68],
    332:  [57, 71],
    333:  [60, 48],
    334:  [55, 50],
    335:  [54, 60],
    336:  [62, 74],
    337:  [61, 72],
    338:  [71, 61],
    339:  [53, 68],
    340:  [67, 52],
    341:  [56, 50],
    342:  [61, 48],
    343:  [53, 53],
    344:  [66, 69],
    345:  [64, 73],
    346:  [53, 62],
    347:  [60, 73],
    348:  [53, 65],
    349:  [68, 51],
    350:  [57, 72],
    351:  [52, 53],
    352:  [68, 50],
    353:  [59, 72],
    354:  [69, 52],
    355:  [51, 57],
    356:  [67, 51],
    357:  [58, 70],
    358:  [66, 50],
    359:  [63, 74],
    360:  [69, 56],
    361:  [54, 70],
    362:  [68, 49],
    363:  [56, 70],
    364:  [52, 63],
    365:  [54, 59],
    366:  [53, 60],
    367:  [64, 51],
    368:  [56, 69],
    369:  [52, 59],
    370:  [65, 49],
    371:  [64, 49],
    372:  [56, 71],
    373:  [63, 48],
    374:  [58, 71],
    375:  [64, 72],
    376:  [51, 59],
    377:  [57, 50],
    378:  [60, 47],
    379:  [71, 60],
    380:  [65, 70],
    381:  [52, 62],
    382:  [70, 55],
    383:  [51, 58],
    384:  [69, 51],
    385:  [65, 72],
    386:  [70, 59],
    387:  [58, 48],
    388:  [71, 55],
    389:  [56, 51],
    390:  [67, 69],
    391:  [54, 50],
    392:  [66, 70],
    393:  [55, 49],
    394:  [51, 62],
    395:  [72, 60],
    396:  [54, 49],
    397:  [71, 58],
    398:  [70, 56],
    399:  [68, 48],
    400:  [52, 60],
    401:  [67, 50],
    402:  [53, 61],
    403:  [72, 59],
    404:  [58, 72],
    405:  [53, 69],
    406:  [53, 70],
    407:  [66, 49],
    408:  [54, 71],
    409:  [57, 49],
    410:  [61, 74],
    411:  [59, 69],
    412:  [52, 66],
    413:  [62, 48],
    414:  [71, 59],
    415:  [52, 70],
    416:  [70, 62],
    417:  [58, 47],
    418:  [51, 70],
    419:  [51, 56],
    420:  [52, 55],
    421:  [73, 60],
    422:  [55, 71],
    423:  [53, 71],
    424:  [65, 71],
    425:  [51, 71],
    426:  [55, 72],
    427:  [71, 57],
    428:  [53, 50],
    429:  [52, 64],
    430:  [72, 57],
    431:  [57, 48],
    432:  [61, 47],
    433:  [71, 53],
    434:  [65, 48],
    435:  [71, 54],
    436:  [57, 73],
    437:  [51, 55],
    438:  [71, 56],
    439:  [73, 57],
    440:  [73, 61],
    441:  [56, 72],
    442:  [60, 72],
    443:  [72, 58],
    444:  [52, 54],
    445:  [52, 68],
    446:  [68, 68],
    447:  [52, 69],
    448:  [51, 63],
    449:  [56, 49],
    450:  [51, 68],
    451:  [52, 61],
    452:  [60, 74],
    453:  [51, 61],
    454:  [52, 71],
    455:  [71, 52],
    456:  [52, 67],
    457:  [55, 73],
    458:  [54, 72],
    459:  [53, 72],
    460:  [72, 53],
    461:  [55, 74],
    462:  [67, 70],
    463:  [67, 49],
    464:  [51, 60],
    465:  [72, 56],
    466:  [69, 68],
    467:  [68, 47],
    468:  [67, 48],
    469:  [50, 71],
    470:  [52, 72],
    471:  [73, 58],
    472:  [70, 68],
    473:  [66, 71],
    474:  [51, 69],
    475:  [64, 48],
    476:  [72, 61],
    477:  [72, 55],
    478:  [51, 53],
    479:  [68, 63],
    480:  [63, 47],
    481:  [58, 73],
    482:  [55, 48],
    483:  [73, 55],
    484:  [64, 47],
    485:  [69, 50],
    486:  [69, 67],
    487:  [59, 47],
    488:  [52, 65],
    489:  [59, 46],
    490:  [51, 54],
    491:  [52, 52],
    492:  [56, 48],
    493:  [50, 54],
    494:  [67, 71],
    495:  [50, 58],
    496:  [66, 48],
    497:  [50, 55],
    498:  [73, 56],
    499:  [51, 67],
    }
const exits = {
    0:  ["n", "s", "e", "w"],
1: ["e"],
2:  ["n", "s", "e"],
3:  ["s", "e", "w"],
4:  ["n", "e", "w"],
5: ["w"],
6:  ["n", "w"],
7:  ["n", "e", "w"],
8:  ["s", "w"],
9:  ["n", "s", "e"],
10:  ["n", "s", "w"],
11:  ["e", "w"],
12:  ["n", "s", "e", "w"],
13:  ["e", "w"],
14:  ["s", "e", "w"],
15: ["w"],
16:  ["n", "e", "w"],
17:  ["n", "e", "w"],
18:  ["n", "s", "w"],
19:  ["n", "s", "w"],
20:  ["n", "s", "e", "w"],
21:  ["e", "w"],
22:  ["n", "s", "w"],
23:  ["s", "e"],
24: ["s"],
25: ["e"],
26:  ["e", "w"],
27:  ["n", "s", "e", "w"],
28: ["n"],
29:  ["s", "e", "w"],
30:  ["s", "e", "w"],
31:  ["n", "e"],
32:  ["n", "e", "w"],
33:  ["e", "w"],
34:  ["n", "s", "e"],
35:  ["s", "w"],
36:  ["s", "e", "w"],
37: ["w"],
38:  ["s", "e", "w"],
39:  ["n", "s", "e", "w"],
40: ["s"],
41: ["e"],
42:  ["n", "s", "e", "w"],
43:  ["e", "w"],
44: ["s"],
45:  ["n", "s"],
46:  ["e", "w"],
47:  ["n", "e"],
48:  ["n", "s", "w"],
49:  ["s", "e", "w"],
50:  ["n", "s"],
51:  ["n", "e", "w"],
52:  ["n", "s", "e"],
53:  ["n", "s", "w"],
54: ["w"],
55: ["w"],
56:  ["e", "w"],
57:  ["e", "w"],
58:  ["s", "w"],
59:  ["n", "s", "e"],
60:  ["n", "w", "e"],
61:  ["e", "w"],
62:  ["n", "e", "w"],
63:  ["n", "s", "w"],
64:  ["s", "w"],
65:  ["n", "e", "w"],
66:  ["n", "e", "w"],
67:  ["e", "w"],
68:  ["n", "e"],
69:  ["n", "s", "e"],
70:  ["s", "e", "w"],
71: ["s"],
72:  ["s", "w"],
73: ["e"],
74:  ["n", "s", "w"],
75:  ["e", "w"],
76:  ["n", "e", "w"],
77: ["e"],
78:  ["n", "s"],
79: ["n"],
80:  ["n", "s", "e"],
81: ["n"],
82:  ["n", "e"],
83:  ["s", "e", "w"],
84:  ["e", "w"],
85:  ["e", "w"],
86:  ["s", "e", "w"],
87: ["s"],
88:  ["e", "w"],
89:  ["n", "s"],
90:  ["e", "w"],
91:  ["n", "s", "e", "w"],
92: ["w"],
93: ["n", "w"],
94:  ["n", "s"],
95:  ["n", "s", "w"],
96:  ["n", "e"],
97:  ["e", "w"],
98:  ["n", "s", "e", "w"],
99:  ["n", "e", "w"],
100:  ["s", "e", "w"],
101:  ["n", "w"],
102:  ["s", "w"],
103:  ["n", "w"],
104:  ["n", "e"],
105:  ["n", "w"],
106:  ["n", "s", "w"],
107:  ["s", "e", "w"],
108:  ["n", "s", "e"],
109:  ["s", "e", "w"],
110: ["e"],
111:  ["n", "s", "e"],
112:  ["s", "e", "w"],
113:  ["s", "e"],
114:  ["n", "w"],
115:  ["n", "e"],
116:  ["n", "s"],
117:  ["n", "s", "w", "e"],
118:  ["e", "w"],
119:  ["n", "s"],
120:  ["n", "e"],
121:  ["n", "e", "w"],
122:  ["n", "e"],
123: ["w"],
124:  ["n", "s"],
125:  ["n", "e", "w"],
126:  ["n", "s"],
127:  ["e", "w"],
128:  ["s", "e"],
129:  ["n", "e", "w"],
130: ["w"],
131:  ["n", "w", "s"],
132: ["s"],
133:  ["e", "w"],
134:  ["n", "s", "e"],
135:  ["s", "e"],
136:  ["e", "w"],
137: ["w"],
138:  ["s", "e", "w"],
139:  ["e", "w"],
140: ["w"],
141:  ["n", "e"],
142:  ["e", "w"],
143:  ["e", "w"],
144:  ["e", "w"],
145:  ["n", "e", "w"],
146:  ["n", "s", "e", "w"],
147:  ["n", "s", "e", "w"],
148:  ["e", "w"],
149: ["e"],
150:  ["n", "w"],
151:  ["n", "e", "w"],
152: ["s"],
153:  ["e", "w"],
154:  ["e", "w"],
155:  ["s", "e", "w"],
156:  ["s", "e", "w"],
157:  ["n", "s", "w"],
158:  ["s", "w"],
159:  ["e", "w"],
160: ["s"],
161: ["e"],
162: ["e"],
163: ["n"],
164:  ["n", "e", "w"],
165:  ["n", "s", "w"],
166:  ["s", "e", "w"],
167:  ["n", "s", "e"],
168:  ["n", "e"],
169:  ["s", "e"],
170: ["e"],
171: ["e"],
172:  ["n", "s"],
173: ["e", "w"],
174:  ["n", "s", "e"],
175:  ["s", "e", "w"],
176:  ["e", "w"],
177:  ["n", "w"],
178:  ["n", "e", "w"],
179:  ["s", "e", "w"],
180: ["s"],
181: ["w"],
182:  ["e", "w"],
183:  ["n", "s"],
184:  ["e", "w"],
185: ["n"],
186:  ["e", "w"],
187: ["n"],
188:  ["e", "w"],
189:  ["e", "w"],
190: ["s"],
191: ["s"],
192:  ["n", "s", "e"],
193:  ["e", "w"],
194:  ["s", "w"],
195:  ["s", "e", "w"],
196:  ["n", "e", "w"],
197:  ["n", "e", "w"],
198:  ["n", "s", "e"],
199:  ["s", "w"],
200:  ["n", "s", "e"],
201: ["s"],
202: ["e"],
203:  ["n", "s", "e"],
204:  ["n", "e", "w"],
205:  ["s", "e", "w"],
206:  ["n", "e", "w"],
207:  ["n", "e", "w"],
208: ["e"],
209: ["s"],
210: ["s"],
211: ["n"],
212: ["w"],
213:  ["e", "w"],
214:  ["n", "w", "e"],
215:  ["n", "s"],
216:  ["n", "e", "w"],
217:  ["s", "e"],
218:  ["s", "e", "w"],
219: ["s"],
220: ["w"],
221:  ["s", "e", "w"],
222:  ["n", "s"],
223:  ["n", "w"],
224: ["w"],
225:  ["s", "e"],
226:  ["s", "e"],
227:  ["n", "s"],
228:  ["n", "s"],
229:  ["n", "s", "w"],
230:  ["n", "s", "e"],
231:  ["s", "w"],
232:  ["n", "s", "w"],
233:  ["n", "w"],
234:  ["n", "s", "w"],
235:  ["n", "e", "w"],
236:  ["s", "e"],
237:  ["e", "w"],
238: ["e"],
239:  ["n", "w"],
240:  ["n", "e", "w"],
241:  ["n", "e"],
242:  ["n", "s", "e", "w"],
243:  ["s", "e", "w"],
244: ["e", "n"],
245:  ["s", "e"],
246: ["s"],
247:  ["e", "w"],
248:  ["n", "e", "w"],
249:  ["n", "s", "e"],
250:  ["n", "s", "e"],
251:  ["e", "w"],
252:  ["n", "e"],
253:  ["n", "e"],
254:  ["n", "w"],
255: ["w"],
256:  ["s", "e", "w"],
257:  ["n", "e", "w"],
258:  ["e", "w"],
259:  ["n", "w"],
260: ["w"],
261:  ["s", "e", "w"],
262:  ["n", "s", "e"],
263: ["n"],
264:  ["n", "s", "w"],
265:  ["n", "s", "e"],
266: ["w"],
267:  ["n", "s", "w"],
268:  ["s", "e", "w"],
269:  ["n", "s"],
270:  ["n", "e", "w"],
271:  ["n", "e"],
272:  ["n", "s"],
273:  ["n", "e"],
274:  ["n", "w"],
275:  ["e", "w"],
276:  ["e", "w"],
277:  ["n", "e"],
278: ["n"],
279: ["s"],
280:  ["n", "e"],
281:  ["n", "s", "e", "w"],
282: ["w"],
283:  ["n", "s", "e"],
284:  ["n", "s", "w"],
285:  ["n", "s"],
286:  ["n", "s", "w"],
287:  ["s", "w"],
288: ["s"],
289: ["w"],
290: ["e"],
291:  ["n", "e", "w"],
292:  ["n", "e"],
293: ["n"],
294:  ["n", "s"],
295: ["s"],
296: ["s"],
297: ["w"],
298:  ["s", "w"],
299:  ["e", "w"],
300:  ["n", "s", "w"],
301:  ["n", "s"],
302:  ["n", "s"],
303:  ["n", "e", "w"],
304: ["s"],
305:  ["n", "s"],
306:  ["e", "w"],
307:  ["n", "s", "e", "w"],
308: ["e"],
309:  ["s", "e", "w"],
310:  ["e", "w"],
311: ["w"],
312:  ["n", "e"],
313: ["w"],
314: ["e"],
315: ["w"],
316:  ["n", "w"],
317:  ["s", "e", "w"],
318:  ["n", "s"],
319:  ["n", "s", "e"],
320:  ["n", "s"],
321:  ["s", "e"],
322:  ["n", "e", "w"],
323:  ["e", "w"],
324:  ["n", "s", "e"],
325:  ["n", "s", "w"],
326:  ["s", "w"],
327:  ["e", "w"],
328:  ["n", "s", "e", "w"],
329: ["w"],
330:  ["n", "s", "w"],
331:  ["s", "e"],
332:  ["n", "s"],
333:  ["n", "s"],
334:  ["n", "s", "e", "w"],
335:  ["e", "w"],
336: ["s"],
337: ["s"],
338:  ["s", "w"],
339:  ["e", "w"],
340: ["w"],
341:  ["s", "w"],
342:  ["n", "s"],
343:  ["s", "w"],
344:  ["n", "s", "e"],
345:  ["s", "w"],
346: ["e"],
347:  ["n", "s", "e"],
348: ["s"],
349:  ["n", "s", "e", "w"],
350:  ["n", "s", "e"],
351:  ["s", "e", "w"],
352:  ["n", "s", "e"],
353: ["s"],
354: ["w"],
355: ["e"],
356: ["e"],
357: ["w"],
358:  ["e", "w"],
359: ["s"],
360:  ["n", "e"],
361:  ["n", "s"],
362:  ["n", "s", "w"],
363:  ["n", "e"],
364:  ["n", "s", "e", "w"],
365: ["s"],
366: ["e"],
367: ["n"],
368: ["s"],
369:  ["n", "s", "w"],
370:  ["n", "s", "e"],
371:  ["s", "w"],
372:  ["n", "s"],
373:  ["n", "s"],
374: ["e"],
375:  ["n", "e"],
376: ["e"],
377: ["n"],
378: ["n"],
379:  ["n", "e"],
380:  ["n", "w"],
381:  ["n", "w"],
382:  ["s", "e"],
383:  ["e", "w"],
384: ["w"],
385: ["w"],
386:  ["e", "w"],
387:  ["n", "s", "w"],
388:  ["e", "w"],
389: ["e"],
390: ["w"],
391:  ["s", "e", "w"],
392:  ["s", "e"],
393:  ["n", "s"],
394: ["e"],
395:  ["s", "e", "w"],
396: ["n"],
397: ["w"],
398:  ["e", "w"],
399:  ["n", "s"],
400: ["s"],
401: ["w"],
402:  ["e", "w"],
403: ["n"],
404:  ["n", "w"],
405:  ["n", "e"],
406:  ["s", "w"],
407:  ["s", "w"],
408:  ["n", "s", "w"],
409: ["e"],
410: ["s"],
411: ["w"],
412:  ["s", "e"],
413: ["n"],
414: ["w"],
415:  ["e", "w"],
416: ["s"],
417: ["n"],
418:  ["n", "s", "e"],
419: ["e"],
420:  ["s", "e", "w"],
421:  ["n", "w"],
422:  ["n", "s"],
423:  ["e", "w"],
424:  ["s", "e"],
425:  ["s", "w"],
426:  ["n", "s"],
427:  ["e", "w"],
428: ["e"],
429: ["s"],
430:  ["n", "e", "w"],
431:  ["e", "w"],
432: ["n"],
433:  ["s", "e", "w"],
434: ["n"],
435: ["w"],
436: ["s"],
437:  ["e", "w"],
438:  ["e", "w"],
439: ["w"],
440:  ["s", "w"],
441: ["s"],
442: ["n"],
443:  ["s", "e"],
444:  ["n", "w"],
445:  ["n", "e", "w"],
446:  ["e", "w"],
447: ["s"],
448: ["e"],
449: ["n"],
450: ["e"],
451:  ["e", "w"],
452: ["s"],
453:  ["s", "e"],
454:  ["n", "e"],
455: ["n"],
456:  ["e", "w"],
457:  ["n", "s"],
458:  ["s", "w"],
459: ["e"],
460: ["w"],
461: ["s"],
462: ["w"],
463:  ["s", "e"],
464: ["n"],
465:  ["e", "w"],
466:  ["s", "e", "w"],
467: ["n"],
468: ["n"],
469: ["e"],
470: ["s"],
471: ["w"],
472: ["w"],
473:  ["e", "w"],
474: ["n"],
475:  ["n", "s"],
476: ["e"],
477:  ["e", "w"],
478: ["e"],
479: ["w"],
480: ["n"],
481: ["s"],
482: ["n"],
483: ["w"],
484: ["n"],
485: ["w"],
486: ["n"],
487:  ["n", "s"],
488: ["n"],
489: ["n"],
490:  ["e", "w"],
491: ["n"],
492: ["e"],
493: ["e"],
494: ["w"],
495: ["e"],
496: ["n"],
497: ["e"],
498: ["w"],
499: ["e"],
}


const data = {
    graph, 
    coor,
    exits,
}

export default data; 

    
    