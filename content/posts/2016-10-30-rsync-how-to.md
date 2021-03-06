+++
date = "2016-10-30"
title = "How to: rsync"
description = "How to use rsync with ssh on diffrent port."
categories = ["tech", "howto"]
tags = ["tech", "howto", "rsync", "backup"]
+++

### Documentation

rsync selected options

```text
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
--protect-args This option sends all filenames and most options to the remote rsync without allowing the remote shell to interpret them. This means that spaces are not split in names, and any non-wildcard special characters are not translated (such as ~, $, ;, &, etc.). Wildcards are expanded on the remote host by rsync (instead of the shell doing it)
--exclude-from Exclude files or directories from given file
--exclude Exclude files
--max-size=300mb Don't transfer any file larger than SIZE
```

### Examples

#### Simple examples

```bash
# without ssh
rsync -avzx . user@hostname::NetBackup/owncloud
# with ssh
rsync -avzx -e ssh . user@hostname:~/tmp
```

#### More advanced examples

```bash
# with dry run (no changes - files are not deleted on server)
rsync -avzx --dry-run --delete-after -e ssh . user@hostname:~/tmp
# with ssh on port 48419
rsync -avzx -e "ssh -p 48419" . user@hostname:~/tmp
# with mac to linux file change encoding
rsync -avzx --iconv=utf-8-mac,utf-8 -e ssh . user@hostname:~/tmp
# protects spaces
rsync -avzx --protect-args -e ssh . "user@hostname:/homes/michal/tmp with space"
# excludes files from 'exclude.txt'
rsync -avzx --exclude-from 'exclude.txt' -e ssh . user@hostname:~/tmp
# preserves ACLs and update the remote extended attributes
rsync -avzx --acls --xattrs -e ssh . user@hostname:~/tmp
```

```bash
rsync -avzx --acls --xattrs --iconv=utf-8-mac,utf-8 --append-verify --progress --human-readable --max-size=300mb --exclude-from 'exclude.txt' -e "ssh -p 48419" . user@hostname:~/tmp
```

#### Sync directions

```bash
# from server to laptop
rsync [OPTION...] <server-path> <laptop-path>
# form laptop to server
rsync [OPTION...] <laptop-path> <server-path>
```

#### Most useful example

```bash
rsync -avzx --acls --xattrs --append-verify --progress --human-readable -e ssh . user@hostname:~/tmp
```

### On windows ([cwRsync](https://www.itefix.net/cwrsync))

```bash
rsync -avzx --append-verify --progress --human-readable -e "ssh -p 48419 -i c:\ssh\id_rsa" "c/dir/dir/" user@hostname:~/tmp/
```

### Notes

* trailing `/` in directory name is **very** important - there is a big difference between `rsync dir1 dir2` and `rsync dir1/ dir2/`
* https://www.digitalocean.com/community/tutorials/how-to-use-rsync-to-sync-local-and-remote-directories-on-a-vps
* always use `--iconv=utf-8-mac,utf-8` when initialising the rsync from the mac
* always use `--iconv=utf-8,utf-8-mac` when initialising the rsync from the linux
* the `--iconv` argument came with `rsync` version 3.0.0 (release notes) OSX provides only version 2.6.9
* upgrade rsync on mac `brew update && brew tap homebrew/dupes && brew install rsync`
* `--append-verify` isn't dangerous: It will always read and compare the data on both ends and not just assume they're equal. It does this using checksums, so it's easy on the network, but it does require reading the shared amount of data on both ends of the wire before it can actually resume the transfer by appending to the target.

### References

* [rsync man](http://linux.die.net/man/1/rsync)
* [cwRsync - Rsync for Windows | itefix.net](https://www.itefix.net/cwrsync)
* [Using rsync and cygwin to Sync Files from a Linux Server to a Windows Notebook PC](http://www.trueblade.com/knowledge/using-rsync-and-cygwin-to-sync-files-from-a-linux-server-to-a-windows-notebook-pc)