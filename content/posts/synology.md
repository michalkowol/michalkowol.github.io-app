+++
draft = false
date = "2016-10-29"
title = "Synology ssh with public key"
categories = ["tech"]
tags = ["synology", "ssh", "rsync"]
+++

First of all generate ssh private and public key on your local machine.

```bash
local> ssh-keygen -t rsa -b 4096 -C "yourmail@example.com"
```

It is good idea to create dedicated user for `rsync`.

```bash
synology> adduser rsync
```

By default Synology sets home directory rights to `777`. `sshd` is very picky and its needs different home directory rights.


```bash
synology> chmod 755 /var/services/homes/rsync
```

Now, you need to modify `/etc/ssh/sshd_config` on Synlogy. Make sure it has the following line uncommented.

```
# ...
PubkeyAuthentication yes
# ...
```

Then you need to create the `authorized_keys` file on Synlogy. To this file remote users add their public keys. File permissions are crucial here and if they are wrong ssh will refuse you.

```
synology> su -s rsync
synology> cd
synology> pwd # make sure you are in /var/services/homes/rsync
synology> mkdir .ssh
synology> chmod 700 .ssh
synology> touch .ssh/authorized_keys
synology> chmod 600 .ssh/authorized_keys
```

Typically you want the `.ssh` directory permissions to be `700 (drwx------)`, home directory to be `755 (drwxr-xr-x)` and the public key (`.pub file`) to be `644 (-rw-r--r--)`. Your private key (`id_rsa`) should be `600 (-rw-------)`. `authorized_keys` should be `600 (-rw-------)`.

Then add public key corresponding to a private key in one line in `authorized_keys`. You can use this command.

```bash
local> cat ~/.ssh/id_rsa.pub | ssh user@hostname 'cat >> .ssh/authorized_keys'
```

Now restart Synology or quicker just force the ssh deamon to reload its config

```
synology> ps | grep sshd
```

```
synology> kill -HUP $PID
```

You should now be able ssh to Synology as rsync with no password.

```
local> ssh rsync@synology
```

Note: How to change shell for user?

```
chsh -s /usr/local/bin/bash username
```

`/sbin/nologin` disables login.

### References

* [Passwordless Ssh on Synology](http://karlcode.owtelse.com/blog/2015/06/27/passwordless-ssh-on-synology/)
