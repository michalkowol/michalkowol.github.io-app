+++
draft = true
date = "3016-11-04"
title = "Random"
description = "Random notes"
categories = ["random", "todo"]
tags = ["random"]
+++

## Topics

* [VDB16 - Spring Boot and Kotlin, a match made in Heaven - Nicolas Frankel](https://www.youtube.com/watch?v=sEm_95BPPiA)
* [A Whirlwind Tour of the Kotlin Type Hierarchy](http://natpryce.com/articles/000818.html)
* [Spring Actuator (Monitoring)](http://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/#production-ready)
* http://jakewharton.com/10-kotlin-tricks-in-10ish-minutes/

## Random

* `command + ~` switches windows
* `wget -c url` continue download
* https://www.digitalocean.com/community/tutorials/how-to-secure-nginx-with-let-s-encrypt-on-ubuntu-16-04

## nohup

```bash
nohup java -jar /tmp/cablelabs-online-validator/arcops-oatc-to-cablelabs-0.0.4-SNAPSHOT-jar-with-dependencies.jar </dev/null &>/tmp/logs.log &
```

### JAXB2

* https://github.com/jacobono/gradle-jaxb-plugin
* http://stackoverflow.com/questions/28419174/gradle-jaxb-plugin-error-multiple-schemas-and-xjb
* https://github.com/jacobono/gradle-jaxb-plugin/issues/27
* https://github.com/TAXIIProject/java-taxii/blob/master/build.gradle

## Kotlin

* @JvmOverloads
* RxJava
* https://github.com/Kotlin/kotlin-coroutines/blob/master/kotlin-coroutines-informal.md#asynchronous-computations
* https://github.com/Kotlin/kotlinx.coroutines/blob/master/coroutines-guide.md
* https://kotlin.github.io/kotlinx.coroutines/kotlinx-coroutines-core/
* https://wizbii.tech/how-coroutines-in-kotlin-will-help-us-making-better-code-ab9884881e84#.yiuvd4ftq
* http://www.nurkiewicz.com/2013/05/java-8-definitive-guide-to.html

## Testing

* xmlunit:xmlunit
* org.mock-server:mockserver-netty

### XML Unit

Namespace problem

```java
XMLUnit.setXpathNamespaceContext(new SimpleNamespaceContext(new HashMap<String, String>() {{
    put("core", "urn:cablelabs:md:xsd:core:3.0");
    put("content", "urn:cablelabs:md:xsd:content:3.0");
    put("offer", "urn:cablelabs:md:xsd:offer:3.0");
    put("terms", "urn:cablelabs:md:xsd:terms:3.0");
    put("title", "urn:cablelabs:md:xsd:title:3.0");
    put("ext", "urn:viacomcablelabs:md:xsd:ext:3.0");
}}));
```

* http://www.xmlunit.org/
* http://stackoverflow.com/questions/5239685/xml-namespace-breaking-my-xpath
* https://sourceforge.net/p/xmlunit/code/585/
* https://sourceforge.net/p/xmlunit/feature-requests/25/

## Typescript

* https://github.com/Microsoft/TypeScript/wiki/Coding-guidelines

## Tensorflow (ML)

* http://www.svds.com/getting-started-deep-learning/
* https://www.tensorflow.org/
* https://github.com/tensorflow/rust
* https://github.com/tensorflow/haskell

## Package by features

* http://www.javapractices.com/topic/TopicAction.do?Id=205
* https://mrtnrbrts.wordpress.com/2012/11/08/good-java-package-layout/
* http://stackoverflow.com/questions/11733267/is-package-by-feature-approach-good
* https://medium.com/@cesarmcferreira/package-by-features-not-layers-2d076df1964d#.skesthsim
* http://www.slideshare.net/olivergierke/whoops-where-did-my-architecture-go-11678054
* http://stackoverflow.com/questions/4821130/modules-vs-layers-in-java-package-structure

# GaphQL

* https://github.com/calebmer/postgraphql
* `postgraphql --connection postgres://aurator:aurator@localhost:5432/aurator --watch`
* `POST http://localhost:5000/graphql {"query": "{allAuthors {edges {node {name}}}}"}`

## PM2 (node)

* https://www.digitalocean.com/community/tutorials/how-to-set-up-a-node-js-application-for-production-on-ubuntu-16-04#install-pm2
* https://mmonit.com/monit/

## Jackson XML

* https://github.com/FasterXML/jackson-dataformat-xml/issues/165
* http://stackoverflow.com/questions/26615540/unable-to-deserialize-list-directly-inside-rootelement-using-jackson-xml

```java
package pl.michalkowol;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlElementWrapper;
import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlProperty;
import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlText;

import java.util.ArrayList;
import java.util.List;

public class ArcModel {
    static class ContentRecord {
        public String id;
        @JacksonXmlElementWrapper(useWrapping = false)
        @JsonProperty("field")
        public List<Field> fields = new ArrayList<>();
    }

    static class Computer {
        @JacksonXmlProperty(isAttribute = true)
        public String id;
        @JacksonXmlText
        public String name;
    }

    static class Company {
        @JacksonXmlElementWrapper(useWrapping = false)
        public List<Computer> computers = new ArrayList<>();
    }

    static class Field {
//        @JacksonXmlProperty(isAttribute = true)
//        public String name;
        @JacksonXmlText
        public String value;
    }
}
```

```kotlin
object Mappers {
    fun json(): ObjectMapper {
        val objectMapper = ObjectMapper()
        objectMapper.findAndRegisterModules()
        objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false)
        return objectMapper
    }

    fun xml(): ObjectMapper {
        val objectMapper = XmlMapper()
        objectMapper.findAndRegisterModules()
        objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false)
        return objectMapper
    }
}
```

```kotlin
internal fun convertToContentRecord(xml: String): ContentRecord {
        val objectMapper = Mappers.xml()
        val map = objectMapper.readValue(xml, List::class.java)
        println(map)
        return objectMapper.readValue(xml, ContentRecord::class.java)
    }
```

How to solve it?

```kotlin
private class ContentRecord {
    var id: String = ""

    @JacksonXmlElementWrapper(useWrapping = false)
    @JsonProperty("field")
    var fields: MutableList<Field> = mutableListOf()

    @JsonSetter("field") // could be "link-list" (with dash)
    fun setField(field: Field) {
        this.fields.add(field)
    }
}

private class Field {
    var name: String = ""
    @JacksonXmlText var value: String = ""
}
```

```java
@JsonAnySetter
private void parseUnknownProperties(String propertyName, String propertyValue) {
    if (NAME_PROPERTIES.contains(propertyName) && !propertyValue.isEmpty()) {
        this.name = propertyValue;
    }
}
```