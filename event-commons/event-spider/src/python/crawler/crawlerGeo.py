import os
from os import listdir
from os.path import isfile, join

import unidecode
import time

from scrapy.crawler import CrawlerProcess
from scrapy.utils.project import get_project_settings

#Prepare Folder (RAW & LOG)
if not os.path.exists(os.path.dirname("../../data/stage/")):
    os.makedirs(os.path.dirname("../../data/stage/"))
if not os.path.exists(os.path.dirname("../../data/log/")):
    os.makedirs(os.path.dirname("../../data/log/"))


#Prepare Files
time_prefix = time.strftime("%Y%m%d-%H%M%S")
file_data = "../../data/stage/" + time_prefix + "-crawlerGeo.xml"
file_log = "../../data/log/" + time_prefix + "-crawlerGeo.log"

#Create Files
if not os.path.exists(os.path.dirname(file_data)):
        os.makedirs(os.path.dirname(file_data))
if not os.path.exists(os.path.dirname(file_log)):
        os.makedirs(os.path.dirname(file_log))

#Settings
setting = get_project_settings()
setting['FEED_FORMAT'] = 'xml'
setting['FEED_URI'] = file_data
setting['LOG_LEVEL'] = 'DEBUG'
#setting['LOG_FILE'] = file_log
setting['ITEM_PIPELINES'] = {
    'event.pipelines.EventUpdate':1,
    'event.pipelines.EventGeocodeSolr':5,
    'event.pipelines.EventGeocodeGoogle':10
}

extra_query="select?q=*%3A*&fq=place%3A%5B*+TO+*%5D&fq=-coordinate%3A%5B*+TO+*%5D&wt=xml"

#Crawler
process = CrawlerProcess(setting)
process.crawl('readerSolr', start_urls=["http://192.168.99.100:8983/solr/eventCore/" + extra_query])
process.start() 

