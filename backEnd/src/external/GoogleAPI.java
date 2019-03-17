package external;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.List;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import entity.Leg;
import entity.Leg.LegBuilder;
import entity.Place;
import entity.Place.PlaceBuilder;
import entity.Step;
import entity.Step.StepBuilder;


public class GoogleAPI {
 
	//private final String details_URL = "https://maps.googleapis.com/maps/api/place/details";
	private final String direction_URL = "https://maps.googleapis.com/maps/api/directions";
	private final String nearby_URL = "https://maps.googleapis.com/maps/api/directions";
	private static final String DEFAULT_KEYWORD = ""; //search nearby keyword
	private final String key = ""; //Google User Key;
	
	//Nearby Search radius(m) maxiuem raidus is 50000
	private final int radius = 50000;
	
	//Search Directions from origin and start
	//API LINK:https://developers.google.com/maps/documentation/directions/start
	public Leg searchDirection(String origin_id,String des_id) {
		try {
			origin_id = URLEncoder.encode(origin_id, "UTF-8"); 
			des_id = URLEncoder.encode(des_id, "UTF-8"); 
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		
		String query = String.format("origin=place_id:%s&destination=place_id:%s&key=%s",origin_id,des_id,key);
		String url = direction_URL+ "/json?" + query;

		try {
			HttpURLConnection connection = (HttpURLConnection) new URL(url).openConnection();
			connection.setRequestMethod("GET");

			int responseCode = connection.getResponseCode(); 
			System.out.println("Sending request to url: " + url);
			System.out.println("Response code: " + responseCode);

			if (responseCode != 200) {
				return new Leg(null);
			}

			BufferedReader reader = new BufferedReader(new InputStreamReader(connection.getInputStream())); 
			
			String line;
			StringBuilder response = new StringBuilder();
			while ((line = reader.readLine()) != null) {
				response.append(line);
			}

			reader.close();
			JSONObject obj = new JSONObject(response.toString());
			
			//check data validation
			if (!obj.isNull("routes")) {
				JSONArray legs = obj.getJSONObject("routes").getJSONArray("legs");
				return  getLeg(legs);
			}

		} catch (Exception e) {
			e.printStackTrace();
		}

		return null;
	
	}
	
	
	private Leg getLeg(JSONArray legs) {

		if(legs.length() == 0) {
			return null;
		}
		
		try {
				//No waypoint, Only 1 leg in legs array.
				JSONObject leg_item = legs.getJSONObject(0);
				JSONArray steps = leg_item.getJSONArray("steps");
				
				//TODO:1. Parse distance/duration/start location/end location /start address/end address of Leg
				LegBuilder leg_builder = new LegBuilder();
				leg_builder.setDistance(leg_item.getJSONObject("distance").getInt("value"));
				leg_builder.setDuration(leg_item.getJSONObject("duration").getInt("value"));
				leg_builder.setEnd_address(leg_item.getString("end_address"));
				leg_builder.setStart_address(leg_item.getString("start_address"));
				leg_builder.setEnd_location_lat(leg_item.getJSONObject("end_location").getString("lat"));
				leg_builder.setEnd_location_lot(leg_item.getJSONObject("end_location").getString("lot"));
				leg_builder.setStart_location_lat(leg_item.getJSONObject("start_location").getString("lat"));
				leg_builder.setStart_location_lot(leg_item.getJSONObject("start_location").getString("lot"));
				
				for(int i=0;i<steps.length();i++) {
					JSONObject step_item = steps.getJSONObject(i);
					StepBuilder step_builder = new StepBuilder();
					
					//TODO:2. Parse start location/ end location /distance / duration of step_item
					step_builder.setDistance(step_item.getJSONObject("distance").getInt("value"));
					step_builder.setDuration(step_item.getJSONObject("duration").getInt("value"));
					step_builder.setEnd_location_lat(step_item.getJSONObject("end_location").getString("lat"));
					step_builder.setEnd_location_lot(step_item.getJSONObject("end_location").getString("lot"));
					step_builder.setStart_location_lat(step_item.getJSONObject("start_location").getString("lat"));
					step_builder.setStart_location_lot(step_item.getJSONObject("start_location").getString("lot"));
					
					//TODO:3. Create a new Step Entity and store in Leg
					leg_builder.addStep(step_builder.build());
				}
				//TODO: 4. Return created leg
				return leg_builder.build();
			
		}
		catch (Exception e) {
			System.out.print(e);
		}
		
		
		return null;
	}

	//NearBy Search Request
	//API_LINK:https://developers.google.com/places/web-service/search
	public List<Place> searchNearbyPlace(double lat, double lon, String keyword, String type) {

		if (keyword == null) {
			keyword = DEFAULT_KEYWORD;
		}

		try {
			keyword = URLEncoder.encode(keyword, "UTF-8"); 
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}

		//"radius=..." and "rankby=distance" are disjoint.
		//String query = String.format("location=%s,%s&rankby=distance&keyword=%s&key=%s", lat, lon, keyword, key);
		String query = String.format("location=%s,%s&radius=%s&keyword=%s&key=%s", lat, lon, radius,keyword, key);
		String url = nearby_URL + "/json?" + query;
		if(type != null) {
			url += String.format("&type=%s", type);
		}

		try {
			HttpURLConnection connection = (HttpURLConnection) new URL(url).openConnection();
			connection.setRequestMethod("GET");

			int responseCode = connection.getResponseCode(); 
			System.out.println("Sending request to url: " + url);
			System.out.println("Response code: " + responseCode);

			if (responseCode != 200) {
				return new ArrayList<Place>();
			}

			BufferedReader reader = new BufferedReader(new InputStreamReader(connection.getInputStream())); 
			
			String line;
			StringBuilder response = new StringBuilder();

			while ((line = reader.readLine()) != null) {
				response.append(line);
			}

			reader.close();
			JSONObject obj = new JSONObject(response.toString());
			
			//check data validation
			if (!obj.isNull("result")) {
				JSONArray results = obj.getJSONArray("result");
				return  getPlaceList(results);
			}

		} catch (Exception e) {
			e.printStackTrace();
		}

		return new ArrayList<Place>();
	}
	
	// Convert JSONArray to a list of item objects.
	private List<Place> getPlaceList(JSONArray results) throws JSONException {
		List<Place> placeList = new ArrayList<Place>();
		try {
			for (int i = 0; i < results.length(); i++) {
				JSONObject place_item = results.getJSONObject(i);
				
				PlaceBuilder builder = new PlaceBuilder();
				
				if (!place_item.isNull("place_id")) {
					builder.setPlace_id(place_item.getString("place_id"));
				}
				
				if (!place_item.isNull("geometry")) {
					JSONObject location = place_item.getJSONObject("geometry").getJSONObject("location");
					builder.setLat(location.getString("lat"));
					builder.setLat(location.getString("lot"));
				}
				
				if (!place_item.isNull("icon")) {
					builder.setIcon_url(place_item.getString("icons"));
				}
				
				if (!place_item.isNull("name")) {
					builder.setName(place_item.getString("name"));
				}
				
				if(!place_item.isNull("types")) {
					JSONArray types = place_item.getJSONArray("types");
					for(int j=0;j<types.length();j++) {
						builder.addTypes(types.get(j).toString());
					}
				}
				
				if(!place_item.isNull("rating")) {
					builder.setRating(place_item.getDouble("rating"));
				}
				
				placeList.add(builder.build());
				
			}
			
			//Descending Sort By Rating
			Collections.sort(placeList);
			
			return placeList;
		}
		catch (Exception e) {
			System.out.print(e);
		}
		
		return placeList;
	}
	
}
