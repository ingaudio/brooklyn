import os
from os import listdir
from os.path import isfile, join

import unidecode
import time

from scrapy.crawler import CrawlerProcess
from scrapy.utils.project import get_project_settings

#Prepare Folder (RAW & LOG)
if not os.path.exists(os.path.dirname("../../data/live/")):
    os.makedirs(os.path.dirname("../../data/live/"))
if not os.path.exists(os.path.dirname("../../data/stage/")):
    os.makedirs(os.path.dirname("../../data/stage/"))
if not os.path.exists(os.path.dirname("../../data/log/")):
    os.makedirs(os.path.dirname("../../data/log/"))


#Prepare Files
time_prefix = time.strftime("%Y%m%d-%H%M%S")
file_data = "../../data/live/" + time_prefix + "-crawlerSync.xml"
file_log = "../../data/log/" + time_prefix + "-crawlerSync.log"

#Create Files
if not os.path.exists(os.path.dirname(file_data)):
        os.makedirs(os.path.dirname(file_data))
if not os.path.exists(os.path.dirname(file_log)):
        os.makedirs(os.path.dirname(file_log))

#Settings
setting = get_project_settings()
setting['FEED_FORMAT'] = 'xml'
setting['FEED_URI'] = file_data
setting['LOG_LEVEL'] = 'WARN'
setting['LOG_FILE'] = file_log
setting['ITEM_PIPELINES'] = {
    'event.pipelines.EventSolrWriter':1
}

files_to_stage = []
for filename in os.listdir("../../data/stage"):
    fullPath = os.path.abspath(join("../../data/stage", filename))
    fullPath = "file://127.0.0.1/" + fullPath
    files_to_stage.append(fullPath)
    
print "file to process for sync:"
print files_to_stage   
#Crawler
process = CrawlerProcess(setting)
process.crawl('readerXML', start_urls=files_to_stage)
process.start() 

