import scrapy
from scrapy.crawler import CrawlerProcess
from scrapy.utils.project import get_project_settings

def crawling():
    
    process = CrawlerProcess(get_project_settings())
    
    process.crawl('salarazzmatazz')
#    process.crawl('guia-bcn')
    process.start()

if __name__ == "__main__":
    crawling()