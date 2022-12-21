const dotenv = require('dotenv');
const axios = require('axios');
const fs = require('fs');

// Load the values from the .env file
dotenv.config();

// Use the variables in your code
const JIRA_INSTANCE = process.env.JIRA_INSTANCE;
const JIRA_API_TOKEN = process.env.JIRA_API_TOKEN;
const JIRA_USERNAME = process.env.JIRA_USERNAME;

async function makeRequest() {
  try {
    // Set up the request headers
    const headers = {
      'Content-Type': 'application/json',
      'Accept-Encoding': 'identity',
      Authorization: `Basic ${Buffer.from(`${JIRA_USERNAME}:${JIRA_API_TOKEN}`).toString('base64')}`,
    };

    // Set up the request parameters
    const params = {
      jql: '', // leave this empty to retrieve all tickets
      startAt: 0,
      maxResults: 100,
      // You can add additional fields to the fields parameter to specify which fields you want to include in the response
      fields: ['summary', 'status', 'created'],
    };

    // Make the request
    const response = await axios.get(`https://${JIRA_INSTANCE}.atlassian.net/rest/api/2/search`, { headers, params });

    // Save the response data to a file
    fs.writeFileSync('jira-data.json', JSON.stringify(response.data, null, 2));
    console.log("success read jira-data.json")
  } catch (error) {
    fs.writeFileSync('jira-error.json', JSON.stringify(error, null, 2));
    console.log("failure read jira-error.json")
  }
}

makeRequest();
