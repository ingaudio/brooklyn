package org.opsart.event.core.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@Configuration
@EnableMongoRepositories(basePackages="org.opsart.event.core.repo")
public class MongoConfig {

}
