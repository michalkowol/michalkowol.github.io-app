+++
date = "2016-11-03"
title = "Midnight Commander"
description = "Midnight Commander - is a visual file manager. It is great tool, but it is quite hard to use."
categories = ["tech", "howto"]
tags = ["tech", "howto", "mc", "midnight commander"]
+++

## Overview

[Midnight Commander](https://www.midnight-commander.org/) is based on versatile text interfaces, such as Ncurses or S-Lang, which allows it to work on a regular console, inside an X Window terminal, over SSH connections and all kinds of remote shells.

### Shorcuts

* `Ctrl + x, q` quick preview (x = comman, q = quick view)
* `Shift + F6` rename file 
* `Ctrl + o` open/close terminal
* `Ctrl + s` cd in active panel
* `Esc + c` quick cd
* `Esc + i` open same directory in another panel
* `Ctrl + r` refresh

### Configure `open` as View/Open

Menu: `Command > Edit extension file`

```
regex/\.(.*)$
        Open=(open %f &)
```