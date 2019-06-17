import pandas as pd
import psycopg2
from sqlalchemy import create_engine
# POSTGRESQL_URL = 'postgresql://postgres:postgres@localhost/mariam'
POSTGRESQL_URL = 'postgres://cpejdskelcflry:6b5a08674306200dfd12ea50e3da1c0607de44d91b9fd15f20a04ca4e197ba53@ec2-184-73-169-163.compute-1.amazonaws.com:5432/ddrkkh6i24bl0r'
engine = create_engine(POSTGRESQL_URL)

df = pd.read_csv('public/data/population_data.csv', encoding='latin1')

years = list(range(1960, 2018))
new_columns = ['country_name', 'country_code'] + list(range(1960, 2018))
newdf = df.iloc[:, 2:]
newdf.columns = new_columns
newdf.to_sql('population_data', engine, index=False)
