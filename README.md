# TTU CS5331 Project 2: Text and Visualization

## Link to application

[isreehari.github.io](https://isreehari.github.io)

## Demo video

Click a screenshot to view the demo.

[![ScreenShot](https://isreehari.github.io/media/p2.inukollu.sorbo2.jpg)](https://youtu.be/xmOe5YCR_BU)
[![ScreenShot](https://raw.githubusercontent.com/isreehari/isreehari.github.io/master/media/p2.inukollu.sorbo.JPG)](https://youtu.be/xmOe5YCR_BU)

## Visualization features

1. Adjust the slider to select the date range.
2. Select the data source from the dropdown.
3. Word cloud will be regenerated on any change of date range or data source.
4. Click a term in the word cloud to show its frequency in the time series chart.
5. Select the time series style - Stack, Stream, or Expanded - with the radio buttons on the word frequency chart.
6. Click the nodes in the word relationships graph to navigate through the network of relationships.

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

### Hari Inukollu (Team lead)

1. AngularJS application framework
2. Word cloud final version
3. Time series
4. Word relationship graph

### Jeff Sorbo

1. Data Preprocessing
2. Initial work on word cloud directive
3. Initial work on term frequency service
4. Data source selection
