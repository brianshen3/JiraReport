const dotenv = require('dotenv');
const axios = require('axios');

// Load the values from the .env file
dotenv.config();

// allow for large responses
axios.defaults.maxContentLength = Infinity;

// Use the variables in your code
const JIRA_INSTANCE = process.env.JIRA_INSTANCE;
const JIRA_API_TOKEN = process.env.JIRA_API_TOKEN;
const JIRA_USERNAME = process.env.JIRA_USERNAME;

async function makeRequest() {
    try {
        // Set up the request headers
        const headers = {
            'Content-Type': 'application/json',
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
        const response = await axios.get('https://pixlee.atlassian.net/rest/api/2/search', {
            headers,
            params
        });

        // Print the response data
        console.log(response.data);
    } catch (error) {
        console.error(error);
    }
}

makeRequest();