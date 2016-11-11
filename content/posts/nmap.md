+++
draft = true
date = "2016-11-03"
title = "nmap"
description = "nmap - desc"
categories = ["random", "tech", "howto"]
tags = ["random", "tech", "howto", "utilities", "nmap"]
+++

* http://stackoverflow.com/questions/16981128/nmap-ip-range-specification
* https://hackertarget.com/nmap-cheatsheet-a-quick-reference-guide/
* https://www.garron.me/en/go2linux/nmap-command-graph-front-end-port-scan.html
* `namp nmap 192.168.0.0/24` Scan a subnet
* `nmap 192.168.0.0/24` Scan a range of IPs
* `nmap 192.168.0.1-20` Scan a range of IPs
* `nmap 192.168.0.1-20 192.168.0.30-40` Scan a range of IPs
* `nmap -sS 192.168.1.1`
* `nmap -sS 192.168.0.1-20`
* Scan a single Port `nmap -p 22 192.168.1.1`
* Scan a range of ports `nmap -p 1-100 192.168.1.1`
* Scan 100 most common ports (Fast) `nmap -F 192.168.1.1`
* Scan all 65535 ports `nmap -p- 192.168.1.1`
* Scan using TCP connect `nmap -sT 192.168.1.1`
* Scan using TCP SYN scan (default) `nmap -sS 192.168.1.1`
* Scan UDP ports `nmap -sU -p 123,161,162 192.168.1.1`
* Heartbleed Testing `nmap -sV -p 443 --script=ssl-heartbleed 192.168.1.0/24`