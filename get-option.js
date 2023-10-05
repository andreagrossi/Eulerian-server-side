// Define the parameters you want to pass
const parameters = {
  parameter1: 'value1',
  parameter2: 'value2',
};

// Add the CACHE_BUSTER value as the last path value
// This modification ensures that the cache is bypassed.
const cacheBusterValue = 'CACHE_BUSTER_VALUE'; // Replace with your actual cache buster value

// Convert the parameters into a query string
const queryString = new URLSearchParams(parameters).toString();

// Append the cache buster to the URL path
//tracking hostname : your tracking sub domain
//type : collector
//website name : your website name
const url = `https://TRACKING_HOSTNAME/TYPE/WEBSITE_NAME/${cacheBusterValue}?${queryString}`;

// Options for the GET request
// Make sure to replace with your desired User-Agent string. This header is optional and allows you to specify the user agent for your requests.
const options = {
  headers: {
    'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:71.0) Gecko/20100101 Firefox/71.0',
  },
};

// Execute the GET request
fetch(url, options)
  .then(response => response.json())
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error('Error:', error);
  });
}
