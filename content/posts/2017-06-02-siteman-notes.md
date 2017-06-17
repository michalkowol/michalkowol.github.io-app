+++
draft = true
date = "2017-06-02"
title = "Siteman - notes"
description = "???"
categories = ["java", "spring"]
tags = ["java", "spring", "springboot", "jpa", "hibernate"]
+++

## List page templates

`GET /distribution-points-templates/{dpTemplateCode}/pages-templates`

`GET /distribution-points-templates/mtv-website-main/pages-templates`

```
{
    "data": [
        {
            "pageTemplateCode": "homepage",
            "instructions": "homepage instruction",
            "links": [
                {
                    "rel": "self",
                    "href": "http://localhost:8080/distribution-points-templates/mtv-website-main/pages-templates/homepage"
                }
            ]
        },
        {
            "pageTemplateCode": "series-homepage",
            "links": [
                {
                    "rel": "self",
                    "href": "http://localhost:8080/distribution-points-templates/mtv-website-main/pages-templates/series-homepage"
                }
            ]
        },
        // ...
    ],
    "links": [
        {
            "rel": "self",
            "href": "http://localhost:8080/distribution-points-templates/mtv-website-main/pages-templates"
        }
    ]
}
```

Note: should be ordered by "position".

## Get page template details

`GET /distribution-points-templates/{dpTemplateCode}/pages-templates/{pageTemplateCode}`

`GET /distribution-points-templates/mtv-website-main/pages-templates/homepage`

```
{
    "dpTemplateCode": "mtv-website-main",
    "pageTemplateCode": "homepage".
    "position": 1,
    "instructions": "homepage instruction",
    "sections": [
        {
            "pageSectionTemplateCode": "massive"
            "programmable": true,
            "noOfCollections": 1,
            "instructions": "homepage instruction"
        },
        {
            "pageSectionTemplateCode": "submassive"
            "programmable": true,
            "noOfCollections": 1
        },
        {
            "pageSectionTemplateCode": "most-viewed-videos"
            "programmable": false,
            "noOfCollections": 1
        },
        // ...
    }
    ]
    "links": [
        {
            "rel": "self",
            "href": "http://localhost:8080/distribution-points-templates/mtv-website-main/pages-templates/homepage"
        },
        {
            "rel": "distribution-points-templates.pages-templates",
            "href": "http://localhost:8080/distribution-points-templates/mtv-website-main/pages-templates"
        }
    ]
}
```

Note: sections are ordered by position

## Pages

### Listing all pages

Template: `GET /brands`

Example: `GET /brands`

```json
{
    "data": [
        {
            "dpCode": "mtv-com-website",
            "pageTemplateCode": "homepage",
            "dpTemplateCode": "mtv-website-main",
            "pageCollectionId": "de198e5b-5c6e-49fb-8285-5c590a319818",
            "link": [
                {
                    "rel": "self",
                    "href": "http://localhost:8080/brands/mtv.com/distribution-points/mtv-website-main/pages/homepage"
                }
            ]
        },
        {
            "dpCode": "mtv-com-website",
            "pageTemplateCode": "series-homepage",
            "dpTemplateCode": "mtv-website-main",
            "link": [ ... ]
        },
        {
            "dpCode": "mtv-com-website",
            "pageTemplateCode": "about",
            "dpTemplateCode": "mtv-website-main",
            "link": [ ... ]
        },
        {
            "dpCode": "mtv-com-website",
            "pageTemplateCode": "news",
            "dpTemplateCode": "mtv-website-main",
            "link": [ ... ]
        },
        {
            "dpCode": "mtv-com-website",
            "pageTemplateCode": "watch-live-tv",
            "dpTemplateCode": "mtv-website-main",
            "link": [ ... ]
        }
    ],
    "links": [
        {
            "rel": "self",
            "href": "http://localhost:8080/brands/mtv.com/distribution-points/mtv-website-main/pages"
        }
    ]
}
```

### Listing all pages for given brand and dp

Template: `GET /brands/{brandCode}/distribution-points/{dpCode}/pages`

Example: `GET /brands/mtv.com/distribution-points/mtv-website-main/pages`

#### Ver 1


```json
{
    "data": [
        {
            "dpCode": "mtv-com-website",
            "pageTemplateCode": "homepage",
            "dpTemplateCode": "mtv-website-main",
            "pageCollectionId": "de198e5b-5c6e-49fb-8285-5c590a319818",
            "link": [
                {
                    "rel": "self",
                    "href": "http://localhost:8080/brands/mtv.com/distribution-points/mtv-website-main/pages/homepage"
                }
            ]
        },
        {
            "dpCode": "mtv-com-website",
            "pageTemplateCode": "series-homepage",
            "dpTemplateCode": "mtv-website-main",
            "link": [ ... ]
        },
        {
            "dpCode": "mtv-com-website",
            "pageTemplateCode": "about",
            "dpTemplateCode": "mtv-website-main",
            "link": [ ... ]
        },
        {
            "dpCode": "mtv-com-website",
            "pageTemplateCode": "news",
            "dpTemplateCode": "mtv-website-main",
            "link": [ ... ]
        },
        {
            "dpCode": "mtv-com-website",
            "pageTemplateCode": "watch-live-tv",
            "dpTemplateCode": "mtv-website-main",
            "link": [ ... ]
        }
    ],
    "links": [
        {
            "rel": "self",
            "href": "http://localhost:8080/brands/mtv.com/distribution-points/mtv-website-main/pages"
        }
    ]
}
```

#### Ver 2


```json
{
    "data": [
        {
            "pageTemplateCode": "homepage",
            "pageCollectionId": "de198e5b-5c6e-49fb-8285-5c590a319818",
            "link": [
                {
                    "rel": "self",
                    "href": "http://localhost:8080/brands/mtv.com/distribution-points/mtv-website-main/pages/homepage"
                }
            ]
        },
        {
            "pageTemplateCode": "series-homepage",
            "link": [ ... ]
        },
        {
            "pageTemplateCode": "about",
            "link": [ ... ]
        },
        {
            "pageTemplateCode": "news",
            "link": [ ... ]
        },
        {
            "pageTemplateCode": "watch-live-tv",
            "link": [ ... ]
        }
    ],
    "links": [
        {
            "rel": "self",
            "href": "http://localhost:8080/brands/mtv.com/distribution-points/mtv-website-main/pages"
        }
    ]
}
```

### Listing page's overridings for given brand, dp and page template code

Template: `GET /brands/{brandCode}/distribution-points/{dpCode}/pages/{pageTemplateCode}`

Example: `GET /brands/mtv.com/distribution-points/mtv-website-main/pages/series-homepage`

```
{
  "data": [
    {
      "seriesRef": "696b503c-ffb0-45b7-831a-cdb9e32930fa",
      "links": [
        {
          "rel": "self",
          "href": "http://localhost:8080/brands/mtv.com/distribution-points/mtv-website-main/pages/series-homepage/696b503c-ffb0-45b7-831a-cdb9e32930fa"
        }
      ]
    },
    {
      "seriesRef": "7a48a14a-d237-11e1-a549-0026b9414f30",
      "link": [ ... ]
    }
  ],
  "links": [
    {
      "rel": "self",
      "href": "http://localhost:8080/brands/mtv.com/distribution-points/mtv-website-main/pages/series-homepage"
    }
  ]
}
```

### Get page for given brand, dp, page template code and series ref

Template: `GET /brands/{brandCode}/distribution-points/{dpCode}/pages/{pageTemplateCode}/{seriesRef}`

Example: `GET /brands/mtv.com/distribution-points/mtv-website-main/pages/series-homepage/696b503c-ffb0-45b7-831a-cdb9e32930fa`

#### Ver 1

```
{
  {
    "seriesRef": "696b503c-ffb0-45b7-831a-cdb9e32930fa",
    "title": "foo",
    "description": "foo",
    "comments": "foo",
    "dpCode": "mtv-com-website",
    "dpTemplateCode": "mtv-website-main",
    "newDpTemplateCode": null,
    "pageCollectionId": null,
    "newPageCollectionId": "81bdeaf5-4e57-4a1a-a3ae-44b763561c12",
    "pageTmplCode": "series-homepage",
    "newPageTmplCode": "series-homepage-overriden",
    "sections": [
    ]
  }
  "links": [
    {
      "rel": "self",
      "href": "http://localhost:8080/brands/mtv.com/distribution-points/mtv-website-main/pages/series-homepage/696b503c-ffb0-45b7-831a-cdb9e32930fa"
    }
  ]
}
```

#### Ver 2

```
{
  {
    "seriesRef": "696b503c-ffb0-45b7-831a-cdb9e32930fa",
    "title": "foo",
    "description": "foo",
    "comments": "foo",
    "dpCode": "mtv-com-website",
    "dpTemplateCode": "mtv-website-main",
    "pageCollectionId": "81bdeaf5-4e57-4a1a-a3ae-44b763561c12",
    "pageTmplCode": "series-homepage-overriden",
  }
  "links": [
    {
      "rel": "self",
      "href": "http://localhost:8080/brands/mtv.com/distribution-points/mtv-website-main/pages/series-homepage/696b503c-ffb0-45b7-831a-cdb9e32930fa"
    }
  ]
}
```

## Done

### Brands

1. `GET /brands`
1. `GET /brands/{brandCode}`

### Editorial collections

1. `GET /editorial-collections`
1. `GET /editorial-collections/{id}` <------- to remove
1. `GET /brands/{brandCode}/editorial-collections`
1. `GET /brands/{brandCode}/editorial-collections/{id}`
1. `POST /brands/{brandCode}/editorial-collections`
1. `PUT  /brands/{brandCode}/editorial-collections/{id}`

### Page collections

1. `GET /page-collections`
1. `GET /brands/{brandCode}/page-collections`
1. `GET /brands/{brandCode}/page-collections/{id}`

### Distribution points

1. `GET /distribution-points`
1. `GET /distribution-points/{dpCode}`

### Distribution points templates

1. `GET /distribution-points-templates`
1. `GET /distribution-points-templates/{dpTemplateCode}`

### Templating

1. `GET /templating/collections-config/{collectionId}`
1. `GET /templating/page-config`

### Fake update notifications

1. `GET /fake-update-notifications/collection/{id}`
1. `GET /fake-update-notifications/page/{dpTemplateCode}/{pageTemplateCode}/{dpCode}`
1. `GET /fake-update-notifications/page/{dpTemplateCode}/{pageTemplateCode}/{dpCode}/{seriesRef}`

### Pages prototype

1. `GET /pages-prototype/{brandCode}/{dpTemplateCode}/{pageTemplateCode}/{dpCode}`
1. `GET /pages-prototype/{brandCode}/{dpTemplateCode}/{pageTemplateCode}/{dpCode}/{seriesRef}`

## In progress:

1. `GET /pages`

## Ideas:

Michal:

1. `GET /brands/{brandCode}/distribution-points` 0.5
1. `GET /brands/{brandCode}/distribution-points/{dpCode}` 0.25

Kamil Mykitiuk:

1. `GET /brands/{brandCode}/distribution-points/{dpCode}/pages`
1. `GET /brands/{brandCode}/distribution-points/{dpCode}/pages/{pageTemplateCode}`
1. `GET /brands/{brandCode}/distribution-points/{dpCode}/pages/{pageTemplateCode}/{seriesRef}`

Michal:

1. `POST /brands/{brandCode}/distribution-points/{dpCode}/pages`
1. `PUT  /brands/{brandCode}/distribution-points/{dpCode}/pages/{pageTemplateCode}/{seriesRef}`

1. `POST /brands/{brandCode}/page-collections` (with page sections - base on page template and page section template) 5
1. `PUT /brands/{brandCode}/page-collections/{id}` (same as above) 2 if POST is done

1. `POST /distribution-points-templates` 0.5 (code, title, instructions)
1. `PUT /distribution-points-templates/{dpTemplateCode}` 1 (same as above)

1. `POST /distribution-points` 0.5 (code, dp_template_code, brand_code, title, comments, trademark_stmt_code, platform_code)
1. `PUT /distribution-points/{dpCode}` 1 (same as above)

## Bad ideas:

1. `GET /brands/{brandCode}/pages` <- ???
1. `GET /brands/{brandCode}/distribution-points/{dpCode}/distribution-points-templates` 0.5
1. `GET /brands/{brandCode}/distribution-points/{dpCode}/distribution-points-templates/{dpTemplateCode}` 0.25
1. `GET /brands/{brandCode}/distribution-points/{dpCode}/pages/{dpTemplateCode}/{pageTemplateCode}` (we could remove {dpTemplateCode})
