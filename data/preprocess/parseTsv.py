import string
import json

def readLines(path, linesToSkip=0):
    lines = []
    fin = open(path)
    i = 0
    for line in fin:
        i+=1
        if i <= linesToSkip:
            continue
        newLine = line.strip()
        lines.append(newLine)
    return lines

def parseIntoEntries(lines):
    entries = []
    for line in lines:
        entry = {}
        current = line.split("\t")
        entry["source"] = current[0]
        entry["time"] = current[1]
        entry["person"] = current[2].split("|")
        entry["location"] = current[3].split("|")
        entry["organization"] = current[4].split("|")
        entry["miscellaneous"] = current[5].split("|")
        entry["allTerms"] = entry["person"] + entry["location"] + entry["organization"] + entry["miscellaneous"]
        entries.append(entry)
    return entries

def parseFile(path, linesToSkip=0):
    lines = readLines(path, linesToSkip)
    entries = parseIntoEntries(lines)
    return entries

def histogram(words):
    d = {}
    for word in words:
        d[word] = d.get(word, 0) + 1
    return d

def mostFrequent(data, n):
    allTerms = []
    for entry in data:
        allTerms = allTerms + entry["allTerms"]

    hist = histogram(allTerms)

    terms = []
    for x, freq in hist.iteritems():
        terms.append((freq, x))
    terms.sort(reverse=True)

    mostFreq = []
    for i in range(0, n):
        mostFreq.append({"count": terms[i][0], "term": terms[i][1]})

    return mostFreq

"""
Read the TSV file containing the categories of pipe-separated terms.
Convert the contents to an array of objects and write them to a JSON file.
Find the 50 most frequent terms and write them to a JSON file.
"""
def convertToJson(toPathAllData, toPathMostFreq, fromPath, linesToSkip=0):
    data = parseFile(fromPath, linesToSkip)
    with open(toPathAllData, "w") as out:
        json.dump(data, out, sort_keys=True, indent=4, ensure_ascii=False)
    mostFreq = mostFrequent(data, 50)
    with open(toPathMostFreq, "w") as out:
        json.dump(mostFreq, out, sort_keys=True, indent=4, ensure_ascii=False)

if __name__ == '__main__':
    convertToJson("../wikinews.json", "../mostfrequentterms.json", "../wikinews.tsv", 1)
