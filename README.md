# <a href="https://en.wikipedia.org/wiki/Ultimate_(sport)">Ultimate frisbee</a> statistic's collector.

Purpose ot the program is collect statistic for ultimate frisbee matches. Judges and games scorekeepers (staff) can use it in official ultimate frisbee tournaments according with Russia flying disc federation.
Customer - Novgorod flying disc federation.

Program is in beta-testing stage.

Russian readme in <a href="README-ru.md">README-ru.md</a> file. <br>
Look at the user manual in <a href="ultimate_stats_docs_ru.pdf">ultimate_stats_docs_ru.pdf</a>, russian version.

<p align="center">
  <img src="./img/preview.jpg" alt="Interface example" width="300">
</p>

Collect follow data: <br>

* final score of the game
* goals and assists, according with teams rosters
* collect all stoppage of the game
* turnovers
* collect all operators actions including time stoppage
* all disk throws

Program have timer and all game actions have time stamps.

## Demo

Working demo: <a href="http://www.novak.su/test/stats">www.novak.su/test/stats</a> <br>

## Installation

For local working, make fork and clone the repo. Install dependencies:

```sh
$ npm install
```

## Program features:

* collect statistics with time stamps
* all control buttons is in one screen
* convenient workflow with game log, there are two modes - preview mode and full mode
* UNDO и REDO for logs
* adaptive markup (includes height adaptive) for convenient work in all modern mobile devices
* downloading game file to device
* all game statistic hold on the operator's device (in localstorage)
* working with network breaks (sync after communication restoration)
