package org.opsart.event.core.service;

import java.io.IOException;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import org.apache.log4j.LogManager;
import org.apache.log4j.Logger;
import org.opsart.event.core.dao.UserDAO;
import org.opsart.event.core.dto.GeoDTO;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken.Payload;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.google.maps.GeoApiContext;
import com.google.maps.GeocodingApi;
import com.google.maps.errors.ApiException;
import com.google.maps.model.AddressComponentType;
import com.google.maps.model.GeocodingResult;

@Service
public class GoogleService implements InitializingBean {

	private static final Logger LOG = LogManager.getLogger(GoogleService.class);

	private static final JacksonFactory jacksonFactory = JacksonFactory.getDefaultInstance();

	@Value("${google.clientId}")
	private String googleClientId;

	@Value("${google.api.key}")
	private String googleApiKey;

	private GoogleIdTokenVerifier tokenController = null;

	private GeoApiContext geoContext = new GeoApiContext();

	@Override
	public void afterPropertiesSet() throws Exception {
		this.tokenController = new GoogleIdTokenVerifier.Builder(new NetHttpTransport(), jacksonFactory)
				.setAudience(Collections.singletonList(googleClientId)).build();
		this.geoContext.setApiKey(googleApiKey);
	}

	public UserDAO login(String googleTokenID) throws Exception {
		if (LOG.isDebugEnabled())
			LOG.debug("google login by token:" + googleTokenID);

		GoogleIdToken idToken = tokenController.verify(googleTokenID);
		Payload payload = idToken.getPayload();

		// Search User
		UserDAO user = new UserDAO();

		// Convert To User
		user.email = payload.getEmail();
		user.name = (String) payload.get("name");
		user.pictureUrl = (String) payload.get("picture");
		user.attributes.put("family name", (String) payload.get("family_name"));
		user.attributes.put("given name", (String) payload.get("given_name"));

		// Save
		return user;
	}

	public List<GeoDTO> searchAddress(String address) throws ApiException, InterruptedException, IOException {

		// Query
		GeocodingResult[] results = GeocodingApi.geocode(geoContext, address).await();
		
		//FIXME All result
		if(results != null && results.length > 0) {
			GeoDTO geo = new GeoDTO();
			
			//Address
			geo.setAddress(results[0].formattedAddress);
			
			//Coordinate
			geo.setCoordinate("" + results[0].geometry.location.lat + "," + results[0].geometry.location.lng);;
			
			//Address
			for(int i = 0; i < results[0].addressComponents.length; i++) {
				for(int j = 0; j < results[0].addressComponents[i].types.length; j++) {
					if(AddressComponentType.COUNTRY.equals(results[0].addressComponents[i].types[j])) {
						geo.setCountry(results[0].addressComponents[i].longName);
					}
					if(AddressComponentType.ADMINISTRATIVE_AREA_LEVEL_2.equals(results[0].addressComponents[i].types[j])) {
						geo.setCity(results[0].addressComponents[i].longName);
					}
					if(AddressComponentType.LOCALITY.equals(results[0].addressComponents[i].types[j])) {
						geo.setLocality(results[0].addressComponents[i].longName);
					}
				}
			}
			
			//End
			return Arrays.asList(geo);
		}

		//Fail
		return null;
	}

}
