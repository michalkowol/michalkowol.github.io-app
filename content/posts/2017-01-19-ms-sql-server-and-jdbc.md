+++
draft = true
date = "2017-01-19"
title = "Microsoft SQL Server and JDBC"
description = "???"
categories = ["todo"]
tags = ["sql"]
+++

## Enable TCP/IP Network Protocol for SQL Server

### TCP/IP

![tcp](/img/sql/sql-tcp.png)

1. Start *SQL Server Configuration Manager*
1. In *SQL Server Configuration Manager*, in the console pane, expand SQL *Server Network Configuration*.
1. In the console pane, click Protocols for <instance_name>.
1. In the details pane, right-click TCP/IP, and then click Enable.
1. In the console pane, click SQL Server Services.
1. In the details pane, right-click SQL Server (<instance_name>), and then click Restart, to stop and restart the SQL Server service.

### Ports

![ports](/img/sql/sql-ports.png)

Make sure that under IP Addresses, the group IP4 is Enabled = "Yes", and that the TCP Port in there is set to 1433 (the default sql server port).

### Links

* http://stackoverflow.com/a/14020668/2051256
* [Enable TCP/IP Network Protocol for SQL Server](https://technet.microsoft.com/en-us/library/hh231672(v=sql.110).aspx)
* [How do I connect to a SQL Server 2008 database using JDBC?](http://stackoverflow.com/a/6916008/2051256)
* [How do I connect to a SQL Server 2008 database using JDBC?](http://stackoverflow.com/a/14490004/2051256)

## Enable SQL Server Authentication method

![auth](/img/sql/sql-auth.png)

1. In SQL Server Management Studio Object Explorer, right-click the server, and then click Properties.
1. On the Security page, under Server authentication, select the new server authentication mode, and then click OK.
1. In the SQL Server Management Studio dialog box, click OK to acknowledge the requirement to restart SQL Server.
1. In Object Explorer, right-click your server, and then click Restart. If SQL Server Agent is running, it must also be restarted.

### Links
* [Change Server Authentication Mode](https://msdn.microsoft.com/en-us/library/ms188670.aspx)

## Add user

![add user](/img/sql/sql-new-user.png)

Make sure that correct **Server roles** and **User mapping** are set.

## Enable the sa login (not recommended - please create new user)

![login](/img/sql/sql-login.png)

1. In Object Explorer, expand Security, expand Logins, right-click sa, and then click Properties.
1. On the General page, you might have to create and confirm a password for the login.
1. On the Status page, in the Login section, click Enabled, and then click OK.

## Firewall

![firewall](/img/sql/sql-firewall.png)

Be sure to **DISABLE** firewall or add custom rule on Windows box.

## JDBC

![jdbc](/img/sql/sql-jdbc-local.png)

* localhost: `jdbc:sqlserver://localhost:1433;databaseName=Aurator`
* remote: `jdbc:sqlserver://169.254.55.58:1433;databaseName=Aurator`

### Links
* [Change Server Authentication Mode](https://msdn.microsoft.com/en-us/library/ms188670.aspx)