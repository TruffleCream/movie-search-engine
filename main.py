from bs4 import BeautifulSoup
import requests
import re
import pandas as pd

url = 'http://www.imdb.com/chart/top'
response = requests.get(url)
bsoup = BeautifulSoup(response.text, "html.parser")

movies = bsoup.select('td.titleColumn')
crew = [a.attrs.get('title') for a in bsoup.select('td.titleColumn a')]
ratings = [b.attrs.get('data-value') for b in bsoup.select('td.posterColumn span[name=ir]')]

list = []

for index in range(len(movies)):
    movie_string = movies[index].get_text()
    movie = (' '.join(movie_string.split()))
    movie_title = movie[len(str(index))+1:-7]
    year = re.search('\((.*?)\)', movie_string).group(1)
    place = movie[:len(str(index))-(len(movie))]
    data = {"place": place,
            "movie_title": movie_title,
            "rating": ratings[index],
            "year": year,
            "star_cast": crew[index],
            }
    list.append(data)

for movie in list:
	print(movie['place'], '-', movie['movie_title'], '('+movie['year'] +
		') -', 'Starring:', movie['star_cast'], movie['rating'])

df = pd.DataFrame(list)
df.to_csv('movies1.csv',index=False)