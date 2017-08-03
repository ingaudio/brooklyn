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
file_data = "../../data/stage/" + time_prefix + "-crawlerStage.xml"
file_log = "../../data/log/" + time_prefix + "-crawlerStage.log"

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
}

# Solr Query
solr_query= os.environ['SOLR_ENDPOINT'] + "/select?q=*%3A*&rows=500&wt=xml" 

#Crawler
process = CrawlerProcess(setting)
process.crawl('readerSolr', start_urls=[ solr_query ])
process.start() 

