import csv
from datetime import datetime

# Define the input and output file paths
csv_file_path = '/home/azafar/Desktop/GitHub/atiyabzafar.github.io/_assets/Books.csv'
html_file_path = '/home/azafar/Desktop/GitHub/atiyabzafar.github.io/Blog/bookreviews/books_list1.html'
# Read the CSV file

books = []
with open(csv_file_path, newline='', encoding='utf-8') as csvfile:
    reader = csv.DictReader(csvfile)
    for row in reader:
        if row['Read Status'] == 'read' and row['Last Date Read']:
            books.append(row)

# Sort books by the last date read
books.sort(key=lambda x: datetime.strptime(x['Date Added'], '%Y/%m/%d'), reverse=False)


# Generate the HTML content
html_content = '''
|Date|Title|Authors|Rating|Review|
|----|-----|-------|------|------|
'''
current_year = '2025'
for book in books:
    html_content += f'|{book["Last Date Read"]}|{book["Title"]}|{book["Authors"]}|~~~<div class="Stars" style="--rating: {book["Star Rating"]};" aria-label="Rating of this book is {book["Star Rating"]} out of 5.">~~~|{book["Review"]}|\n'

with open(html_file_path, 'w', encoding='utf-8') as htmlfile:
    htmlfile.write(html_content)

