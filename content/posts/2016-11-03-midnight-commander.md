+++
draft = true
date = "2016-11-03"
title = "Midnight Commander"
description = "Midnight Commander - how to use."
categories = ["random", "tech", "howto", "todo"]
tags = ["random", "tech", "howto", "mc", "midnight commander"]
+++

https://www.midnight-commander.org/

## Shorcuts

* `Ctrl + x, q` quick preview (x = comman, q = quick view)
* `Shift + F6` rename file 
* `Ctrl + o` open/close terminal
* `Ctrl + s` cd in active panel
* `Esc + c` quick cd
* `Esc + i` open same directory in another panel
* `Ctrl + r` refresh

## Configure `open` as View/Open

Menu: `Command > Edit extension file`

```
regex/\.(.*)$
        Open=(open %f &)
```