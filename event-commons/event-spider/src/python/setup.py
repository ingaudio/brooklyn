from setuptools import setup, find_packages

setup(
    name = "event-spider-scrapy",
    version = "0.0.1",
    packages=['event'],
    install_requires=[
        "scrapy",
        "pysolr",
        "googlemaps"
    ],
    scripts=['spiderBarcelona.py'],

)