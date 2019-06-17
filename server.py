from flask import Flask, render_template, jsonify
from flask_sqlalchemy import SQLAlchemy
import os
import pandas as pd
import json

DATABASE_URL = 'postgresql://postgres:postgres@localhost/mariam'

def create_app():
    app = Flask(
        __name__,
        static_folder='public',
        static_url_path='',
        template_folder=''
    )
    app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE_URL
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db = SQLAlchemy(app)
    engine = db.get_engine()

    @app.route('/')
    def index():
        return render_template('./index.html')

    @app.route('/data')
    def data():
        data = pd.read_sql_query('select * from population_data', engine)
        data = data.to_json(orient='records')
        return jsonify(json.loads(data))

    return app


app = create_app()

if __name__ == '__main__':
    app.run()
