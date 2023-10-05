// Define the user identification parameters
const userParameters = {
  euidl: 'current_device_id', // This pseudonymously identifies a particular user, device, or browser instance. You cannot provide the etuix as a value here.
  uid: 'your_customer_id', // This is intended to be a known identifier for a user provided by the site owner/library user.
  etagid: 'etagid_for this tag', // Id of the tag is declared in the Tag Management interface for debugging purposes
};

// Define the replay parameters
const replayParameters = {
  'ereplay-time': 'epoch_time_of_the_hit'1599210524, // Epoch time at which the hit has been recorded.
  'ereplay-ip': 'user_ip_address', // IP address of the client that generated the hit. If not provided this will have an impact on the geographic resolution.
  'ereplay-ua': 'uuser_agent', // User-Agent of the client that generated the hit. If not provided this will have an impact on device resolution and device filtering.
  'ereplay-mdevicetype': 'Desktop', // Device type of the client (e.g., Desktop, Phone, Tablet, etc.)
};

// Define the parameters you want to pass in the POST body
const postParameters = {
  parameter1: 'value1',
  parameter2: 'value2',
  // Add other parameters here
};

// Add the CACHE_BUSTER value as a GET parameter (ea-rnd parameter)
const cacheBusterValue = 'CACHE_BUSTER_VALUE'; // Replace with your actual cache buster value

// URL of the destination endpoint with cache buster as a query parameter
//TRACKING_HOSTNAME : your tracking sub domain
//TYPE : collector
//WEBSITE_NAME : your website name in eulerian environnement
const url = `https://TRACKING_HOSTNAME/TYPE/WEBSITE_NAME/?ea-rnd=${cacheBusterValue}`;

// Combine user identification, replay, and POST parameters
const combinedParameters = {
  ...userParameters,
  ...replayParameters,
  ...postParameters,
};

// Options for the POST request with User-Agent
const options = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json', // Specify JSON content type
    'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:71.0) Gecko/20100101 Firefox/71.0', // User-Agent header
  },
  body: JSON.stringify(combinedParameters), // Convert the object to a JSON string
};

// Execute the POST request
fetch(url, options)
  .then(response => response.json())
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error('Error:', error);
  });
