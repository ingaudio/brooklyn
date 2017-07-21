package org.opsart.event.core.config;

import org.apache.solr.client.solrj.SolrClient;
import org.apache.solr.client.solrj.impl.HttpSolrClient;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.solr.core.SolrTemplate;

@Configuration
public class SolrConfig {

	public static final String SOLR_ENDPOINT = "solrEndpoint";
	public static final String CORE_EVENT = "eventCore";

	@Value("${solr.endpoint}")
	private String sorlEndpoint;
	
	@Bean
	public SolrTemplate solrEventTemplate(@Qualifier("solrClient") SolrClient solrClient) {
		return new SolrTemplate(solrClient);
	}
	
	@Bean
	public SolrClient solrClient() {
		return new HttpSolrClient(sorlEndpoint);
	}

}
