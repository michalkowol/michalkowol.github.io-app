+++
date = "2016-11-03"
title = "Backups with rsnapshot"
description = "Easy Automated Snapshot-Style Backups with Linux and Rsync."
categories = ["tech", "howto"]
tags = ["tech", "howto", "rsync", "backup", "rsnapshot"]
+++


### Docker test enviroment

`Dockerfile`:

```docker
FROM ubuntu:17.10
RUN apt-get update && apt-get install -y rsnapshot
ENTRYPOINT ["/bin/bash"]
```

and run it with

```bash
docker build -t ubuntu-rsnapshot .
docker run --name ubuntu-rsnapshot-bash -it ubuntu-rsnapshot
```

to attach another terminal you can use

```
docker exec -it ubuntu-rsnapshot-bash /bin/bash
```

### Rsnapshot configuration

You can find configuration in `/etc/rsnapshot.conf`

The most interesing parts of config:

```bash
config_version  1.2

cmd_cp		/bin/cp
cmd_rm		/bin/rm
cmd_rsync	/usr/bin/rsync
cmd_ssh		/usr/bin/ssh
cmd_logger	/usr/bin/logger

verbose		2
loglevel	3
logfile		/var/log/rsnapshot.log
lockfile	/var/run/rsnapshot.pid

# ...
# All snapshots will be stored under this root directory.
# ...
snapshot_root	/var/cache/rsnapshot/

# ...
# This means that every time `rsnapshot alpha` is run,
# it will make a new snapshot, rotate the old ones,
# and retain the most recent six (`alpha.0` - `alpha.5`)
# ...
retain	alpha	6
retain	beta	7
retain	gamma	4

# ...
# Example of local backups
# ...
backup	/home/		localhost/
backup	/etc/		localhost/
backup	/usr/local/	localhost/

# ...
# Example of remote backup
# ...
backup	root@example.com:/home/ example.com/
```

Now, you can do a manual backup using `rsnapshot alpha`.

### Cron job

To run rsnapshot automaticly you need create cron job. You should use `crontab -e` to edit it.

Here is a quick example which makes backups every four hours, and beta backups for a week:

```cron
0 */4 * * *     /usr/bin/rsnapshot alpha
50 23 * * *     /usr/bin/rsnapshot beta
```

Note:
Make sure cron is running with `service cron status`. You can start it with `service cron start`. To start it on boot use `update-rc.d cron defaults`.

### Remote snapshot

You can specify alternative config file and use `rsnapshot -c /path/to/rsnapshot.remote.conf alpha`

`rsnapshot.remote.conf`:

```
config_version	1.2
include_conf	/etc/rsnapshot.conf
snapshot_root	/mount/smb/backup/directory/
```

Rsnapshot does not support a remote snapshot root via SSH. However you should be able to use a remote snapshot root that is NFS mounted on the machine that runs rsnapshot but hosted on another machine (NFS server)<sup>[link](http://rsnapshot.org/faq.html)</sup>.

### Advanced config

```bash
# ...
# List of short arguments to pass to rsync. If not specified, "-a" is the default.
# ..
rsync_short_args -a

# ...
# List of long arguments to pass to rsync.
# ..
rsync_long_args --delete --numeric-ids --relative --delete-excluded

# ...
# Arguments to be passed to ssh. If not specified, the default is none.
# ...
ssh_args -p 22

# ...
# Full filesystem path to the rsnapshot log file. 
# ...
logfile /var/log/rsnapshot

# ...
# If no_create_root is enabled, rsnapshot will not automatically create the
# snapshot_root directory. This is particularly useful if you are backing
# up to removable media, such as a FireWire or USB drive.
# ...
no_create_root	1

# ...
# Examples. 
# ...
backup root@example.com:/etc/ example.com/
backup rsync://example.com/path2/ example.com/
backup /var/ localhost/ one_fs=1
backup lvm://vg0/home/path2/ lvm-vg0/
backup_script /usr/local/bin/backup_pgsql.sh pgsql_backup/
backup root@somehost:/ somehost +rsync_long_args=--exclude=/var/spool/
```

### Full example

```bash
config_version  1.2

snapshot_root   /.snapshots/

cmd_rsync           /usr/bin/rsync
cmd_ssh             /usr/bin/ssh
#cmd_cp             /bin/cp
cmd_rm              /bin/rm
cmd_logger          /usr/bin/logger
cmd_du              /usr/bin/du

linux_lvm_cmd_lvcreate        /sbin/lvcreate
linux_lvm_cmd_lvremove        /sbin/lvremove
linux_lvm_cmd_mount           /bin/mount
linux_lvm_cmd_umount          /bin/umount

linux_lvm_snapshotsize    2G
linux_lvm_snapshotname    rsnapshot
linux_lvm_vgpath          /dev
linux_lvm_mountpath       /mnt/lvm-snapshot

retain              hourly  6
retain              daily   7
retain              weekly  7
retain              monthly 3

backup              /etc/                     localhost/
backup              /home/                    localhost/
backup_script       /usr/local/bin/backup_mysql.sh  mysql_backup/

backup              root@foo.com:/etc/        foo.com/
backup              root@foo.com:/home/       foo.com/
backup              root@mail.foo.com:/home/  mail.foo.com/
backup              rsync://example.com/pub/  example.com/pub/
backup              lvm://vg0/xen-home/       lvm-vg0/xen-home/
```

`cron`:

```cron
0 */4 * * * /usr/local/bin/rsnapshot hourly
50 23 * * * /usr/local/bin/rsnapshot daily
40 23 * * 6 /usr/local/bin/rsnapshot weekly
30 23 1 * * /usr/local/bin/rsnapshot monthly
```

* 6 hourly backups a day (once every 4 hours, at 0,4,8,12,16,20)
* 1 daily backup every day, at 11:50PM
* 1 weekly backup every week, at 11:40PM, on Saturdays (6th day of week)
* 1 monthly backup every month, at 11:30PM on the 1st day of the month

### Hard links - size of snapshots <sup>[link](http://rsnapshot.org/faq.html)</sup>

> *After I’ve taken a few snapshots, why do they all show up the same size in df? I thought rsnapshot was meant to only take one full snapshot and then a bunch of incrementals?*
> 
> You thought right, and it does! It looks like you’ve got a bunch of full snapshots because any file which hasn’t changed between two consecutive snapshots will be a hard link, so potentially several directory entries in consecutive snapshots may actually point at the same data on disk, so the only space taken up by a snapshot is whatever is different between it and the previous one. Using the du utility to gauge your disk usage will normally produce confusing results because of this. The rsnapshot-diff utility solves this. You could also use the -c argument to du.

### References

* [rsnapshot | rsnapshot](http://rsnapshot.org/)
* [Easy Automated Snapshot-Style Backups with Rsync](http://www.mikerubel.org/computers/rsync_snapshots/)
* [laurent22/rsync-time-backup: Time Machine style backup with rsync.](https://github.com/laurent22/rsync-time-backup)
* [rsnapshot/rsnapshot: a tool for backing up your data using rsync (if you want to get help, use https://lists.sourceforge.net/lists/listinfo/rsnapshot-discuss)](https://github.com/rsnapshot/rsnapshot)