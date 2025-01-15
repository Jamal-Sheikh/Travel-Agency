/**
 * @description       : 
 * @author            : ChangeMeIn@UserSettingsUnder.SFDoc
 * @group             : 
 * @last modified on  : 12-24-2024
 * @last modified by  : ChangeMeIn@UserSettingsUnder.SFDoc
**/
public with sharing class AllScheduledFlights {
    public static void fetchUpcomingFlights(
        String originLocationCode, 
        String destinationLocationCode, 
        String departureDate, 
        String returnDate, 
        Integer adults, 
        String includedAirlineCodes, 
        Integer maxResults
    ) {
        // Fetch the access token
        String accessToken = AmadeusAPI.getAccessToken();
        if (String.isEmpty(accessToken)) {
            System.debug('Access token is missing. Aborting flight search.');
            return;
        }

        // Base URL for Amadeus API
        String AMADEUS_SOURCE_BASE_URL = 'https://test.api.amadeus.com/v2/shopping/flight-offers';

        try {
            // Prepare query parameters dynamically
            Map<String, String> queryParams = new Map<String, String>();
            queryParams.put('originLocationCode', originLocationCode);
            queryParams.put('destinationLocationCode', destinationLocationCode);
            queryParams.put('departureDate', departureDate);
            if (!String.isEmpty(returnDate)) {
                queryParams.put('returnDate', returnDate);
            }
            queryParams.put('adults', String.valueOf(adults));
            if (!String.isEmpty(includedAirlineCodes)) {
                queryParams.put('includedAirlineCodes', includedAirlineCodes);
            }
            queryParams.put('max', String.valueOf(maxResults));

            // Build the query string
            String queryString = '?';
            for (String key : queryParams.keySet()) {
                queryString += key + '=' + EncodingUtil.urlEncode(queryParams.get(key), 'UTF-8') + '&';
            }
            queryString = queryString.removeEnd('&'); // Remove trailing '&'

            // Prepare the HTTP request
            HttpRequest request = new HttpRequest();
            request.setEndpoint(AMADEUS_SOURCE_BASE_URL + queryString);
            request.setMethod('GET');
            request.setHeader('Authorization', 'Bearer ' + accessToken);

            // Send the request
            Http http = new Http();
            HttpResponse response = http.send(request);

            // Handle the response
            if (response.getStatusCode() == 200) {
                System.debug('Response Status: ' + response.getStatusCode());
                System.debug('Response Body: ' + response.getBody());
            } else {
                System.debug('Failed to fetch flights. Status: ' + response.getStatusCode() + ', Response: ' + response.getBody());
            }
        } catch (Exception e) {
            System.debug('An error occurred: ' + e.getMessage());
        }
    }
}
