# TTU CS5331 Project 2: Text and Geospatial Visualization

## Demo

Click the screenshot to view the demo.

[![ScreenShot](https://github.com/isreehari/isreehari.github.io/blob/master/media/p2.inukollu.sorbo2.JPG)](https://youtu.be/bLNU7d88GBE)
[![ScreenShot](https://github.com/isreehari/isreehari.github.io/blob/master/media/p2.inukollu.sorbo.jpg)](https://youtu.be/bLNU7d88GBE)

## Link to application

[Click here.](https://isreehari.github.io)

## Visualization features

1. Adjust the slider to select the date range.
2. Select the data source from the dropdown.
3. Click Get Data to generate the word cloud.
4. Click a term in the word cloud to show its frequency in the time series chart.
5. Click the nodes in the word relationships graph to navigate through the network of relationships.
6. Click a Location in the word cloud to show the location on the map.

## Data description

### Blog post data

The data provided for this project were contained in two files: wikinews.tsv (the smaller file) and huffington.tsv (the larger).
In each data file, each record consisted of six attributes: Source, Time, and four pipe-separated lists of terms under the
categories Person, Location, Organization, and Miscellaneous.

### Preprocessing

Several steps were taken to preprocess the data into a format more amenable to processing in the application:

1. In huffington.tsv, the Source was populated with "huffington" using a text editor.
2. The Python script `parseTsv.py` was used to convert each tsv file to json.
    1. Each pipe-separated list of terms was parsed into an array of strings.
    2. For each record, each of these arrays of strings were appended together to form an array containing all the terms from the record.
    3. The Source and Term fields were parsed into object properties.
    4. The array of objects was written to the json file.

Here's a sample of one of the json files:

```json
    {
        "allTerms": [
            "reid",
            "john reid",
            "england",
            "ireland",
            "choosing health",
            "national health service",
            "scottish",
            "labour"
        ],
        "location": [
            "england",
            "ireland"
        ],
        "miscellaneous": [
            "scottish",
            "labour"
        ],
        "organization": [
            "choosing health",
            "national health service",
        ],
        "person": [
            "reid",
            "john reid"
        ],
        "source": "wikinews",
        "time": "2004-11-17 00:00:00"
    },
```

## Team member contributions

### Hari Inukollu

1. AngularJS application framework
2. Word cloud final version
3. Time series
4. Word relationship graph
5. Term map

### Jeff Sorbo

1. Data Preprocessing
2. Initial work on word cloud directive
3. Initial work on term frequency service
4. Data source selection
5. Documentation and demo video
