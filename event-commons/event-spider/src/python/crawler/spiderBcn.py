import os
import time

from scrapy.crawler import CrawlerProcess
from scrapy.utils.project import get_project_settings

#Prepare Folder (RAW & LOG)
if not os.path.exists(os.path.dirname("../../data/raw/")):
        os.makedirs(os.path.dirname("../../data/raw/"))
if not os.path.exists(os.path.dirname("../../data/log/")):
        os.makedirs(os.path.dirname("../../data/log/"))

#Time
time_prefix = time.strftime("%Y%m%d-%H%M%S")

#File
file_log = "../../data/log/" + time_prefix + "-spiderBcn.log"

#Setting
setting = get_project_settings()
setting['LOG_LEVEL'] = 'INFO'
setting['LOG_STDOUT'] = True
setting['LOG_FILE'] = file_log

#Crawler
process = CrawlerProcess(setting)
process.crawl('guia-bcn')
process.crawl('salarazzmatazz')
process.start()

