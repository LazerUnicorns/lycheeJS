#!/bin/bash

lowercase() {
	echo "$1" | sed "y/ABCDEFGHIJKLMNOPQRSTUVWXYZ/abcdefghijklmnopqrstuvwxyz/";
}

OS=`lowercase \`uname\``;

LYCHEEJS_IOJS="";
LYCHEEJS_ROOT=$(cd "$(dirname "$0")/../"; pwd);
SORBET_PID="$LYCHEEJS_ROOT/sorbet/.pid";
SORBET_LOG="/var/log/sorbet.log";
SORBET_ERR="/var/log/sorbet.err";
SORBET_USER=`whoami`;


if [ "$OS" == "darwin" ]; then

	OS="osx";
	LYCHEEJS_IOJS="$LYCHEEJS_ROOT/bin/runtime/iojs/osx/iojs";

elif [ "$OS" == "linux" ]; then

	OS="linux";
	LYCHEEJS_IOJS="$LYCHEEJS_ROOT/bin/runtime/iojs/linux/iojs";

elif [ "$OS" == "windowsnt" ]; then

	OS="windows";
	LYCHEEJS_IOJS="$LYCHEEJS_ROOT/bin/runtime/iojs/windows/iojs.exe";

fi;

