### Downlad World Map Shapefile
- Admin 0 – Countries
- https://www.naturalearthdata.com/downloads/110m-cultural-vectors/

### Install GDAL ogr2ogr
- https://gdal.org/

### Convert shapefile to geojson

    ogr2ogr -f GeoJSON -t_srs crs:84 ne_110m_admin_0_countries.geojson ne_110m_admin_0_countries.shp

### Install topojson

    npm install topojson -g

### Convert geojson to topojson

    geo2topo ne_110m_admin_0_countries.geojson -o ne_110m_admin_0_countries.json

### rename to world_map.json

    cp ne_110m_admin_0_countries/ne_110m_admin_0_countries.json data/world_map.json

### start a server

    python -m SimpleHTTPServer

    Visit http://localhost:8000 in your browser

### Db 

1. create a database.

    CREATE DATABASE mariam;

2. create python environment

    pip install virtualenv
    virtualenv env
    source env/bin/activate
    pip install -r requirements.txt

3. import data

    python import_data.py

4. run server

    flask run

5. Visit http://localhost:5000 in your browser


### Heroku

heroku login

heroku create

in heroku add heroku postgres

copy postgres url and paste in code

git push heroku master
