# Genepi Console [![Build Status](https://travis-ci.org/gliluaume/genepi-console.svg?branch=master)](https://travis-ci.org/gliluaume/genepi-console)
Fast reading tool in console

<p align="center">
	<img width="700" src="demo.gif">
</p>

## Usage
```shell
  $ genepi-cli <string|textfile|stdin|url> [-d|--delay <delay>]
```

## Debug tips
```
console.log(process._getActiveHandles().length)
console.log(process._getActiveRequests().length)
```
