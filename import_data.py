import pandas as pd
import psycopg2
from sqlalchemy import create_engine
POSTGRESQL_URL = 'postgresql://postgres:postgres@localhost/mariam'
engine = create_engine(POSTGRESQL_URL)

df = pd.read_csv('public/data/population_data.csv', encoding='latin1')

years = list(range(1960, 2018))
new_columns = ['country_name', 'country_code'] + list(range(1960, 2018))
newdf = df.iloc[:, 2:]
newdf.columns = new_columns
newdf.to_sql('population_data', engine, index=False)
