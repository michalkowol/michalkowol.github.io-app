+++
draft = false
date = "2016-10-30T20:36:56+01:00"
title = "How to: rsync"
description = "How to use rsync with ssh on diffrent port."
categories = ["tech", "howto"]
tags = ["tech", "howto", "rsync", "backup"]
+++

### Documentation

rsync selected options

```
-a, --archive It is more commonly used than -r (recursive) and is usually what you want to use.
-z, --compress With this option, rsync compresses the file data as it is sent to the destination machine
-v, --verbose This option increases the amount of information the daemon logs during its startup phase.
-x, --one-file-system This tells rsync to avoid crossing a filesystem boundary when recursing.
-A, --acls Preserve ACLs (implies -p).
-H, --hard-links This tells rsync to look for hard-linked files.
-X, --xattrs This option causes rsync to update the remote extended attributes to be the same as the local ones.
-e, --rsh=COMMAND Specify the remote shell to use.
--delete-after Receiver deletes after transfer, not before.
-n, --dry-run This makes rsync perform a trial run that doesn't make any changes.
--progress This option tells rsync to print information showing the progress of the transfer.
--human-readable Output numbers in a more human-readable format.
--append-verify Append w/old data in file checksum
```

### Examples

Simple examples

```bash
# without ssh
rsync -avzx . user@hostname::NetBackup/owncloud
# with ssh
rsync -avzx -e ssh . user@hostname:~/tmp
# with ssh (from server to client)
rsync -avzx -e ssh user@hostname:~/tmp .

```

More advanced examples

```bash
# with dry run (no changes - files would be deleted on server after success)
rsync -avzx --dry-run --delete-after -e ssh . user@hostname:~/tmp
# files will be deleted on server after success
rsync -avzx --delete-after -e ssh . user@hostname:~/tmp
# with ssh on port 48419
rsync -avzx -e "ssh -p 48419" . user@hostname:~/tmp
# full example
rsync -avzx --progress --human-readable -e "ssh -p 48419" . user@hostname:~/tmp
# full example (with delete after)
rsync -avzx --delete-after --progress --human-readable -e "ssh -p 48419" . user@hostname:~/tmp
# with mac to linux file change encoding
rsync -avzx --iconv=utf-8-mac,utf-8 --progress --human-readable -e ssh . user@hostname:~/tmp
# with append w/old data in file checksum
rsync -avzx --append-verify --progress --human-readable -e ssh . user@hostname:~/tmp
```

Combined

```
rsync -avzx --iconv=utf-8-mac,utf-8 --append-verify --progress --human-readable -e "ssh -p 48419" . user@hostname:~/tmp
```

On windows ([cwRsync](https://www.itefix.net/cwrsync))

```bash
rsync -avzx --progress --human-readable -e "ssh -p 48419 -i c:\ssh\id_rsa" "c/dir/dir" user@hostname:~/tmp
```

### Notes

* https://www.digitalocean.com/community/tutorials/how-to-use-rsync-to-sync-local-and-remote-directories-on-a-vps
* always use `--iconv=utf-8-mac,utf-8` when initialising the rsync from the mac
* always use `--iconv=utf-8,utf-8-mac` when initialising the rsync from the linux
* the `--iconv` argument cam with `rsync` version 3.0.0 (release notes) OSX provides only version 2.6.9
* upgrade rsync on mac `brew update && brew tap homebrew/dupes && brew install rsync`
* `--append-verify` isn't dangerous: It will always read and compare the data on both ends and not just assume they're equal. It does this using checksums, so it's easy on the network, but it does require reading the shared amount of data on both ends of the wire before it can actually resume the transfer by appending to the target.

Thus you need to get a newer version latest is 3.1.1 (2.6.9 was released in 2006)

I would also get a newer version rsync as xattr copying was also introduced after 2.6.9 

### References

* [rsync man](http://linux.die.net/man/1/rsync)
* [cwRsync](https://www.itefix.net/cwrsync)