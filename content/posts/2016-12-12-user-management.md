+++
draft = false
date = "2016-12-10"
title = "User management in Linux"
description = "Add and delete users, groups in linux. Add user to group. Files and directories permissions."
categories = ["tech", "linux"]
tags = ["tech", "linux", "user", "user management"]
+++

## Add, delete users and groups

* `addgroup groupname` - creates new group
* `adduser username` - creates new user
* `usermod -a -G groupname username` - adds existing user to existing group
* `deluser username` - deletes user
* `groups username` - list all groups for user

# chmod

| Mode | Name            |
|------|-----------------|
| `r`  | read            |
| `w`  | write           |
| `x`  | execute         |
| `X`  | special execute |
| `s`  | setuid/gid      |
| `t`  | sticky          |

| Reference | Class  |
|-----------|--------|
| `u`       | owner  |
| `g`       | group  |
| `o`       | others |
| `a`       | all    |

| Operator | Description                                                                  |
|----------|------------------------------------------------------------------------------|
| `+`      | adds the specified modes to the specified classes                            |
| `-`      | removes the specified modes from the specified classes                       |
| `=`      | the modes specified are to be made the exact modes for the specified classes |

## Files permissions

* `chown -R username:groupname path` - changes file/directory owner and its group
* `chown -R :groupname path` - changes file/directory group
* `chmod -R a-x+X path` - remove the execute permission on all files in a directory tree, while allowing for directory browsing
* `chmod -R a+X directory` - allowing for directory browsing for all

<style>
table { width: auto; }
</style>