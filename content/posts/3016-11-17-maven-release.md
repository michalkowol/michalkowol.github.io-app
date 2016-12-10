+++
draft = true
date = "3016-11-17"
title = "Maven Release Plugin (TODO)"
categories = ["development", "java"]
tags = ["development", "java", "mvn", "git", "maven plugin"]
+++

### Configuration

`pom.xml`

```xml
<version>0.4.4-SNAPSHOT</version>
```

```xml
<!--...-->
<plugin>
  <artifactId>maven-release-plugin</artifactId>
  <version>2.5.3</version>
  <configuration>
    <tagNameFormat>v@{project.version}</tagNameFormat>
  </configuration>
  <dependencies>
    <dependency>
      <groupId>org.apache.maven.scm</groupId>
      <artifactId>maven-scm-provider-gitexe</artifactId>
      <version>1.9.4</version>
    </dependency>
  </dependencies>
</plugin>
<!--...-->
```

```xml
<!--...-->
<scm>
  <connection>scm:git:ssh://git@github.com:username/reponame.git</connection>
  <developerConnection>scm:git:ssh://git@github.com:username/reponame.git</developerConnection>
  <url>https://github.com/username/reponame</url>
  <tag>HEAD</tag>
</scm>
<!--...-->
```

Maven goal will remove `-SNAPSHOT` from `version` and it the version without snapshot will be used to set `tagNameFormat`. `tag` from `scm` will be replaced with `tagNameFormat` (in case from example `v0.4.4`). After successful release to SCM, maven release plugin will increase patch number and it will add `-SNAPSHOT` postfix (in case from example `0.4.5-SNAPSHOT`).

### Command

```bash
mvn -e -B -DreleaseVersion=${releaseVersion} release:clean release:prepare release:perform
```

* `-e`, `--errors` produce execution error messages
* `-B`, `--batch-mode` run in non-interactive (batch) mode
* `release:clean` clean up after a release preparation
* `release:prepare` prepare for a release in SCM
* `release:perform` perform a release from SCM
* `-DreleaseVersion=${releaseVersion}` release version
* `-DdevelopmentVersion=${developmentVersion}` next development version

### Links

* http://maven.apache.org/maven-release/maven-release-plugin/
* http://www.baeldung.com/maven-release-nexus

```xml
<plugin>
    <groupId>org.sonatype.plugins</groupId>
    <artifactId>nexus-staging-maven-plugin</artifactId>
    <version>1.6.7</version>
    <configuration>
        <skipNexusStagingDeployMojo>true</skipNexusStagingDeployMojo>
    </configuration>
</plugin>
```

```xml
<scm>
   <connection>scm:git:git@github.com:user/project.git</connection>
   <url>scm:git:git@github.com:user/project.git</url>
   <developerConnection>scm:git:git@github.com:user/project.git</developerConnection>
</scm>
```

```xml
<plugin>
   <groupId>org.apache.maven.plugins</groupId>
   <artifactId>maven-release-plugin</artifactId>
   <version>2.4.2</version>
   <configuration>
      <tagNameFormat>v@{project.version}</tagNameFormat>
      <autoVersionSubmodules>true</autoVersionSubmodules>
      <releaseProfiles>releases</releaseProfiles>
   </configuration>
</plugin>
```

Deploy file to Maven

```
mvn deploy:deploy-file -DgroupId=com.somecompany -DartifactId=project -Dversion=1.0.0 -DgeneratePom=true -Dpackaging=jar -DrepositoryId=nexus -Durl=http://localhost:8081/nexus/content/repositories/releases -Dfile=target/project-1.0.0.jar
```

Dowanlod file from Maven

```
mvn org.apache.maven.plugins:maven-dependency-plugin:2.10:get -DremoteRepositories=http://download.java.net/maven/2 -Dartifact=org.dom4j:dom4j:2.0.0 -Ddest=.
```