CREATE TABLE IF NOT EXISTS [character_attributes] (
[dashAndRunAccelerationA] FLOAT NULL,
[bubbleRatio] INT NULL,
[friction] FLOAT NULL,
[airMobilityB] FLOAT NULL,
[runAcceleration] INT NULL,
[kirbyStarDamage] INT NULL,
[numberOfJumps] INT NULL,
[jumpHInitialVelocity] FLOAT NULL,
[walkAcceleration] FLOAT NULL,
[jab3Window?] INT NULL,
[doubleJumpMomentum] FLOAT NULL,
[initialWalkVelocity] FLOAT NULL,
[jumpVInitialVelocity] FLOAT NULL,
[gravity] FLOAT NULL,
[walkMaximumVelocity] FLOAT NULL,
[maxAerialHVelocity] FLOAT NULL,
[iceTraction?] INT NULL,
[walljumpVVelocity] FLOAT NULL,
[runAnimationScaling] FLOAT NULL,
[walljumpHVelocity] FLOAT NULL,
[jumpStartup] INT NULL,
[character] VARCHAR NULL,
[rapidJabWindow] INT NULL,
[victoryScreenWindowModelScaling] INT NULL,
[dairLandingLag] INT NULL,
[weight] INT NULL,
[bairLandingLag] INT NULL,
[ledgejumpHorizontalVelocity] INT NULL,
[fairLandingLag] INT NULL,
[shorthopVInitialVelocity] FLOAT NULL,
[cameraTargetZoomBone] INT NULL,
[airJumpMultiplier] FLOAT NULL,
[normalLandingLag] INT NULL,
[specialJumpAction] INT NULL,
[itemThrowVelocity] INT NULL,
[ledgejumpVertical] FLOAT NULL,
[dashAndRunAccelerationB] FLOAT NULL,
[airMobilityA] FLOAT NULL,
[midWalkPoint] FLOAT NULL,
[airFriction] FLOAT NULL,
[dashInitialVelocity] FLOAT NULL,
[modelScaling] FLOAT NULL,
[jumpHMaximumVelocity] FLOAT NULL,
[nairLandingLag] INT NULL,
[?] INT NULL,
[groundAirJumpMomentumMultiplier] FLOAT NULL,
[uairLandingLag] INT NULL,
[turnDuration] INT NULL,
[fastWalkMin] FLOAT NULL,
[fastFallTerminalVelocity] INT NULL,
[shieldBreakInitialVelocity] FLOAT NULL,
[shieldSize] FLOAT NULL,
[jab2Window?] INT NULL,
[walkAnimationSpeed] FLOAT NULL,
[terminalVelocity] FLOAT NULL,
[weightDepThrowSpeedFlags] INT NULL,
[dashAndRunTerminalVelocity] FLOAT NULL
);

INSERT INTO character_attributes VALUES
(0.064999997615814,7,0.090000003576279,0.18999999761581,30,10,6,0.69999998807907,0.10000000149012,0,0,0.15999999642372,1.6000000238419,0.064000003039837,0.69999998807907,1.3500000238419,1,1.6000000238419,1.3250000476837,1.2999999523163,5,'Jigglypuff',0,16,30,60,20,1.1000000238419,20,1.0499999523163,5,0,4,0,0.89999997615814,1.7999999523163,0.019999999552965,0.090000003576279,0.43239998817444,0.050000000745058,1.3999999761581,0.93999999761581,1.3500000238419,20,0,1,20,4,0.68870669603348,1.6000000238419,10,13.125,24,0.17859999835491,1.2999999523163,150994944,1.1000000238419),
(0.059999998658895,10,0.059999998658895,0.019999999552965,30,15,2,1,0,24,1,0.15000000596046,2.4000000953674,0.08500000089407,1.6000000238419,0.89999997615814,1,2.4000000953674,1.3999999761581,1.2999999523163,4,'Marth',5,24,32,87,24,1,15,1.5,21,0.87999999523163,4,0,1,2.4000000953674,0,0.029999999329448,0.62099999189377,0.0049999998882413,1.5,1.1499999761581,1.2000000476837,15,0,0.80000001192093,15,6,0.97750002145767,2.5,2.5,11.75,24,0.25299999117851,2.2000000476837,0,1.7999999523163),
(0.059999998658895,8.1999998092651,0.025000000372529,0.014999999664724,30,17,2,0.80000001192093,0.10000000149012,24,0.89999997615814,0.10000000149012,2.4000000953674,0.068999998271465,1.1000000238419,0.68000000715256,1,2.0999999046326,1.4500000476837,1.2999999523163,4,'Luigi',0,22,18,100,15,1,25,1.3999999761581,5,0.89999997615814,4,0,1,2.0999999046326,0.019999999552965,0.025000000372529,0.43999999761581,0.0099999997764826,1.2999999523163,1.25,0.75,15,0,0.80000001192093,15,4,0.69999998807907,2,2.4000000953674,10.75,24,0.18000000715256,1.6000000238419,0,1.3400000333786),
(0.050000000745058,8,0.035000000149012,0.019999999552965,30,16,2,0.60000002384186,0.10000000149012,24,0.89999997615814,0.08500000089407,2.5999999046326,0.10000000149012,0.94999998807907,0.69999998807907,1.6000000238419,2.5999999046326,1.5199999809265,1.2999999523163,3,'Ice Climbers - Popo',0,18,25,88,20,1,20,1.3999999761581,5,1,4,3212836864,1,2.5999999046326,0.019999999552965,0.027000000700355,0.46999999880791,0.019999999552965,1.3999999761581,1.1499999761581,1.3999999761581,20,0,0.80000001192093,32,4,0.73000001907349,2,2.5999999046326,10.75,24,0.18999999761581,1.6000000238419,83886080,1.3999999761581),
(0.050000000745058,14.39999961853,0.079999998211861,0.019999999552965,30,19,2,1,0.10000000149012,0,1,0.10000000149012,2.7000000476837,0.10000000149012,1.2000000476837,1,1,2.7000000476837,1.4199999570847,1.2999999523163,5,'Donkey Kong',0,23,31,114,15,1,30,1.6000000238419,26,0.91000002622604,5,0,1,2.7000000476837,0.019999999552965,0.019999999552965,0.41999998688698,0.019999999552965,1.6000000238419,1,1.6000000238419,20,0,0.80000001192093,25,8,0.68000000715256,2.960000038147,2.5999999046326,17.5,28,0.25999999046326,2.4000000953674,0,1.6000000238419),
(0.070000000298023,10,0.059999998658895,0.019999999552965,30,15,2,1,0,24,1,0.15000000596046,2.5999999046326,0.1140000000596,1.2000000476837,0.89999997615814,1,2.4000000953674,1.3999999761581,1.2999999523163,5,'Roy',5,24,32,85,24,1,20,1.5,23,0.87999999523163,4,0,1,2.4000000953674,0,0.029999999329448,0.62099999189377,0.0049999998882413,1.3999999761581,1.0800000429153,1.2000000476837,20,0,0.80000001192093,18,6,0.97750002145767,2.9000000953674,2.5,11.75,24,0.25299999117851,2.4000000953674,0,1.6100000143051),
(0.10000000149012,8,0.10000000149012,0.0099999997764826,30,15,2,0.69999998807907,0.10000000149012,0,0.89999997615814,0.20000000298023,2.0999999046326,0.072999998927116,0.69999998807907,0.94999998807907,1,2.0999999046326,1.5880000591278,1.2999999523163,6,'Zelda',4,23,24,90,18,1,18,1.6000000238419,66,0.86000001430511,4,0,0.80000001192093,2.0999999046326,0.019999999552965,0.037999998778105,0.51499998569489,0.0049999998882413,1.1000000238419,1.2599999904633,1.1000000238419,18,0,0.69999998807907,25,6,0.83300000429153,1.8500000238419,2.4000000953674,11.875,24,0.20499999821186,1.3999999761581,134217728,1.1000000238419),
(0.10000000149012,8.1999998092651,0.079999998211861,0.019999999552965,30,14,2,1,0.10000000149012,24,1,0.20000000298023,2.6199998855591,0.10999999940395,1.2000000476837,1,1,2.5999999046326,1.3999999761581,1.2999999523163,4,'Young Link',5,20,50,85,15,1,15,1.5,17,0.87999999523163,4,0,1,2.5999999046326,0.019999999552965,0.03999999910593,0.51800000667572,0.0049999998882413,1.7999999523163,0.95999997854233,1.2000000476837,15,0,0.80000001192093,30,6,0.81599998474121,2.2000000476837,2.7000000476837,11.625,24,0.20999999344349,2.1300001144409,117440512,1.6000000238419),
(0.079999998211861,7,0.10000000149012,0.019999999552965,30,9,2,0.80000001192093,0.10000000149012,0,0.80000001192093,0.15000000596046,2.5999999046326,0.10999999940395,1.2400000095367,0.85000002384186,1,2.5999999046326,0.46700000762939,1.2999999523163,3,'Pichu',0,17,26,55,18,1,15,1.7000000476837,15,1,2,0,0.89999997615814,2.5999999046326,0.019999999552965,0.029999999329448,0.25,0.0099999997764826,1.7999999523163,0.5,1.7999999523163,12,0,0.80000001192093,18,4,0.36700001358986,2.5,3.5,24.299999237061,24,0.10800000280142,1.8999999761581,218103808,1.7200000286102),
(0.10000000149012,8.6000003814697,0.079999998211861,0.019999999552965,30,15,2,0.80000001192093,0.10000000149012,0,1,0.20000000298023,2.7999999523163,0.11999999731779,1.2000000476837,0.80000001192093,1,2.7999999523163,2.7200000286102,1.3999999761581,3,'Sheik',4,23,20,90,16,1,16,2.1400001049042,17,1.1000000238419,4,0,1,2.7999999523163,0.019999999552965,0.03999999910593,0.30799999833107,0.03999999910593,1.7000000476837,1.3999999761581,1.3999999761581,16,0,0.80000001192093,24,4,1.1200000047684,3,3,11.625,24,0.21999999880791,2.1300001144409,251658240,1.7999999523163),
(0.10000000149012,8.8000001907349,0.059999998658895,0.019999999552965,30,18,2,1,0.10000000149012,0,0.89999997615814,0.30000001192093,2.0999999046326,0.065999999642372,1,0.88999998569489,1,2.0999999046326,1.3899999856949,1.2999999523163,3,'Samus',0,22,15,110,15,1,15,1.7000000476837,19,0.89999997615814,4,0,1,2.0999999046326,0.019999999552965,0.012500000186265,0.3783999979496,0.0099999997764826,1.8600000143051,0.87999999523163,1.2999999523163,15,0,0.80000001192093,15,4,0.6191999912262,2.2999999523163,2.3099999427795,16.25,24,0.15479999780655,1.3999999761581,0,1.3999999761581),
(0.10000000149012,7.5,0.079999998211861,0.019999999552965,30,15,2,0.69999998807907,0.10000000149012,0,0.93999999761581,0.20000000298023,4.0999999046326,0.17000000178814,1.3999999761581,0.8299999833107,1,3.5999999046326,1.7280000448227,1.2999999523163,5,'Falco',4,23,18,80,20,1,22,1.8999999761581,19,0.93999999761581,4,0,1,3.9000000953674,0.019999999552965,0.050000000745058,0.56999999284744,0.019999999552965,1.8999999761581,1.1000000238419,1.7000000476837,15,0,1,18,4,0.9200000166893,3.5,3.2999999523163,12.5,30,0.23000000417233,3.0999999046326,0,1.5),
(0.079999998211861,7.8000001907349,0.090000003576279,0.019999999552965,30,13,2,0.80000001192093,0.10000000149012,0,0.80000001192093,0.15000000596046,2.5999999046326,0.10999999940395,1.2400000095367,0.85000002384186,1,2.5999999046326,1.539999961853,1.2999999523163,3,'Pikachu',0,17,40,80,30,1,20,1.7000000476837,5,1,4,0,1,2.5999999046326,0.019999999552965,0.029999999329448,0.51700001955032,0.0099999997764826,1.7999999523163,0.89999997615814,1.7999999523163,15,0,0.80000001192093,26,4,0.83700001239777,2.7000000476837,2.6500000953674,12,24,0.20999999344349,1.8999999761581,218103808,1.7999999523163),
(0.10000000149012,9.5,0.10000000149012,0.019999999552965,30,18,2,1,0.10000000149012,24,1,0.20000000298023,2.5,0.10999999940395,1.2000000476837,1,1,2.5999999046326,1.7799999713898,1.2999999523163,6,'Link',5,24,50,104,15,1,15,1.5,17,0.87999999523163,4,0,1,2.5999999046326,0.019999999552965,0.03999999910593,0.66000002622604,0.0049999998882413,1.2999999523163,1.2200000286102,1.2000000476837,15,0,0.80000001192093,30,6,1.039999961853,3,2.7000000476837,11.625,24,0.27000001072884,2.1300001144409,117440512,1.2999999523163),
(0.079999998211861,9,0.059999998658895,0.019999999552965,30,18,2,0.93000000715256,0.10000000149012,0,1.2000000476837,0.15999999642372,2.5,0.093000002205372,1.1499999761581,1.2000000476837,1,2.2999999523163,1.5800000429153,1.2999999523163,5,'Yoshi',0,21,26,108,15,1,21,1.7999999523163,37,1.2999999523163,4,3212836864,1,2.2999999523163,0.019999999552965,0.028000000864267,0.52999997138977,0.013000000268221,1.3300000429153,1.0499999523163,1.5,15,0,0.69999998807907,19,6,0.83999997377396,2.9300000667572,2.7200000286102,6,24,0.21999999880791,1.9299999475479,0,1.6000000238419),
(0.079999998211861,7,0.079999998211861,0.019999999552965,30,12,6,0.89999997615814,0.10000000149012,0,0,0.15999999642372,2,0.079999998211861,0.85000002384186,0.77999997138977,1,2,1.3250000476837,1.2999999523163,3,'Kirby',4,16,20,70,15,1,20,1.5,5,0,4,0,1,2,0.019999999552965,0.03999999910593,0.42320001125336,0.019999999552965,1.3999999761581,0.9200000166893,1.3999999761581,15,0,0.80000001192093,15,4,0.67405331134796,2,2.5,14.699999809265,24,0.17479999363422,1.6000000238419,251658240,1.3999999761581),
(0.10000000149012,8,0.10000000149012,0.0099999997764826,30,15,2,0.69999998807907,0.10000000149012,0,0.89999997615814,0.20000000298023,2.2000000476837,0.079999998211861,0.85000002384186,1.1000000238419,1,2.2000000476837,2.7300000190735,1.2999999523163,5,'Peach',4,24,15,90,15,1,25,1.6000000238419,66,0.69999998807907,4,0,1,2.2000000476837,0.019999999552965,0.059999998658895,0.46999999880791,0.0049999998882413,1.2000000476837,1.1499999761581,1.1000000238419,17,0,0.69999998807907,15,6,0.75999999046326,2,2.5,11.875,24,0.1870000064373,1.5,251658240,1.2999999523163),
(0.050000000745058,8,0.035000000149012,0.019999999552965,30,16,2,0.60000002384186,0.10000000149012,24,0.89999997615814,0.08500000089407,2.5999999046326,0.10000000149012,0.94999998807907,0.69999998807907,1.6000000238419,2.5999999046326,1.5199999809265,1.2999999523163,3,'Ice Climbers - Nana',0,18,25,88,20,1,20,1.3999999761581,5,1,4,3212836864,1,2.5999999046326,0.019999999552965,0.027000000700355,0.46999999880791,0.019999999552965,1.3999999761581,1.1499999761581,1.3999999761581,20,0,0.80000001192093,32,4,0.73000001907349,2,2.5999999046326,10.75,24,0.18999999761581,1.6000000238419,83886080,1.3999999761581),
(0.059999998658895,8.1999998092651,0.059999998658895,0.019999999552965,30,17,2,1,0.10000000149012,24,0.89999997615814,0.10000000149012,2.2999999523163,0.094999998807907,1.1000000238419,0.86000001430511,1,2.2999999523163,1.4500000476837,1.2999999523163,4,'Mario',0,20,23,100,15,1,21,1.3999999761581,5,1,4,0,1,2.2999999523163,0.019999999552965,0.025000000372529,0.43999999761581,0.016000000759959,1.5,1.1000000238419,1.5,16,0,0.80000001192093,15,4,0.69999998807907,2.2999999523163,2.5,10.75,24,0.18000000715256,1.7000000476837,0,1.5),
(0.079999998211861,10,0.070000000298023,0.019999999552965,30,18,2,0.89999997615814,0,24,1,0.079999998211861,2.5999999046326,0.12999999523163,0.73000001907349,0.77999997138977,1,2.5999999046326,2.539999961853,1.2999999523163,6,'Ganondorf',4,26,35,109,25,1,25,2,17,0.94999998807907,5,0,0.89999997615814,3.5,0.0099999997764826,0.03999999910593,0.44499999284744,0.019999999552965,1.2999999523163,1.0800000429153,1.7999999523163,25,0,0.75,25,7,0.72000002861023,2.5999999046326,3.4000000953674,15,100,0.18000000715256,2,117440512,1.3500000238419),
(0,12.800000190735,0.03999999910593,0.019999999552965,30,17,2,0.89999997615814,0.10000000149012,24,0.89999997615814,0.30000001192093,2.2999999523163,0.082000002264977,1,1.2000000476837,1,2.2999999523163,1.5,1.2999999523163,5,'Mewtwo',3,25,28,85,28,1,25,1.3999999761581,28,1,4,3212836864,1,2.2999999523163,0.10000000149012,0.029999999329448,0.40000000596046,0.016000000759959,1.3999999761581,1,1.3999999761581,26,0,0.69999998807907,20,4,0.66699999570847,2.2999999523163,2.3499999046326,16.25,24,0.20000000298023,1.5,134217728,1.3999999761581),
(0.059999998658895,8.1999998092651,0.059999998658895,0.019999999552965,30,17,2,1,0.10000000149012,24,0.89999997615814,0.10000000149012,2.2999999523163,0.094999998807907,1.1000000238419,0.89999997615814,1,2.2999999523163,1.4500000476837,1.2999999523163,4,'Dr Mario',0,20,24,100,18,1,25,1.3999999761581,5,1,4,0,1,2.2999999523163,0.019999999552965,0.024000000208616,0.43999999761581,0.016000000759959,1.5,1.1000000238419,1.5,18,0,0.80000001192093,18,4,0.69999998807907,2.2999999523163,2.5,10.75,24,0.18000000715256,1.7000000476837,0,1.5),
(0.059999998658895,8,0.059999998658895,0.019999999552965,30,13,2,1,0.10000000149012,24,0.89999997615814,0.10000000149012,2.2999999523163,0.094999998807907,1.1000000238419,1,1,2.2999999523163,0.75,1.2999999523163,4,'Game & Watch',3,18,20,60,18,1,25,1.3999999761581,6,1,4,0,1,2.7999999523163,0.019999999552965,0.029999999329448,0.31999999284744,0.016000000759959,1.5,1.0199999809265,1.5,15,0,0.80000001192093,15,4,0.43999999761581,2.2999999523163,2.5999999046326,10.75,24,0.20000000298023,1.7000000476837,0,1.5),
(0.03999999910593,7,0.059999998658895,0.019999999552965,30,16,2,1,0.10000000149012,24,0.80000001192093,0.079999998211861,2.5,0.090000003576279,0.83999997377396,0.93000000715256,1,2.5,1.6000000238419,1.2999999523163,4,'Ness',0,18,28,94,18,1,18,1.5,5,0.85000002384186,4,3212836864,1,2.5,0.019999999552965,0.03999999910593,0.37000000476837,0.029999999329448,1.2999999523163,1,1.2999999523163,22,0,0.80000001192093,18,4,0.60000002384186,2.2000000476837,2.7000000476837,13.75,24,0.15000000596046,1.8300000429153,134217728,1.3999999761581),
(0.10000000149012,7.5,0.079999998211861,0.019999999552965,30,16,2,0.72000002861023,0.10000000149012,0,0.89999997615814,0.20000000298023,3.6800000667572,0.23000000417233,1.6000000238419,0.8299999833107,1,3.2999999523163,1.7280000448227,1.3999999761581,3,'Fox',4,22,18,75,20,1.1000000238419,22,2.0999999046326,22,1.2000000476837,4,0,1,4,0.019999999552965,0.059999998658895,0.56999999284744,0.019999999552965,1.8999999761581,0.95999997854233,1.7000000476837,15,0,0.8299999833107,18,4,0.9200000166893,3.4000000953674,3.2999999523163,14.375,30,0.23000000417233,2.7999999523163,150994944,2.2000000476837),
(0.03999999910593,14.199999809265,0.059999998658895,0.019999999552965,30,19,2,1,0.050000000745058,0,0.89999997615814,0.029999999329448,2.7999999523163,0.12999999523163,0.64999997615814,0.80000001192093,1,2.7999999523163,1.3200000524521,1.2999999523163,8,'Bowser',0,25,40,117,35,1,30,1.6000000238419,30,1,6,0,1,2.2000000476837,0.019999999552965,0.029999999329448,0.27000001072884,0.0099999997764826,1,0.68999999761581,1,30,0,0.89999997615814,30,8,0.34499999880791,2.4000000953674,3.2000000476837,31.25,24,0.090000003576279,1.8999999761581,67108864,1.5),
(0.15000000596046,9,0.079999998211861,0.019999999552965,30,18,2,0.94999998807907,0.10000000149012,24,0.89999997615814,0.15000000596046,3.0999999046326,0.12999999523163,0.85000002384186,1.1200000047684,1,3.0999999046326,2.3299999237061,1.3999999761581,4,'Captain Falcon',4,24,24,104,18,1,19,1.8999999761581,18,0.89999997615814,4,0,1,3.2999999523163,0.0099999997764826,0.03999999910593,0.40700000524521,0.0099999997764826,2,0.97000002861023,2.0999999046326,15,0,0.75,15,6,0.65960001945496,3.5,2.7000000476837,15,24,0.16500000655651,2.9000000953674,117440512,2.2999999523163);