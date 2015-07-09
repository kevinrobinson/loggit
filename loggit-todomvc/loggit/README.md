Test results for set1:
-------------
Profiling methodology is to do a hard reload, then check 'time in compute'
for each optimizer on the console.  The data set is randomly generated though, so
it's not a repeatable test, just ballpark.  Logging seems to affect these
numbers quite a bit, so there's a test that removes them.

This loads initial_facts_set1 initially, and the 'monkey' in the Debugger adding random actions is set to run for 3sec, adding a random action at 10ms interval.

Output format is: [
  percent of calls using any optimization,
  total calls,
  total time spent in compute method,
  optimizer
]

Raw output:
[100, 827, 234, MemoizingSnapshotOptimizer]
[100, 686, 191, MemoizingSnapshotOptimizer]
[100, 898, 181, MemoizingSnapshotOptimizer]
[100, 738, 181, MemoizingSnapshotOptimizer]
[100, 980, 215, MemoizingSnapshotOptimizer]
[100, 1070, 188, MemoizingSnapshotOptimizer]
[100, 723, 173, MemoizingSnapshotOptimizer]
[65, 777, 999, MemoizingOptimizerV2]
[65, 754, 942, MemoizingOptimizerV2]
[82, 1370, 903, MemoizingOptimizerV2]
[71, 855, 1039, MemoizingOptimizerV2]
[63, 643, 1035, MemoizingOptimizerV2]
[76, 1005, 993, MemoizingOptimizerV2]
[77, 1163, 914, MemoizingOptimizerV2]
[69, 839, 1045, MemoizingOptimizer]
[64, 713, 942, MemoizingOptimizer]
[76, 1065, 986, MemoizingOptimizer]
[71, 902, 1041, MemoizingOptimizer]
[68, 888, 920, MemoizingOptimizer]
[74, 911, 934, MemoizingOptimizer]
[67, 789, 956, MemoizingOptimizer]
[NaN, NaN, 1678, NoopOptimizer]
[NaN, NaN, 1567, NoopOptimizer]
[NaN, NaN, 1485, NoopOptimizer]
[NaN, NaN, 1549, NoopOptimizer]
[NaN, NaN, 1726, NoopOptimizer]
[NaN, NaN, 1605, NoopOptimizer]
[NaN, NaN, 1478, NoopOptimizer]


Test2:
-----
This is the same as Test1, but swaps in PrecomputeReactRenderer.  I re-ran the
other tests to make sure I didn't regress previous behavior, since quite a bit changed.

Results are here:
https://docs.google.com/spreadsheets/d/1_j-exUs3XjqjXh4Xa4D7nDspH5vaRlj9_dEKmB7iGCM/edit#gid=0

output format: [
  renderer:
  total time,
  calls,
  time/call,
  compute:
  total time,
  calls,
  time/call
  renderer
  optimizer
]

initComponents: Object {optimizer: NoopOptimizer, renderer: NaiveReactRenderer, loggit: Object}
["r:", 2204, 228, 9.6682, "c:", 1257, 1150, 1.0935, "|", NoopOptimizer, NaiveReactRenderer]
["r:", 2353, 220, 10.6964, "c:", 1350, 1448, 0.9323, "|", NoopOptimizer, NaiveReactRenderer]
["r:", 2338, 213, 10.9755, "c:", 1364, 1399, 0.9751, "|", NoopOptimizer, NaiveReactRenderer]
["r:", 2310, 212, 10.8985, "c:", 1245, 1517, 0.8209, "|", NoopOptimizer, NaiveReactRenderer]
["r:", 2363, 225, 10.5018, "c:", 1373, 1395, 0.9845, "|", NoopOptimizer, NaiveReactRenderer]
["r:", 2216, 241, 9.1947, "c:", 1267, 1111, 1.1405, "|", NoopOptimizer, NaiveReactRenderer]
["r:", 2271, 227, 10.0041, "c:", 1355, 1107, 1.2241, "|", NoopOptimizer, NaiveReactRenderer]

initComponents: Object {optimizer: NoopOptimizer, renderer: RafReactRenderer, loggit: Object}
["r:", 1527, 170, 8.9831, "c:", 904, 636, 1.421, "|", NoopOptimizer, RafReactRenderer]
["r:", 1874, 152, 12.3294, "c:", 988, 1443, 0.685, "|", NoopOptimizer, RafReactRenderer]
["r:", 1665, 171, 9.7351, "c:", 939, 915, 1.0267, "|", NoopOptimizer, RafReactRenderer]
["r:", 1655, 164, 10.0931, "c:", 847, 890, 0.9518, "|", NoopOptimizer, RafReactRenderer]
["r:", 1597, 168, 9.5079, "c:", 904, 1023, 0.8838, "|", NoopOptimizer, RafReactRenderer]
["r:", 1559, 171, 9.1186, "c:", 861, 900, 0.9568, "|", NoopOptimizer, RafReactRenderer]
["r:", 1943, 146, 13.307, "c:", 1026, 1564, 0.6563, "|", NoopOptimizer, RafReactRenderer]


initComponents: Object {optimizer: MemoizingOptimizer, renderer: RafReactRenderer, loggit: Object}
["r:", 1363, 165, 8.2628, "c:", 490, 989, 0.4953, "|", MemoizingOptimizer, RafReactRenderer]
["r:", 1123, 173, 6.4916, "c:", 466, 909, 0.5123, "|", MemoizingOptimizer, RafReactRenderer]
["r:", 1263, 173, 7.2985, "c:", 509, 794, 0.6408, "|", MemoizingOptimizer, RafReactRenderer]
["r:", 1165, 172, 6.7748, "c:", 464, 832, 0.5579, "|", MemoizingOptimizer, RafReactRenderer]
["r:", 1094, 162, 6.7551, "c:", 479, 640, 0.7483, "|", MemoizingOptimizer, RafReactRenderer]
["r:", 1248, 172, 7.2538, "c:", 503, 799, 0.6294, "|", MemoizingOptimizer, RafReactRenderer]
["r:", 1139, 174, 6.5435, "c:", 463, 848, 0.5465, "|", MemoizingOptimizer, RafReactRenderer]

initComponents: Object {optimizer: MemoizingSnapshotOptimizer, renderer: RafReactRenderer, loggit: Object}
["r:", 1088, 168, 6.4785, "c:", 182, 996, 0.1829, "|", MemoizingSnapshotOptimizer, RafReactRenderer]
["r:", 883, 167, 5.2899, "c:", 169, 981, 0.1724, "|", MemoizingSnapshotOptimizer, RafReactRenderer]
["r:", 1017, 165, 6.1609, "c:", 184, 1005, 0.1832, "|", MemoizingSnapshotOptimizer, RafReactRenderer]
["r:", 893, 165, 5.4147, "c:", 138, 754, 0.1824, "|", MemoizingSnapshotOptimizer, RafReactRenderer]
["r:", 1010, 169, 5.979, "c:", 170, 995, 0.1705, "|", MemoizingSnapshotOptimizer, RafReactRenderer]
["r:", 934, 159, 5.8751, "c:", 158, 880, 0.1801, "|", MemoizingSnapshotOptimizer, RafReactRenderer]
["r:", 812, 170, 4.7748, "c:", 134, 769, 0.174, "|", MemoizingSnapshotOptimizer, RafReactRenderer]


initComponents: Object {optimizer: MemoizingSnapshotOptimizer, renderer: PrecomputeReactRenderer, loggit: Object}
["r:", 843, 166, 5.0762, "c:", 198, 1010, 0.1958, "|", MemoizingSnapshotOptimizer, PrecomputeReactRenderer]
["r:", 617, 169, 3.65, "c:", 140, 696, 0.2008, "|", MemoizingSnapshotOptimizer, PrecomputeReactRenderer]
["r:", 656, 173, 3.7938, "c:", 140, 804, 0.1739, "|", MemoizingSnapshotOptimizer, PrecomputeReactRenderer]
["r:", 816, 159, 5.1315, "c:", 220, 1057, 0.2083, "|", MemoizingSnapshotOptimizer, PrecomputeReactRenderer]
["r:", 1020, 161, 6.3332, "c:", 306, 1496, 0.2045, "|", MemoizingSnapshotOptimizer, PrecomputeReactRenderer]
["r:", 759, 168, 4.5188, "c:", 205, 927, 0.2216, "|", MemoizingSnapshotOptimizer, PrecomputeReactRenderer]
["r:", 896, 166, 5.3999, "c:", 289, 1222, 0.2365, "|", MemoizingSnapshotOptimizer, PrecomputeReactRenderer]

