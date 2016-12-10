+++
draft = false
date = "2016-11-07"
title = "/boot 100% and can't purge"
description = "Hot to fix problem with full /boot."
categories = ["tech", "howto"]
tags = ["tech", "howto", "linux", "boot", "header"]
+++

## Solution

1. `sudo apt-get install` --fix-broken should fail but list unused packets
1. free them one by one using sudo `dpkg --purge ...`. If a packet refuse to uninstall due to dependencies, just advance to the next one.
1. After uninstalling everything you could, `sudo apt-get install --fix-broken` again, and this time it should work.

So, after upgrading kernels and rebooting to test it, you can remove all other kernels with:

To list all installed kernels, run:

```
dpkg -l linux-image-\* | grep ^ii
```

Command to show all kernels and headers that can be removed, excluding the current running kernel:

```
kernelver=$(uname -r | sed -r 's/-[a-z]+//')
dpkg -l linux-{image,headers}-"[0-9]*" | awk '/ii/{print $2}' | grep -ve $kernelver
```

So, after upgrading kernels and rebooting to test it, you can remove all other kernels with:

```
sudo apt-get purge $(dpkg -l linux-{image,headers}-"[0-9]*" | awk '/ii/{print $2}' | grep -ve "$(uname -r | sed -r 's/-[a-z]+//')")
```

## Links

* [How do I free up more space in /boot?](http://askubuntu.com/questions/89710/how-do-i-free-up-more-space-in-boot)
* [/boot 100% and can't purge](http://askubuntu.com/questions/337456/boot-100-and-cant-purge)
