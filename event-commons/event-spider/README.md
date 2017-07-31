# PYTHON Stuff!!

# Super Command For SPIDER -> SOLR
gradle clean spiderBcn crawlerRaw crawlerSync

# Super Commnad for SOLR -> SOLR (geo update of events) 
gradle clean spiderBcn crawlerGeo crawlerSync

# Prepare Python Env
gradle virtualEnv

# Use Virtual Env (for development)
source build/venv/bin/activate

# Stop Virtual Env (for development)
deactivate

# Scrapy - Root Project
event-spider/src/python

# Scrapy - Create Space
scrapy startproject events

# Scrapy - Create Spider
scrapy genspider salarazzmatazz www.salarazzmatazz.com

# Scrapy Crawling
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


self.client.add([{
            'id': item.get('id',''),
            'name_s': item.get('name',''),
            'url_s': item.get('url',''),
            'youtube_s': item.get('youtube',''),
            'category_s' : item.get('category',''),
            'price_f' : item.get('price', -1),
            'tags_ss' : item.get('tags',''),
            'address_s': item.get('address',''),
            'place_s': item.get('place',''),
            'zone_s': item.get('zone',''),
            'image_s': item.get('image',''),
            'country_s': item.get('country',''),
            'city_s': item.get('city',''),
            'locality_s': item.get('locality',''),
            'coordinate_s': item.get('coordinate',''),
            'dateStart_dt': item.get('dateStart',''),
            'dateEnd_dt': item.get('dateEnd',''),
            'spiderName_s': item.get('spiderName',''),
            'spiderSource_s': item.get('spiderSource',''),
            'info_t': item.get('info',''),
        }])
