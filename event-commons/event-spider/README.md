# Prepare
pip install scrapy
pip install solrpy


# Create Space
scrapy startproject events

# Create Spider
scrapy genspider salarazzmatazz www.salarazzmatazz.com

# Crawling
scrapy crawl salarazzmatazz
scrapy crawl salarazzmatazz -o links.csv -t csv

# Run Shell
scrapy shell 'http://www.salarazzmatazz.com'



 def start_requests(self):
    	date = datetime.date.today()
        conciertos = [
            'http://www.salarazzmatazz.com/op/conciertos/%02d,%04d' % (date.month, date.year)
        ]
        for url in conciertos:
            yield scrapy.Request(url=url, callback=self.parseConciertos)


    def parseConciertos(self, response):
        self.info('parseConciertos on page %s' % response.url)
        


    def parseConciertoDetail(self, response):    
        loader = ItemLoader(item=EventItem(), response=response)
        loader.add_value('url', response.url)
        loader.add_css('name', 'div.artista-tot h1 span')
        return loader.load_item()

links = LinkExtractor(allow=('.*/op/conciertos/[0-9]+/.*html'), allow_domains=('www.salarazzmatazz.com')).extract_links(response)
        for link in links:
            yield scrapy.Request(
                url=link.url, 
                callback=self.parseShow
            )



