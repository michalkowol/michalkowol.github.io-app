+++
draft = true
date = "2016-11-17"
title = "XML Schema and JAXB"
description = "Brief introduction to XML schema (xsd). How to configure JAXB to validate against XSD."
categories = ["development", "java", "todo"]
tags = ["development", "java", "mvn", "xsd", "jaxb", "xml"]
+++

## XML Schema

### What is an XML Schema?

An XML Schema describes the structure of an XML document. The XML Schema language is also referred to as XML Schema Definition (XSD).

The purpose of an XML Schema is to define the legal building blocks of an XML document:

* the elements and attributes that can appear in a document
* the number of (and order of) child elements
* data types for elements and attributes
* default and fixed values for elements and attributes

### Example

```xml
<?xml version="1.0" encoding="UTF-8"?>
<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema" elementFormDefault="qualified">

    <xs:import namespace="http://www.w3.org/XML/1998/namespace" schemaLocation="http://www.w3.org/2001/xml.xsd"/>

    <xs:simpleType name="nonEmptyString">
        <xs:restriction base="xs:string">
            <xs:minLength value="1" />
        </xs:restriction>
    </xs:simpleType>
</xs:schema>
```

### Links

* http://www.w3schools.com/Xml/schema_intro.asp

## JAXB

```java
public class DefaultNamespacePrefixMapper extends NamespacePrefixMapper {

    private final Map<String, String> namespaceMap;

    public DefaultNamespacePrefixMapper() {
        namespaceMap = Collections.unmodifiableMap(new HashMap<String, String>() {{
            put("urn:cablelabs:md:xsd:core:3.0", "core");
            put("urn:cablelabs:md:xsd:content:3.0", "content");
            put("urn:cablelabs:md:xsd:offer:3.0", "offer");
            put("urn:cablelabs:md:xsd:terms:3.0", "terms");
            put("urn:cablelabs:md:xsd:title:3.0", "title");
            put("urn:viacomcablelabs:md:xsd:ext:3.0", "ext");
        }});
    }

    @Override
    public String getPreferredPrefix(String namespaceUri, String suggestion, boolean requirePrefix) {
        return namespaceMap.getOrDefault(namespaceUri, suggestion);
    }
}
```

### Links

* http://json-schema.org/examples.html
* http://json-schema.org/implementations
* https://github.com/daveclayton/json-schema-validator
* https://github.com/everit-org/json-schema
* https://github.com/networknt/json-schema-validator
* https://www.intertech.com/Blog/jaxb-tutorial-customized-namespace-prefixes-example-using-namespaceprefixmapper/