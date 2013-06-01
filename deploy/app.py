"""
Flask Documentation:     http://flask.pocoo.org/docs/
Jinja2 Documentation:    http://jinja.pocoo.org/2/documentation/
Werkzeug Documentation:  http://werkzeug.pocoo.org/documentation/

This file creates your application.
"""

import os
from flask import Flask, render_template
from flask_s3 import FlaskS3

app = Flask(__name__, template_folder='static')

app.config.update(
    DEBUG=bool(os.environ.get('DEBUG', False)),
    SECRET_KEY=os.environ.get('SECRET_KEY', 'this_should_be_configured')
)
if app.debug:
    print "DEBUG: ", app.debug
    app.template_folder = '../app'
    app.static_folder = '../app'

app.config['S3_BUCKET_NAME'] = 'openbloc'
s3 = FlaskS3()
s3.init_app(app)

###
# Routing for your application.
###


@app.route('/')
def home():
    """Render website's home page."""
    return render_template('index.html')


@app.route('/views/<path:template>')
def template(template):
    return render_template('views/' + template)


@app.route('/about/')
def about():
    """Render the website's about page."""
    return render_template('about.html')


###
# Routing static files. TODO: clean this non-DRY mess
###
if app.debug:
    def touch(fname, times=None):
        import os
        with file(fname, 'a'):
            os.utime(fname, times)
    touch('.reload')

    def debug_serve_folders(*folders):
        from werkzeug import SharedDataMiddleware
        import os
        for folder in folders:
            app.wsgi_app = SharedDataMiddleware(app.wsgi_app, {
                '/': os.path.join(os.path.dirname(__file__), '..', folder)
            }, cache=False)
    debug_serve_folders('app', '.tmp')


###
# The functions below should be applicable to all Flask apps.
###
@app.after_request
def add_header(response):
    """
    Add headers to both force latest IE rendering engine or Chrome Frame,
    and also to cache the rendered page for 10 minutes.
    """
    response.headers['X-UA-Compatible'] = 'IE=Edge,chrome=1'
    response.headers['Cache-Control'] = 'public, max-age=600'
    return response


@app.errorhandler(404)
def page_not_found(error):
    """Custom 404 page."""
    return render_template('404.html'), 404

###
# Loading custom backend modules
###

# from flask.ext.restful import Api
# from modules.api.resources import PlaylistResource, TrackResource

# api = Api(app)
# api.add_resource(PlaylistResource, '/api' + PlaylistResource.url)
# api.add_resource(TrackResource, '/api' + TrackResource.url)


if __name__ == '__main__':
    app.run(debug=True)
